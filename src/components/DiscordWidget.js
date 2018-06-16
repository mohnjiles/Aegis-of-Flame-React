import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';

class DiscordWidget extends Component {

  render() {
    return (
      <div>
        <Panel header="AoF Discord" bsStyle="success">
          <iframe title="Discord Widget" className="rounded-border" src="https://discordapp.com/widget?id=176483532464586753&theme=dark"
            width="100%" height="250" allowtransparency="true" frameBorder="0"></iframe>
        </Panel>
      </div>
    )
  }
}

export default DiscordWidget;
