
import { isCompositeComponentWithType } from 'react-dom/test-utils';
import fire from '../fire'
import {Redirect, Router,useHistory} from 'react-router-dom'
import React, { Component } from 'react'

export class LogOut extends Component {
    componentWillMount() {
        fire.auth().signOut();
    }
    render() {
        return <Redirect  to="/" push={true}/>
    }
}

export default LogOut
