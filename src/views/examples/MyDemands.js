
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
  import { faCheck,faTrash,faX } from "@fortawesome/free-solid-svg-icons";
  import getDecodedToken from 'services/getDecodedToken';

  // core components
  import Header from "components/Headers/Header.js";
  
  const MyDemands = () => {
    const axiosPrivate = useAxiosPrivate();
    const [demands, setDemands] = useState([]);
    const [id,setId] = useState();
    const [email, setEmail] = useState('');

    const fetchMyDemands = async () => {
      console.log('id ',id)
      try {
        const response = await axiosPrivate.get(`/demande/${id}/myDemands`);
        console.log(response.data);
        setDemands(response.data);
      } catch (err) {
        console.error('demands not found');
        
      }
    };
    
    const fetchUserByEmail = async (email) => {
      try {
        const response = await axiosPrivate.get('/user/getU', { params: { email } });
        console.log(response.data);
        setId(response.data.user_id);
        console.log('id ',id)

      } catch (err) {
        console.error('User not found');
        
      }
    };
    const deleteDemand = async (id) => {
      try {
        const response = await axiosPrivate.delete(`/demande/${id}`);
        console.log(response.data);
        fetchMyDemands();
  
      } catch (err) {
        console.error('demand not found');
  
      }
    };
    useEffect(() => {
      const decodedToken = getDecodedToken();
      if (decodedToken) {
        setEmail(decodedToken.sub);
        
        
      } else {
        console.log('Error decoding token');
      }
      if (email) {
        fetchUserByEmail(email);
      }
    }, [email]);
    useEffect(()=>{
      fetchMyDemands();
    },[id]);
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
        <td>      <button onClick={() => deleteDemand(demand.demande_id)}><FontAwesomeIcon icon={faTrash} /></button> &nbsp;
        </td>
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
  
  export default MyDemands;
  