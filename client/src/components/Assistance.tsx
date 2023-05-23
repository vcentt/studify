import { useState } from "react"
import axios, { AxiosResponse } from "axios"
import { Form, Table } from "react-bootstrap"

interface Student {
    studentId : number
    firstName: string,
    lastName : string,
    assistance : boolean
}

export function Assistance() {
    const [allStudent, setAllStudent] = useState<Student[]>([])

    axios.get('http://localhost:5117/Student')
        .then((response: AxiosResponse) => {
            setAllStudent(response.data)
        })

    return (
        <main>
            <Form.Group>
                <Form.Control
                    type="date"
                    placeholder="Filter for student name"
                    
                />
            </Form.Group>
            <Table striped bordered responsive>
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Assistance</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allStudent.map((student) => {
                            return (
                                <tr key={student.studentId}>
                                    <td>{`${student.firstName} ${student.lastName}`}</td>
                                    <td>
                                        {student.assistance === true ? "Present" : "Absent"}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </main>
    )
}