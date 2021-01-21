import Head from 'next/head';
import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { fetchposts, deleteAction } from '../store/actions/postAction';
import apiRequest from './api/actionsAPI'
import Link from 'next/link';
import { useRouter } from "next/router";
import { Table, Card, Button } from 'react-bootstrap'
import 'antd/dist/antd.css';
import AddStatus from "./add"
const Home = ({ student }) => {
  const [dateA, setDateA] = useState([])
  const store = useStore();
  const dataTodo = student
  const router = useRouter();
  const [bkCheck, setBkCheck] = useState({})
  const { posts } = useSelector((state) => {
    return state => console.log(state, "paser log??????????????????????");
  });
  const [dataCheck, setDataCheck] = useState(false);
  const dispatch = useDispatch();
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
  const handleDelete = async (id) => {
    try {
      const { data } = await apiRequest.deleteAPI(id);
      const actionDelete = deleteAction(data)
      dispatch(actionDelete)
      if (data) onHandleClick()
    }
    catch (error) {
    }
  }
  const handleEdit = (id) => {
    router.push(`/edit/${id}`);
  }
  const showCrad = () => {
    const { date, content, title, description, id } = bkCheck || ''
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
            <Button variant="danger" onClick={() => handleDelete(id)} >Delete</Button>
          </div>
        </Card>
      </div>)
  }
  const setViewHandle = (items) => {
    setBkCheck(items)
    setDataCheck(true)
  }
  const viewHandle = (items, keys) => {
    return (
      <tr key={keys} onClick={() => setViewHandle(items)}>

        <td>{items.title}</td>

      </tr>
    )
  }
  return (
    <div className="flex-screen" >
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
  )
}
Home.getInitialProps = async () => {
  const res = await fetch('https://5ff2c99828c3980017b189ba.mockapi.io/localhost3001/item/blogs');
  const json = await res.json();
  return { student: json.items }
}


export default Home

// <Table style={{margin:'3rem'}} rowKey={obj => obj.id} dataSource={dateA} columns={columns} />;