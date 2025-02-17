// import React, { useState } from "react";
// import { Button, Form, Row, Col } from "react-bootstrap";
// import { NavBar } from "./NavBar";
// import axios from "axios"; // Import axios for sending the data to the backend
// import { Router } from "../Route/Route";
// import { Link } from "react-router-dom";

// export const BookingDetailsForm = () => {
//   // State to hold the form inputs for people (including the primary person)
//   const [peopleDetails, setPeopleDetails] = useState([
//     {
//       Name: "",
//       ContactNo: "",
//       Age: "",
//       Address: "",
//       AddharNo: "",
//       PassportNo: "",
//     },
//   ]);

//   const [peopleCount, setPeopleCount] = useState(1); // Start with 1 person (primary person)
//   const [successMessage, setSuccessMessage] = useState(null);
//   const [errorMessage, setErrorMessage] = useState(null);

//   const handleInputChange = (e, index) => {
//     const { name, value } = e.target;
//     const updatedPeople = [...peopleDetails];
//     updatedPeople[index] = { ...updatedPeople[index], [name]: value };
//     setPeopleDetails(updatedPeople);
//   };

//   // Handle people count dropdown change (to add/remove people details fields)
//   const handlePeopleCountChange = (e) => {
//     const count = parseInt(e.target.value, 10);
//     setPeopleCount(count);

//     // Adjust the peopleDetails array based on people count
//     if (count > peopleDetails.length) {
//       const additionalPeople = Array(count - peopleDetails.length).fill({
//         Name: "",
//         ContactNo: "",
//         Age: "",
//         Address: "",
//         AddharNo: "",
//         PassportNo: "",
//       });
//       setPeopleDetails((prev) => [...prev, ...additionalPeople]);
//     } else {
//       setPeopleDetails((prev) => prev.slice(0, count));
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Get the user email and package ID from localStorage
//     const email = localStorage.getItem("userEmail"); // Retrieve email
//     const packageId = localStorage.getItem("packageId"); // Retrieve packageId

//     if (!email || !packageId) {
//       setErrorMessage("User email or package ID is missing. Please log in and select a package.");
//       return;
//     }

//     const updatedPeopleDetails = peopleDetails.map((person) => ({
//       ...person,
//       packageId: packageId, // Associate packageId with each person
//     }));

//     const bookingData = {

//       peopleCount,
//       peopleDetails: updatedPeopleDetails,
//     };

//     console.log("Submitting Booking with data:", bookingData);

//     try {
//       // Send the data to your backend
//       console.log(email, bookingData,packageId);
//       const response = await axios.post(
//         `http://localhost:5255/BookingDetails/${email}/${packageId}`,
//         bookingData
//       );

//       console.log("Response from Backend:", response.data);

//       setSuccessMessage("Booking Details Submitted Successfully!");
//       setErrorMessage(null); // Clear any previous error message
//     } catch (error) {
//       console.error("Error Response from Backend:", error.response?.data);
//       setErrorMessage("There was an error submitting your booking. Please try again.");
//       setSuccessMessage(null); // Clear any previous success message
//     }
//   };

//   return (
//     <div>
//       <NavBar />
//       <div className="container mt-5">
//         <h2>Booking Details Form</h2>
//         <hr />

//         {successMessage && <div className="alert alert-success">{successMessage}</div>}
//         {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

//         <Form onSubmit={handleSubmit}>
//           {/* People Count Dropdown */}
//           <Row>
//             <Col sm={6}>
//               <Form.Group controlId="peopleCount">
//                 <Form.Label>Number of People</Form.Label>
//                 <Form.Control
//                   as="select"
//                   value={peopleCount}
//                   onChange={handlePeopleCountChange}
//                   required
//                 >
//                   {[...Array(10).keys()].map((i) => (
//                     <option key={i} value={i + 1}>
//                       {i + 1} {(i + 1) > 1 ? "" : ""}
//                     </option>
//                   ))}
//                 </Form.Control>
//               </Form.Group>
//             </Col>
//           </Row>

//           {/* People Details Loop */}
//           {peopleDetails.map((person, index) => (
//             <div key={index} className="mt-4">
//               <h4>{index === 0 ? "Primary Person" : `Person ${index}`}</h4>
//               <Row>
//                 <Col sm={6}>
//                   <Form.Group controlId={`Name-${index}`}>
//                     <Form.Label>Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="Name"
//                       value={person.Name}
//                       onChange={(e) => handleInputChange(e, index)}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col sm={6}>
//                   <Form.Group controlId={`contactNo-${index}`}>
//                     <Form.Label>Contact Number</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="contactNo"
//                       value={person.contactNo}
//                       onChange={(e) => handleInputChange(e, index)}
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row>
//                 <Col sm={6}>
//                   <Form.Group controlId={`Age-${index}`}>
//                     <Form.Label>Age</Form.Label>
//                     <Form.Control
//                       type="number"
//                       name="Age"
//                       value={person.Age}
//                       onChange={(e) => handleInputChange(e, index)}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col sm={6}>
//                   <Form.Group controlId={`Email-${index}`}>
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control
//                       type="email"
//                       name="Email"
//                       value={person.Email}
//                       onChange={(e) => handleInputChange(e, index)}
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row>
//                 <Col sm={12}>
//                   <Form.Group controlId={`Address-${index}`}>
//                     <Form.Label>Address</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="Address"
//                       value={person.Address}
//                       onChange={(e) => handleInputChange(e, index)}
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>

//               <Row>
//                 <Col sm={6}>
//                   <Form.Group controlId={`AddharNo-${index}`}>
//                     <Form.Label>Aadhaar Number (Mandatory)</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="AddharNo"
//                       value={person.AddharNo}
//                       onChange={(e) => handleInputChange(e, index)}
//                       required
//                     />
//                   </Form.Group>
//                 </Col>
//                 <Col sm={6}>
//                   <Form.Group controlId={`PassportNo-${index}`}>
//                     <Form.Label>Passport Number</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="PassportNo"
//                       value={person.PassportNo}
//                       onChange={(e) => handleInputChange(e, index)}
//                     />
//                   </Form.Group>
//                 </Col>
//               </Row>
//             </div>
//           ))}

//           <Row className="mt-3 mb-4">
//             <Col sm={6}>
//               <Button variant="primary" type="submit">
//                 Submit Booking
//               </Button>
//             </Col>
//             <Col sm={6} className="text-right">
//               <Link className="mt-2" to={Router.PAYMENT} style={{ textDecoration: "none", color: "white" }}>
//                 <Button variant="success">Make Payment</Button>
//               </Link>
//             </Col>
//           </Row>
//         </Form>
//       </div>
//     </div>
//   );
// };
import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { NavBar } from "./NavBar";
import axios from "axios"; // Import axios for sending the data to the backend
import { Router } from "../Route/Route";
import { Link } from "react-router-dom";

export const BookingDetailsForm = () => {
  // State to hold the form inputs for people (including the primary person)
  const [peopleDetails, setPeopleDetails] = useState([
    {
      Name: "",
      ContactNo: "",
      Age: "",
      Address: "",
      AddharNo: "",
      PassportNo: "",
    },
  ]);

  const [peopleCount, setPeopleCount] = useState(1); // Start with 1 person (primary person)
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPeople = [...peopleDetails];
    updatedPeople[index] = { ...updatedPeople[index], [name]: value };
    setPeopleDetails(updatedPeople);
  };

  // Handle people count dropdown change (to add/remove people details fields)
  const handlePeopleCountChange = (e) => {
    const count = parseInt(e.target.value, 10);
    setPeopleCount(count);

    // Adjust the peopleDetails array based on people count
    if (count > peopleDetails.length) {
      const additionalPeople = Array(count - peopleDetails.length).fill({
        Name: "",
        ContactNo: "",
        Age: "",
        Address: "",
        AddharNo: "",
        PassportNo: "",
      });
      setPeopleDetails((prev) => [...prev, ...additionalPeople]);
    } else {
      setPeopleDetails((prev) => prev.slice(0, count));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the user email and package ID from localStorage
    const email = localStorage.getItem("userEmail"); // Retrieve email
    const packageId = localStorage.getItem("packageId"); // Retrieve packageId
   
    

    if (!email || !packageId) {
      setErrorMessage("User email or package ID is missing. Please log in and select a package.");
      return;
    }

    // Map through the peopleDetails and match the backend format
    const updatedPeopleDetails = peopleDetails.map((person) => ({
      Name: person.Name,
      Address: person.Address,
      Age: person.Age,
      AddharNo: person.AddharNo,
      PassportNo: person.PassportNo,
      ContactNo: person.ContactNo, // Corrected key for consistency
    }));

    // The payload structure to send to the backend
    const bookingData = updatedPeopleDetails; // Send directly the peopleDetails array

    console.log("Submitting Booking with data:", bookingData);

    try {
      // Send the data to your backend
      const response = await axios.post(
        `http://localhost:5255/BookingDetails/${email}/${packageId}`,
        bookingData
      );

      console.log("Response from Backend:", response.data);

      setSuccessMessage("Booking Details Submitted Successfully!");
      setErrorMessage(null); // Clear any previous error message
    } catch (error) {
      console.error("Error Response from Backend:", error.response?.data);
      setErrorMessage("There was an error submitting your booking. Please try again.");
      setSuccessMessage(null); // Clear any previous success message
    }
  };
  localStorage.setItem("peoples", peopleCount);
  return (
    <div>
      <NavBar />
      <div className="container mt-5">
        <h2>Booking Details Form</h2>
        <hr />

        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <Form onSubmit={handleSubmit}>
          {/* People Count Dropdown */}
          <Row>
            <Col sm={6}>
              <Form.Group controlId="peopleCount">
                <Form.Label>Number of People</Form.Label>
                <Form.Control
                  as="select"
                  value={peopleCount}
                  onChange={handlePeopleCountChange}
                  required
                >
                  {[...Array(10).keys()].map((i) => (
                    <option key={i} value={i + 1}>
                      {i + 1} {(i + 1) > 1 ? "" : ""}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          {/* People Details Loop */}
          {peopleDetails.map((person, index) => (
            <div key={index} className="mt-4">
              <h4>{index === 0 ? "Primary Person" : `Person ${index}`}</h4>
              <Row>
                <Col sm={6}>
                  <Form.Group controlId={`Name-${index}`}>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="Name"
                      value={person.Name}
                      onChange={(e) => handleInputChange(e, index)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId={`ContactNo-${index}`}>
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="ContactNo"
                      value={person.ContactNo}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm={6}>
                  <Form.Group controlId={`Age-${index}`}>
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="Age"
                      value={person.Age}
                      onChange={(e) => handleInputChange(e, index)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId={`Email-${index}`}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="Email"
                      value={person.Email}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm={12}>
                  <Form.Group controlId={`Address-${index}`}>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="Address"
                      value={person.Address}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm={6}>
                  <Form.Group controlId={`AddharNo-${index}`}>
                    <Form.Label>Aadhaar Number (Mandatory)</Form.Label>
                    <Form.Control
                      type="text"
                      name="AddharNo"
                      value={person.AddharNo}
                      onChange={(e) => handleInputChange(e, index)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId={`PassportNo-${index}`}>
                    <Form.Label>Passport Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="PassportNo"
                      value={person.PassportNo}
                      onChange={(e) => handleInputChange(e, index)}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          ))}

          <Row className="mt-3 mb-4">
            <Col sm={6}>
              <Button variant="primary" type="submit">
                Submit Booking
              </Button>
            </Col>
            <Col sm={6} className="text-right">
              <Link className="mt-2" to={Router.PAYMENT} style={{ textDecoration: "none", color: "white" }}>
                <Button variant="success">Make Payment</Button>
              </Link>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};
