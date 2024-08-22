import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col } from "reactstrap";
import AuthService from "services/auth.service";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hireDate, setHireDate] = useState("");
  const [cin, setCin] = useState("");
  const [age, setAge] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    AuthService.register(firstName, lastName, email, password, hireDate, cin, age).then((response) => {
      console.log("Account created successfully");
      navigate("/index");
    }, (error) => {
      const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      console.log(resMessage);
    });
  };
  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const day = selectedDate.getDay(); // 0 for Sunday, 6 for Saturday

    if (day === 0 || day === 6) {
      setError("Weekends are not allowed. Please select a weekday.");
      setHireDate(""); // Reset the date
    } else {
      setError("");
      setHireDate(e.target.value);
    }
  };


  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>sign up with credentials</small>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="First Name" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Last Name" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Email" type="email" autoComplete="new-email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-calendar-grid-58" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Hire Date" type="date" value={hireDate} onChange={handleDateChange} required />
                </InputGroup>
                {error && <div className="text-danger">{error}</div>}
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-single-copy-04" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="CIN" type="text" value={cin} onChange={(e) => setCin(e.target.value)} required />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-badge" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input placeholder="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
                </InputGroup>
              </FormGroup>
             
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit">Create account</Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
