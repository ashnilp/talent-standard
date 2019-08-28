/* Photo upload section */
import React, { Component } from 'react';
import Cookies from 'js-cookie';

export default class PhotoUpload extends Component {

    constructor(props) {
        super(props);

        this.maxNoOfFiles = 1;
        this.maxFileSize = 2097152;
        this.acceptedFileType = ["image/gif", "image/jpeg", "image/png", "image/jpg"];
        let numFiles = 1

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
                profilePhoto: imageSrc
            }
        }

        this.selectFileToUpload = this.selectFileToUpload.bind(this)
        this.fileSelectedHandler = this.fileSelectedHandler.bind(this)
       // this.upLoadImage = this.upLoadImage.bind(this)
    };

    upLoadImage(imageSrc) {

        console.log(imageSrc)
        let data = new FormData();
        for (var i = 0; i < this.state.selectedFile.length; i++) {
            if (this.state.selectedFile[i] != "") {
                data.append('file' + i, this.state.selectedFile[i]);
            }
        }

        this.setState({
            statusFlag: 'Y'
        }, () => console.log(this.state.statusFlag))

        //data.append('Id', Id);
        //data.append('FileRemoveId', this.state.selectedRemoveFileId);

        var cookies = Cookies.get('talentAuthToken');

        $.ajax({
            url: this.props.savePhotoUrl,
            headers: {
                'Authorization': 'Bearer ' + cookies
            },
            type: "POST",
            data: data,
            cache: false,
            processData: false,
            contentType: false,
            success: function (res) {
                if (res.success) {
                    this.updateProfileData();
                } else {
                    TalentUtil.notification.show(res.message, "error", null, null);
                }
            }.bind(this),
            error: function (res, status, error) {
                //Display error
                TalentUtil.notification.show("There is an error when updating Images - " + error, "error", null, null);
            }
        });
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
            currentNoOfFiles: localCurrentNoOfFiles
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
}
