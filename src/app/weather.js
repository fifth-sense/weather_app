import React from 'react'
import './weather.css'
import WeatherCard from './weatherCard'
import { API_KEY }from '../util/index'

class Weather extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            cityName: '',
            api_data: [],
            dataPresent: false,
            msg:''
        }
    }
    onTextChange = e => {
        this.setState({ cityName: e.target.value })
    }
    handleSubmit = () => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName}&appid=${API_KEY}&units=metric`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("data ", data)
                if(data.cod === "404"){
                    this.setState({msg:data.message, api_data:[],dataPresent:false})
                }else{
                     return this.setState({ api_data: data, dataPresent: true, msg:'' })
                }
            });
            this.setState({ cityName: '' })
    }

    render() {
        return (
            <div className='container'>
                <div className='top-banner'>
                    <h1 className="heading">Know your Weather</h1>
                    <div>
                        <input className='top-banner_input' name={this.state.cityName} onChange={this.onTextChange} value={this.state.cityName} type="text" placeholder="Search for a city" autoFocus />
                        <button className='top-banner_button' onClick={this.handleSubmit} type="submit">SUBMIT</button>
                        <span className="msg"></span>
                    </div>
                </div>
                {this.state.dataPresent ? <WeatherCard weatherData={this.state.api_data}/>: <p style={{ color:'#ff1e42',fontWeight:'bold', fontSize:'30px', paddingTop:'20px' }} >{this.state.msg}</p> }
            </div>
        )
    }
}

export default Weather
