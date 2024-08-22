import DemandeHeader from "components/Headers/DemandeHeader";
import React, { useState, useEffect } from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import UserHeader from 'components/Headers/UserHeader.js';
import useAuth from 'hooks/useAuth';
import getDecodedToken from 'services/getDecodedToken';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import HistoryHeader from "components/Headers/HistoryHeader";

const Historique = ({ direction, ...args }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    const [error, setError] = useState("");
    const [error2, setError2] = useState("");
    const [firstDate, setFirstDate] = useState("");
    const [lastDate, setLastDate] = useState("");
    const { auth } = useAuth();
    const [nbrJours, setNbrJours] = useState();
    const [email, setEmail] = useState();
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [cin, setCin] = useState('');
    const [age, setAge] = useState('');
    const [id, setId] = useState();
    const axiosPrivate = useAxiosPrivate();
    const [history, setHistory] = useState();

    const fetchMyHistory = async () => {
        console.log('id ',id)
        try {
          const response = await axiosPrivate.get(`/history/${id}/myHistory`);
          console.log(response.data);
          setHistory(response.data);
        } catch (err) {
          console.error('history not found');
          
        }
      };
    const fetchUserByEmail = async (email) => {
        try {
            const response = await axiosPrivate.get('/user/getU', { params: { email } });
            console.log(response.data);
            setId(response.data.user_id);
            setNom(response.data.nom);
            setPrenom(response.data.prenom);
            setCin(response.data.cin);
            setAge(response.data.age);
            setNbrJours(response.data.nbrJours);

        } catch (err) {
            console.error('User not found');

        }
    };
    const exportPdf = async () => {
        try {
            const response = await axiosPrivate.get(`history/${id}/export`, {
                responseType: 'blob', // This tells Axios to expect a binary file
            });
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
    
            // Create a link element, set the download attribute, and click it to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `history_${id}.pdf`);
            document.body.appendChild(link);
            link.click();
    
            // Clean up and remove the link
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
    

        } catch (err) {
            console.error('error occured');

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
        fetchMyHistory();
      },[id]);


    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const handleSelect = (value) => {
        setSelectedValue(value);
    };

    return (
        <>
            <HistoryHeader />
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Your History</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                            <ListGroup style={{ maxWidth: '100%', marginTop: '20px' }}>
    {history ? (
        history.map((item, index) => (
            <ListGroupItem
                key={index}
                style={{
                    backgroundColor: '#f8f9fa',
                    border: '1px solid #e9ecef',
                    borderRadius: '8px',
                    padding: '15px',
                    marginBottom: '10px',
                    transition: 'transform 0.2s ease-in-out',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
                <div style={{ fontSize: '14px', color: '#343a40', marginBottom: '5px' }}>
                    <strong style={{ color: '#007bff' }}>Details:</strong> {item.details || 'No description available'}
                </div>
                <div style={{ fontSize: '14px', color: '#343a40', marginBottom: '5px' }}>
                    <strong style={{ color: '#007bff' }}>Date:</strong> {item.date}
                </div>
            </ListGroupItem>
        ))
    ) : (
        <ListGroupItem>No history found.</ListGroupItem>
    )}
    <Button onClick={exportPdf}>export pdf</Button>
</ListGroup>

                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default Historique;