import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";
import { CardBody, CardFooter, CardHeader } from "react-bootstrap";

const Blog = (props) => {
  console.log("props", props.props);
  return (
    <>
      <Card
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <CardHeader style={{ textAlign: "center" }}>
          {props.props.title}
        </CardHeader>
        <CardBody>{props.props.story}</CardBody>
        <CardFooter style={{ textAlign: "center" }}>
          Written By {props.props.author}
        </CardFooter>
      </Card>
    </>
  );
};

export default Blog;
