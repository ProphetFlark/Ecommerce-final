import React, { useEffect, useState } from "react";
import { getAllOrders } from "../Redux/Actions/ProductActions";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Navar = styled.div`
  display: flex;
  width: 100vw;
  height: 50px;
  background: #7a7a7a;
  justify-content: space-around;
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
const Conteinerpadre = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f8f9fa;
`;
const AsdL = styled(Link)`
  text-decoration: none;
  color: #212529;
  font-size: 21px;
  transition: 200ms;
  margin: 20px;
  justify-content: space-around;
  &:hover {
    color: #a5b7d4;
  }
`;

const Admin = () => {
  const dispatch = useDispatch(); // Se obtiene la función `dispatch` de Redux para despachar acciones

  const [loading, setLoading] = useState(true); // Estado para indicar si se está cargando o no
  const [datos, setDatos] = useState([]); // Estado para almacenar los datos obtenidos

  useEffect(() => {
    const fetchData = async () => {
      // Función asincrónica para obtener los datos
      const perros = await dispatch(getAllOrders()); // Se despacha la acción `getAllOrders` utilizando `dispatch` y se espera la respuesta
      setDatos(perros); // Se actualiza el estado `datos` con los datos obtenidos
      //console.log(JSON.parse(localStorage.getItem("userInfo"))); // Se muestra en la consola el contenido del objeto `userInfo` almacenado en el localStorage
    };

    fetchData(); // Se llama a la función `fetchData` cuando se monta el componente (usando un arreglo de dependencias vacío)
  }, []);
  // ... (resto del componente)
  return (
    <Conteinerpadre>
      <Navar>
        <nav className="navbar bg-body-tertiary">
          <div className="container-fluid">
            <p className="navbar-brand" style={{ color: "#212529" }}>
              {" "}
              PANEL DEL ADMINISTRADOR
            </p>
            <Asd to="/ProductAdmin">Ingresar nuevo producto</Asd>
            <Asd to="/">Regresar</Asd>
          </div>
        </nav>
      </Navar>

      <ul className="list-group d-flex">
        {datos.map((orden) => (
          <li
            className="list-group-item d-flex justify-content-between mx-5 px-5 align-items-center"
            key={orden._id}
          >
            {orden.user.name} - {orden.user.email}
            <AsdL to={`/orderadmin/${orden._id}`}>Ver Orden</AsdL>
          </li>
        ))}
      </ul>
    </Conteinerpadre>
  );
};

export default Admin;
