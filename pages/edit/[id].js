import React, { useState } from 'react';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import apiRequest from '../api/actionsAPI';
import { Form, Button } from 'react-bootstrap';
import { updateAction } from '../../store/actions/postAction';
const EditStatus = ({ student }) => {
    const statusEdit = student
    const today = new Date();
    const router = useRouter();
    const dispatch = useDispatch();
    let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + '-' + today.getHours() + '-' + today.getMinutes() + '-' + today.getSeconds();
    const [dataNew, setDataNew] = useState(student)
    const [id, setId] = useState(student.id)
    const handleAddContent = (e) => {
        const { name } = e.target;
        setDataNew({ ...dataNew, [name]: e.target.value, date: date, id })
    }
    const onHandleClick = async () => {
        const { content, title, description } = dataNew || ""
        if (content && title && description !== "") {
            try {
                const { data } = await apiRequest.updateAPI(id, dataNew);
                const action = updateAction(data)
                dispatch(action)
                alert("Success");
                router.push("/", undefined, { shallow: true });
            }
            catch (error) {
                alert("You have an error");
            }
        }
        else {
            alert("Not empty");
        };
    }

    return (
        <div className="from-add">
            <div>
                <Button style={{ marginBottom: "30px" }} variant="secondary" onClick={() => router.push("/")}>
                    back
                </Button>
            </div>
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Title </Form.Label>
                    <Form.Control defaultValue={statusEdit.title} minLength={1} maxLength={128} name="title" type="title" placeholder="Title" required onChange={handleAddContent} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>Description </Form.Label>
                    <Form.Control minLength={1} maxLength={128} defaultValue={statusEdit.description} name="description" type="title" placeholder="Description" required onChange={handleAddContent} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Content </Form.Label>
                    <Form.Control minLength={1} maxLength={128} name="content" defaultValue={statusEdit.content} type="title" placeholder="Content" required as="textarea" rows={5} onChange={handleAddContent} />
                </Form.Group>
                <Button variant="primary" onClick={onHandleClick}>
                    Submit
            </Button>
            </Form>

        </div>
    )
};
EditStatus.getInitialProps = async (idEdit) => {
    const { id } = idEdit.query;
    const res = await fetch(`https://5ff2c99828c3980017b189ba.mockapi.io/localhost3001/item/blogs/${id}`);
    const json = await res.json();
    return { student: json }
}

export default EditStatus