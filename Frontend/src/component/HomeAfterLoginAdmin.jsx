import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Alert,
  Card,
} from "react-bootstrap";
import { NavBar } from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import {Link} from "react-router-dom";
import { Router } from "../Route/Route";

export function HomeAfterLoginAdmin() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [newState, setNewState] = useState("");
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [externalCountries, setExternalCountries] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertVariant, setAlertVariant] = useState("info");
  const [editingCountryId, setEditingCountryId] = useState(null);
  const [editingStateId, setEditingStateId] = useState(null);
  const [editedStateName, setEditedStateName] = useState("");
  const [editedCountryName, setEditedCountryName] = useState("");

  useEffect(() => {
    getAllCountries();
    getAllStates();
    fetchExternalCountries(); // Fetch external countries list
  }, []);

  const fetchExternalCountries = async () => {
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all"); // External API for countries
      setExternalCountries(response.data);
    } catch (error) {
      console.error("Error fetching external countries", error);
    }
  };

  const handleAddCountry = async () => {
    if (selectedCountryId) {
      const selectedCountry = externalCountries.find(
        (country) => country.cca2 === selectedCountryId
      );

      try {
        const response = await axios.post(
          `http://localhost:5255/country`,
          { CountryName: selectedCountry.name.common } // Use country name from external API
        );
        setCountries([...countries, response.data]);
        setAlertMessage(`Country "${selectedCountry.name.common}" added successfully!`);
        setAlertVariant("success");
        getAllCountries(); // Refresh country list after adding
      } catch (error) {
        console.error(error);
        setAlertMessage("Failed to add country. Please try again.");
        setAlertVariant("danger");
      }
    } else {
      setAlertMessage("Please select a country to add.");
      setAlertVariant("danger");
    }
  };

  const handleAddState = async () => {
    if (newState.trim() && selectedCountryId) {
      try {
        const response = await axios.post(
          `http://localhost:5255/state/${selectedCountryId}`,
          {
            countryId: selectedCountryId,
            stateName: newState.trim(),
          }
        );
        setStates([...states, response.data]);
        setNewState("");
        setSelectedCountryId("");
        setAlertMessage(`State "${newState}" added successfully!`);
        setAlertVariant("success");
        getAllStates();
      } catch (error) {
        console.error(error);
        setAlertMessage("Failed to add state. Please try again.");
        setAlertVariant("danger");
      }
    } else {
      setAlertMessage("State name or country selection cannot be empty!");
      setAlertVariant("danger");
    }
  };

  const getAllCountries = async () => {
    try {
      const response = await axios.get("http://localhost:5255/country");
      console.log(response.data);
      setCountries(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllStates = async () => {
    try {
      const response = await axios.get("http://localhost:5255/state");
      console.log(response.data);
      setStates(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteCountry = async (countryId) => {
    try {
      await axios.delete(`http://localhost:5255/country/${countryId}`);
      setCountries(countries.filter((country) => country.id !== countryId));
      setAlertMessage("Country deleted successfully!");
      setAlertVariant("success");
    } catch (error) {
      console.error(error);
      setAlertMessage("Failed to delete country. Please try again.");
      setAlertVariant("danger");
    }
  };

  const handleDeleteState = async (id) => {
    try {
      await axios.delete(`http://localhost:5255/state/${id}`);
      setStates(states.filter((state) => state.id !== id));
      setAlertMessage("State deleted successfully!");
      setAlertVariant("success");
      getAllStates();
    } catch (error) {
      console.error(error);
      setAlertMessage("Failed to delete state. Please try again.");
      setAlertVariant("danger");
    }
  };

  const handleEditCountry = (countryId, countryName) => {
    setEditingCountryId(countryId);
    setEditedCountryName(countryName);
  };

  const handleUpdateCountry = async () => {
    if (editedCountryName.trim()) {
      try {
        const response = await axios.put(
          `http://localhost:5255/country/${editingCountryId}`,
          { countryName: editedCountryName.trim() }
        );
        setCountries(
          countries.map((country) =>
            country.id === editingCountryId
              ? { ...country, countryName: editedCountryName.trim() }
              : country
          )
        );
        setEditingCountryId(null);
        setAlertMessage("Country updated successfully!");
        setAlertVariant("success");
      } catch (error) {
        console.error(error);
        setAlertMessage("Failed to update country. Please try again.");
        setAlertVariant("danger");
      }
    } else {
      setAlertMessage("Country name cannot be empty!");
      setAlertVariant("danger");
    }
  };

  const handleEditState = (stateId, stateName) => {
    setEditingStateId(stateId);
    setEditedStateName(stateName);
  };

  const handleUpdateState = async () => {
    if (editedStateName.trim()) {
      try {
        const response = await axios.put(
          `http://localhost:5255/state/${editingStateId}`,
          { stateName: editedStateName.trim() }
        );
        setStates(
          states.map((state) =>
            state.id === editingStateId
              ? { ...state, state_name: editedStateName.trim() }
              : state
          )
        );
        setEditingStateId(null);
        setAlertMessage("State updated successfully!");
        setAlertVariant("success");
      } catch (error) {
        console.error(error);
        setAlertMessage("Failed to update state. Please try again.");
        setAlertVariant("danger");
      }
    } else {
      setAlertMessage("State name cannot be empty!");
      setAlertVariant("danger");
    }
  };

  const handleCloseAlert = () => setAlertMessage(null);

  return (
    <div>
      <NavBar />
      <Container className="my-4">
        <Card className="mb-4">
          <Card.Header as="h1" className="text-center">
            Admin Dashboard
          </Card.Header>
          <Card.Body className="text-center">
            <Card.Text>Manage countries, states, and more!</Card.Text>
          </Card.Body>
        </Card>

        {alertMessage && (
          <Alert
            variant={alertVariant}
            onClose={handleCloseAlert}
            dismissible
            className="mb-4"
          >
            {alertMessage}
          </Alert>
        )}

        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Header>Countries</Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Country</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {countries.map((country) => (
                      <tr key={country.id}>
                        <td>{country.id}</td>
                        <td>
                          {editingCountryId === country.id ? (
                            <Form.Control
                              type="text"
                              value={editedCountryName}
                              onChange={(e) => setEditedCountryName(e.target.value)}
                            />
                          ) : (
                            country.countryName
                          )}
                        </td>
                        <td>
                          {editingCountryId === country.id ? (
                            <Button
                              variant="success"
                              onClick={handleUpdateCountry}
                            >
                              Save
                            </Button>
                          ) : (
                            <>
                              <Button
                                variant="primary"
                                onClick={() => handleEditCountry(country.id, country.country_name)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="danger"
                                onClick={() => handleDeleteCountry(country.id)}
                                className="ml-2"
                              >
                                Delete
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            {/* Add Country Form */}
            <Card className="mb-4">
              <Card.Header>Add a New Country</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group controlId="formSelectCountry" className="mb-3">
                    <Form.Label>Select Country</Form.Label>
                    <Form.Select
                      value={selectedCountryId}
                      onChange={(e) => setSelectedCountryId(e.target.value)}
                    >
                      <option value="">Choose a country</option>
                      {externalCountries.map((country) => (
                        <option key={country.cca2} value={country.cca2}>
                          {country.name.common}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Button variant="success" onClick={handleAddCountry}>
                    Add Country
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            {/* Add State Form */}
            <Card className="mb-4">
              <Card.Header>Add a New State</Card.Header>
              <Card.Body>
                <Form>
                <Form.Group controlId="formSelectCountryForState" className="mb-3">
                    <Form.Label>Select Country for State</Form.Label>
                    <Form.Select
                      value={selectedCountryId}
                      onChange={(e) => setSelectedCountryId(e.target.value)}
                    >
                      <option value="">Choose a country</option>
                      {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                          {country.countryName}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="formState" className="mb-3">
                    <Form.Label>State Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter state name"
                      value={newState}
                      onChange={(e) => setNewState(e.target.value)}
                    />
                  </Form.Group>
                  
                  <Button variant="success" onClick={handleAddState}>
                    Add State
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-3 mb-3" >
          <Col  md={12} className="text-center"><Link to={Router.ADDPACKAGE}>
            <Button variant="primary">Package Operations</Button>
          </Link></Col>
          
        </Row>
        {/* States Table */}
        <Row>
          <Col md={12}>
            <Card>
              <Card.Header>States</Card.Header>
              <Card.Body>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>State</th>
                      <th>Country</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {states.map((state) => (
                      <tr key={state.id}>
                        <td>{state.id}</td>
                        <td>
                          {editingStateId === state.id ? (
                            <Form.Control
                              type="text"
                              value={editedStateName}
                              onChange={(e) => setEditedStateName(e.target.value)}
                            />
                          ) : (
                            state.stateName
                          )}
                        </td>
                        <td>{state.countryName}</td>
                        <td>
                          {editingStateId === state.id ? (
                            <Button
                              variant="success"
                              onClick={handleUpdateState}
                            >
                              Save
                            </Button>
                          ) : (
                            <>
                              <Button
                                variant="primary"
                                onClick={() => handleEditState(state.id, state.stateName)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="danger"
                                onClick={() => handleDeleteState(state.id)}
                                className="ml-2"
                              >
                                Delete
                              </Button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}
