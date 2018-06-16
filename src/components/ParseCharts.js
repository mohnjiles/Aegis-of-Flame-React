import React, {Component} from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';

class ParseCharts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            logData: this.props.logData,
            selectedSpec: this.props.selectedSpec
        };

    }

    formatXAxis = (tickItem) => {
        return moment(tickItem).format("YYYY-MM-DD");
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedSpec !== this.state.selectedSpec) {
            this.setState({selectedSpec: nextProps.selectedSpec});
        }

        if (nextProps.logData !== this.state.logData) {
            this.setState({logData: nextProps.logData});
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-12">
                    {this.state.logData != null && this.state.selectedSpec != null ?
                    this.state.logData.map((parse, index) => {
                        let specs = parse.specs.find(x => x.spec === this.state.selectedSpec);
                        
                        if (specs != null) {
                            let sortedSpecs = specs.data.sort((a, b) => {
                                return a.start_time < b.start_time ? 0 : 1;
                            });

                            return (
                                <div key={index}>
                                    <h2>{parse.name}</h2>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <LineChart data={sortedSpecs}>
                                            <Line type="monotone" dataKey="persecondamount" stroke="#8884d8" />
                                            <XAxis dataKey="start_time" tickFormatter={this.formatXAxis} />
                                            <YAxis domain={['auto', 'auto']}/>
                                            <Tooltip labelFormatter={this.formatXAxis}
                                                wrapperStyle={{
                                                    backgroundColor: "#333"
                                                }}/>
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            )
                        }

                        return null;
                    })
                    
                        : null
                    }
                </div>
            </div>
        )
    }
}

export default ParseCharts;