/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';

export default class Skill extends React.Component {

    constructor(props) {
        super(props);
        const skills = props.skillData ?
            Object.assign([], props.skillData)
            : [
                {
                    Id: "",
                    Name: "",
                    Level: ""
                }
            ]
        
        this.state = {
            profileData: {
                skills: skills
            },

            showAddSection: false,
            showEditSection: false,
            selectedName: "",
            newSkill:
            {
                name: "",
                level: ""
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
        this.saveSkill = this.saveSkill.bind(this)
        this.deleteSkill = this.deleteSkill.bind(this)
        this.delete = this.delete.bind(this)
        this.delSkill = this.delSkill.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.modify = this.modify.bind(this)
       
    }

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
                skills: this.props.skillData
            }
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange(id, e) {

        const index = this.state.profileData.skills.findIndex((s) => {
            return (
                s.id === id
            )
        })

        const skil = Object.assign({}, this.state.profileData.skills[index])
        skil[e.target.name] = e.target.value

        const skill = Object.assign([], this.state.profileData.skills)
        skill[index] = skil

        this.setState({
            profileData: {
                skills: skill
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

    deleteSkill(i) {
        console.log("Inside Delete")
        console.log(i)
        console.log(this.props)

        this.setState({
            profileData: {
                skills: this.props.skillData
            }
        }, () => this.delSkill(i))
    }

    delSkill(i) {
        let skills = Object.assign([], this.state.profileData.skills)

        skills.splice(i, 1)
        this.setState({
            profileData: {
                skills: skills
            }
        }, () => this.save())
    }

    delete(skill_del) {

        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/deleteSkill',
            headers: {

                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(skill_del),
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
        const skil = Object.assign({}, this.state.newSkill)
        skil[e.target.name] = e.target.value
        this.setState({
            newSkill: skil
        }, () => console.log(this.state.newSkill))
    }


    handleSubmit() {
        console.log("Inside handle Submit")
        this.setState({
            profileData: {
                skills: this.props.skillData
            },
            showAddSection: false
        }, () => this.addSubmit())
    }

    addSubmit() {

        console.log("inside add submit")
        let a = Object.assign([], this.state.profileData.skills)
        console.log(a)
        let l = a.find((e) => (e.name === this.verifyNewSkill()))
        console.log(l)
        if (l == undefined) {
            a.push(this.state.newSkill)
            this.setState({
                profileData: {
                    skills: a
                }
            }, () => this.save())
        }
        else {
            alert("skill exist")
        }
    }

    verifyNewSkill() {
        return (
            this.state.newSkill.name
        )
    }

    saveSkill() {
        //console.log(this.state)
        //  let data = Object.assign({}, this.state.profileData)
        let data = Object.assign({}, this.state.newSkill)

        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/addSkill',
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
        console.log("Inside Skill")
        console.log(this.state)
        if (this.props.skillData != null) {
            data = this.props.skillData.map((x, i) => {
                if (data != null) {
                    this.setState({
                        profileData: {
                            skills: this.props.skillData
                        }
                    }, () => console.log(this.state.profileData.skills))
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
                            <input
                                type="text"
                                value={this.state.newSkill.name}
                                name="name"
                                placeholder="Add skill"
                                onChange={this.handleOnChange.bind(this)}
                            />
                        </div>
                        <div className="four wide field">
                            <select
                                className="ui fluid dropdown"
                                lable="SkillLevel"
                                value={this.state.newSkill.level}
                                name="level"
                                onChange={this.handleOnChange.bind(this)}
                                placeholder="skill Level"
                            >
                                <option value="Skill Level">Skill Level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Expert">Expert</option>
                            </select>
                        </div>
                        <div className="four wide field">
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
                            <div className="three column row">
                                <div className="column">
                                    <label><b>Skill</b></label>
                                </div>
                                <div className="column">
                                    <label><b>Level</b></label>
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
                <div className="ui grid" key={x.name}>
                    <div className="three column row">
                        <div className="column">
                            <div className="ui list">
                                <div className="twelve wide field">
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={x.name}
                                        placeholder="Modify skill"
                                        onChange={this.handleChange.bind(this, x.id)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui list">
                                <div className="twelve wide field">
                                    <select
                                        className="ui fluid dropdown"
                                        lable="skillLevel"
                                        name="level"
                                        defaultValue={x.level}
                                        placeholder="Skill Level"
                                        onChange={this.handleChange.bind(this, x.id)}
                                    >
                                        <option value="Skill Level">skill Level</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Expert">Expert</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui list">
                                <div className="twelve wide field">
                                    <button type="button" className="ui button" onClick={this.modify}>Modify</button>
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
            <div key={x.name}>
                <div className="ui grid">
                    <div className="three column row">
                        <div className="column">
                            <div className="ui list" >
                                <div className="item" key={x.name}>{x.name}</div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui list">
                                <div className="item" key={x.name}>{x.level}</div>
                            </div>
                        </div>

                        <div className="column">
                            <div className="ui list">
                                <div className="item" key={x.name}>
                                    <i className="right floated close icon" onClick={this.deleteSkill.bind(this, i)}></i>
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

