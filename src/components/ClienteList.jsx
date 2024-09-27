import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Alert } from 'react-bootstrap';
import axios from 'axios';
import ClientForm from './ClientForm'; // Ensure this component exists

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null); // State for error handling

  // Fetch client data
  useEffect(() => {
    axios.get('/api/clientes') // Update to your API URL
      .then(response => {
        setClients(response.data);
        setError(null); // Clear error on successful fetch
      })
      .catch(error => {
        console.error('Erro ao buscar os clientes:', error);
        setError('Não foi possível carregar os clientes.'); // Set error message
      });
  }, []);

  // Open modal
  const handleAddClient = () => {
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Add new client to the list
  const addClientToList = (newClient) => {
    setClients(prevClients => [...prevClients, newClient]);
    setShowModal(false);
  };

  return (
    <div>
      <Button className="m-2" variant="primary" onClick={handleAddClient}>
        +
      </Button>

      {error && <Alert variant="danger">{error}</Alert>} {/* Error alert */}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Nascimento</th>
            <th>CEP</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.nome}</td>
              <td>{client.email}</td>
              <td>{client.nascimento}</td>
              <td>{client.cep}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for the form */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ClientForm onClose={handleCloseModal} onAddClient={addClientToList} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ClientList;
