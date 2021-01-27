import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { fetchposts, deleteAction } from '../store/actions/postAction';
import apiRequest from './api/actionsAPI';
import { useRouter } from "next/router";
import { Table, Card, Button, Modal, Alert } from 'react-bootstrap';
import { useAuth0 } from "@auth0/auth0-react";
import 'antd/dist/antd.css';
import Comfirm from './header/comfirm';
const Home = ({ student }) => {
    const [dateA, setDateA] = useState([])
    const store = useStore();
    const dataTodo = student
    const router = useRouter();
    const [bkCheck, setBkCheck] = useState({})
    // const { store } = useSelector((state) => console.log("store"));
    const [dataCheck, setDataCheck] = useState(false);
    const dispatch = useDispatch();
    const [showModalComfirm, setShowModalComfirm] = useState(false);
    const [id, setId] = useState();
    const { isAuthenticated, isLoading } = useAuth0();
    useEffect(() => {
        setDateA(student)
        onHandleClick()
    }, [])
    const onHandleClick = async (pages) => {
        try {
            const newStudent = {
                ...pages,
            };
            const { data } = await apiRequest.getallAPI(newStudent);
            const action = fetchposts(data)
            dispatch(action)
            setDateA(data.items ? data.items : dataTodo)
            setBkCheck({})
            setDataCheck(false)
        }
        catch (error) {
        }
    }
    const handleShowConfirm = (id) => {
        setId(id);
        setShowModalComfirm(true)
    }
    const handleDelete = async () => {
        try {
            const { data } = await apiRequest.deleteAPI(id);
            const actionDelete = deleteAction(data)
            dispatch(actionDelete)
            setShowModalComfirm(false)
            alert("Success");

            if (data) onHandleClick()
        }
        catch (error) {
            alert("error");
        }
    }
    const handleEdit = (id) => {
        router.push(`/edit/${id}`);
    }
    const showCrad = () => {
        const { date, content, title, description, id } = bkCheck || ''


        if (isLoading) {
            return <div>Loading ...</div>;
        }

        return (
            <div className="table-title">
                <Card className="blog-item" text="black">
                    <Card.Body>
                        <div className="flex-row-title">
                            <Card.Title >{title}</Card.Title>
                            <div >
                                <Card.Title > <Button variant="light" onClick={() => setDataCheck(false)}  >Close</Button></Card.Title>
                                <Card.Title > <Button variant="secondary" onClick={() => handleEdit(id)}>Edit</Button></Card.Title>
                            </div>
                        </div>
                        <Card.Text >
                            {description}
                        </Card.Text>
                        <Card.Text >
                            {content}
                        </Card.Text>
                        <small style={{ display: "flex", alignSelf: 'flex-end' }} className="text-muted">{date}</small>
                    </Card.Body>

                    <div className="button-handle">
                        <Button variant="danger" onClick={() => handleShowConfirm(id)} >Delete</Button>
                    </div>
                </Card>


                <Modal show={showModalComfirm}>
                    <Modal.Header closeButton onClick={() => setShowModalComfirm(false)}>
                        <Modal.Title>
                            do you want to delete?
                            </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="list-task">
                            <Button className="btn btn-danger" onClick={handleDelete}>Yes </Button>
                            <Button onClick={() => setShowModalComfirm(false)}>No</Button>
                        </div>
                    </Modal.Body>

                </Modal>
            </div>)
    }
    const setViewHandle = (items) => {
        setBkCheck(items)
        setDataCheck(true)

    }
    const viewHandle = (items, keys) => {
        return (
            <tr key={keys} onClick={() => setViewHandle(items)}>

                <td><a href="#"> {items.title}</a>
                    <td>{items.date}</td>
                </td>

            </tr >
        )
    }




    return (
        <div>
            {isAuthenticated ?
                <div className="flex-screen" hidden={!isAuthenticated}>
                    {(dataCheck) ?
                        showCrad()
                        : null
                    }
                    <Table className={dataCheck ? "table-style-true" : "table-style-false"} striped bordered hover size="50" >
                        <thead>
                            <tr>
                                <th><Button variant="info" onClick={() => { router.push("/add", undefined, { shallow: true }) }} > Add</Button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dateA.map((item, key) => {
                                    return (
                                        viewHandle(item, key)
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
                :
                <Comfirm />
            }
        </div>
    )
}
Home.getInitialProps = async () => {
    const res = await fetch('https://5ff2c99828c3980017b189ba.mockapi.io/localhost3001/item/blogs');
    const json = await res.json();
    return { student: json.items }
}


export default Home

// <Table style={{margin:'3rem'}} rowKey={obj => obj.id} dataSource={dateA} columns={columns} />;