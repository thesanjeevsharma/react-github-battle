import React, { Component } from 'react'

import './UserInput.css';

export default class UserInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            player1 : '',
            player2 : '',
            error : false,
            err_message : ''
        }
        this.fight = this.fight.bind(this);
    }

    fight() {
        if(this.state.player1 && this.state.player2) {
            this.setState({ fighting : true, error : false });
            this.props.onFight(this.state.player1, this.state.player2);
        } else {
            this.setState({ error : true, fighting : false, err_message : 'Inputs invalid!' });
        }
    }

    render() {
        return (
            <div className="sub-container"> 
                <div className="error" hidden={ !this.state.error }>
                    <p>{ this.state.err_message }</p>
                </div>
                <div className="half">
                    <label> Player One </label>
                    <input type="text" placeholder="Enter Username" value={ this.state.player1 } onChange={ (e) => { this.setState({ player1 : e.target.value }) } }/>
                </div>
                <div className="half">
                    <label> Player Two </label>
                    <input type="text" placeholder="Enter Username" value={ this.state.player2 } onChange={ (e) => { this.setState({ player2 : e.target.value }) } }/>
                </div>
                <button onClick={ this.fight } disabled={ this.props.fighting }>
                    { this.props.fighting ? 'Fighting...' : 'Fight' }
                </button>
            </div>
        )
    }
}
