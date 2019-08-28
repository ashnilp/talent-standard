/* Language section */
import React from 'react';
import Cookies from 'js-cookie';


export default class Language extends React.Component {
    constructor(props) {
        super(props);

        const languages = props.languageData ?
            Object.assign([], props.languageData)
            : [
                {
                    Id: "",
                    Name: "",
                    Level: "",
                    CurrentUserId: ""
                }
            ]
        console.log("Inside Cons")
        console.log(languages)
        this.state = {
            profileData: {
                languages: languages
            },
           
            showAddSection: false,
            showEditSection: false,
            selectedName: "",
            newLanguage:
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
        this.saveLanguage = this.saveLanguage.bind(this)
        this.deleteLanguage = this.deleteLanguage.bind(this)
        this.delete = this.delete.bind(this)
        this.delLang = this.delLang.bind(this)
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
                languages: this.props.languageData
            }
        }, () => console.log(this.state))
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }


    handleChange(id, e) {

        const index = this.state.profileData.languages.findIndex((l) => {
            return (
               l.id === id
            )
        })

        const lang = Object.assign({}, this.state.profileData.languages[index])
        lang[e.target.name] = e.target.value

        const language = Object.assign([], this.state.profileData.languages)
        language[index] = lang

        this.setState({
            profileData: {
                languages: language
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

    deleteLanguage(i) {
        console.log("Inside Delete")
        console.log(i)
        console.log(this.props)

        this.setState({
            profileData: {
                languages: this.props.languageData
            }
        }, () => this.delLang(i))
    }

    delLang(i) {
        let languages = Object.assign([], this.state.profileData.languages)
        let lang_del = languages[i];

        console.log(lang_del)

        languages.splice(i, 1)
        this.setState({
            profileData: {
                languages: languages
            }
        }, () => this.save())
    }

    delete(lang_del) {
        
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/deleteLanguage',
            headers: {

                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(lang_del),
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
        const lang = Object.assign({}, this.state.newLanguage)
        lang[e.target.name] = e.target.value
        this.setState({
            newLanguage: lang
        }, () => console.log(this.state.newLanguage))
    }


    handleSubmit() {
        console.log("Inside handle Submit")
        this.setState({
            profileData: {
                languages: this.props.languageData
            },
            showAddSection: false
        }, () => this.addSubmit())
    }

    addSubmit() {

        console.log("inside add submit")
        let a = Object.assign([], this.state.profileData.languages)
        console.log(a)
        let l = a.find((e) => (e.name === this.verifyNewLang()))
        console.log(l)
        if (l == undefined) {
            a.push(this.state.newLanguage)
            this.setState({
                profileData: {
                    languages: a
                }
            }, () => this.save())
        }
        else {
            alert("Language exist")
        }
    }

    verifyNewLang() {
        return (
            this.state.newLanguage.name  
        )
    }

    saveLanguage() {
        //console.log(this.state)
        //  let data = Object.assign({}, this.state.profileData)
        let data = Object.assign({}, this.state.newLanguage)
        
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/addLanguage',
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

        //console.log(this.state.profileData.languages)

        data = this.props.languageData.map((x, i) => {
            if (data != null) {
                this.setState({
                    profileData: {
                        languages: this.props.languageData
                    }
                }, () => console.log(this.state.profileData.languages))
            }
            return (
                this.dataPass(x, i)
            )
        })
        

        if (this.state.showAddSection) {
            add =
                <div className="ui form">
                    <div className="twelve wide fields">
                        <div className="four wide field">
                        <input
                            type="text"
                            value={this.state.newLanguage.name}
                            name="name"
                            placeholder="Add Language"
                            onChange={this.handleOnChange.bind(this)}
                            />
                        </div>
                        <div className="four wide field">
                            <select
                            className="ui fluid dropdown"
                            lable="languageLevel"
                            value={this.state.newLanguage.level}
                            name="level"
                            onChange={this.handleOnChange.bind(this)}
                            placeholder="Language Level"
                            >
                                <option value="Language Level">Language Level</option>
                                <option value="Basic">Basic</option>
                                <option value="Conversational">Conversational</option>
                                <option value="Fluent">Fluent</option>
                                <option value="Natives/Bilingual">Natives/Bilingual</option>
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
                                    <label><b>Language</b></label>
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
                                        placeholder="Modify Language"
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
                                        lable="languageLevel"
                                        name="level"
                                        defaultValue={x.level}
                                        placeholder="Language Level"
                                        onChange={this.handleChange.bind(this, x.id)}
                                    >
                                        <option value="Language Level">Language Level</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Conversational">Conversational</option>
                                        <option value="Fluent">Fluent</option>
                                        <option value="Natives/Bilingual">Natives/Bilingual</option>
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
                                    <i className="right floated minus icon" onClick={this.deleteLanguage.bind(this, i)}></i>
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

/*
 * 
 * export default class Language extends React.Component {
    constructor(props) {
        super(props);

        const languageData = props.languageData ?
            Object.assign([], props.languageData)
            : [
                {
                    id: "",
                    name: "",
                    level: "",
                }
            ];

        this.state = {
            languages: languageData,
            showAddSection: false,
            showEditSection: false,
            selectedId: ""
        }

        this.openAdd = this.openAdd.bind(this)
        this.closeAdd = this.closeAdd.bind(this)
        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)

        //this.handleChange = this.handleChange.bind(this)
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

    openEdit(id) {
        this.setState({
            showEditSection: true,
            showAddSection: false,
            selectedId: id
        })


    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
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


    render() {
        var add = undefined;

        if (this.state.showAddSection) {
            add =
                <div className="ui form">
                    <div className="twelve wide fields">
                        <div className="four wide field">
                            <input
                                type="text"
                                name="language"
                                placeholder="Add Language"
                            />
                        </div>
                        <div className="four wide field">
                            <select
                                className="ui fluid dropdown"
                                lable="languageLevel"
                                name="languageLevel"
                                placeholder="Language Level"
                            >
                                <option value="Language Level">Language Level</option>
                                <option value="Basic">Basic</option>
                                <option value="Conversational">Conversational</option>
                                <option value="Fluent">Fluent</option>
                                <option value="Natives/Bilingual">Natives/Bilingual</option>
                            </select>
                        </div>
                        <div className="four wide field">
                            <button type="submit" value='Submit' className="ui teal button" onClick={this.handleSubmit}>Add</button>
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
                                    <label><b>Language</b></label>
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
                                this.state.profileData.languages.map((x, i) => {
                                    return (
                                        this.dataPass(x, i)
                                    )
                                })
                            }
                        </div>
                    </React.Fragment>
                </div>
            </div>

            //this.state.showEditSection ? this.renderEdit() : this.renderDisplay()
        )
    }


    renderEdit(x, i) {

        console.log(this.state.selectedId)



        if (x.id === this.state.selectedId) {
            return (
                <div className="ui grid">
                    <div className="three column row">
                        <div className="column">
                            <div className="ui list">
                                <div className="twelve wide field">
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={x.name}
                                        placeholder="Modify Language"
                                    // onChange={this.handleChange(x.id, event)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui list">
                                <div className="twelve wide field">
                                    <select
                                        className="ui fluid dropdown"
                                        lable="languageLevel"
                                        name="level"
                                        defaultValue={x.level}
                                        placeholder="Language Level"
                                    // onChange={this.handleChange(x.id, event)}
                                    >
                                        <option value="Language Level">Language Level</option>
                                        <option value="Basic">Basic</option>
                                        <option value="Conversational">Conversational</option>
                                        <option value="Fluent">Fluent</option>
                                        <option value="Natives/Bilingual">Natives/Bilingual</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="ui list">
                                <div className="twelve wide field">
                                    <button type="button" className="ui button">Modify</button>
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
          <div>
            <div className="ui grid">
                <div className="three column row">
                    <div className="column">
                        <div className="ui list">
                            <div className="item"><span key={x.id}>{x.name}</span></div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="ui list">
                            <div className="item"><span key={x.id}>{x.level}</span></div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="ui list">
                                <div className="item"> <span key={x.id}>
                                    <i className="right floated minus icon"></i>
                                    <i key={x.id} className="right floated pencil alternate icon" onClick={this.openEdit.bind(this, x.id)}></i>
                                </span>

                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )

    }

}
 * 
 * 
 * 
 * */
