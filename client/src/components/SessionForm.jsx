import { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_SESSION } from '../utils/mutations';
import { GET_CONFERENCES } from '../utils/queries';

import '../styles/SessionForm.css';

const SessionForm = () => {
  const { loading, data } = useQuery(GET_CONFERENCES);
  const [conferenceData, setConferenceData] = useState([]);

  // set initial form state
  const [sessionFormData, setSessionFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    presenters: [],
    date: '',
    time: '',
    duration: 30,
    room: '',
    //hardcode for now
    conferenceId: '6656744ffc762191648a2ed5'
  });
  // set state for form validation
  const [validated, setValidated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
 
  // When the component mounts to the VDOM, run this callback to load conferences
  useEffect(() => {
    console.log("In use effect");
    if (data){
     console.log("Conf data: ") + JSON.stringify(data);
    console.log(data);
     //setConferenceNames(conferenceData.map(conference => conference.name));
     setConferenceData(data);
    }
  }, [data])


  const [createSession, { error }] = useMutation(CREATE_SESSION);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    var newValue = value;
    // For duration, convert to INT
    if (name === "duration"){
      newValue = parseInt(value);
    }
    setSessionFormData({ ...sessionFormData, [name]: newValue });
  };

  const handleFormSubmit = async (event) => {

    event.preventDefault();
    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    }

    try {
      const { data } = await createSession({
        variables: { ...sessionFormData },
      });
      console.log("Session Added: " + data)
      setShowSuccessAlert(true);

    } catch (e) {
      console.log("Error Adding Session: " +e);
      console.log("Error Details:" + JSON.stringify(e, null, 2));
      console.error(e);
      setShowAlert(true);
    }

    setSessionFormData({
      name: '',
      description: '',
      presenters: [],
      date: '',
      time: '',
      duration: 30,
      room: '',
       //hardcode for now
      conferenceId: '6656744ffc762191648a2ed5'
    });
};

if (!data ){
  return <h2>Loading...</h2>
}

return (
  <>
    {/* This is needed for the validation functionality above */}
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      {/* show alert if server response is bad */}
      <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
        An error occurred creating the Session!
      </Alert>
      <Alert dismissible onClose={() => setShowSuccessAlert(false)} show={showSuccessAlert} variant='success'>
        Added the session to the conference!
      </Alert>
      <h2 className="formTitle"> Add Session Form</h2>
      <Form.Group className='mb-3 sessionForm'>
        <Form.Label htmlFor='conferenceId'>*Conference</Form.Label>
        <Form.Control
          as = 'select'
          name='conferenceId'
          onChange={handleInputChange}
        >
          <option disabled selected  value="">Select a Conference</option>
        { data.conferences.map((conference) => (
            <option key={conference._id} value={conference._id}>{conference.name}</option>
          ))} 
        </Form.Control> 
          {/* {console.log("Data is: " + JSON.stringify(data.conferences))}
           { data.conferences.map((conference) => console.log(conference))}  */}
           
           
           
        <Form.Control.Feedback type='invalid'>Name is required!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3 sessionForm'>
        <Form.Label htmlFor='name'>*Name</Form.Label>
        <Form.Control
          type='text'
          placeholder='Session Name'
          name='name'
          onChange={handleInputChange}
          value={sessionFormData.name}
          required
        />
        <Form.Control.Feedback type='invalid'>Name is required!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-3 sessionForm'>
        <Form.Label htmlFor='description'>*Description</Form.Label>
        <Form.Control
          type='text'
          placeholder='Session description'
          name='description'
          onChange={handleInputChange}
          value={sessionFormData.description}
          required
        />
        <Form.Control.Feedback type='invalid'>Description is required!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-3 sessionForm'>
        <Form.Label htmlFor='date'>*Date</Form.Label>
        <Form.Control
          type='date'
          name='date'
          onChange={handleInputChange}
          value={sessionFormData.date}
          required
        />
        <Form.Control.Feedback type='invalid'>Session Date is required!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3 sessionForm'>
        <Form.Label htmlFor='time'>*Time</Form.Label>
        <Form.Control
          type='time'
          name='time'
          onChange={handleInputChange}
          value={sessionFormData.time}
          required
        />
        <Form.Control.Feedback type='invalid'>Session Time is required!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3 sessionForm'>
        <Form.Label htmlFor='duration'>*Duration (30 - 180) minutes</Form.Label>
        <Form.Control
          type="number"
          name="duration"
          min = "30"
          max = "180"
          onChange={handleInputChange}
          value={sessionFormData.duration}
          required
        />
        <Form.Control.Feedback type='invalid'>Session duration is required!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3 sessionForm'>
        <Form.Label htmlFor='presenters'>*Presenters</Form.Label>
        <Form.Control
          type='text'
          placeholder='Session presentor'
          name='presenters'
          onChange={handleInputChange}
          // Temp - Set to first value in the array
          value={sessionFormData.presenters}
          required
        />
        <Form.Control.Feedback type='invalid'>Presentor is required!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3 sessionForm'>
        <Form.Label htmlFor='location'>*Room</Form.Label>
        <Form.Control
          type='text'
          placeholder='Session room'
          name='room'
          onChange={handleInputChange}
          value={sessionFormData.room}
          required
        />
        <Form.Control.Feedback type='invalid'>Room is required!</Form.Control.Feedback>
      </Form.Group>
      
      <Button className='sessionSubmit'
        disabled={!(sessionFormData.name && sessionFormData.description && sessionFormData.date
                    && sessionFormData.room && sessionFormData.duration)
        }
        type='submit'
        variant='success'>
        Submit
      </Button>
    </Form>
  </>
);
};

export default SessionForm;
