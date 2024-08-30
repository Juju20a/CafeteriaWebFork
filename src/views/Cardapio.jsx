import { useState } from 'react';
import produtosDataSet from '../datasets/Produto';
import ComprasTable from '../components/ComprasTable';
import ProdutoForm from '../components/ProdutoForm';
import { Button, Modal } from 'react-bootstrap';

const Cardapio = () => {
  let [produtos, setProdutos] = useState([...produtosDataSet]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      
    </>
  );
};

export default Cardapio;
