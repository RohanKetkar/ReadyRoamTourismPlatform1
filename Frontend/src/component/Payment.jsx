import React, { useState, useEffect } from "react";
import { Router } from "../Route/Route";
import { Button, Row, Col, Card, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  const [packageName, setPackageName] = useState("");
  const [price, setPrice] = useState(0);
  const [peopleCount, setPeopleCount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [upiId, setUpiId] = useState(""); // Store UPI ID
  const [selectedBank, setSelectedBank] = useState(""); // Store selected bank for net banking
  const [showNetBankingCard, setShowNetBankingCard] = useState(false); // Control the display of Net Banking form
  const [cardNumber, setCardNumber] = useState(""); // Debit/Credit card number
  const [cvv, setCvv] = useState(""); // Debit/Credit card CVV
  const [showCardForm, setShowCardForm] = useState(false); // Control Debit/Credit card form visibility
  const [showQrCode, setShowQrCode] = useState(false); // Control QR code payment visibility

  const history = useNavigate();

  
  const banksList = [
    "State Bank of India",
    "HDFC Bank",
    "ICICI Bank",
    "Axis Bank",
    "Kotak Mahindra Bank",
    "Punjab National Bank",
    "Bank of Baroda",
    "Yes Bank",
    "IDFC First Bank",
    "Canara Bank"
  ];

  useEffect(() => {
    const storedPackageName = localStorage.getItem("packageName");
    const storedPackageId = localStorage.getItem("packageId");
    const storedPrice = parseInt(localStorage.getItem("packagePrice"), 10);
    const storedPeopleCount = parseInt(localStorage.getItem("peoples"), 10);
    const storedUserEmail = localStorage.getItem("userEmail");

    if (storedPackageName && storedPackageId && storedPrice && storedPeopleCount && storedUserEmail) {
      setPackageName(storedPackageName);
      setPrice(storedPrice);
      setPeopleCount(storedPeopleCount);
      setTotalAmount(storedPrice * storedPeopleCount);
    }
  }, []);

  const handlePayment = async () => {
    try {
      // Generate a random 15-digit Transaction ID (TID)
      const transactionId = Math.floor(Math.random() * 1000000000000000); // Random 15-digit number
      console.log("Transaction ID: " + transactionId);
      const response = await axios.post("http://localhost:5255/payment", {
        packageId: localStorage.getItem("packageId"),       
        email: localStorage.getItem("userEmail"),
        nameOfPackage: packageName, // Send the name of the package
        price: price*peopleCount, // Send the price
        priceperperson: price, // Assuming the price per person is same as the total price (you can change if required)
        peopleCount: peopleCount,
        pkgId: localStorage.getItem("packageId"),
        TID: JSON.stringify(transactionId), 
      });
      
      if (response.status === 200) {
        setPaymentSuccess(true);
        toast.success("Payment Successful!", { position: "top-right" });
       
      }
    } catch (error) {
      setPaymentError("Payment failed. Please try again.");
      toast.error("Payment Failed. Please try again.", { position: "top-center" });
    }
  };
  

  const handleNetBanking = () => {
    setShowNetBankingCard(true); // Show mini card when Net Banking is clicked
  };

  // Handle Debit/Credit Card Selection
  const handleCardPayment = () => {
    setShowCardForm(true); // Show the card form
  };

  // Handle QR Code Payment
  const handleQrCodePayment = () => {
    setShowQrCode(true); // Show QR code form
  };

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center">Payment Summary</h2>
      <hr />

      {/* Bill / Invoice-like layout */}
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Package Details</Card.Title>
              <Card.Text>
                <strong>Package Name:</strong> {packageName}
              </Card.Text>
              <Card.Text>
                <strong>Price per Person:</strong> ₹{price}
              </Card.Text>
              <Card.Text>
                <strong>Number of People:</strong> {peopleCount}
              </Card.Text>
              <Card.Text>
                <strong>Total Amount:</strong> ₹{totalAmount}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Billing Summary</Card.Title>
              <Card.Text>
                <strong>Customer Email:</strong> {localStorage.getItem("userEmail")}
              </Card.Text>
              <Card.Text>
                <strong>Package ID:</strong> {localStorage.getItem("packageId")}
              </Card.Text>
              <Card.Text className="text-center">
                <strong>Total Due: ₹{totalAmount}</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Payment Methods Section */}
      <div className="mt-5">
        <h3>Choose Payment Method</h3>

        {/* UPI ID Input */}
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>UPI Payment</Card.Title>
            <Row>
              <Col>
                <img 
                  src="image\icons8-bhim-48.png" 
                  alt="UPI Logo" 
                  width="50" 
                  height="50" 
                />
              </Col>
              <Col>
                <Form.Group controlId="upiId">
                  <Form.Label>Enter UPI ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter UPI ID"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                {/* Pay Button next to UPI ID */}
                <Button 
                  variant="primary" 
                  className="mt-4" 
                  onClick={handlePayment} 
                  disabled={!upiId}
                >
                  Pay
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Net Banking */}
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Net Banking</Card.Title>
            <Row>
              <Col>
                <img 
                  src="image\net-banking-icon (1).png" 
                  alt="Net Banking Logo" 
                  width="50" 
                  height="50" 
                />
              </Col>
              <Col>
                <Button variant="success" onClick={handleNetBanking}>Select Bank</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Mini Card for Net Banking */}
        {showNetBankingCard && (
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Select Bank</Card.Title>
              <Form.Group controlId="bankSelect">
                <Form.Label>Choose Your Bank</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                >
                  <option value="">Select Bank</option>
                  {banksList.map((bank, index) => (
                    <option key={index} value={bank}>{bank}</option>
                  ))}
                </Form.Control>
              </Form.Group>
              <div className="mt-3">
                {selectedBank && (
                  <div>
                    <p><strong>Bank Account Number:</strong> 123456789012</p>
                    <p><strong>IFSC Code:</strong> ABCD0123456</p>
                    <p><strong>Recipent Name:</strong> ReadyRoamAccount</p>
                    <p><strong>Total Amount Due:</strong> ₹{totalAmount}</p>
                  </div>
                )}
              </div>
              <Button className="w-100 mt-3" variant="primary" onClick={handlePayment}>Pay via {selectedBank}</Button>
            </Card.Body>
          </Card>
        )}

        {/* Debit/Credit Card */}
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>Debit/Credit Card</Card.Title>
            <Row>
              <Col>
                <img 
                  src="image\atm-card.png" 
                  alt="Debit/Credit Card Logo" 
                  width="50" 
                  height="50" 
                />
              </Col>
              <Col>
                <Button variant="success" onClick={handleCardPayment}>Enter Card Details</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Mini Card for Debit/Credit Card */}
        {showCardForm && (
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Enter Card Details</Card.Title>
              <Form.Group controlId="cardNumber">
                <Form.Label>Card Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="cvv">
                <Form.Label>CVV</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </Form.Group>

              <Button className="w-100 mt-3" variant="primary" onClick={handlePayment}>Pay with Card</Button>
            </Card.Body>
          </Card>
        )}

        {/* QR Code Payment */}
        <Card className="mt-3">
          <Card.Body>
            <Card.Title>QR Code Payment</Card.Title>
            <Row>
              <Col>
                <img 
                  src="image\qr-code.png" 
                  alt="QR Code Logo" 
                  width="50" 
                  height="50" 
                />
              </Col>
              <Col>
                <Button variant="success" onClick={handleQrCodePayment}>Scan QR Code</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Mini Card for QR Code Payment */}
        {showQrCode && (
          <Card className="mt-3 mb-5">
            <Card.Body>
              <Card.Title>Scan the QR Code</Card.Title>
              <div className="text-center">
                {/* Placeholder for QR Code */}
                <img 
                  src="image\pngwing.com (3).png" 
                  alt="QR Code" 
                  width="150" 
                  height="150" 
                />
                <p>Scan the QR code to complete the payment</p>
              </div>
            </Card.Body>
          </Card>
        )}
      </div>

      {/* Go back to Booking Details and Go to Home buttons */}
      <div className="d-flex justify-content-center mt-5">
        <Link className="mt-1" to={Router.BOOKINGDETAIL} style={{ textDecoration: "none", color: "white" }}>
          <Button variant="primary" onClick={() => history("/booking-details")}>
            Go Back to Booking Details
          </Button>
        </Link>

        <div style={{ marginLeft: '200px'}}>
          <Link to={Router.AFTER}>
            <Button variant="secondary"  style={{ textDecoration: 'none', color: 'white' }}>
              Go to Home
            </Button>
          </Link>
        </div>
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default Payment;


