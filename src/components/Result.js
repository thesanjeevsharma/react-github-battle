import React, { Component } from 'react';

import './Result.css';

export default class Result extends Component {
    render() {
        return (
            <div className="result" hidden={ !this.props.score }>
                <h1>Winner</h1>
                <h4>Score: { this.props.score.toFixed(2) }</h4>
                <img src={ this.props.winner.avatar_url } alt="Profile Picture"/>
                <p id="username">@{ this.props.winner.login }</p>
                <p id="location">{ this.props.winner.location }</p>
            </div>
        )
    }
}
