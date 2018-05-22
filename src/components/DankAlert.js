import React, { Component } from 'react';
import { Alert, Fade } from 'react-bootstrap';


class DankAlert extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alertVisible: false,
            alertText: "",
            style: "danger"
        }
    }   

    render() {
        return (
            <div>
                { this.state.alertVisible ?
                    (
                        <Fade in={this.state.alertVisible}>
                        <Alert bsStyle={this.state.style}>
                                {this.state.alertText}
                            </Alert>
                        </Fade>
                    ) : ''
                }
            </div>
        )
    }

    showAlert(message, style) {
        this.setState({alertVisible: true, alertText: message, style: style});
        setTimeout(() => {
          this.setState({ alertVisible: false });
        }, 7500);
    }
}

export default DankAlert;