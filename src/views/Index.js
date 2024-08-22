

import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
import Header from "components/Headers/Header.js";
import useAxiosPrivate from "hooks/useAxiosPrivate";
// javascipt plugin for creating charts
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
import { useEffect } from "react";
import getDecodedToken from 'services/getDecodedToken';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from "reactstrap";
import { Chart as ChartJS, CategoryScale,PointElement,
  LineElement, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale,PointElement,LineElement, BarElement, Title, Tooltip, Legend);

// core components


const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [nbrPerStatus, setNbrPerStatus] = useState([]);
  const[months,setMonths] = useState([]);
  const[nbr,setNbr] = useState([]);
  const [isEmployee, setIsEmployee] = useState(false);
  const [roles, setRoles] = useState([]);

  const axiosPrivate = useAxiosPrivate();
  const data = {
    labels: ['Normale', 'Urgente', 'trés urgente'],
    datasets: [
      {
        label: 'Demands number per Status',
        data: nbrPerStatus,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const data2 = {
    labels: months,
    datasets: [
      {
        label: 'Number Of Demands Per Month',
        data: nbr,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const options2 = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const fetchNumberOfDemandsPerStatus = async ()=>{
    try{
      const response = await axiosPrivate.get("/calcul/perStatus");
      console.log(response.data);
      const array = response.data;
      setNbrPerStatus(response.data);
      

    }catch(error){
       alert("something went wrong getting number of demands per status ");
    }
  };
  const fetchNumberOfDemandsPerMonth = async ()=>{
    try{
      const response = await axiosPrivate.get("/calcul/perMonth");
      console.log(response.data);
      const data = response.data;
      setMonths(Object.keys(data));
      setNbr(Object.values(data))
    }catch(error){
       alert("something went wrong getting number of demands per month ");
    }
  };
  useEffect(() => {
    const decodedToken = getDecodedToken();
    fetchNumberOfDemandsPerStatus();
    fetchNumberOfDemandsPerMonth();
    if (decodedToken) {
      setRoles(decodedToken.authorities);
      if (decodedToken.authorities && decodedToken.authorities.includes('Employe')) {
        setIsEmployee(true);
      }
    } else {
      console.log('Error decoding token');
    }
  }, [isEmployee]);
      
  
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        {isEmployee ? (
          <Row>
            <Col xl="12">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <h2 className="mb-0">Welcome, Employee!</h2>
                </CardHeader>
                <CardBody>
                  <p>This is your interface where you can add demands, view your status, and more.</p>
                  {/* You can add buttons or links to other actions here */}
                </CardBody>
              </Card>
            </Col>
          </Row>
        ) : (
          <>
            <Row>
              <Col className="mb-5 mb-xl-0" xl="8">
                <Card className="bg-gradient-default shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h6 className="text-uppercase text-light ls-1 mb-1">
                          Overview
                        </h6>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Line data={data2} options={options2} />
                  </CardBody>
                </Card>
              </Col>
              <Col xl="4">
                <Card className="shadow">
                  <CardHeader className="bg-transparent">
                    <Row className="align-items-center">
                      <div className="col">
                        <h6 className="text-uppercase text-muted ls-1 mb-1">
                          Overview
                        </h6>
                        <h2 className="mb-0">Demands number per Status</h2>
                      </div>
                    </Row>
                  </CardHeader>
                  <CardBody>
                    <Bar data={data} options={options} />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default Index;
