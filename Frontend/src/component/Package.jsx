import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Container } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navbarpackage } from "./Navbarpackage";
import Footer from "./Footer";
const Package = () => {
  const { stateId } = useParams();  // Get the state ID from the URL
  const [packages, setPackages] = useState([]);

  // Fetch packages from backend based on stateId
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        
        const response = await axios.get(`http://localhost:5255/Package/${stateId}`);
        setPackages(response.data);  // Set the fetched packages
        console.log(response.data);  // Assuming the backend returns the packages for the state
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, [stateId]);

  return (
    <div className="w-[100vw]">
      <Navbarpackage />
      <Container className="my-5">
        <div className="d-flex justify-content-center w-full flex-wrap mb-8">
          {packages && packages.map((element) => (
            <div className="ml-5 mb-8" key={element.id}>
              <Card style={{ width: "16rem" }}>
                <Card.Body>
                  <Card.Img
  variant="top"
  src={`data:image/jpeg;base64,${element.image}`}  // If your image is PNG
  style={{ height: "228px", marginBottom: "28px" }}
/>
                  <Card.Title className="text-left">
                    {element.nameOfPackage}
                  </Card.Title>
                  <Card.Text className="text-left">
                    
                      {element.duration}
                    
                  </Card.Text>
                  <div className="text-left">
                    <h5>
                      Price: {element.price} /-Rs
                    </h5>
                  </div>
                  <Link to={`/detail/${element.id}`}>
                    <Button variant="primary" style={{ marginLeft: "1px", marginTop: "10px" }}>
                      Know More
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Package;