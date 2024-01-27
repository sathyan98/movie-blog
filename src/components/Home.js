import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { cities, apiKey } from "../constants/city";
import { useState, useEffect } from "react";
import { CardBody, CardHeader } from "react-bootstrap";

const Home = () => {
  const [city, cityState] = useState("Bangalore");
  const [weather, setWeather] = useState(null);
  console.log("city", city);
  const changeCity = (e) => {
    cityState(e.target.value);
  };
  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=Bangalore&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data0", data);
        const lat = data[0]?.lat;
        const lon = data[0]?.lon;
        return fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
      })
      .then((res) => res.json())
      .then((data) => setWeather(data));
  }, []);

  const getWeather = () => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data0", data);
        const lat = data[0]?.lat;
        const lon = data[0]?.lon;
        return fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );
      })
      .then((res) => res.json())
      .then((data) => setWeather(data));
  };
  console.log("weather", weather);
  const weatherIcon = weather?.weather[0]?.icon;
  console.log("weathericon", weatherIcon);
  return (
    <Container>
      <Row
        style={{
          display: "flex",
          flexBasis: "80%",
          justifyContent: "center",
          alignItems: "baseline",
          marginTop: "10px",
          gap: "20px",
        }}
      >
        <label>Please choose your city : </label>
        <select onChange={changeCity} value={city}>
          {cities &&
            cities.map((c) => {
              return <option value={c}> {c}</option>;
            })}
        </select>
        <button onClick={() => getWeather()}>Get Weather</button>
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <Col lg={3} md={6}>
          <Card className="cardLayout">
            <CardHeader>Weather</CardHeader>
            <Card.Img
              style={{ height: "50px", width: "50px" }}
              src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
            />
            <CardBody>{weather?.weather[0]?.description}</CardBody>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="cardLayout">
            <CardHeader>Wind</CardHeader>
            <CardBody> Speed : {weather?.wind.speed}</CardBody>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="cardLayout">
            <CardHeader>Humidity</CardHeader>
            <CardBody> {weather?.main.humidity}%</CardBody>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="cardLayout">
            <CardHeader>Temp</CardHeader>
            <CardBody> {weather?.main.temp}C</CardBody>
          </Card>
        </Col>
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <Col lg={3} md={6}>
          <Card className="cardLayout">
            <CardHeader>Temp-Min</CardHeader>
            <CardBody>{weather?.main?.temp_min}C</CardBody>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="cardLayout">
            <CardHeader>Temp-Max</CardHeader>
            <CardBody> {weather?.main?.temp_max}C</CardBody>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="cardLayout">
            <CardHeader>Feels Like</CardHeader>
            <CardBody> {weather?.main?.feels_like}C</CardBody>
          </Card>
        </Col>
        <Col lg={3} md={6}>
          <Card className="cardLayout">
            <CardHeader>Pressure</CardHeader>
            <CardBody> {weather?.main.pressure}</CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
