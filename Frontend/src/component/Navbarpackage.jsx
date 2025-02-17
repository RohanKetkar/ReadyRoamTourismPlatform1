import { Container, Nav, Navbar, NavDropdown ,Button} from "react-bootstrap";
import { FaSignOutAlt } from "react-icons/fa"; // Import logout icon from react-icons
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Router } from "../Route/Route";
export function Navbarpackage() {
  const navigate = useNavigate(); 

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
        <Navbar.Brand href="#home">ReadyRome</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto">
            <Link className="mx-3 mt-2" to={Router.AFTER} style={{ textDecoration: "none", color: "white" }}>Home</Link>
            <Link className="mx-3 mt-2" to={Router.ABOUT} style={{ textDecoration: "none", color: "white" }}>About us</Link>
            <Link className="mt-2 mx-3" to={Router.CONTACTUS} style={{ textDecoration: "none", color: "white" }}>Contact us</Link>
           
          </Nav>
            <Nav className="ms-2">
            <Nav.Link href="#" style={{ color: "white"}}>
              <Button onClick={handleSubmit} style={{background:"none" ,border:"none"}}><FaSignOutAlt style={{ fontSize: "1.5rem" }} /></Button> 
            </Nav.Link>
            <ToastContainer />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
