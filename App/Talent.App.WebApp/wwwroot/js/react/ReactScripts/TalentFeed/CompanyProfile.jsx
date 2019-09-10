import React from 'react';
import { Loader } from 'semantic-ui-react';

export default class CompanyProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {        
        return (
            <div className="ui card">
                <div className="content">
                    <div className="center aligned author">
                        <img className="ui avatar image" src="https://semantic-ui.com/images/avatar/small/jenny.jpg"/>
                    </div>
                </div>
                <div className="extra content">
                    <div className="center aligned header">
                        MVP Studio
                    </div>
                    <div className="center aligned description">
                        <div className="meta">
                            <span className="category"><i className="lightbulb outline icon"></i>Auckland, New Zealand</span>
                        </div>
                    </div>
                    <div className="center aligned description">
                        We currently do not have specific skills that we desire
                    </div>
                </div>
                <div className="extra content">
                    <span className="left floated"><i className="phone icon"></i>0221983513</span>
                    <span className="left floated"><i className="envelope icon"></i>ashnilp@gmail.com</span>
                </div>
            </div>
        )
    }
}