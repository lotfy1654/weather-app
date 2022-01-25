import React from "react";
import "./App.css";
import Weather from "./components/Weather";
import Form from "./components/Form";

const ApiKey = "45da02c0b4967d40c3c5ecbf87d9bd4d";

//https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqa20yUFNLamxJUlBWRlA1NndTUnA1eHVWUUdwUXxBQ3Jtc0trd20tYVRWVGJNZHJ5Z01qRHVPc21ZQjRkZGtrRWxwa21WY054TU9RMjdGX09VWlRpNHJxSmVqLWhmaEpINzByWWVhbUNpOFliZEVyVXRNcnlKSWd1em1admY3UGp5dHgySTdDcUI5akhJU3I0Rmp4NA&q=http%3A%2F%2Fapi.openweathermap.org%2Fdata%2F2.5%2Fweather%3Fq%3Dcairo%2Cegypt%26appid%3De36ed364400282e43250b6c4c0274d44

class App extends React.Component {
  state = {
    tempreature: "",
    city: "",
    country: "",
    humidity: "",
    description: "",
    error: "",
  };
  getWeather = async (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const apiData = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}%2C${country}&appid=${ApiKey}`
    );
    const data = await apiData.json();
    if (city && country) {
      this.setState({
        tempreature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
      });
    } else {
      this.setState({
        tempreature: "",
        city: "",
        country: "",
        humidity: "",
        description: "",
        error: "Pleace Enter Data",
      });
    }
  };
  render() {
    return (
      <div className="wrapper">
        <div className="form-container">
          <Form getWeather={this.getWeather} />
          <Weather
            tempreature={this.state.tempreature}
            city={this.state.city}
            country={this.state.country}
            humidity={this.state.humidity}
            description={this.state.description}
            error={this.state.error}
          />
        </div>
      </div>
    );
  }
}
export default App;
