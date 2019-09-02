import React from 'react'
import Cookies from 'js-cookie'
import { default as Countries } from '../../../../util/jsonFiles/countries.json';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { countries } from '../../../../util/jsonFiles/countries.json';


export class Address extends React.Component {

    
    constructor(props) {
        super(props)

        const countries = require('../../../../util/jsonFiles/countries.json');

        const addressData = props.addressData ?
            Object.assign({}, props.addressData)
            : {
                number: "",
                street: "",
                suburb: "",
                postCode: null,
                city: "",
                country: ""
            }

        
        
        this.state = {
            region: [],
            popCities: '',
            showEditSection: false,
            addressDetails: {
                address: addressData
            },

            countries: countries,
            selectedCountry: this.props.addressData.country
        }

        this.openEdit = this.openEdit.bind(this)
        this.closeEdit = this.closeEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.saveAddress = this.saveAddress.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.renderDisplay = this.renderDisplay.bind(this)
        //this.handleChangeDropdown = this.handleChangeDropdown.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
    }

    
    openEdit() {
        const addressData = Object.assign({}, this.props.addressData)
        this.setState({
            showEditSection: true,
            addressDetails: {
                address: addressData 
            }
        })
    }

    closeEdit() {
        this.setState({
            showEditSection: false
        })
    }

    handleChange() {
        const data = Object.assign({}, this.state.addressDetails.address)
        data[event.target.name] = event.target.value
        this.setState({
            addressDetails: {
                address: data
            },
            selectedCountry: data.country
        }, () => console.log(this.state.selectedCountry))  
    }

    getRegion(country) {
        if (country != this.props.addressData.country) {

            var countryList = this.state.countries
            var reg = [];
            for (var c in countryList) {
                if (c == country) {
                    //reg.push(countryList[c]);
                    var popCities = countryList[country].map(x => <option key={x} value={x}> {x}</option>);
                }
            }

            this.setState({
                region: reg,
                popCities: popCities
            }, () => console.log(this.state.popCities));
        }
    }


    saveAddress() {
        const data = Object.assign({}, this.state.addressDetails)
        console.log("save address")
        console.log(this.state.addressDetails)
        this.props.updateProfileData(data)
        this.props.saveProfileData(data)
        this.closeEdit()
    }

    handleOnChange(event) {
        var data = Object.assign({}, this.state.addressDetails.address)
        data[event.target.name] = event.target.value
        if (event.target.name == "country") {
            data["city"] = "";
        }

        this.setState({
            addressDetails: {
                address: data
            },
            selectedCountry: data.country
        }, () => console.log(this.state.addressDetails.address.country))

    }

    handleChangeDropdown() {
        const data = Object.assign({}, this.state.addressDetails.address)
        data[event.target.name] = event.target.value
        this.setState({
            addressDetails: {
                address: data
            },
            selectedCountry: data.country
        }, () => this.getRegion(this.state.selectedCountry))
    }

   
    render() {

        let popCities = "";
        return (
            this.state.showEditSection ? this.renderEdit(popCities) : this.renderDisplay()    
        )
    }

    renderEdit(popCities) {

        console.log("Location")
        console.log(this.props)
        /*<select
                    value={this.state.addressDetails.address.country}
                    name="country"
                    lable="Country"
                    placeholder="Select a country"
                    onChange={this.handleChangeDropdown}
                >

                    {
                        Object.keys(this.state.countries).map((key) => {
                            return (
                                <option value={key}>
                                    {key}
                                </option>
                            )
                        })
                    }
                </select>

                <select
                    name="city"
                    lable="City"
                    placeholder="Select your city"
                    onChange={() => this.handleChange}
                    value={this.state.addressDetails.address.city}
                >
                    {
                        this.state.region.map((x) => {
                            return (
                                <option key={x}>
                                    {x}
                                </option>
                            )
                        })
                    }
                </select>
         * 
         * */
        let selectedCountry = this.state.selectedCountry; //this.props.addressData.country;
        let country = this.props.addressData.country
        let selectedCity = this.props.addressData.city;
        let citiesOptions = [];
        let countriesOptions = [];
        var popCities = ""

        if (country != null && country != "" && country != undefined) {

            if (this.state.countries != null && this.state.countries != undefined && this.state.countries != "") {
                countriesOptions = Object.keys(this.state.countries).map((x) => <option key={x} value={x}>{x}</option>);

                if (selectedCountry != undefined && selectedCountry != null && selectedCountry != "") {
                    popCities = this.state.countries[selectedCountry].map(x => <option key={x} value={x}> {x}</option>);
                } else if (this.state.countries[country] != null) {
                    popCities = this.state.countries[country].map(x => <option key={x} value={x}> {x}</option>);
                } else {
                    popCities = ""
                }
            }
            console.log(popCities)
            citiesOptions = <span><select
                className="ui dropdown"
                placeholder="City"
                defaultValue={selectedCity}
                onChange={this.handleChange}
                name="city">
                <option value="0"> Select a town or city</option>
                {popCities}
            </select><br /></span>
        } else {
            popCities=""
        }
        

        return (
            <div className='ui sixteen wide column'>
                <ChildSingleInput
                    inputType="text"
                    lable="Number"
                    name="number"
                    value={this.state.addressDetails.address.number}
                    controlFunc={this.handleChange}
                    maxLength={20}
                    placeholder="Enter your street number"
                    errorMessage="Please enter a valid street number"
                />
                <ChildSingleInput
                    inputType="text"
                    lable="Street"
                    name="street"
                    value={this.state.addressDetails.address.street}
                    controlFunc={this.handleChange}
                    maxLength={50}
                    placeholder="Enter your street name"
                    errorMessage="Please enter a valid street name"
                />
                <ChildSingleInput
                    inputType="text"
                    lable="Suburb"
                    name="suburb"
                    value={this.state.addressDetails.address.suburb}
                    controlFunc={this.handleChange}
                    maxLength={50}
                    placeholder="Enter your suburb"
                    errorMessage="Please enter a valid suburb name"
                />

                <ChildSingleInput
                    inputType="number"
                    lable="Post Code"
                    name="postCode"
                    value={this.state.addressDetails.address.postCode}
                    controlFunc={this.handleChange}
                    maxLength={5}
                    placeholder="Enter your Post Code"
                    errorMessage="Please enter a valid post code"
                />

                

                <div>
                    <select className="ui right labeled dropdown"
                        placeholder="Country"
                        defaultValue={this.props.addressData.country}
                        onChange={this.handleChange}
                        name="country">

                       
                        <option value="">Select a country</option>
                        {countriesOptions}
                        
                    </select>
                    <div style={{ marginBottom: "5px", marginTop: "5px" }}></div>
                    {citiesOptions}
                </div>

              

                <button type="button" className="ui teal button" onClick={this.saveAddress}>Save</button>

                <button type="button" className="ui button" onClick={this.closeEdit}>Cancel</button>
                
            </div>  
        )
    }

    renderDisplay() {
        let address = this.props.addressData ? `${this.props.addressData.number}, ${this.props.addressData.street},  ${this.props.addressData.suburb}, ${this.props.addressData.postCode}` : ""
        let city = this.props.addressData ? this.props.addressData.city : ""
        let country = this.props.addressData ? this.props.addressData.country : ""
        

        return (
            <div className='row'>
                <div className="ui sixteen wide column">
                    <React.Fragment>
                        <p>Address: {address}</p>
                        <p>City: {city}</p>
                        <p>Country: {country}</p>
                    </React.Fragment>
                    <button type="button" className="ui right floated teal button" onClick={this.openEdit}>Edit</button>
                </div>
            </div>    
        )
    }

}

export class Nationality extends React.Component {

    constructor(props) {
        super(props)

        const nationalityData = props.nationalityData ?
            Object.assign("", props.nationalityData)
            : ""
            
        this.state = {
            profileData: {
                nationality: nationalityData
            }   
        }

        this.handleChange = this.handleChange.bind(this);
        this.changeNationality = this.changeNationality.bind(this);
    }

    handleChange() {

        let n = event.target.value
        this.setState({
            profileData: {
                nationality: n
            }
        }, () => this.changeNationality())
    }

    changeNationality() {

        console.log("Inside Change")

        const data = Object.assign("", this.state.profileData)
        this.props.saveProfileData(data)
    }

    
    render() {
       
        let national = ["Indian", "Mauri", "White", "Asian", "Pacific Islanders"];

        var nationality = national.map(x => <option key={x} value={x}> {x}</option>);

        console.log(this.props)

        return (
            
            <select
                value={this.props.nationalityData}
                name="nationality"
                lable="Nationality"
                placeholder="Select your nationality"
                onChange={this.handleChange}
            >
                <option value="">Select your nationality</option>
                {nationality}
            </select>    
        )
        
    }
}