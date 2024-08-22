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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
const Holidays = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(null);
    
    const axiosPrivate = useAxiosPrivate();
    const [history, setHistory] = useState();
    const [selectedDates, setSelectedDates] = useState([]);
    const [holidays,setHolidays] = useState([]);
    const handleDateChange = (date) => {
        // Add the selected date to the list if it's not already there
        if (!selectedDates.some(d => d.getTime() === date.getTime())) {
            setSelectedDates([...selectedDates, date]);
        }
    };
    useEffect(() => {
        const fetchHolidays = async () => {
            try {
                const response = await axiosPrivate.get('/holiday/all');
                console.log(response.data);
                setHolidays(response.data);
            } catch (err) {
                console.error('Failed to fetch holidays');
            }
        };

        fetchHolidays();
    }, []);


    const handleRemoveDate = (date) => {
        setSelectedDates(selectedDates.filter(d => d.getTime() !== date.getTime()));
    };

    const handleSaveHolidays = () => {
        const holidays = selectedDates.map(date => {
            const formattedDate = date.toLocaleDateString('en-CA'); 
            console.log("Formatted Date:", formattedDate);
            return formattedDate;
        });
        console.log("hol : ",holidays);
        axiosPrivate.post('/holiday/save', holidays)
            .then(response => {
                alert('Holidays saved successfully!');
            })
            .catch(error => {
                alert('Error saving holidays');
                console.error('Error:', error);
            });
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
                                        <h3 className="mb-0">Holidays</h3>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <h2>Select Holidays</h2>
                                <DatePicker
                                    selected={null} 
                                    onChange={handleDateChange}
                                    inline
                                    highlightDates={holidays.map(holiday => new Date(holiday))} 
                                    multiple 
                                />
                                <h3>Selected Dates:</h3>
                                <ul>
                                    {selectedDates.map((date, index) => (
                                        <li key={index}>
                                            {date.toLocaleDateString()}
                                            <button onClick={() => handleRemoveDate(date)}>Remove</button>
                                        </li>
                                    ))}
                                </ul>
                                <button onClick={handleSaveHolidays}>Save Holidays</button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
export default Holidays;