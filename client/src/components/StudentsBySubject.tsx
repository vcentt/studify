import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react"
import { FaEdit } from 'react-icons/fa';
import { Button, Form, Table } from "react-bootstrap";
import { ModalModify } from "./ModalModify";
import { calculateGradeAverage } from "../utils/calculations"
import { IStudent } from "../utils/IStudents";

interface Props {
    subjectId: number | undefined
}

export function StudentsBySubject({ subjectId }: Props) {
    const [showModal, setShowModal] = useState(false);
    const [selectedStudentId, setSelectedStudentId] = useState<number>();
    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = (studentId: number) => {
        setSelectedStudentId(studentId);
        setShowModal(true);
    };
    const [allStudent, setAllStudent] = useState<IStudent[]>([]);

    //To Filter
    const [studentFilter, setStudentFiltered] = useState<string | null>(null);
    const filteredStudents = !!studentFilter && studentFilter.length > 0 ?
        allStudent.filter((students) => students.firstName.toLowerCase().includes(studentFilter.toLowerCase())) : allStudent

    useEffect(() => {
        axios.get(`http://localhost:5117/Grade/${subjectId}`)
            .then((response: AxiosResponse) => {
                setAllStudent(response.data)
            })
    }, [subjectId])

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
                        <th>Score</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredStudents.map((student) => {
                            return (
                                <tr key={student.studentId}>
                                    <td>{`${student.firstName} ${student.lastName}`}</td>
                                    <td>{calculateGradeAverage(student.grade)}</td>
                                    <td>
                                        <Button onClick={() => { handleShowModal(student.studentId) }} size="sm" className="mr-2"><FaEdit className="edit-icon" /></Button>
                                        <ModalModify
                                            studentId={Number(selectedStudentId)}
                                            subjectId={Number(subjectId)}
                                            showModal={showModal}
                                            handleCloseModal={handleCloseModal}
                                        />
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
