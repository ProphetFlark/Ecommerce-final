import axios from "axios";
import { useEffect, useState } from "react";
import { getOrderDetails1 } from "../Redux/Actions/OrderActions";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
const Conteinerpadre = styled.div`
  width: 100vw;
  height: 100vh;
  background: #f8f9fa;
  margin: 0px 10px; /* Margen exterior */
  box-sizing: border-box; /* Incluye el padding en el ancho y alto total */
`;

const Btn = styled.button`
  margin-right: 10px;
  font-family: Arial;
  color: #ffffff;
  font-size: 20px;
  padding: 10px;
  text-decoration: none;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
  -webkit-box-shadow: 3px 1px 10px #666666;
  -moz-box-shadow: 3px 1px 10px #666666;
  box-shadow: 3px 1px 10px #666666;
  text-shadow: 3px 3px 13px #000000;
  border: solid #a6738a 0px;
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#b6b8ba), to(#b3b7ba));
  background: -moz-linear-gradient(top, #b6b8ba, #b3b7ba);
  &:hover {
    background: #54534d;
  }
`;

const ProductsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 800px;
  height: 500px;
  background: #ffffff;
  border-radius: 8px;
  margin: 10px 0px;
`;

const CardContainer = styled.div`
  width: 400px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  height: 330px;
`;

const CardTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 8px;
  font-family: monospace;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;
const StyledParagraph = styled.p`
  margin-bottom: 10px;
  margin: 10px;
  font-size: 20px;
  font-family: monospace;
  color: #008140;
`;
const StyledP = styled.p`
  font-size: 20px;
  font-family: monospace;
  color: #008140;
`;
const AdminOrder = () => {
  const id = document.URL; // Obtiene la URL actual del documento
  const orderId = id.split("/").at(-1); // Obtiene el ID del pedido de la URL dividiéndola por "/" y tomando el último elemento

  const dispatch = useDispatch(); // Se obtiene la función `dispatch` de Redux para despachar acciones

  const [loading, setLoading] = useState(true); // Estado para indicar si se está cargando o no
  const [order, setOrder] = useState([]); // Estado para almacenar los datos del pedido

  const fetchData = async () => {
    // Función asincrónica para obtener los datos del pedido
    try {
      // Realizar la llamada a la acción `getOrderDetails1` utilizando `dispatch` para obtener los datos del pedido
      const perros = await dispatch(getOrderDetails1(orderId));
      setOrder(perros); // Se actualiza el estado `order` con los datos del pedido obtenidos
      setLoading(false); // Se cambia el estado `loading` a `false` para indicar que se ha terminado de cargar
    } catch (error) {
      console.log(error); // Si ocurre un error, se muestra en la consola
      setLoading(false); // Se cambia el estado `loading` a `false` para indicar que se ha terminado de cargar
    }
  };

  useEffect(() => {
    fetchData(); // Se llama a la función `fetchData` cuando se monta el componente o cuando `dispatch` cambia
  }, [dispatch]);

  const toPay = async () => {
    // Función asincrónica para marcar el pedido como pagado
    await axios.put(`/api/getAllOrders/${orderId}/pay`); // Realizar una solicitud PUT para marcar el pedido como pagado
    fetchData(); // Volver a obtener los datos del pedido después de marcarlo como pagado
  };

  const sent = async () => {
    // Función asincrónica para marcar el pedido como enviado
    await axios.put(`/api/getAllOrders/${orderId}/delivered`); // Realizar una solicitud PUT para marcar el pedido como enviado
    fetchData(); // Volver a obtener los datos del pedido después de marcarlo como enviado
  };
  // ... (resto del componente)
  return (
    <div>
      <Navar>
        <Asd
          //className="btn btn-primary"
          to="/Admin"
        >
          Regresar
        </Asd>
      </Navar>
      <Conteinerpadre>
        {loading ? (
          <div className="mb-5">Loading...</div>
        ) : (
          <div>
            <CardContainer>
              <CardTitle> Productos del usuario</CardTitle>
              <CardTitle>Codigo del usuario: </CardTitle>
              <StyledP>{orderId}</StyledP>
              <CardTitle>Nombre del usuario: </CardTitle>
              <StyledP> {order.user.name}</StyledP>
              <CardTitle>Correo del usuario: </CardTitle>
              <StyledP> {order.user.email} </StyledP>
              <CardTitle>
                Direccion del usuario:
                <StyledP>{order.shippingAddress.address}</StyledP>
              </CardTitle>
              <CardTitle>Orden del usuario:</CardTitle>
            </CardContainer>
            <ProductsContainer>
              {order.orderItems.map((product, key) => (
                <OrderProduct product={product} key={key} />
              ))}
            </ProductsContainer>
            <ButtonContainer>
              {!order.isPaid ? (
                <Btn onClick={toPay}>Pagado</Btn>
              ) : (
                <StyledParagraph>¡¡¡Pagado!!!</StyledParagraph>
              )}
              {!order.isDelivered ? (
                <Btn onClick={sent}>Entregado</Btn>
              ) : (
                <StyledParagraph>¡¡¡Entregado!!!</StyledParagraph>
              )}
            </ButtonContainer>
          </div>
        )}
      </Conteinerpadre>
    </div>
  );
};

const OrderProductCard = styled.div`
  display: inline-block;
  margin-right: 32px;
  width: 200px;
  height: 350px;
  border: 2px solid white;

  img {
    width: 100%;
    height: 100%;
  }
`;

function OrderProduct({ product }) {
  return (
    <OrderProductCard>
      <figure>
        <img width="200" height="200" src={product.image} alt={product.name} />
      </figure>
      <div>
        <h3>{product.name}</h3>
        <div>
          <p>Precio {product.price}</p>
          <span>Cantidad {product.qty}</span>
        </div>
      </div>
    </OrderProductCard>
  );
}
export default AdminOrder;
