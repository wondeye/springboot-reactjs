import React, { useEffect, useState } from "react";
import { getAllRooms } from "../utils/ApiFunctions";
import { Card, Carousel, Col, Row, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const RoomCarousel = () => {
  const [rooms, setRooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAllRooms()
      .then((data) => {
        setRooms(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setIsLoading(false);
      });
  }, []);
  if (isLoading) {
    return <div className="mt-5 text-info">Loading Rooms....</div>;
  }
  if (errorMessage) {
    return <div className="text-danger mt-5 mb-5">Errorr: {errorMessage}</div>;
  }
  return (
    <section className="bg-light mb-5 mt-5 shadow">
      <Link to={"/browse-all-rooms"} className="text text-primary text-center">
        Browse all rooms
      </Link>

      <Container>
        <Carousel indicators={false}>
          {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
            <Carousel.Item key={index}>
              <Row>
                {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                  <Col key={room.id} className="mt-5 " xs={12} md={6} lg={3}>
                    <Card className="mb-2">
                      <Link to={`/book-room/${room.id}`}>
                        <Card.Img
                          variant="top"
                          src={`data:image/png;base64,${room.photo}`}
                          alt="Room Photo"
                          className="w-100"
                          style={{ height: "200px", borderRadius: "0px" }}
                        />
                      </Link>
                      <Card.Body>
                        <Card.Title className="hotel-color">
                          <span className="hotel-color">{room.roomType}</span>
                        </Card.Title>
                        <Card.Title className="room-price">
                          ${room.price}/night
                        </Card.Title>
                        <div className="flex-shrink-0">
                          <Link
                            to={`/book-room/${room.id}`}
                            className=" btn btn-small px-2"
                            style={{
                              backgroundColor: "orange",
                              color: "white"
                            }}
                          >
                            Book Now
                          </Link>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default RoomCarousel;
