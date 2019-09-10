import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types'
import { Popup, Icon } from 'semantic-ui-react'

export default class TalentCard extends React.Component {
    constructor(props) {
        super(props);
       
    };

    
    
    render() {
        return (
            <div className="ui card">
                <div className="content">
                    <i className="right floated star icon"></i>
                    Ru (Talent) Ng
                </div>
                <div className="content">
                    <div className="image">
                    </div>
                </div>
            </div>   
        )
    }
}

