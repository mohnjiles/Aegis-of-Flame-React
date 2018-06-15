import React, {Component} from 'react';
import {getFFLogsData} from '../utils/api';
import {arrayUnique} from '../utils/utils';
import {Button, Table} from 'react-bootstrap';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

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

    getBestParsesForSpec(spec) {
        if (this.state.logData == null || spec == null) return;

        let { logData } = this.state;

        let parsesWithSpec = [];

        logData.forEach((parse) => {
            if (parse.specs.some((x) => x.spec == spec)) {
                parsesWithSpec.push(parse);
            }
        });

        return (
            <div>

                <Table bordered style={{
                    marginTop: '1em'
                }}>
                    <thead>
                        <tr>
                            <th>Boss</th>
                            <th>Best Historical %</th>
                            <th>Best {this.state.metric == "dps" ? "DPS" : "HPS"}</th>
                            <th>Kills</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        parsesWithSpec.map((parse, index) => {
                            let specData = parse.specs.find(x => x.spec == spec);

                            return (
                                <tr key={index}>
                                    <td>{parse.name}</td>
                                    <td>{specData.best_historical_percent.toFixed(2)}%</td>
                                    <td>{specData.best_persecondamount}</td>
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
                        {
                            this.state.availableClasses != null ? 
                            this.state.availableClasses.map((spec, index) => {
                                return (
                                    <Button style={{ marginRight: '0.4em' }}
                                        key={index} onClick={this.selectSpec.bind(this, spec)}
                                        bsStyle={this.state.selectedSpec == spec ? "success" : "danger"}>
                                        {spec}
                                    </Button>
                                )
                            })
                            : ""
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <Button onClick={this.selectMetric.bind(this, "dps")} style={{ marginTop: '0.4em', marginRight: '0.4em' }}
                            bsStyle={this.state.metric == "dps" ? "info" : "danger"}>
                            {"DPS"}
                        </Button>
                        <Button onClick={this.selectMetric.bind(this, "hps")} style={{ marginTop: '0.4em' }}
                            bsStyle={this.state.metric == "hps" ? "info" : "danger"}>
                            {"Healing"}
                        </Button>
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