import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_CONFERENCE } from '../utils/mutations';
import '../styles/ConferenceForm.css';

const ConferenceForm = () => {
  // set initial form state
  const [conferenceFormData, setConferenceFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    image: '/assets/images/b-convention.jpeg'
  });
  // set state for form validation
  const [validated, setValidated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);


  const [addConference, { error }] = useMutation(ADD_CONFERENCE);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setConferenceFormData({ ...conferenceFormData, [name]: value });
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
      const { data } = await addConference({
        variables: { ...conferenceFormData },
      });
      console.log("Conf Data Added: " + data)
      setShowSuccessAlert(true);

    } catch (e) {
      console.log("Error Adding Conference: " +e);
      console.log("Error Details:" + JSON.stringify(e, null, 2));
      console.error(e);
      setShowAlert(true);
    }

    setConferenceFormData({
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      location: '',
      image: '/assets/images/b-convention.jpeg'
    });
};

return (
  <>
    {/* This is needed for the validation functionality above */}
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      {/* show alert if server response is bad */}
      <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
        An error occurred creating the Conference!
      </Alert>
      <Alert dismissible onClose={() => setShowSuccessAlert(false)} show={showSuccessAlert} variant='success'>
        Created the Conference!
      </Alert>
      <h2 className="formTitle"> Add Conference Form</h2>
      <Form.Group className='mb-3 conferenceForm'>
        <Form.Label htmlFor='name'>*Name</Form.Label>
        <Form.Control
          type='text'
          placeholder='Conference Name'
          name='name'
          onChange={handleInputChange}
          value={conferenceFormData.name}
          required
        />
        <Form.Control.Feedback type='invalid'>Conference name is required!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-3 conferenceForm'>
        <Form.Label htmlFor='email'>*Description</Form.Label>
        <Form.Control
          type='text'
          placeholder='Conference description'
          name='description'
          onChange={handleInputChange}
          value={conferenceFormData.description}
          required
        />
        <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-3 conferenceForm'>
        <Form.Label htmlFor='startDate'>*Start Date</Form.Label>
        <Form.Control
          type='date'
          name='startDate'
          onChange={handleInputChange}
          value={conferenceFormData.startDate}
          required
        />
        <Form.Control.Feedback type='invalid'>Start Date is required!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3 conferenceForm'>
        <Form.Label htmlFor='endDate'>*End  Date</Form.Label>
        <Form.Control
          type='date'
          name='endDate'
          onChange={handleInputChange}
          value={conferenceFormData.endDate}
          required
        />
        <Form.Control.Feedback type='invalid'>End Date is required!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3 conferenceForm'>
        <Form.Label htmlFor='location'>*Location</Form.Label>
        <Form.Control
          type='text'
          placeholder='Conference location'
          name='location'
          onChange={handleInputChange}
          value={conferenceFormData.location}
          required
        />
        <Form.Control.Feedback type='invalid'>Location is required!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className='mb-3 conferenceForm'>
        <Form.Label htmlFor='image'>*Image</Form.Label>
        <Form.Control
          type='text'
          placeholder='Conference Image'
          name='image'
          onChange={handleInputChange}
          value={conferenceFormData.image}
          required
        />
        <Form.Control.Feedback type='invalid'>Image is required!</Form.Control.Feedback>
      </Form.Group>
      <Button className='conferenceSubmit'
        disabled={!(conferenceFormData.name && conferenceFormData.description && conferenceFormData.startDate
                    && conferenceFormData.endDate && conferenceFormData.location && conferenceFormData.image)
        }
        type='submit'
        variant='success'>
        Submit
      </Button>
    </Form>
  </>
);
};

export default ConferenceForm;