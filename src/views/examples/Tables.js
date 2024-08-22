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

import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";

import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { useEffect , useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck,faX } from "@fortawesome/free-solid-svg-icons";

// core components
import Header from "components/Headers/Header.js";

const Tables = () => {
  const axiosPrivate = useAxiosPrivate();
  const [demands, setDemands] = useState([]);

  const acceptDemand = async (id) => {
    try {
      const response = await axiosPrivate.put(`/demande/${id}/accept`);
      alert("demand accepted");
      fetchDemands();
    } catch (err) {
      alert('demands not found');
      
    }
  };
  const rejectDemand = async (id) => {
    try {
      const response = await axiosPrivate.put(`/demande/${id}/refuse`);
      alert("Demand rejected ");
      fetchDemands();
    } catch (err) {
      alert('demands not found');
      
    }
  };


  const fetchDemands = async () => {
    try {
      const response = await axiosPrivate.get('/demande/all');
      console.log(response.data);
      setDemands(response.data);
    } catch (err) {
      console.error('demands not found');
      
    }
  };
  useEffect(()=>{
    fetchDemands();
  },[])
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Demands List</h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Motif</th>
                    <th scope="col">Status</th>
                    <th scope="col">Response</th>
                    <th scope="col">First Date</th>
                    <th scope="col">Last Date</th>
                    <th scope="col">User</th>
                    <th scope="col">Action</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
  {demands.map((demand, index) => (
    <tr key={index}>
      <th scope="row">{demand.motif}</th>
      <td>{demand.status}</td>
      <td>
        <Badge color="" className="badge-dot mr-4">
        <i className={
          demand.response === 'APPROVED' ? 'bg-success' :
          demand.response === 'REJECTED' ? 'bg-danger' :
          'bg-info'} />
          {demand.response}
        </Badge>
      </td>
      <td>{demand.dateDebut}</td>
      <td>{demand.dateFin}</td>
      <td>{demand.user}</td> 
      {demand.response === "PENDING" ? (<td className="text-right">
      <button onClick={() => acceptDemand(demand.demande_id)}><FontAwesomeIcon icon={faCheck} /></button> &nbsp;
      <button onClick={() => rejectDemand(demand.demande_id)}><FontAwesomeIcon icon={faX} /></button>

      </td>) : (<p></p>)}
    </tr>
  ))}
</tbody>

              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>        
      </Container>
    </>
  );
};

export default Tables;
