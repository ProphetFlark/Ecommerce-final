import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../Redux/Actions/ProductActions";
import styled from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navar = styled.div`
  display: flex;
  width: 100vw;
  height: 50px;
  background: #7a7a7a;
  align-items: center;
  color: white;
`;
const Asd = styled(Link)`
  text-decoration: none;
  color: #f8f9fa;
  font-size: 20px;
  transition: 200ms;
  margin: 20px;
  justify-content: space-around;
  &:hover {
    color: #a5b7d4;
  }
`;
const Form = styled.form`
  display: block;
  width: 100vw;
  height: 410px;
  align-items: center;
  justify-content: center;
  text-align: center;
 font-family: monospace;
 background: #f8f9fa;
`;
const Ingresopro = styled.input`
font-family: monospace;
  width: 300px;
  height: 40px;
  background-color: #ffff;
  border-radius: 5px;
  font-size: 20px;
  padding: 10px 5px;
  margin: 10px;
  transition: 200ms;
  &:hover {
    color: #213046;
  }
  &::placeholder {
    color: #999999;
  }
`;

const notify =()=>
{
  toast.success("Agregado con exito", {position:toast.POSITION.TOP_RIGHT})
}
const ShopSection = (props) => {
  const { keyword, pagenumber } = props; // Desestructuración de las propiedades `keyword` y `pagenumber` del objeto `props`
  const dispatch = useDispatch(); // Se obtiene la función `dispatch` de Redux para despachar acciones

  const productList = useSelector((state) => state.productList); // Se obtiene el estado `productList` de la tienda utilizando el hook `useSelector`
  const { userInfo } = useSelector((state) => state.userLogin); // Se obtiene el estado `userLogin` de la tienda y se extrae `userInfo`


  useEffect(() => {
    dispatch(listProduct(keyword, pagenumber)); // Se despacha la acción `listProduct` utilizando `dispatch` cuando se monta el componente o cuando `keyword` o `pagenumber` cambian
  }, [dispatch, keyword, pagenumber]);

  const [newProduct, setNewProduct] = useState({ // Se define un estado `newProduct` con un objeto inicial
    name: "",
    image: "",
    description: "",
    rating: 0,
    numReviews: 0,
    price: "",
    countInStock: "",
  });

  const handleInputChange = (e) => { // Función para manejar el cambio en los campos de entrada
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = async (e) => { // Función asincrónica para manejar la adición de un nuevo producto
    e.preventDefault();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`, // Se agrega el token de autorización en los encabezados de la solicitud
      },
    };

    await axios.post("/api/products/create", newProduct, config); // Realizar una solicitud POST para crear un nuevo producto utilizando `axios`

    // Restablecer los campos de entrada
    setNewProduct({
      name: "",
      image: "",
      description: "",
      rating: 0,
      numReviews: 0,
      price: 0,
      countInStock: 0,
    });
  };
  // ... (resto del componente)
  return (
    <>
      <Navar>
        <Asd to="/Admin">Regresar</Asd>
      </Navar>
      <Form onSubmit={handleAddProduct}>
        <h2>Ingreso de nuevo prodcto</h2>
        <div>
          <Ingresopro
            type="text"
            name="name"
            placeholder="Nombre"
            value={newProduct.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Ingresopro
            type="text"
            name="image"
            placeholder="URL de la imagen"
            value={newProduct.image}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Ingresopro
            type="text"
            name="description"
            placeholder="Descripción"
            value={newProduct.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Ingresopro
            type="number"
            name="price"
            placeholder="Precio"
            value={newProduct.price}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Ingresopro
            type="number"
            name="countInStock"
            placeholder="Cantidad en stock"
            value={newProduct.countInStock}
            onChange={handleInputChange}
          />
        </div>
        <button  
        class="btn btn-outline-success"
        onClick={notify}
        type="submit">Agregar
        </button>
        <ToastContainer/>
      </Form>
      
    </>
  );
};

export default ShopSection;
