import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Badge, Button, Col, Container, Form, Modal, Row, Table } from 'react-bootstrap';

function App() {

  const initialData = {
    title: '',
    status: false
  }

  const [todos, setTodos] = useState([])
  const [show, setShow] = useState(false);
  const [data, setData] = useState(initialData)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
  })

  const handleChange = (type, value) => {
    setData({ type: value })
  }

  const handleClick = (e) => {
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        title: data.title,
        status: data.status
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    handleClose()
  }

  return (
    <>
      <Container>
        <Row className='mt-3'>
          <Col className=''>
            <h1>Todos list</h1>
            <Button variant="primary" onClick={handleShow}>
              New todo
            </Button>
          </Col>
        </Row>
        <Row className='mt-3'>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th className="text-center">UserID</th>
                  <th className="text-center">Title</th>
                  <th className="text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {todos.map((todo) =>
                  <tr key={todo.id}>
                    <td>{todo.id}</td>
                    <td>{todo.userId}</td>
                    <td>{todo.title}</td>
                    <td>{todo.completed ? (<Badge pill bg="success">Completed</Badge>) : <Badge pill bg="danger">Uncomplete</Badge>}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleClick}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter todo" onChange={(e) => handleChange('title', e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="status">
              <Form.Check
                type="switch"
                id="custom-switch"
                label="status"
                onChange={(e) => handleChange('status', e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </>

  );
}

export default App;
