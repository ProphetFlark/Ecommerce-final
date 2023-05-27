import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";

moment.locale();
moment().format("llll");

const Orders = (props) => {
  const { loading, error, orders } = props;
  return (
    <div className=" d-flex justify-content-center align-items-center flex-column">
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          {orders.length === 0 ? (
            <div className="col-12 alert alert-info text-center mt-3">
              Sin Órdenes
              <Link
                className="btn btn-success mx-2 px-3 py-2"
                to="/"
                style={{
                  fontSize: "12px",
                }}
              >
                ¡Comenzar a comprar!
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>ESTADO</th>
                    <th>FECHA</th>
                    <th>TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      className={`${
                        order.isPaid ? "alert-success" : "alert-danger"
                      }`}
                      key={order._id}
                    >
                      <td>
                        <a href={`/order/${order._id}`} className="link">
                          {order._id}
                        </a>
                      </td>
                      <td>{order.isPaid ? <>Pagado</> : <>No Pagado</>}</td>
                      <td>
                        {order.isPaid
                          ? moment(order.paidAt).calendar(null, {
                              sameDay: "[Hoy] hh:mm a",
                              lastDay: "[Ayer] hh:mm a",
                              sameElse: "DD/MM/YYYY",
                            })
                          : moment(order.createdAt).calendar(null, {
                              sameDay: "[Hoy] hh:mm a",
                              lastDay: "[Ayer] hh:mm a",
                              sameElse: "DD/MM/YYYY",
                            })}
                      </td>
                      <td>Q. {order.totalPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
