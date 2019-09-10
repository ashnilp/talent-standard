/* Social media JSX */
import React from 'react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Popup, Button, Icon } from 'semantic-ui-react';

export default class SocialMediaLinkedAccount extends React.Component {
    constructor(props) {
        super(props);

        const linkedAccounts = props.linkedAccounts ?
            Object.assign({}, props.linkedAccounts)
            : {
                linkedIn: "",
                github: ""
            }
        this.state = {
            profileData: {
                linkedAccounts: linkedAccounts
            },
            showEditSection: false
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.savelinkedAccounts = this.savelinkedAccounts.bind(this)
    }

    componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }

    openEdit() {

        console.log(this.state.profileData.linkedAccounts)

        const linkedAccounts = Object.assign({}, this.props.linkedAccounts)
        this.setState({
            showEditSection: true,
            profileData: {
                linkedAccounts: linkedAccounts
            }
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(event) {
        const data = Object.assign({}, this.state.profileData.linkedAccounts)
        data[event.target.name] = event.target.value
        this.setState({
            profileData: {
                linkedAccounts: data
            } 
        })
    }

    savelinkedAccounts() {
        const data = Object.assign({}, this.state.profileData)
        this.props.updateProfileData(data)
        this.props.saveProfileData(data)

        this.setState({
            showEditSection: false
        })
    }

    render() {
        return (
            
           this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }

    renderEdit() {
        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    lable="LinkedIn"
                    name="linkedIn"
                    value={this.state.profileData.linkedAccounts.linkedIn}
                    controlFunc={this.handleChange}
                    maxLength={200}
                    placeholder="Enter your linkedIn url"
                    errorMessage="Please enter a valid linkedIn url"
                />
                <ChildSingleInput
                    inputType="text"
                    lable="Github"
                    name="github"
                    value={this.state.profileData.linkedAccounts.github}
                    controlFunc={this.handleChange}
                    maxLength={200}
                    placeholder="Please enter your gitHub url"
                    errorMessage="please enter a valid gitHub url"
                />
                <button type="button" className="ui teal button" onClick={this.savelinkedAccounts}>Save</button>
                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
            </div>  
        )
    }

    renderDisplay() {

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <button className="ui linkedin button">
                        <i aria-hidden="true" className="linkedin icon"></i>
                        LinkedIn
                </button>
                    <span></span>
                <button className="ui gitHub button">
                        <i aria-hidden="true" className="gitHub icon"></i>
                        GitHub
                </button>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>
        )
    }

}