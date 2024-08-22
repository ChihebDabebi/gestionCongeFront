import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardHeader, CardBody, FormGroup, Form, Input, InputGroupAddon, InputGroupText, InputGroup, Row, Col } from "reactstrap";
import AuthService from "services/auth.service";
import useAuth from "hooks/useAuth";
import useRefreshToken from "hooks/useRefreshToken";
import getDecodedToken from "services/getDecodedToken";
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const { auth , setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const refresh = useRefreshToken();
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [cin, setCin] = useState('');
  const [age, setAge] = useState('');
  const [id,setId] = useState();
  const [nbrJours,setNbrJours] = useState();

  const axiosPrivate = useAxiosPrivate();

  const fetchUserByEmail = async (email) => {
    try {
      const response = await axiosPrivate.get('/user/getU', { params: { email } });
      
      console.log(response.data);
      const id= response.data.user_id;
      const prenom = response.data.prenom;
      const cin = response.data.cin;
      const age = response.data.age;
     const  nbrJrs = response.data.nbrJours;
      setAuth({ nbrJrs,id,prenom,cin,age });

    } catch (err) {
     console.log("error")
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Perform login first
      const response = await AuthService.login(email, password);
       toast.success("Logged in successfully !");
      const accessToken = response?.data?.access_token;
      localStorage.setItem('accessToken', accessToken);
  
      // Fetch user details
      await fetchUserByEmail(email);
      console.log(auth);
      // Get the decoded token after login
      const decodedToken = getDecodedToken();
      if (decodedToken) {
        const roles = decodedToken.authorities;
        const username = decodedToken.username;
        
        // Set the auth state with all necessary information
        setAuth(prevAuth => ({
          ...prevAuth,
          email,
          username,
          roles,
          accessToken
      }));
        // Navigate to home after setting auth
        navigate('/home');
      } else {
        console.log("Error decoding token");
      }
    } catch (error) {
        console.log('error');
    }
  };
  


  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>sign in with credentials</small>
            </div>
            <Form role="form" onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
            
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col className="text-right" xs="12">
            <a
              className="text-light"
              onClick={() => navigate("/signup")}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
      
    </>
  );
};

export default Login;
