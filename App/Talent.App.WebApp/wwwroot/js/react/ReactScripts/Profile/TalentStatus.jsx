import React from 'react'
import { Form, Checkbox } from 'semantic-ui-react';
import { SingleInput } from '../Form/SingleInput.jsx';

export default class TalentStatus extends React.Component {
    constructor(props) {
        super(props);

        const status = props.status ?
            Object.assign({}, props.status)
            : {
                status: "",
                availableDate: null
            }

        this.state = {
            profileData: {
                jobSeekingStatus: status
            },
            selectedOption: ""

        }

        this.handleOptionChange = this.handleOptionChange.bind(this)
        this.saveJobSeek = this.saveJobSeek.bind(this)

    }

   

    handleOptionChange(event) {

        console.log("Hello")
        

        this.setState({
            profileData: {
                jobSeekingStatus: {
                    status: event.target.value
                }
            }
        }, () => this.saveJobSeek())

        
    }

    saveJobSeek() {

        const data = Object.assign({}, this.state.profileData)
        this.props.updateProfileData(data)
        this.props.saveProfileData(data)
    }

    render() {

        let status = this.props.status ? this.props.status.status : ""
        let availableDate = this.props.status ? this.props.status.availableDate : ""
        let display = ""
        console.log(this.props)
        


        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <div className="ui form">
                            <div className="grouped fields" onChange={this.handleOptionChange.bind(this)}>
                                <label>Current Status</label>
                                <div className="field">
                                    <div className="ui radio checkbox">
                                        <input type="radio" name="status" value="Actively looking for a job" checked={this.props.status.status === "Actively looking for a job"} />
                                        <label>Actively looking for a job</label>
                                    </div>
                                </div>

                                <div className="field">
                                    <div className="ui radio checkbox">
                                        <input type="radio" name="status" value="Not looking for a job at the moment" checked={this.props.status.status === "Not looking for a job at the moment"} />
                                        <label>Not looking for a job at the moment</label>
                                     </div>
                                </div>
                                <div className="field">
                                    <div className="ui radio checkbox">
                                        <input type="radio" name="status" value="Currently employed but open to offers" checked={this.props.status.status === "Currently employed but open to offers"} />
                                        <label>Currently employed but open to offers</label>
                                    </div>
                                </div>
                                <div className="field">
                                    <div className="ui radio checkbox">
                                        <input type="radio" name="status" value="Will be available on later date" checked={this.props.status.status === "Will be available on later date"} />
                                        <label>Will be available on later date</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </React.Fragment>
                </div>
            </div>    
        )
    }
}

/*
 * <label for="status">Current Status</label>
                            <div className="grouped fields" onChange={this.handleOptionChange.bind(this)}>
                                    <div className="field">
                                        <div className="ui radio checkbox">
                                            <input tabindextype="radio" value="Actively looking for a job" name="status" checked={this.state.profileData.status === "Actively looking for a job"}  />
                                            <label>Actively looking for a job</label>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui radio checkbox">
                                            <input type="radio" value="Not looking for a job at the moment" name="status" checked={this.state.profileData.status === "Not looking for a job at the moment"}  />
                                            <label>Not looking for a job at the moment</label>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui radio checkbox">
                                            <input type="radio" value="Currently employed but open to offers" name="status" checked={this.state.profileData.status === "Currently employed but open to offers"} />
                                            <label>Currently employed but open to offers</label>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui radio checkbox">
                                            <input type="radio" value="Will be available on later date" name="status" checked={this.state.profileData.status === "Will be available on later date"} />
                                            <label>Will be available on later date</label>
                                        </div>
                                    </div>
                            </div>
 * 
 * 
 * 
 * 
 * 
 *  else {
            if (status == "Actively looking for a job") {
                display =
                    <div className="grouped fields">
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio" value="Actively looking for a job" name="status" checked="true" tabindex="0" className="hidden" onChange={this.handleOptionChange} />
                                <label>Actively looking for a job</label>
                            </div>
                            <div className="field">
                                <div className="ui radio checkbox">
                                    <input type="radio" value="Not looking for a job at the moment" name="status" checked="false" tabindex="0" className="hidden" onChange={this.handleOptionChange} />
                                    <label>Not looking for a job at the moment</label>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui radio checkbox">
                                    <input type="radio" value="Currently employed but open to offers" name="status" checked="false" tabindex="0" className="hidden" onChange={this.handleOptionChange} />
                                    <label>Currently employed but open to offers</label>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui radio checkbox">
                                    <input type="radio" value="Will be available on later date" name="status" checked="false" tabindex="0" className="hidden" onChange={this.handleOptionChange} />
                                    <label>Will be available on later date</label>
                                </div>
                            </div>
                        </div>
                    </div>
            } else if (status == "Not looking for a job at the moment") {
                display =
                    <div className="grouped fields">
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio" value="Actively looking for a job" name="status" checked="false" tabindex="0" className="hidden" onChange={this.handleOptionChange} />
                                <label>Actively looking for a job</label>
                            </div>
                            <div className="field">
                                <div className="ui radio checkbox">
                                    <input type="radio" value="Not looking for a job at the moment" name="status" checked="true" tabindex="0" className="hidden" onChange={this.handleOptionChange} />
                                    <label>Not looking for a job at the moment</label>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui radio checkbox">
                                    <input type="radio" value="Currently employed but open to offers" name="status" checked="false" tabindex="0" className="hidden" onChange={this.handleOptionChange} />
                                    <label>Currently employed but open to offers</label>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui radio checkbox">
                                    <input type="radio" value="Will be available on later date" name="status" checked="false" tabindex="0" className="hidden" onChange={this.handleOptionChange} />
                                    <label>Will be available on later date</label>
                                </div>
                            </div>
                        </div>
                    </div>
            } else if (status == "Currently employed but open to offers") {
                display =
                    <div className="grouped fields">
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio" value="Actively looking for a job" name="status" checked="false" tabindex="0" className="hidden" onChange={this.handleOptionChange} />
                                <label>Actively looking for a job</label>
                            </div>
                            <div className="field">
                                <div className="ui radio checkbox">
                                    <input type="radio" value="Not looking for a job at the moment" name="status" checked="false" tabindex="0" className="hidden" onChange={this.handleOptionChange} />
                                    <label>Not looking for a job at the moment</label>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui radio checkbox">
                                    <input type="radio" value="Currently employed but open to offers" name="status" checked="true" tabindex="0" className="hidden" onChange={this.handleOptionChange} />
                                    <label>Currently employed but open to offers</label>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui radio checkbox">
                                    <input type="radio" value="Will be available on later date" name="status" checked="false" tabindex="0" className="hidden" onChange={this.handleOptionChange} />
                                    <label>Will be available on later date</label>
                                </div>
                            </div>
                        </div>
                    </div>
            } else if (status == "Will be available on later date") {
                display =
                    <div className="grouped fields">
                        <div className="field">
                            <div className="ui radio checkbox">
                                <input type="radio" value="Actively looking for a job" name="status" checked="false" tabindex="0" className="hidden" onChange={this.handleOptionChange} />
                                <label>Actively looking for a job</label>
                            </div>
                            <div className="field">
                                <div className="ui radio checkbox">
                                    <input type="radio" value="Not looking for a job at the moment" name="status" checked="false" tabindex="0" className="hidden" onChange={this.handleOptionChange} />
                                    <label>Not looking for a job at the moment</label>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui radio checkbox">
                                    <input type="radio" value="Currently employed but open to offers" name="status" checked="false" tabindex="0" className="hidden" onChange={this.handleOptionChange} />
                                    <label>Currently employed but open to offers</label>
                                </div>
                            </div>
                            <div className="field">
                                <div className="ui radio checkbox">
                                    <input type="radio" value="Will be available on later date" name="status" checked="true" tabindex="0" className="hidden" onChange={this.handleOptionChange} />
                                    <label>Will be available on later date</label>
                                </div>
                            </div>
                        </div>
                    </div>
            }
 * */