import axios from 'axios';
import { useState } from 'react';
import { Table, Button, Alert, Form } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { calculateGradeAverageNum } from "../utils/calculations"
import { IStudentWithSubjects } from '../utils/IStudents';


interface Props {
  data : IStudentWithSubjects[]
}

export function OverviewStudents({ data }: Props) {
  const [studentFilter, setStudentFiltered] = useState<string | null>(null);
  const filteredStudents = !!studentFilter && studentFilter.length > 0 ?
    data.filter((students) => students.firstName.toLowerCase().includes(studentFilter.toLowerCase())) : data

  const handleToDelete = (studentId: number | undefined) => {
    try {
      axios.delete(`http://localhost:5117/Student/${studentId}`);
      <Alert key={'success'} variant='success'>Student Deleted Sucesfully</Alert>
    } catch (e) {
      <Alert key={'sucess'} variant='danger'>Error</Alert>
    }
  }

  return (
    <main>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Filter for student name"
          onChange={(e) => {
            setStudentFiltered(e.target.value)
          }}
        />
      </Form.Group>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Spanish Language</th>
            <th>Mathematics</th>
            <th>Social Science</th>
            <th>Natural Science</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredStudents.map((students) => {
              return (
                <tr key={students.studentId}>
                  <td>{`${students.firstName} ${students.lastName}`}</td>
                  <td>{calculateGradeAverageNum(students.spanishLanguage)}</td>
                  <td>{calculateGradeAverageNum(students.mathematics)}</td>
                  <td>{calculateGradeAverageNum(students.socialSciences)}</td>
                  <td>{calculateGradeAverageNum(students.naturalSciences)}</td>
                  <td>
                    <Button onClick={() => { handleToDelete(students.studentId) }} size="sm"><FaTrash className="delete-icon" /></Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </main>
  );
}
