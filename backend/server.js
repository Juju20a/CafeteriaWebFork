import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());


let clients = [];


app.get('/clients', (req, res) => {
  res.json(clients);
});


app.post('/clients', (req, res) => {
  const newClient = req.body;
  clients.push(newClient);
  res.status(201).json(newClient);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
