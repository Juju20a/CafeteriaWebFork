import React, { useState, useEffect } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import ClientForm from './ClientForm'; // Crie esse componente para o formulário

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Função para buscar os dados dos clientes
  useEffect(() => {
    axios.get('/api/clientes') // Alterar para sua URL de API
      .then(response => {
        setClients(response.data);
      })
      .catch(error => console.error('Erro ao buscar os clientes:', error));
  }, []);

  // Função para abrir o modal
  const handleAddClient = () => {
    setShowModal(true);
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Função para adicionar um cliente à lista após o envio do formulário
  const addClientToList = (newClient) => {
    setClients([...clients, newClient]);
    setShowModal(false);
  };

  const addClientToList = (newClient) => {
    setClients([...clients, newClient]);
    setShowModal(false);
  };

  return (
    <div>
      
       <Button className="m-2" variant="primary" onClick={handleShow}>
        +
      </Button>

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

      {/* Modal para o formulário */}
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

