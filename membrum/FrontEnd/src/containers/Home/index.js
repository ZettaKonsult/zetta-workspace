import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Membrum</h1>
          <p>Build your community</p>

          <p>Building communitys steadily becomes a bigger part of our lifes</p>
          <p>
            Be it a sports organisation, a youtube channel or your local
            boardgame club
          </p>
          <p>
            Membrum offers you tools to help with making your community the best
            it can be
          </p>

          <div>
            <h3>Features</h3>
            <ul>
              <li>Subscriptions</li>
              <li>Communication</li>
              <li>Administration</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
