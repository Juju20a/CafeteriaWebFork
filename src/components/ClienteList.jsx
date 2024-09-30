import { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    datadeNascimento: '',
    cep: '',
  });

  
  useEffect(() => {
    axios.get('http://localhost:3000/clients')
      .then(response => setClients(response.data))
      .catch(error => console.error('Erro ao buscar clientes:', error));
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  // Validate form data
  const validateForm = () => {
    return newClient.name && newClient.email && newClient.birthDate && newClient.cep;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      axios.post('http://localhost:3000/clients', newClient)
        .then(response => {
          setClients([...clients, response.data]);
          setShowModal(false);
          setNewClient({ name: '', email: '', birthDate: '', cep: '' });
        })
        .catch(error => console.error('Erro ao adicionar cliente:', error));
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <div>
      <h2>Lista de Clientes</h2>
      <Button variant="primary" onClick={() => setShowModal(true)}>Adicionar +</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Data de Nascimento</th>
            <th>CEP</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => (
            <tr key={index}>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>{client.birthDate}</td>
              <td>{client.cep}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para Adicionar Cliente */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newClient.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newClient.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBirthDate">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={newClient.birthDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formCep">
              <Form.Label>CEP</Form.Label>
              <Form.Control
                type="text"
                name="cep"
                value={newClient.cep}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">Salvar</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ClientList;
