import axios from 'axios';
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const AddStudent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const studentData = {
      firstName,
      lastName
    };

    axios.post('http://localhost:5117/Student', studentData)
      .then(response => {
        console.log(response.data);
        setShowAlert(true)
        setAlertType("success")
      })
      .catch(error => {
        console.error(error);
        setShowAlert(true)
        setAlertType("error")
      });

  };

  return (
    <main>
      <div className='main-form-add-student'>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese primer nombre"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese segundo nombre"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">Add Student</Button>
        </Form>
        {showAlert && (
          <Alert variant={alertType === 'success' ? 'success' : 'danger'}>
            {alertType === 'success' ? 'Student created sucesfully' : 'There was an error in creating the student'}
          </Alert>
        )}
      </div>
    </main>
  );
};

export default AddStudent;
