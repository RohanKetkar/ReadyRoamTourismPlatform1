// import React, { useState } from "react";
// import {
//   Container,
//   Row,
//   Col,
//   Card,
//   Form,
//   Button,
//   Alert,
// } from "react-bootstrap";
// import axios from "axios";
// import { FaGoogle, FaLinkedin, FaGithub } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { Router } from "../Route/Route";

// function SignIn() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [rememberMe, setRememberMe] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setEmail(email);
//     setPassword(password);

//     // Validation checks before submitting the form
//     if (!email || !password) {
//       setErrorMessage("Please fill in both fields.");
//       return;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setErrorMessage("Please enter a valid email address.");
//       return;
//     }

//     if (password.length < 6) {
//       setErrorMessage("Password must be at least 6 characters.");
//       return;
//     }

//     try {
//       // Sending the email and password to the backend for authentication
//       const response = await axios.post("http://localhost:8080/users/signin", {
//         email,
//         password,
//       });

//       if (response.data) {
//         console.log("Login successful:", response.data);

//         // Set email in localStorage only after successful login
//         localStorage.setItem("userEmail", email);

//         // Assuming response.data contains role info, navigate accordingly
//         if (response.data.role === 0) {
//           navigate("/tourism");
//         } else if (response.data.role === 1) {
//           navigate("/adminhome");
//         }
//       }
//     } catch (error) {
//       console.error("Error during sign-in:", error);
//       setErrorMessage("Invalid credentials or server error.");
//     }

//     // Clear email and password fields after submitting
//     setEmail("");
//     setPassword("");
//   };

//   return (
//     <Container className="d-flex justify-content-center align-items-center min-vh-100">
//       <Row className="w-100">
//         <Col md={8} lg={6} xl={5} className="mx-auto">
//           <Card className="shadow-sm border-0" style={{ borderRadius: "0.75rem" }}>
//             <Card.Body className="p-4">
//               <h2 className="text-center mb-4 fw-bold text-indigo-600">Sign In</h2>

//               {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3" controlId="formEmail">
//                   <Form.Label>Email Address</Form.Label>
//                   <Form.Control
//                     type="email"
//                     placeholder="Enter your email"
//                     size="lg"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3" controlId="formPassword">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control
//                     type="password"
//                     placeholder="Enter your password"
//                     size="lg"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </Form.Group>

//                 <Button
//                   variant="primary"
//                   size="lg"
//                   className="w-100 mb-3 bg-button"
//                   type="submit"
//                 >
//                   Login
//                 </Button>

//                 <div className="text-center mb-3">
//                   <Link to={Router.SIGNUP}>
//                     Don't have an account? Register
//                   </Link>
//                 </div>

//                 <div className="d-flex flex-column gap-2">
//                   <Button
//                     variant="outline-danger"
//                     size="lg"
//                     className="w-100 d-flex align-items-center justify-content-center"
//                   >
//                     <FaGoogle className="me-2" />
//                     Sign in with Google
//                   </Button>

//                   <Button
//                     variant="outline-primary"
//                     size="lg"
//                     className="w-100 d-flex align-items-center justify-content-center"
//                   >
//                     <FaLinkedin className="me-2" />
//                     Sign in with LinkedIn
//                   </Button>

//                   <Button
//                     variant="outline-dark"
//                     size="lg"
//                     className="w-100 d-flex align-items-center justify-content-center"
//                   >
//                     <FaGithub className="me-2" />
//                     Sign in with GitHub
//                   </Button>
//                 </div>
//               </Form>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }

// export default SignIn;
import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { FaGoogle, FaLinkedin, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; 

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks before submitting the form
    if (!email || !password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    try {
      // Sending the email and password to the backend for authentication
      const response = await axios.post("http://localhost:5255/login/login", {
        email,
        password,
      });

      if (response.data && response.data.token) {
        console.log("Login successful:", response.data);

        // Store the JWT token in localStorage
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("userEmail", email);

        // Decode the token to get the role
    //     let decodedToken;
    //     try {
    //       decodedToken = jwt_decode(response.data.token);
    //     } catch (decodeError) {
    //       console.error("Error decoding token:", decodeError);
    //       setErrorMessage("Invalid token received. Please try again.");
    //       return;
    //     }

    //     const userRole = decodedToken.role; // Assuming the 'role' is stored in the token

    //     // Navigate based on the user role (Admin or User)
    //     if (userRole === "Admin") {
    //       navigate("/adminhome");
    //     } else if (userRole === "User") {
    //       navigate("/tourism");
    //     } else {
    //       setErrorMessage("Role not found. Redirecting to the default page...");
    //       navigate("/default");
    //     }
    //   } else {
    //     setErrorMessage("Login failed. Please try again.");
    //   }
    // } catch (error) {
    //   console.error("Error during sign-in:", error.response?.data || error.message);
    //   setErrorMessage(
    //     error.response?.data?.message || "Invalid credentials or server error."
    //   );
    // }
    try {
      const decodedToken = jwtDecode(response.data.token);
      console.log("Decoded Token:", decodedToken); // Log the decoded token
      const userRole = decodedToken.role || decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]; // Handle different claim formats
      console.log("User Role:", userRole);
    
      if (userRole === "ADMIN") {
        navigate("/adminhome");
      } else if (userRole === "USER") {
        navigate("/tourism");
      } else {
        setErrorMessage("Role not found. Decoded token lacks a valid role.");
      }
    } catch (decodeError) {
      console.error("Error decoding token:", decodeError);
      setErrorMessage("Invalid token received. Please try again.");
    }
  }
} catch (error) {
  console.error("Error during sign-in:", error.response?.data || error.message);
}
      
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={8} lg={6} xl={5} className="mx-auto">
          <Card className="shadow-sm border-0" style={{ borderRadius: "0.75rem" }}>
            <Card.Body className="p-4">
              <h2 className="text-center mb-4 fw-bold text-indigo-600">Sign In</h2>

              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    size="lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  size="lg"
                  className="w-100 mb-3 bg-button"
                  type="submit"
                >
                  Login
                </Button>

                <div className="text-center mb-3">
                  <Link to="/signup">Don't have an account? Register</Link>
                </div>

                <div className="d-flex flex-column gap-2">
                  <Button
                    variant="outline-danger"
                    size="lg"
                    className="w-100 d-flex align-items-center justify-content-center"
                  >
                    <FaGoogle className="me-2" />
                    Sign in with Google
                  </Button>

                  <Button
                    variant="outline-primary"
                    size="lg"
                    className="w-100 d-flex align-items-center justify-content-center"
                  >
                    <FaLinkedin className="me-2" />
                    Sign in with LinkedIn
                  </Button>

                  <Button
                    variant="outline-dark"
                    size="lg"
                    className="w-100 d-flex align-items-center justify-content-center"
                  >
                    <FaGithub className="me-2" />
                    Sign in with GitHub
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;
