/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import getDecodedToken from "services/getDecodedToken";
const UserHeader = () => {
  const [username,setUsername] = useState("");
  
      useEffect(()=>{
        const decodedToken = getDecodedToken();
        if (decodedToken) {
         
         setUsername(decodedToken.username);
        }else{
          console.log("erroor");
        }
      },[]);
    
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTo = scrollHeight * 1;
    window.scrollTo({
      top: scrollTo,
      behavior: 'smooth' 
    });
  };
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style={{
          minHeight: "600px",
          backgroundImage:
            "url(" + require("../../assets/img/theme/avatar2.png") + ")",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-8" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
          <Row>
            <Col lg="7" md="10">
              <h1 className="display-2 text-white">Hello {username}</h1>
              <p className="text-white mt-0 mb-5">
              This is your profile page 
              where you can see and update your profile
              </p>
              <Button
                color="info"
                
                onClick={handleScroll}
              >
                Edit profile
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default UserHeader;
