/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);

        this.maxNoOfFiles = 1;
        this.maxFileSize = 2097152;
        this.acceptedFileType = ["image/gif", "image/jpeg", "image/png", "image/jpg"];
        let numFiles = 1;
        let f = "";

        const imageSrc = this.props.imageId ?
            Object.assign("", this.props.imageId) : "";

        if (this.props.imageId == "" && this.props.imageId == null && this.props.imageId == undefined) {
            numFiles = 0;
            f = "";
        } else {
            numFiles = 1;
            f = "Y";
        }



        this.state = {
            selectedFile: [],
            selectedFileName: [],
            imageSrc: imageSrc,
            currentNoOfFiles: numFiles,
            statusFlag: f,
            profileData: {
                profilePhotoUrl: imageSrc
            }
        }

        this.selectFileToUpload = this.selectFileToUpload.bind(this)
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
        this.upLoadImage = this.upLoadImage.bind(this)

    };

    upLoadImage(imageSrc) {

        console.log(imageSrc)
        let data = new FormData();
        for (var i = 0; i < this.state.selectedFile.length; i++) {
            if (this.state.selectedFile[i] != "") {
                data.append('file' + i, this.state.selectedFile[i]);
            }
        }

        let d = Object.assign("", this.state.profileData.profilePhotoUrl)

        this.setState({
            statusFlag: 'Y'
        }, () => this.updateProfileData())
    }

    updateProfileData() {
        this.props.updateProfileData(this.state.profileData)
        this.props.updateProfileDataSave(this.state.profileData)
    }


    selectFileToUpload() {
        this.setState({
            statusFlag: ""
        }, () => document.getElementById('selectFile').click())
        
    }

    fileSelectedHandler(event) {
        let localSelectedFile = "";//this.state.selectedFile;
        let localSelectedFileName = "";//this.state.selectedFileName;
        let localImageSrc = "";//this.state.imageSrc;
        let localImageId = this.state.localImageId;
        let localCurrentNoOfFiles = this.state.currentNoOfFiles;

        for (let i = 0; i < event.target.files.length; i++) {
            if (event.target.files[i].size > this.maxFileSize || this.acceptedFileType.indexOf(event.target.files[i].type) == -1) {
                TalentUtil.notification.show("Max file size is 2 MB and supported file are *.jpg, *.jpeg, *.png, *.gif", "error", null, null);
            }
            else {
                    localSelectedFile = localSelectedFile.concat(event.target.files[i]),
                    localSelectedFileName = localSelectedFileName.concat(event.target.files[i].name),
                    localImageSrc = localImageSrc.concat(window.URL.createObjectURL(event.target.files[i])),
                    localCurrentNoOfFiles = 1
            }
        }

        /*
         * else if (localCurrentNoOfFiles >= this.maxNoOfFiles) {
                TalentUtil.notification.show("Exceed Maximum number of files allowable to upload", "error", null, null);
         * */

        this.setState({
            selectedFile: localSelectedFile,
            selectedFileName: localSelectedFileName,
            imageSrc: localImageSrc,
            currentNoOfFiles: localCurrentNoOfFiles,
            statusFlag: "",
            profileData: {
                profilePhotoUrl: localImageSrc
            }
        })

        console.log("inside file ex ...    " + localImageSrc)

    }

    render() {

        let showProfilePhoto = [];

        console.log(this.props.imageId)

        if (this.props.imageId != null && this.props.imageId != undefined && this.props.imageId != "") {
            console.log("Inside 1")
            showProfilePhoto = [];
            showProfilePhoto.push(<div><div><span><img style={{ height: 112, width: 112, borderRadius: 55 }}
                className="ui small" src={this.props.imageId} alt="Image Not Found" onClick={this.selectFileToUpload} /></span>
            </div > </div >
            );
        }

        if (this.state.currentNoOfFiles < this.maxNoOfFiles) {
            showProfilePhoto = [];
            console.log("Inside 2")
            showProfilePhoto.push(<span><i className="huge circular camera retro icon" style={{ alignContent: 'right', verticalAlign: 'top' }} onClick={this.selectFileToUpload}></i></span>);
        } else {
            console.log("Inside 3")
            showProfilePhoto = [];
            if (this.state.imageSrc != null && this.state.imageSrc != "" && this.state.imageSrc != undefined) {
                showProfilePhoto.push(<div><div><span><img style={{ height: 112, width: 112, borderRadius: 55 }}
                    className="ui small" src={this.state.imageSrc} alt="Image Not Found" /></span>
                </div > <div className="ui button" onClick={this.upLoadImage.bind(this, this.state.imageSrc)}><i className="upload icon"></i>Upload</div></div >
                );
            }
            
        }

        if (this.state.statusFlag == 'Y') {
            showProfilePhoto = [];
            console.log("Inside 4")
            console.log(this.state.imageSrc)
            console.log(this.props.imageId)
            showProfilePhoto = [];
            showProfilePhoto.push(<div><div><span><img style={{ height: 112, width: 112, borderRadius: 55 }}
                className="ui small" src={this.props.imageId} alt="Image Not Found" onClick={this.selectFileToUpload} /></span>
            </div > </div >
            );
        }
           /* if (this.state.imageSrc === null || this.state.imageSrc === "" || this.state.imageSrc === undefined) {
                console.log("No Image")
            } else {
                console.log("Image found")
                showProfilePhoto.push(<div><div><span><img style={{ height: 112, width: 112, borderRadius: 55 }}
                    className="ui small" src={this.state.imageSrc} alt="Image Not Found" /></span>
                </div > <div className="ui button" onClick={this.upLoadImage.bind(this, this.state.imageSrc)}><i className="upload icon"></i>Upload</div></div >
                );
            }

            if (this.state.currentNoOfFiles < this.maxNoOfFiles) {
                showProfilePhoto.push(<span><i className="huge circular camera retro icon" style={{ alignContent: 'right', verticalAlign: 'top' }} onClick={this.selectFileToUpload}></i></span>);
            }

            if (this.state.statusFlag === 'Y') {
                showProfilePhoto = [];
                showProfilePhoto.push(<div><div><span><img style={{ height: 112, width: 112, borderRadius: 55 }}
                    className="ui small" src={this.state.imageSrc} alt="Image Not Found" onClick={this.selectFileToUpload} /></span>
                </div > </div >
                );
            } */
        

        

        return (
            <div className="twelve wide column">
                <section>
                    <div >
                        <label htmlFor="work_sample_uploader" className="profile-photo">
                            {showProfilePhoto}
                        </label>
                        <input id="selectFile" type="file" style={{ display: 'none' }} onChange={this.fileSelectedHandler} accept="image/*" />
                    </div>
                </section>
            </div>
        )
    } 
}













/*import React, { Component } from 'react';
import Cookies from 'js-cookie';

export default class PhotoUpload extends Component {


    render() {

        return null
    }
    constructor(props) {
        super(props);

        this.maxNoOfFiles = 1;
        this.maxFileSize = 2097152;
        this.acceptedFileType = ["image/gif", "image/jpeg", "image/png", "image/jpg"];
        let numFiles = 1;

        const imageSrc = this.props.imageId ?
            Object.assign("", this.props.imageId) : "";

        if (imageSrc === "") {
            numFiles = 0;
        }

       
        
        this.state = {
            selectedFile: [],
            selectedFileName: [],
            imageSrc: imageSrc,
            currentNoOfFiles: numFiles,
            statusFlag: '',
            profileData: {
                profilePhotoUrl: imageSrc
            }
        }

        this.selectFileToUpload = this.selectFileToUpload.bind(this)
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
        this.upLoadImage = this.upLoadImage.bind(this)
    };

    upLoadImage(imageSrc) {

        console.log(imageSrc)
        let data = new FormData();
        for (var i = 0; i < this.state.selectedFile.length; i++) {
            if (this.state.selectedFile[i] != "") {
                data.append('file' + i, this.state.selectedFile[i]);
            }
        }

        let d = Object.assign("", this.state.profileData.profilePhotoUrl)

        this.setState({
            statusFlag: 'Y'
        }, () => console.log(this.state.statusFlag))

        //this.updateProfileData();

        
        
    }

    updateProfileData() {
        this.props.updateProfileData(this.state.profileData)
    }


    selectFileToUpload() {
        document.getElementById('selectFile').click();
    }

    fileSelectedHandler(event) {
        let localSelectedFile = this.state.selectedFile;
        let localSelectedFileName = this.state.selectedFileName;
        let localImageSrc = this.state.imageSrc;
        let localImageId = this.state.localImageId;
        let localCurrentNoOfFiles = this.state.currentNoOfFiles;

        for (let i = 0; i < event.target.files.length; i++) {
            if (event.target.files[i].size > this.maxFileSize || this.acceptedFileType.indexOf(event.target.files[i].type) == -1) {
                TalentUtil.notification.show("Max file size is 2 MB and supported file are *.jpg, *.jpeg, *.png, *.gif", "error", null, null);
            } else if (localCurrentNoOfFiles >= this.maxNoOfFiles) {
                TalentUtil.notification.show("Exceed Maximum number of files allowable to upload", "error", null, null);
            } else {
                localSelectedFile = localSelectedFile.concat(event.target.files[i]),
                localSelectedFileName = localSelectedFileName.concat(event.target.files[i].name),
                localImageSrc = localImageSrc.concat(window.URL.createObjectURL(event.target.files[i])),
                localCurrentNoOfFiles = 1                 
            }
        }

        this.setState({
            selectedFile: localSelectedFile,
            selectedFileName: localSelectedFileName,
            imageSrc: localImageSrc,
            currentNoOfFiles: localCurrentNoOfFiles,
            profileData: {
                profilePhotoUrl: localImageSrc
            }
        })

        console.log("inside file ex ...    " + localImageSrc)

    } 

    render() {

        let showProfilePhoto = [];
       

        console.log(this.state.imageSrc)
        if (this.state.imageSrc === null || this.state.imageSrc === "" || this.state.imageSrc === undefined) {
            console.log("No Image")
        } else {
            console.log("Image found")
            showProfilePhoto.push(<div><div><span><img style={{ height: 112, width: 112, borderRadius: 55 }}
                className="ui small" src={this.state.imageSrc} alt="Image Not Found" /></span>
            </div > <div className="ui button" onClick={this.upLoadImage.bind(this, this.state.imageSrc)}><i className="upload icon"></i>Upload</div></div >
            );
        }

        if (this.state.currentNoOfFiles < this.maxNoOfFiles) {
            showProfilePhoto.push(<span><i className="huge circular camera retro icon" style={{ alignContent: 'right', verticalAlign: 'top' }} onClick={this.selectFileToUpload}></i></span>);
        }

        if (this.state.statusFlag === 'Y') {
            showProfilePhoto = [];
            showProfilePhoto.push(<div><div><span><img style={{ height: 112, width: 112, borderRadius: 55 }}
                className="ui small" src={this.state.imageSrc} alt="Image Not Found" /></span>
            </div > </div >
            );
        }
       
        return (
            <div className="twelve wide column">
                <section>
                    <div >
                        <label htmlFor="work_sample_uploader" className="profile-photo">
                            {showProfilePhoto}
                        </label>
                        <input id="selectFile" type="file" style={{ display: 'none' }} onChange={this.fileSelectedHandler} accept="image/*" />
                    </div>
                </section>
            </div>
        )
    } 
} */
