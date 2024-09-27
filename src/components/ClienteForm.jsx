import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const ClientForm = ({ onClose, onAddClient }) => {
  const [client, setClient] = useState({
    nome: '',
    email: '',
    nascimento: '',
    cep: ''
  });

  const [errors, setErrors] = useState({});

  // Função para manipular os inputs
  const handleChange = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value
    });
  };

  // Função para validar os campos
  const validate = () => {
    const newErrors = {};
    if (!client.nome) newErrors.nome = 'Nome é obrigatório';
    if (!client.email || !/\S+@\S+\.\S+/.test(client.email)) newErrors.email = 'Email inválido';
    if (!client.nascimento) newErrors.nascimento = 'Data de nascimento é obrigatória';
    if (!client.cep || !/^\d{5}-?\d{3}$/.test(client.cep)) newErrors.cep = 'CEP inválido';

    return newErrors;
  };

  // Função para enviar o formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Submeter o cliente via POST
    axios.post('/api/clientes', client) // Alterar para sua URL de API
      .then(response => {
        onAddClient(response.data);
      })
      .catch(error => console.error('Erro ao adicionar cliente:', error));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formNome">
        <Form.Label>Nome</Form.Label>
        <Form.Control
          type="text"
          placeholder="Digite o nome"
          name="nome"
          value={client.nome}
          onChange={handleChange}
          isInvalid={!!errors.nome}
        />
        <Form.Control.Feedback type="invalid">{errors.nome}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Digite o email"
          name="email"
          value={client.email}
          onChange={handleChange}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formNascimento">
        <Form.Label>Data de Nascimento</Form.Label>
        <Form.Control
          type="date"
          name="nascimento"
          value={client.nascimento}
          onChange={handleChange}
          isInvalid={!!errors.nascimento}
        />
        <Form.Control.Feedback type="invalid">{errors.nascimento}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formCep">
        <Form.Label>CEP</Form.Label>
        <Form.Control
          type="text"
          placeholder="Digite o CEP"
          name="cep"
          value={client.cep}
          onChange={handleChange}
          isInvalid={!!errors.cep}
        />
        <Form.Control.Feedback type="invalid">{errors.cep}</Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Cadastrar
      </Button>
      <Button variant="secondary" onClick={onClose} className="ml-2">
        Cancelar
      </Button>
    </Form>
  );
};

export default ClientForm;

