/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import Moment from 'react-moment';


export default class Experience extends React.Component {

    constructor(props) {
        super(props);

        const experience = props.experienceData ?
            Object.assign([], props.experienceData)
            : [
                {
                    Id: "",
                    Company: "",
                    Position: "",
                    Responsibilities: "",
                    Start: "",
                    End: ""
                }
            ]
        console.log("Inside Cons")
        console.log(experience)
        this.state = {
            profileData: {
                experience: experience
            },

            showAddSection: false,
            showEditSection: false,
            selectedName: "",
            newExperience:
            {
                company: "",
                position: "",
                responsibilities: "",
                start: "",
                end: ""
            }
        }



        this.openAdd = this.openAdd.bind(this)
        this.closeAdd = this.closeAdd.bind(this)
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.save = this.save.bind(this)
        this.addSubmit = this.addSubmit.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.saveExperience = this.saveExperience.bind(this)
        this.deleteExperience = this.deleteExperience.bind(this)
        this.delete = this.delete.bind(this)
        this.delExpr = this.delExpr.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.modify = this.modify.bind(this)
       
    };

    openAdd() {
        this.setState({
            showAddSection: true,
            showEditSection: false
        })
    }

    closeAdd() {
        this.setState({
            showAddSection: false
        })
    }

    openEdit(name) {
        this.setState({
            showEditSection: true,
            showAddSection: false,
            selectedName: name,
            profileData: {
                experience: this.props.experienceData
            }
        }, () => console.log(this.state))
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }


    handleChange(id, e) {

        const index = this.state.profileData.experience.findIndex((e) => {
            return (
                e.id === id
            )
        })

        const expr = Object.assign({}, this.state.profileData.experience[index])
        expr[e.target.name] = e.target.value

        const exp = Object.assign([], this.state.profileData.experience)
        exp[index] = expr

        this.setState({
            profileData: {
                experience: exp
            }
        }, () => console.log(this.state.profileData))
    }

    modify() {
        this.setState({
            showEditSection: false
        }, () => this.save())
    }

    dataPass(x, i) {
        if (this.state.showEditSection) {
            return (
                this.renderEdit(x, i)
            )
        } else {
            return (
                this.renderDisplay(x, i)
            )
        }
    }

    deleteExperience(i) {
        console.log("Inside Delete")
        console.log(i)
        console.log(this.props)

        this.setState({
            profileData: {
                experience: this.props.experienceData
            }
        }, () => this.delExpr(i))
    }

    delExpr(i) {
        let experience = Object.assign([], this.state.profileData.experience)
        let expr_del = experience[i];

        console.log(expr_del)

        experience.splice(i, 1)
        this.setState({
            profileData: {
                experience: experience
            }
        }, () => this.save())
    }

    delete(expr_del) {

        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/deleteExperience',
            headers: {

                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(expr_del),
            success: function (res) {

                if (res.success == true) {
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
                TalentUtil.notification.show("error -- Profile did not update successfully", "error", null, null)
            }
        });
    }


    handleOnChange(e) {
        const expr = Object.assign({}, this.state.newExperience)
        expr[e.target.name] = e.target.value
        this.setState({
            newExperience: expr
        }, () => console.log(this.state.newExperience))
    }


    handleSubmit() {
        console.log("Inside handle Submit")
        this.setState({
            profileData: {
                experience: this.props.experienceData
            },
            showAddSection: false
        }, () => this.addSubmit())
    }

    addSubmit() {

        console.log("inside add submit")
        let a = Object.assign([], this.state.profileData.experience)
      //  console.log(a)
      //  let e = a.find((e) => (e.company === this.verifyNewExpr()))
      //  let e1 = a.find((e) => (e.position === this.state.newExperience.position))
      //  console.log(l)
      //  if (e == undefined && e1 == undefined) {
            a.push(this.state.newExperience)
            this.setState({
                profileData: {
                    experience: a
                }
            }, () => this.save())
      //  }
      //  else {
      //      alert("Experience exist")
      //  }
    }

    verifyNewExpr() {
        return (
            this.state.newExperience.company
        )
    }

    saveExperience() {
        //console.log(this.state)
        //  let data = Object.assign({}, this.state.profileData)
        let data = Object.assign({}, this.state.newExperience)

        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/addExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(data),
            success: function (res) {

                if (res.success == true) {
                    TalentUtil.notification.show("Profile updated sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Profile did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
                TalentUtil.notification.show("error -- Profile did not update successfully", "error", null, null)
            }
        });

    }

    save() {
        console.log("Inside save")
        const data = Object.assign([], this.state.profileData)
        console.log(this.state.profileData)
        if (data != null) {
            this.props.updateProfileData(data)
        } else {
            alert("Error")
        }

    }
    
    render() {
        var add = undefined;
        let data = null;

        //console.log(this.state.profileData.experience)
        if (this.props.experienceData != null) {
            data = this.props.experienceData.map((x, i) => {
                if (data != null) {
                    this.setState({
                        profileData: {
                            experience: this.props.experienceData
                        }
                    }, () => console.log(this.state.profileData.experience))
                }
                return (
                    this.dataPass(x, i)
                )
            })
        }
        
        if (this.state.showAddSection) {
            add =
                <div className="ui form">
                  <div className="twelve wide fields">
                    <div className="four wide field">
                        <lable>Company:</lable>
                            <input
                                type="text"
                                value={this.state.newExperience.company}
                                name="company"
                                placeholder="Add Company"
                                onChange={this.handleOnChange.bind(this)}
                            />
                    </div>
                    <div className="four wide field">
                        <label>Position:</label>
                            <input
                                type="text"
                                value={this.state.newExperience.position}
                                name="position"
                                placeholder="Add Position"
                                onChange={this.handleOnChange.bind(this)}
                            />
                    </div>
                  </div>
                  <div className="twelve wide fields">
                    <div className="four wide field">
                        <label>Start Date:</label>
                            <input
                                type="date"
                                value={this.state.newExperience.start}
                                name="start"
                                placeholder="Add Start Date"
                                onChange={this.handleOnChange.bind(this)}
                            />
                        </div>
                    <div className="four wide field">
                        <label>End Date:</label>
                            <input
                                type="date"
                                value={this.state.newExperience.end}
                                name="end"
                                placeholder="Add End Date"
                                onChange={this.handleOnChange.bind(this)}
                            />
                    </div>
                  </div>
                  <div className="twelve wide fields">
                    <div className="twelve wide field">
                        <label>Responsibilities:</label>     
                            <input
                                type="text"
                                value={this.state.newExperience.responsibilities}
                                name="responsibilities"
                                placeholder="Add Responsibility"
                                onChange={this.handleOnChange.bind(this)}
                            />
                    </div>
                  </div>
                  <div className="twelve wide fields">
                        <div className="twelve wide field">
                            <button type="button" name="add" value='Add' className="ui teal button" onClick={this.handleSubmit}>Add</button>
                            <button type="button" className="ui button" onClick={this.closeAdd}>Cancel</button>
                        </div>
                  </div>
                </div>
        }
        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    {add}
                    <React.Fragment>
                        <div className="ui grid">
                            <div className="six column row">
                                <div className="column">
                                    <label><b>Company</b></label>
                                </div>
                                <div className="column">
                                    <label><b>Position</b></label>
                                </div>
                                <div className="column">
                                    <label><b>Responsibilities</b></label>
                                </div>
                                <div className="column">
                                    <label><b>Start</b></label>
                                </div>
                                <div className="column">
                                    <label><b>End</b></label>
                                </div>
                                <div className="column">
                                    <button type="button" className="ui secondary button right floated" onClick={this.openAdd}>
                                        <i className="plus icon"></i>
                                        <span><strong>Add New</strong></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            {
                                data
                            }
                        </div>
                    </React.Fragment>
                </div>
            </div>

        )
    }


    renderEdit(x, i) {

        if (x.name == this.state.selectedName) {

            return (
                <div className="ui grid" key={x.id}>
                    <div className="two column row">
                        <div className="column">
                            <div className="ui list">
                                <div className="twelve wide field">
                                    <lable>Company:</lable>
                                    <input
                                        type="text"
                                        name="company"
                                        defaultValue={x.company}
                                        placeholder="Modify Company"
                                        onChange={this.handleChange.bind(this, x.id)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui list">
                                <div className="twelve wide field">
                                    <label>Position:</label>
                                    <input
                                        type="text"
                                        name="position"
                                        defaultValue={x.position}
                                        placeholder="Modify Position"
                                        onChange={this.handleChange.bind(this, x.id)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="two column row">
                        <div className="column">
                            <div className="ui list">
                                <div className="twelve wide field">
                                    <label>Start Date:</label>
                                    <input
                                        type="date"
                                        name="Start"
                                        defaultValue={x.start}
                                        placeholder="Modify Start Date"
                                        onChange={this.handleChange.bind(this, x.id)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui list">
                                <div className="twelve wide field">
                                    <label>End Date:</label>
                                    <input
                                        type="date"
                                        name="End"
                                        defaultValue={x.end}
                                        placeholder="Modify End Date"
                                        onChange={this.handleChange.bind(this, x.id)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="one column row">
                        <div className="column">
                            <div className="ui list">
                                <div className="twelve wide field">
                                    <label>Responsibilities:</label>
                                    <input
                                        type="text"
                                        name="responsibilities"
                                        defaultValue={x.responsibilities}
                                        placeholder="Modify Responsibilities"
                                        onChange={this.handleChange.bind(this, x.id)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="two column row">
                        <div className="column">
                            <div className="ui list">
                                <div className="twelve wide field">
                                    <button type="button" className="ui button" onClick={this.modify}>Update</button>
                                    <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                this.renderDisplay(x, i)
            )
        }

    }

    renderDisplay(x, i) {

        return (
            <div key={x.id}>
                <div className="ui grid">
                    <div className="six column row">
                        <div className="column">
                            <div className="ui list" >
                                <div className="item">{x.company}</div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui list">
                                <div className="item">{x.position}</div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui list">
                                <div className="item">{x.responsibilities}</div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui list">
                                <div className="item"><Moment format="DD MMM, YYYY">{x.start}</Moment></div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui list">
                                <div className="item"><Moment format="DD MMM, YYYY">{x.end}</Moment></div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui list">
                                <div className="item" key={x.name}>
                                    <i className="right floated close icon" onClick={this.deleteExperience.bind(this, i)}></i>
                                    <i key={x.name} className="right floated pencil alternate icon" onClick={this.openEdit.bind(this, x.name)}></i>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )

    } 
}
