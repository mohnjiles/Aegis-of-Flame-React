import React, {Component} from 'react';
import {getFFLogsData} from '../utils/api';
import {arrayUnique} from '../utils/utils';
import {Button, Table} from 'react-bootstrap';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import moment from 'moment';

class BestLogs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logData: null,
            selectedSpec: null,
            availableClasses: null
        };
    }

    componentDidMount() {
        getFFLogsData(this.props.name, this.props.server, "dps").then(data => {
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

        console.log(parsesWithSpec);

        return (
            <div>

                <Table bordered style={{
                    marginTop: '1em'
                }}>
                    <thead>
                        <tr>
                            <th>Boss</th>
                            <th>Best Historical %</th>
                            <th>Best DPS</th>
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
        console.log(spec);
    }

    formatXAxis = (tickItem) => {
        return moment(tickItem).format("YYYY-MM-DD");
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
                                    <Button key={index} onClick={this.selectSpec.bind(this, spec)}
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
                        { this.state.selectedSpec != null ? 
                            this.getBestParsesForSpec(this.state.selectedSpec)
                            : ""
                        }
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                    {this.state.logData != null && this.state.selectedSpec != null ?
                    <div>
                        <h2>Phantom Train</h2>
                        <LineChart width={600} height={300} data={this.state.logData[0].specs.find(x => x.spec == this.state.selectedSpec).data.sort((a, b) => {
                            return a.start_time < b.start_time ? 0 : 1;
                        })}>
                            <Line type="monotone" dataKey="persecondamount" stroke="#8884d8" />
                            <XAxis dataKey="start_time" tickFormatter={this.formatXAxis} />
                            <YAxis />
                            <Tooltip labelFormatter={this.formatXAxis}
                                wrapperStyle={{
                                    backgroundColor: "#333"
                                }}/>
                        </LineChart>
                    </div>
                        : ""
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default BestLogs;