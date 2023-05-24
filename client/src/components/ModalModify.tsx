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

    axios.put('http://localhost:5117/Grade', studentUpdated)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });

      handleCloseModal();
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Grade:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="grade">
            <Form.Label>Grade:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter the grade"
              value={grade}
              onChange={e => setGrade(Number(e.target.value))}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Send
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}