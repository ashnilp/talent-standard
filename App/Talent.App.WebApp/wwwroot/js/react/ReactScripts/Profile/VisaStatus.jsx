import React from 'react'
import { SingleInput } from '../Form/SingleInput.jsx';

export default class VisaStatus extends React.Component {

   
    constructor(props) {
        super(props)

        const visaStatus = props.visaStatus ? Object.assign("", this.props.visaStatus) : ""
        const visaExpiryDate = props.visaExpiryDate ? Object.assign("", this.props.visaExpiryDate) : ""

        this.state = {
            profileData: {
                visaStatus: visaStatus,
                visaExpiryDate: visaExpiryDate
            },
    
            isError: false
        }

        this.saveVisa = this.saveVisa.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
    
        this.handleOnChange = this.handleOnChange.bind(this)
    }


    handleChange(event) {
        console.log("Inside Handle change")
        console.log(event.target.value)
        let v = event.target.value
        this.setState({
            profileData: {
                visaExpiryDate: v
            }
        }, () => console.log(this.state.profileData))
    }

    handleOnChange(event) {

        console.log("inside handle on change")
        let visaStat = "";
        visaStat = event.target.value
        this.setState({
            profileData: {
                visaStatus: visaStat
            }

        }, () =>  this.x(visaStat)) 
    }

    x(visaStat) {
        console.log("Hello    " + visaStat)
        if (visaStat == "Citizen" || visaStat == "Permanent Resident") {
            console.log("inside check")
            this.saveVisa()
        }
    }

    saveVisa() {
        console.log("save activated")
        console.log(this.state.profileData)
        this.props.updateProfileData(this.state.profileData);
        this.props.saveProfileData(this.state.profileData)
    }

    

    render() {

        console.log("Inside Visa REnder")
        console.log(this.props)

        let status = false;
        if (this.state.profileData.visaStatus === null, this.state.profileData.visaStatus === "", this.state.profileData.visaStatus === undefined) {
            status = true
        } else if (this.state.profileData.visaStatus === "Work Visa" || this.state.profileData.visaStatus === "Student Visa") {
            status = false
        } else {
            status = true
        }
        

        return (
            status ? this.renderDisplay() : this.renderEdit()    
        )
    }

    renderDisplay() {

        let visaStatus = ["Citizen", "Permanent Resident", "Work Visa", "Student Visa"];

        var visa = visaStatus.map(x => <option key={x} value={x}> {x}</option>);

        let visaStat = this.props.visaStatus

        return (
          <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <div>
                            <label>Visa type</label>
                            <div className="four wide field">
                                <select
                                    className="ui fluid dropdown"
                                    lable="visaType"
                                    value={visaStat}
                                    name="visaStatus"
                                    onChange={this.handleOnChange}
                                    placeholder="Visa Status"
                                >
                                    <option value="Select Visa">Select Visa</option>
                                    {visa}
                                </select>
                            </div>
                        </div>
                    </React.Fragment>
                </div>
            </div>
        )
    }

    renderEdit() {

        let visaStatus = ["Citizen", "Permanent Resident", "Work Visa", "Student Visa"];

        var visa = visaStatus.map(x => <option key={x} value={x}> {x}</option>);


        return (
            <div className="ui form">
                <div className="three fields">
                    
                    <div className="field">
                        <label>Visa type</label>
                        <select
                            className="ui fluid dropdown"
                            lable="Visa Type"
                            value={this.state.profileData.visaStatus}
                            name="visaStatus"
                            onChange={this.handleOnChange}
                            placeholder="Visa Status"
                        >
                            <option value="Select Visa">Select Visa</option>
                            {visa}
                        </select>
                    </div>
                    <div className="field">
                        <label>Visa expiry date</label>
                        <SingleInput
                            inputType="date"
                            errorMessage="Date entered incorrect"
                            name="visaExpiryDate"
                            content={this.state.profileData.visaExpiryDate}
                            controlFunc={this.handleChange}
                            placeholder="Enter a phone number"
                            isError={this.state.isError}
                        />
                    </div>
                    <div className="field">
                        <button type="button" className="ui teal button" onClick={this.saveVisa}>Save</button>
                    </div>
                </div>
            </div>
        )
        

       /* return (
            <div className="ui form">
              <div className="sixteen wide field">
                <div className="twelve wide field">
                    <label>Visa type</label>
                    <select
                        className="ui fluid dropdown"
                        lable="Visa Type"
                        defaultValue={this.state.profileData.visaStatus}
                        name="visaStatus"
                        onChange={this.handleOnChange.bind(this)}
                        placeholder="Visa Status"
                    >
                        <option value="Select Visa">Select Visa</option>
                        <option value="Citizen">Citizen</option>
                        <option value="Permament Resident">Permanent Resident</option>
                        <option value="Work Visa">Work Visa</option>
                        <option value="Student Visa">Student Visa</option>
                    </select>
                </div>
                        
                    
                <div className="twelve wide field">
                    <label>Visa expiry date</label>
                    <SingleInput
                        inputType="date"
                        errorMessage="Date entered incorrect"
                        name="visaExpiryDate"
                        content={this.state.visaExpiryDate}
                        controlFunc={this.handleChange}
                        placeholder="Enter a phone number"
                        isError={this.state.isError}
                    />
                </div>
                       
                    
                <div className="two wide field">
                    <button type="button" className="ui teal button" onClick={this.saveVisa}>Save</button>
                </div>
              </div>
            </div>
                    
        ) */
    }
}