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
    InputGroupText
} from 'reactstrap';
import UserHeader from 'components/Headers/UserHeader.js';
import useAuth from 'hooks/useAuth';
import getDecodedToken from 'services/getDecodedToken';
import useAxiosPrivate from 'hooks/useAxiosPrivate';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Navigate,useNavigate } from "react-router-dom";
const AddDemande = ({ direction, ...args }) => {
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
    const [motif, setMotif] = useState("");
    const [holidays, setHolidays] = useState([]);
    const navigate = useNavigate();

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
    const fetchHolidays = async () => {
        try {
            const response = await axiosPrivate.get('/holiday/all');
            console.log(response.data);
            setHolidays(response.data);

        } catch (err) {
            console.error('User not found');

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
            fetchHolidays();
        }


    }, [email]);


    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const handleSelect = (value) => {
        setSelectedValue(value);
    };

    const handleDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        const day = selectedDate.getDay();


        if (day === 0 || day === 6) {
            setError("Weekends  are not allowed. Please select a weekday.");
            setFirstDate("");
        } else {
            setError("");
            setFirstDate(e.target.value);
        }
    };
    const handleDateChange2 = (e) => {
        const selectedDate = new Date(e.target.value);
        const day = selectedDate.getDay();
        setLastDate(e.target.value);

        console.log(auth.nbrJrs);
        

        

        if (day === 0 || day === 6 ) {
            setError("Weekends are not allowed. Please select a weekday.");
            setLastDate("");
        } else {
            setError2("");
            setLastDate(e.target.value);
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const date1 = new Date(firstDate);
        const date2 = new Date(lastDate);
        const timeDiff = Math.abs(date2 - date1);
        const diffDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        let isHoliday = false;
        holidays.forEach(item => {
            if (item === lastDate ||item === firstDate) {
                isHoliday = true;
            }
        });
        try {
            if(isHoliday){
                alert("holidays are not allowed  try an other ");
            }
            holidays.forEach(item=> {
                if(item > firstDate && item < lastDate){
                    alert("holidays shouldnt be included in your period");
                }
                
            })

            if (diffDays < nbrJours && date1 <= date2) {
                const response = await axiosPrivate.post(`/demande/add`, {
                    dateDebut: firstDate, dateFin: lastDate, motif, status: selectedValue
                });
                alert("Demand added successfully !");
                navigate('/myDemands');
                console.log("success");
            } else {
                alert('The number of days between the dates must be  less than your count days   ');
            }

        } catch {
            alert("error occured !");


        }



    };


    return (
        <>
            <DemandeHeader />
            <Container className="mt--7" fluid>
                <Row>
                    <Col className="order-xl-1" xl="12">
                        <Card className="bg-secondary shadow">
                            <CardHeader className="bg-white border-0">
                                <Row className="align-items-center">
                                    <Col xs="8">
                                        <h3 className="mb-0">Add Demand  </h3>
                                    </Col>

                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <h6 className="heading-small text-muted mb-4">
                                        Demand information
                                    </h6>
                                    <div className="pl-lg-4">

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-first-name"
                                                    >
                                                        Motif
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        defaultValue="motif"
                                                        id="input-first-motif"
                                                        placeholder="Motif"
                                                        type="text"
                                                        onChange={(e) => setMotif(e.target.value)}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-last-name"
                                                    >
                                                        Status
                                                    </label><br />
                                                    <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
                                                        <DropdownToggle caret>Status</DropdownToggle>
                                                        <DropdownMenu>
                                                            <DropdownItem onClick={() => handleSelect('Normal')}>Normal</DropdownItem>
                                                            <DropdownItem onClick={() => handleSelect('Urgente')}>Urgente</DropdownItem>
                                                            <DropdownItem onClick={() => handleSelect('trés urgente')}>trés urgente</DropdownItem>
                                                        </DropdownMenu>
                                                    </Dropdown> {selectedValue && <p>Selected: {selectedValue}</p>}

                                                </FormGroup>
                                            </Col>

                                        </Row>

                                        <Row>
                                            <Col lg="6">
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-last-name"
                                                    >
                                                        First Date
                                                    </label><br />
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="ni ni-calendar-grid-58" />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input placeholder="FirstDate" type="date" value={firstDate} onChange={handleDateChange} required />
                                                    </InputGroup>
                                                    {error && <div className="text-danger">{error}</div>}
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-last-name"
                                                    >
                                                        Last Date
                                                    </label><br />
                                                    <InputGroup className="input-group-alternative mb-3">
                                                        <InputGroupAddon addonType="prepend">
                                                            <InputGroupText>
                                                                <i className="ni ni-calendar-grid-58" />
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input placeholder="LastDate" type="date" value={lastDate} onChange={handleDateChange2} required />
                                                    </InputGroup>
                                                    {error2 && <div className="text-danger">{error2}</div>}
                                                </FormGroup>
                                            </Col>

                                            <Col className="text-right" xs="12">
                                                <Button
                                                    color="primary"

                                                    onClick={handleSubmit}
                                                    size="sm"
                                                >
                                                    Submit
                                                </Button>
                                            </Col>
                                            <Col>

                                                Your Days Count : {nbrJours}
                                            </Col>
                                        </Row>
                                    </div>
                                    <hr className="my-4" />

                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default AddDemande;