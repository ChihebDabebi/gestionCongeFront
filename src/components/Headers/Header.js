import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import { useEffect, useState } from "react";
import getDecodedToken from 'services/getDecodedToken';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
const Header = () => {
  const [roles, setRoles] = useState([]);
  const [isEmployee, setIsEmployee] = useState(false);
  const [nbrUsers , setNbrUsers] = useState () ;
  const [nbrDemandes , setNbrDemandes] = useState () ; 
  const [nbrPerStatus , setNbrPerStatus] = useState () ; 
  const [countDays , setCountDays] = useState () ; 
  const [count, setCount] = useState () ; 

  const [email , setEmail] = useState ("") ; 
  const [id , setId] = useState ("") ; 


  const axiosPrivate = useAxiosPrivate();

  const fetchNumberOfUsers = async ()=>{
    try{
      const response = await axiosPrivate.get("/calcul/users");
      console.log(response.data);
      setNbrUsers(response.data);
    }catch(error){
       alert("something went wrong getting number of users ");
    }
  };
  const fetchNumberOfDemands = async ()=>{
    try{
      const response = await axiosPrivate.get("/calcul/demandes");
      console.log(response.data);
      setNbrDemandes(response.data);
    }catch(error){
       alert("something went wrong getting number of demands ");
    }
  };
  const fetchUserByEmail = async (email) => {
    try {
      const response = await axiosPrivate.get('/user/getU', { params: { email } });
      console.log(response.data);
      setCountDays(response.data.nbrJours);
      setId(response.data.user_id);
    } catch (err) {
      console.error('User not found');
      
    }
  };
  const fetchMyDemandsPerMonth = async (id) => {
    try {
      const response = await axiosPrivate.get(`calcul/myDemand/${id}`);
      console.log(response.data);
      setCount(response.data);
    } catch (err) {
      console.error('User not found');
      
    }
  };
  
  useEffect(() => {
    const decodedToken = getDecodedToken();
    fetchNumberOfUsers();
    fetchNumberOfDemands();
    fetchUserByEmail(email);
    fetchMyDemandsPerMonth(id);
    if (decodedToken) {
      setRoles(decodedToken.authorities);
      setEmail(decodedToken.sub);
      if (decodedToken.authorities && decodedToken.authorities.includes('Employe')) {
        setIsEmployee(true);
      }
    } else {
      console.log('Error decoding token');
    }
  }, [isEmployee,id]);

  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              {isEmployee ? (
                <>
                  {/* Cards for Employees */}
                  <Col lg="6" xl="6">
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Count Days
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                              {countDays}
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-success text-white rounded-circle shadow">
                              <i className="fas fa-tasks" />
                            </div>
                          </Col>
                        </Row>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="6" xl="6">
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Leave Requests
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">{count}</span> &nbsp;&nbsp;&nbsp;
                            <span className="text-nowrap">This month</span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                              <i className="fas fa-calendar-alt" />
                            </div>
                          </Col>
                        </Row>
                        
                      </CardBody>
                    </Card>
                  </Col>
                </>
              ) : (
                <>
                  {/* Cards for Non-Employees */}
                  <Col lg="6" xl="6">
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                              Demands
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">
                              {nbrDemandes}
                            </span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                              <i className="fas fa-chart-bar" />
                            </div>
                          </Col>
                        </Row>
                        
                      </CardBody>
                    </Card>
                  </Col>
                  <Col lg="6" xl="6">
                    <Card className="card-stats mb-4 mb-xl-0">
                      <CardBody>
                        <Row>
                          <div className="col">
                            <CardTitle
                              tag="h5"
                              className="text-uppercase text-muted mb-0"
                            >
                               Users
                            </CardTitle>
                            <span className="h2 font-weight-bold mb-0">{nbrUsers}</span>
                          </div>
                          <Col className="col-auto">
                            <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                              <i className="fas fa-chart-pie" />
                            </div>
                          </Col>
                        </Row>
                        
                      </CardBody>
                    </Card>
                  </Col>
                </>
              )}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
