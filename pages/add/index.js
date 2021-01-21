import React, { useState } from 'react';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import apiRequest from '../api/actionsAPI';
import { Form, Button } from 'react-bootstrap';
import { addAction } from '../../store/actions/postAction';
const AddStatus = (props) => {
    const today = new Date();
    const router = useRouter();
    const dispatch = useDispatch();
    let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + '__Time:' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const [dataNew, setDataNew] = useState({})
    const handleAddContent = (e) => {
        const { name } = e.target;
        setDataNew({ ...dataNew, [name]: e.target.value, date: date })
    }
    const onHandleClick = async () => {
        const { content, title, description } = dataNew || ""
        if (content && title && description !== "") {
            try {
                const { data } = await apiRequest.addAPI(dataNew);
                const action = addAction(data)
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
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Title </Form.Label>
                    <Form.Control minLength={1} maxLength={128} name="title" type="title" placeholder="Title" required onChange={handleAddContent} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlInput2">
                    <Form.Label>Description </Form.Label>
                    <Form.Control minLength={1} maxLength={128} name="description" type="title" placeholder="Description" required onChange={handleAddContent} />
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Content </Form.Label>
                    <Form.Control minLength={1} maxLength={128} name="content" type="title" placeholder="Content" required as="textarea" rows={5} onChange={handleAddContent} />
                </Form.Group>
                <Button variant="primary" onClick={onHandleClick}>
                    Submit
            </Button>
            </Form>
        </div>
    )
}
export default AddStatus