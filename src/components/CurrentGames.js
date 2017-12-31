import React, { Component } from 'react';
import { getGames } from '../utils/api';
import { Panel } from 'react-bootstrap';

class CurrentGames extends Component {

  constructor(props){
    super(props);
    this.state = { games: [] }
  }

  componentDidMount() {
    this.getGames();
  }

  getGames() {
    getGames().then(games => {
      this.setState({games: games});
    });
  }


  render() {
    return (
      <div>
        <Panel header="Current Games" bsStyle="success">
          <table className="table table-borderless">
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
                {
                  this.state.games.map((game, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <img src={game.icon_url} alt={game.name} width="64px" height="64px"/>
                        </td>
                        <td>
                          {game.name}
                        </td>
                      </tr>
                    )
                  })
                }
            </tbody>
          </table>
        </Panel>
      </div>
    )
  }
}

export default CurrentGames;
