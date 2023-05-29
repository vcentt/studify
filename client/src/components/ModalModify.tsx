import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

type Props = {
  studentId: number;
  subjectId: number;
  handleCloseModal: () => void;
  showModal: boolean;
};

export function ModalModify({ studentId, subjectId, showModal, handleCloseModal } : Props) {
  const [grade, setGrade] = useState<number>();

  const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const studentUpdated = {
      studentId,
      subjectId,
      grade
    };

    axios.put('https://studify.azurewebsites.net/Grade', studentUpdated)
      .then(response => {
        console.log(response.data);
        handleCloseModal();
      })
      .catch(error => {
        console.error(error);
        handleCloseModal();
      });
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Grade</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Grade:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter the grade"
              value={grade}
              onChange={(e) => {
                setGrade(parseInt(e.target.value))
              }}
            />
          </Form.Group>
          <br></br>
          <Button variant="primary" type="submit">
            Send
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}