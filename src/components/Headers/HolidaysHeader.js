
import { useEffect, useState } from "react";
import { Button, Container, Row, Col } from "reactstrap";
import getDecodedToken from "services/getDecodedToken";
const HolidaysHeader = () => {
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
            "url(" + require("../../assets/img/theme/history.png") + ")",
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
              <h1 className="display-2 text-white">Hello {username} </h1>
              
              
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default HolidaysHeader;
