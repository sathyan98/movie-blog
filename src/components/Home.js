import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Blog from "./Blog";
import { blogArr } from "../mock/blog";
import { cities, apiKey } from "../constants/city";
import { useState, useEffect } from "react";
import { CardBody, CardHeader } from "react-bootstrap";

const Home = () => {
  const [city, cityState] = useState("Bangalore");
  const [weather, setWeather] = useState(null);
  const [car, carData] = useState(null);
  console.log("city", city);
  console.log("blogArr", blogArr);
  const changeCity = (e) => {
    cityState(e.target.value);
  };

  useEffect(() => {
    let blogs = [...blogArr];
    for (let key in window.localStorage) {
      // let cars = key.includes("blog");
      // carData("keys", key);
      if (key.includes("blog")) {
        console.log("key", key);
        // carData(car.push(localStorage.getItem(key)));
        let data = JSON.parse(localStorage.getItem(key));
        blogs.push(data);
      }
    }
    carData(blogs);
  }, []);
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=Bangalore&appid=${apiKey}`
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
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
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
  const weatherIcon = weather?.weather[0]?.icon;
  console.log("weathericon", weatherIcon);
  console.log("car", car);
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
      <Row
        style={{ display: "flex", justifyContent: "center", marginTop: "25px" }}
      >
        Create and Read mini Blogs :
      </Row>
      {car &&
        car != null &&
        car.map((c) => {
          return (
            <Row style={{ marginTop: "20px", marginBottom: "20px" }}>
              <Blog props={c} />
            </Row>
          );
        })}
    </Container>
  );
};

export default Home;
