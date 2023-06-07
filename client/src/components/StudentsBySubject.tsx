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
    const [allStudent, setAllStudent] = useState<IStudent[]>([]);
    useEffect(() => {
        axios.get(`https://studify.azurewebsites.net/Grade/${subjectId}`)
            .then((response: AxiosResponse) => {
                setAllStudent(response.data)
            })
    }, [subjectId])


    //To Filter
    const [studentFilter, setStudentFiltered] = useState<string | null>(null);
    const filteredStudents = !!studentFilter && studentFilter.length > 0 ?
        allStudent.filter((students) => students.firstName.toLowerCase().includes(studentFilter.toLowerCase())) : allStudent

    const [modalVisibility, setModalVisibility] = useState<{ [key: number]: boolean }>({});

    const handleCloseModal = (studentId: number) => {
        setModalVisibility((prevVisibility) => ({
            ...prevVisibility,
            [studentId]: false
        }));
    };

    const handleShowModal = (studentId: number) => {
        setModalVisibility((prevVisibility) => ({
            ...prevVisibility,
            [studentId]: true
        }));
    };

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
                        <th>Literal</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredStudents.map((student) => {
                            return (
                                <tr key={student.studentId}>
                                    <td>{`${student.firstName} ${student.lastName}`}</td>
                                    <td>{student.grade}</td>
                                    <td>{calculateGradeAverage(student.grade)}</td>
                                    <td>
                                        <Button onClick={() => { handleShowModal(student.studentId) }} size="sm" className="mr-2"><FaEdit className="edit-icon" /></Button>
                                        <ModalModify
                                            studentId={Number(student.studentId)}
                                            subjectId={Number(subjectId)}
                                            showModal={modalVisibility[student.studentId]}
                                            handleCloseModal={() => {
                                                handleCloseModal(student.studentId)
                                            }}
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
