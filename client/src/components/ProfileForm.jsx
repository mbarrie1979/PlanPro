import { useEffect , useState} from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USER} from '../utils/queries';
import { SAVE_USER } from '../utils/mutations';
import '../styles/ProfileForm.css';
import Auth from '../utils/auth';


const ProfileForm = () => {
  // set initial form state
  const [userData, setUserData] = useState({});
  // set state for form validation
  const [validated, setValidated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [saveUser, { errorSave }] = useMutation(SAVE_USER);
 
  console.log("In Profile form, logged in user: " + Auth.getLoggedInUserId());
  let id = Auth.getLoggedInUserId();
  const { loading, error, data } = useQuery(GET_USER,{
    variables: {id: id},
    fetchPolicy: "no-cache",
  });

  //When the component mounts to the VDOM, run this callback to load user profile data
  useEffect(() => {
    console.log("In use effect");
    if (data){
     console.log("Data is: " + JSON.stringify(data));
     setUserData(data.user);
    }
  },[data])

  if (error ){
    console.log(error);
    return <h2>Error...</h2>
  }

  console.log("User Data: " + JSON.stringify(userData));

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("Field name value is: " + name + ":" + value);
    console.log("Field name checked is: " + event.target.checked);
    let newValue = value;
    // convert checked to boolean
    if (name === 'getEmailReminders' || name === 'getSMSReminders'){
      let checked = event.target.checked;
      console.log("Checked: " + name + ":" + checked);
      //newValue =  (value === "on"? true:false); 
      newValue = checked;
      console.log("reminder value is: " + name + ":" + newValue);
    }
    setUserData({ ...userData, [name]: newValue });
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
      const { user } = await saveUser({
        variables: { ...userData },
      });
      console.log("User Data Saved: " + user)
      setShowSuccessAlert(true);

    } catch (e) {
      console.log("Error Saving User: " +e);
      console.log("Error Details:" + JSON.stringify(e, null, 2));
      console.error(e);
      setShowAlert(true);
    }

    // setUserData({
    //   username: '',
    //   email: '',
    //   getEmailReminders: false,
    //   getSMSReminders: false,
    // });
};

if (loading ){
  console.log("Returning Loading");
  return <h2>Loading...</h2>
}

return (
  <>
    {/* This is needed for the validation functionality above */}
    <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
      {/* show alert if server response is bad */}
      <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
        An error occurred saving the User!
      </Alert>
      <Alert dismissible onClose={() => setShowSuccessAlert(false)} show={showSuccessAlert} variant='success'>
        Saved the User!
      </Alert>
      <h2 className="formTitle"> User Profile Form</h2>
      <Form.Group className='mb-3 profileForm'>
        <Form.Label htmlFor='username'>User Name</Form.Label>
        <Form.Control
          type='text'
          placeholder='User Name'
          name='username'
          onChange={handleInputChange}
          readOnly
          value={userData.username}
          required
        />
        <Form.Control.Feedback type='invalid'>user name is required!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-3 profileForm'>
        <Form.Label htmlFor='email'>Email</Form.Label>
        <Form.Control
          type='text'
          placeholder='email'
          name='email'
          onChange={handleInputChange}
          readOnly
          value={userData.email}
          required
        />
        <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className='mb-3 profileForm'>
        <Form.Label htmlFor='getEmailReminders'>Get Email Reminders of Upcoming Sessions</Form.Label>
        <Form.Check
          type='checkbox'
          name='getEmailReminders'
          onClick={handleInputChange}
          required
          defaultChecked={userData.getEmailReminders}
        />
      </Form.Group>
      <Form.Group className='mb-3 profileForm'>
        <Form.Label htmlFor='getSMSReminders'>get SMS Reminders of Upcoming Sessions</Form.Label>
        <Form.Check
          type='checkbox'
          name='getSMSReminders'
          onClick={handleInputChange}
          required
          defaultChecked = {userData.getSMSReminders}
        />
      </Form.Group>
       
      <Button className='profileSubmit'
        type='submit'
        variant='success'>
        Submit
      </Button>
    </Form>
  </>
);

};

export default ProfileForm;
