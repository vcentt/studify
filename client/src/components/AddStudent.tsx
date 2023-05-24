import axios from 'axios';
import { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const AddStudent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showAlert, setShow] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const studentData = {
      firstName,
      lastName
    };

    axios.post('http://localhost:5117/Student', studentData)
      .then(response => {
        console.log(response.data);
        <>
          <Alert show={showAlert} variant='success'>Student Create Successfully</Alert>
        </>
      })
      .catch(error => {
        console.error(error);
        <>
          <Alert show={showAlert} variant='danger'>Error</Alert>
        </>
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
              placeholder="Enter first name"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </Form.Group>
          <Button onClick={() => { setShow(true) }} variant="primary" type="submit">Add Student</Button>
        </Form>
      </div>
    </main>
  );
};

export default AddStudent;
