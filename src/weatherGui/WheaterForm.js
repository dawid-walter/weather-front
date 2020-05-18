import React from "react";
import axios from 'axios';
import './weatherForm.css'

class WeatherForm extends React.Component {
    state = {
        temp: '',
        icoSource: '',
        location: '',
        locationData: '',
        city: [],
        weatherData: [{}, {}, {}, {}, {}, {}]
    }

    componentDidMount() {
        let city = 'London';
        this.setState({city});
        this.state.weatherData[0].the_temp = 22;
        this.state.weatherData[0].wind_speed = 10;
        this.state.weatherData[0].humidity = 50;
        this.state.weatherData[0].weather_state_abbr = 'c';
    }

    locationHandleChange = event => {
        this.setState({location: event.target.value});
    }

    handleSubmit = event => {
        event.preventDefault();

        axios.get('https://www.metaweather.com/api/location/search/', {params: {query: this.state.location}})
            .then(res => {
                const locationData = res.data[0].woeid;
                this.setState({locationData});

                axios.get('https://www.metaweather.com/api/location/' + this.state.locationData + '/')
                    .then(res => {
                        let weatherData = res.data.consolidated_weather;
                        this.setState({weatherData});
                        let city = res.data.title;
                        this.setState({city})
                    })
            })
    }

    render() {
        return (
            <div>
                <div id="weather_wrapper">
                    <form onSubmit={this.handleSubmit}>
                        <div className="box">
                            <div className="container-1">
                                <input type="search" id="search" placeholder="Search..."
                                       onChange={this.locationHandleChange}/>
                                <button type="submit"><i className="fa fa-search"/></button>
                            </div>
                        </div>

                    </form>
                    <div className="weatherCard">
                        <div className="currentTemp">
                            <span className="temp">{Math.round(this.state.weatherData[0].the_temp)}&deg;</span>
                            <span className="location">{this.state.city}</span>
                        </div>
                        <div className="currentWeather">
                                <span className="conditions"><img
                                    src={'https://www.metaweather.com/static/img/weather/png/64/' + this.state.weatherData[0].weather_state_abbr + '.png'}/></span>
                            <div className="info">
                                <span className="rain">{Math.round(this.state.weatherData[0].humidity)} %</span>
                                <span className="wind">{Math.round(this.state.weatherData[0].wind_speed)} MPH</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default WeatherForm;
