import React, {Component} from 'react';
import {getFFLogsData} from '../utils/api';
import {arrayUnique} from '../utils/utils';
import {Table, Tabs, Tab} from 'react-bootstrap';

import ParseCharts from './ParseCharts';

class BestLogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logData: null,
            selectedSpec: null,
            availableClasses: null,
            metric: "dps"
        };
    }

    componentDidMount() {
        getFFLogsData(this.props.name, this.props.server, this.state.metric).then(data => {
            this.setState({logData: data});
            this.getAvailableClasses();
        });
    }

    getColorForPercent(percent) {
        if (percent < 25 && percent >= 0)
            return "common";
        if (percent >= 25 && percent < 50)
            return "uncommon";
        if (percent >= 50 && percent < 75)
            return "rare";
        if (percent >= 75 && percent < 95)
            return "epic";
        if (percent >= 95 && percent < 100)
            return "legendary";
        if (percent === 100)
            return "artifact";
    }

    getAvailableClasses() {
        if (this.state.logData == null) return;

        let { logData } = this.state;

        let specs = logData.map((entry) => {
            return entry.specs.map((spec) => {
                return spec.spec;
            });
        });

        let availableClasses = arrayUnique([].concat.apply([], specs));

        this.setState({availableClasses: availableClasses, selectedSpec: availableClasses[0]});
        return availableClasses;
    }

    millisToMinutesAndSeconds(millis) {
        var minutes = Math.floor(millis / 60000);
        var seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    getBestParsesForSpec(spec) {
        if (this.state.logData == null || spec == null) return;

        let { logData } = this.state;

        let parsesWithSpec = [];

        logData.forEach((parse) => {
            if (parse.specs.some((x) => x.spec === spec)) {
                parsesWithSpec.push(parse);
            }
        });

        return (
            <div>

                <Table responsive condensed striped
                    style={{
                        marginTop: '1em'
                    }}>
                    <thead>
                        <tr>
                            <th>Boss</th>
                            <th>Best Historical %</th>
                            <th>Best {this.state.metric === "dps" ? "DPS" : "HPS"}</th>
                            <th>Fastest Kill</th>
                            <th>Kills</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        parsesWithSpec.map((parse, index) => {
                            let specData = parse.specs.find(x => x.spec === spec);

                            return (
                                <tr key={index}>
                                    <td>{parse.name}</td>
                                    <td className={this.getColorForPercent(specData.best_historical_percent)}>{specData.best_historical_percent.toFixed(2)}%</td>
                                    <td className="dps">{specData.best_persecondamount.toFixed(1)}</td>
                                    <td>{this.millisToMinutesAndSeconds(specData.best_duration)}</td>
                                    <td>{specData.data.length}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
            </div>
        )
    }

    selectSpec(spec) {
        this.setState({selectedSpec: spec});
    }

    selectMetric(metric) {
        this.setState({metric: metric});
        getFFLogsData(this.props.name, this.props.server, metric).then(data => {
            this.setState({logData: data});
        });
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Tabs activeKey={this.state.selectedSpec}
                              onSelect={this.selectSpec.bind(this)}  
                              bsStyle={'pills'}
                              id={"Jobs"}
                              >
                        {
                            this.state.availableClasses != null ? 
                            this.state.availableClasses.map((spec, index) => {
                                return <Tab key={index} eventKey={spec} title={spec}/>
                            })
                            : ""
                        }
                        </Tabs>
                        
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <Tabs activeKey={this.state.metric}
                            onSelect={this.selectMetric.bind(this)}  
                            bsStyle={'pills'}
                            id={"Metrics"}
                            style={{marginTop: '0.4em'}}
                            >
                            <Tab eventKey={'dps'} title={"DPS"}/>
                            <Tab eventKey={'hps'} title={"Healing"}/>
                        </Tabs>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        { this.state.selectedSpec != null ? 
                            this.getBestParsesForSpec(this.state.selectedSpec)
                            : ""
                        }
                    </div>
                </div>
                <ParseCharts
                    selectedSpec={this.state.selectedSpec}
                    logData={this.state.logData}/>
            </div>
        )
    }
}

export default BestLogs;