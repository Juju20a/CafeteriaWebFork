import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './templates/Layout';
import Home from './views/Home';
import NoPage from './views/NoPage';
import Login from './views/Login';
import CardapioYupFormik from './views/CardapioYupFormik';
import ClientList from './components/ClientList';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cardapio" element={<CardapioYupFormik />} />
          <Route path="login" element={<Login />} />
          <Route path="clientes" element={<ClientList />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
