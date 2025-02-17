import { Container, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Router } from "../Route/Route";
import { FaSignOutAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export function NavBar() {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);  // State to hold dynamic countries
  const [states, setStates] = useState({});  // State to hold dynamic states for each country
  const [selectedCountryId, setSelectedCountryId] = useState(null);  // Store selected country ID

  // Fetch countries from backend
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get("http://localhost:5255/country");
        setCountries(response.data); // Assuming backend returns { id, country_name }
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    fetchCountries();
  }, []);  // Fetch countries on component mount

  // Fetch states when a country is selected
  const fetchStates = async (countryId) => {
    try {
      const response = await axios.get(`http://localhost:5255/state/${countryId}`);
      setStates(prevStates => ({
        ...prevStates,
        [countryId]: response.data, // Store states for the specific country
      }));
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  // Handle country selection and fetch its states
  const handleCountrySelect = (countryId) => {
    setSelectedCountryId(countryId);
    if (!states[countryId]) { // Only fetch states if not already fetched
      fetchStates(countryId);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      toast.error("You are logged out", { autoClose: 2000 });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("Failed to log out");
    }
  };

  return (
    <Navbar style={{ backgroundColor: "#5045e3" }} data-bs-theme="dark" expand="lg">
      <Container>
        <Link className="mx-3" to={Router.AFTER} style={{ textDecoration: "none", color: "white" }}>
          <Navbar.Brand href="#">ReadyRome</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto">
            <NavDropdown
              title="Country"
              style={{ textDecoration: "none", color: "white" }}
              id="navbar-dropdown"
              menuVariant="dark"
            >
              {/* Loop through the countries dynamically */}
              {countries.length > 0 ? (
                countries.map((country) => (
                  <NavDropdown
                    title={country.countryName}
                    key={country.id}
                    id={`navbar-dropdown-${country.id}`}
                    menuVariant="dark"
                    drop="end"
                    onClick={() => handleCountrySelect(country.id)} // Select country and fetch states
                  >
                    {/* Display states dynamically for each country */}
                    {states[country.id] && states[country.id].length > 0 ? (
                      states[country.id].map((state) => (
                        <NavDropdown.Item key={state.id}>
                          
                          <Link
                            to={`/package/${state.id}`}  
                            style={{ textDecoration: "none", color: "white" }}
                          >
                            {state.stateName}
                          </Link>
                        </NavDropdown.Item>
                      ))
                    ) : (
                      <NavDropdown.Item>No states available</NavDropdown.Item>
                    )}
                  </NavDropdown>
                ))
              ) : (
                <NavDropdown.Item>No countries available</NavDropdown.Item>
              )}
            </NavDropdown>

            <Link className="mx-3 mt-2" to={Router.ABOUT} style={{ textDecoration: "none", color: "white" }}>
              About us
            </Link>
            <Link className="mt-2" to={Router.CONTACTUS} style={{ textDecoration: "none", color: "white" }}>
              Contact us
            </Link>
          </Nav>
          <Nav className="ms-2">
            <Nav.Link href="#" style={{ color: "white" }}>
              <Button onClick={handleSubmit} style={{ background: "none", border: "none" }}>
                <FaSignOutAlt style={{ fontSize: "1.5rem" }} />
              </Button>
            </Nav.Link>
            <ToastContainer />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}