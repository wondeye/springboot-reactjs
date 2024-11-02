import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Header from "./Header";
import { FaClock, FaCocktail, FaParking, FaSnowflake, FaTshirt, FaUtensils, FaWifi } from "react-icons/fa";

const HotelService = () => {
  return (
    <Container className="container mb-2">
      <Header title={"Our Services"} />
      <Row>
        <h4 className="text-center">
          Services at <span className="hotel-color">Lake Mark </span>Hotel &nbsp;
          <span className="gap-2 align-items-center">
          <FaClock />
            -24-Hour Front Desk Service
          </span>
        </h4>
      </Row>
      <hr />
      <Row xs={1} md={2} lg={3} className="g-4 mt-2">
        <Col>
          <Card className="shadow">
            <Card.Body>
              <Card.Title >
                <FaWifi className="lg " style={{color:'blue'}}/>  <span className="hotel-label"> WiFi</span> 
              </Card.Title>
              <Card.Text>Stay connected with high speed internet access.</Card.Text>

            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaUtensils style={{color:'orange'}}/>  <span className="hotel-label">  Breakfast </span>
              </Card.Title>
              <Card.Text> Start your day with a delicious breakfast buffet. </Card.Text>
              
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaTshirt style={{color:'green'}}/> <span className="hotel-label"> Laundary</span>
              </Card.Title>
              <Card.Text>
                Keep your clothes clean and fresh with our laundry service.</Card.Text>
              
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaCocktail style={{color:'darkred'}}/> <span className="hotel-label"> Mini-bar </span>
              </Card.Title>
              <Card.Text>Enjoy a refreshing drink or snak from our in-room mini-bar</Card.Text>
              
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaParking style={{color:'blue'}}/> <span className="hotel-label"> Parking</span>
              </Card.Title>
              <Card.Text>Park your car conveniently in our on-site parking lot.</Card.Text>
              
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow">
            <Card.Body>
              <Card.Title className="hotel-color">
                <FaSnowflake style={{color:'gray'}}/> <span className="hotel-label"> Air conditioning</span>
              </Card.Title>
              <Card.Text>Stay cool and comfortable with our air conditioning system.</Card.Text>
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HotelService;
