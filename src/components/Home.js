import React, { Component } from 'react'

import UserInput from './UserInput';
import Result from './Result';

import './Home.css';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winner : '',
            score : 0,
            error : false,
            err_message : 'hello',
            fighting : false
        }
        this.fetchData = this.fetchData.bind(this);
    }

    async fetchData(player1, player2) {
        try {
            this.setState({ fighting : true });
            let player1data = await ((await fetch('https://api.github.com/users/' + player1)).json());
            let player2data = await ((await fetch('https://api.github.com/users/' + player2)).json());
            let player1score = (player1data.followers / player1data.following) + (player1data.public_repos / ((new Date()).getFullYear() - parseInt(player1data.created_at.split('-')[0])) );
            let player2score = (player2data.followers / player2data.following) + (player2data.public_repos / ((new Date()).getFullYear() - parseInt(player2data.created_at.split('-')[0])) );
            if (isNaN(player2score) || isNaN(player1score)) throw new Error('Are those usernames correct?');
            this.setState({ winner : player1score > player2score ? player1data : player2data, score : player1score > player2score ? player1score : player2score, error : false, fighting : false });
        } catch(err) {
            this.setState({ error : true, err_message : err.message ? err.message : 'Something went wrong! Try again later.', fighting : false });
            console.log(err);
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="main-error" hidden={ !this.state.error }>
                    <p>{ this.state.err_message }</p>
                </div>
                <div className="container">
                    <div className="half-screen">
                        <UserInput onFight={ this.fetchData } fighting={ this.state.fighting }/>
                    </div>
                    <div className="half-screen">
                        <Result winner={ this.state.winner } score={ this.state.score } />
                    </div>
                </div>
            </React.Fragment>
        )
    }
}