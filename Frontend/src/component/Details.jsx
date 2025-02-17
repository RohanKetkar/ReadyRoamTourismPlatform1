// import { Container, Image, Row, Col, Button } from "react-bootstrap";
// import { NavBar } from "./NavBar";
// import { useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { Router } from "../Route/Route";  // Import your routing constants

// export function Details() {
//   const { packageId } = useParams();  // Get packageId from URL
//   const [packageDetails, setPackageDetails] = useState(null);

//   // Fetch package details from the API when component mounts
//   useEffect(() => {
//     const fetchPackageDetails = async () => {
//       try {
//         console.log(packageId);
//         const response = await axios.get(`http://localhost:5255/package/package/${packageId}`);
        
//         // Log the response data for debugging
//         console.log("API Response:", response.data);
        
//         // Assuming the response data is an array, access the first element
//         setPackageDetails(response.data);  // Access the first object in the array
//       } catch (error) {
//         console.error("Error fetching package details:", error);
//       }
//     };

//     fetchPackageDetails();
//   }, [packageId]); // This hook depends on packageId

//   // Display loading text while fetching data
//   if (!packageDetails) {
//     return <div>Loading...</div>;  // Show loading while fetching data
//   }
//   localStorage.setItem("packageId",packageId);
  

//   // Debugging each individual field
//   console.log("Package Details:", packageDetails);

//   // Log each individual field to see if any is undefined or null
//   console.log("nameOfPackage:", packageDetails.nameOfPackage);
//   console.log("image:", packageDetails.image);
//   console.log("tagLine:", packageDetails.tagLine);
//   console.log("price:", packageDetails.price);
//   console.log("duration:", packageDetails.duration);
//   console.log("smallDescription:", packageDetails.smallDescription);
//   console.log("longDescription:", packageDetails.longDescription);
  
//   // You can also check for potential null or undefined values
//   if (!packageDetails.nameOfPackage) console.log("nameOfPackage is missing or undefined");
//   if (!packageDetails.image) console.log("Image is missing or undefined");
//   if (!packageDetails.tagLine) console.log("Tagline is missing or undefined");
//   if (!packageDetails.price) console.log("Price is missing or undefined");
//   if (!packageDetails.duration) console.log("Duration is missing or undefined");
//   if (!packageDetails.smallDescription) console.log("Small Description is missing or undefined");
//   if (!packageDetails.longDescription) console.log("Long Description is missing or undefined");
 
//   return (
//     <div>
//       <NavBar />
//       <Container className="my-5">
//         <Row className="align-items-start">
//           <Col xs={4} md={3}>
//             <Image
//               src={ `data:image/jpeg;base64,${packageDetails.image}`}  // Fallback image if no image is provided
//               alt="Package Image"
//               className="img-fluid rounded"
//               style={{ maxWidth: '220px', height: 'auto' }}
//             />
//             <h4 className="mt-2"><strong>{packageDetails.nameOfPackage}</strong></h4>
//           </Col>

//           <Col xs={12} md={9}>
//             <strong>{packageDetails.tagLine}</strong>  {/* Tagline above price */}
//             <p className="mt-3 fs-4 fs-sm-3 fs-md-3 fs-lg-2">
//               <span className="fs-3 fs-md-2">₹ {packageDetails.price}</span> /- Per Person
//             </p>
//             <p><strong>Package Includes:</strong> {packageDetails.smallDescription}</p>  {/* Small description here */}
//             <p><strong>Duration:</strong> {packageDetails.duration}</p>  {/* Duration */}
//           </Col>
//         </Row>
//         <div><hr />
//           <h3>Details:</h3>
//         </div>
//         <Container className="my-5">
//           <Row className="align-items-start">
//             <Col xs={12} md={12}>
//               <p>{packageDetails.longDescription}</p>  {/* Big Description under Details */}
//             </Col>
//           </Row>
//         </Container>

//         <Row className="d-flex justify-content-between">
//           <Col xs="auto">
//             <Link to={Router.AFTER}>
//               <Button variant="primary">Back to Home</Button>
//             </Link>
//           </Col>
          
//           <Col xs="auto" className="text-end">
//             <Button variant="success">
//               <Link to={Router.BOOKINGDETAIL} style={{ textDecoration: "none", color: "white" }}>
//                 Book Package
//               </Link>
//             </Button>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

import { Container, Image, Row, Col, Button } from "react-bootstrap";
import { NavBar } from "./NavBar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Router } from "../Route/Route";  // Import your routing constants

export function Details() {
  const { packageId } = useParams();  // Get packageId from URL
  const [packageDetails, setPackageDetails] = useState(null);

  // Fetch package details from the API when component mounts
  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        console.log(packageId);
        const response = await axios.get(`http://localhost:5255/package/package/${packageId}`);
        
        // Log the response data for debugging
        console.log("API Response:", response.data);
        
        // Assuming the response data is an array, access the first element
        const packageData = response.data;  // Access the first object in the array
        setPackageDetails(packageData);

        // Store package name and price in localStorage
        localStorage.setItem("packageName", packageData.nameOfPackage);
        localStorage.setItem("packagePrice", packageData.price);

      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };

    fetchPackageDetails();
  }, [packageId]); // This hook depends on packageId

  // Display loading text while fetching data
  if (!packageDetails) {
    return <div>Loading...</div>;  // Show loading while fetching data
  }
  localStorage.setItem("packageId",packageId);
  

  // Debugging each individual field
  console.log("Package Details:", packageDetails);

  // Log each individual field to see if any is undefined or null
  console.log("nameOfPackage:", packageDetails.nameOfPackage);
  console.log("image:", packageDetails.image);
  console.log("tagLine:", packageDetails.tagLine);
  console.log("price:", packageDetails.price);
  console.log("duration:", packageDetails.duration);
  console.log("smallDescription:", packageDetails.smallDescription);
  console.log("longDescription:", packageDetails.longDescription);
  
  // You can also check for potential null or undefined values
  if (!packageDetails.nameOfPackage) console.log("nameOfPackage is missing or undefined");
  if (!packageDetails.image) console.log("Image is missing or undefined");
  if (!packageDetails.tagLine) console.log("Tagline is missing or undefined");
  if (!packageDetails.price) console.log("Price is missing or undefined");
  if (!packageDetails.duration) console.log("Duration is missing or undefined");
  if (!packageDetails.smallDescription) console.log("Small Description is missing or undefined");
  if (!packageDetails.longDescription) console.log("Long Description is missing or undefined");
 
  return (
    <div>
      <NavBar />
      <Container className="my-5">
        <Row className="align-items-start">
          <Col xs={4} md={3}>
            <Image
              src={ `data:image/jpeg;base64,${packageDetails.image}`}  // Fallback image if no image is provided
              alt="Package Image"
              className="img-fluid rounded"
              style={{ maxWidth: '220px', height: 'auto' }}
            />
            <h4 className="mt-2"><strong>{packageDetails.nameOfPackage}</strong></h4>
          </Col>

          <Col xs={12} md={9}>
            <strong>{packageDetails.tagLine}</strong>  {/* Tagline above price */}
            <p className="mt-3 fs-4 fs-sm-3 fs-md-3 fs-lg-2">
              <span className="fs-3 fs-md-2">₹ {packageDetails.price}</span> /- Per Person
            </p>
            <p><strong>Package Includes:</strong> {packageDetails.smallDescription}</p>  {/* Small description here */}
            <p><strong>Duration:</strong> {packageDetails.duration}</p>  {/* Duration */}
          </Col>
        </Row>
        <div><hr />
          <h3>Details:</h3>
        </div>
        <Container className="my-5">
          <Row className="align-items-start">
            <Col xs={12} md={12}>
              <p>{packageDetails.longDescription}</p>  {/* Big Description under Details */}
            </Col>
          </Row>
        </Container>

        <Row className="d-flex justify-content-between">
          <Col xs="auto">
            <Link to={Router.AFTER}>
              <Button variant="primary">Back to Home</Button>
            </Link>
          </Col>
          
          <Col xs="auto" className="text-end">
            <Button variant="success">
              <Link to={Router.BOOKINGDETAIL} style={{ textDecoration: "none", color: "white" }}>
                Book Package
              </Link>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
