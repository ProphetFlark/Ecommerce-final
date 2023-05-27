import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import Rating from "../components/homeComponents/Rating";
import Message from "./../components/LoadingError/Error";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails } from "../Redux/Actions/ProductActions";
import Loading from "../components/LoadingError/Loading";

const SingleProduct = ({ history, match }) => {
  const [qty, setQty] = useState(1);

  const productId = match.params.id;
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successCreateReview } = productReviewCreate;

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch, productId, successCreateReview]);

  const AddToCartHandle = (e) => {
    e.preventDefault();
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <>
      <Header />
      <div className="container single-product">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="single-image">
                  <img src={product.image} alt={product.name} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                  </div>
                  <p>{product.description}</p>

                  <div className="product-count col-lg-7 ">
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Precio</h6>
                      <span>Q. {product.price}.00</span>
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Disponibilidad</h6>
                      {product.countInStock > 0 ? (
                        <span>En stock</span>
                      ) : (
                        <span>No disponible</span>
                      )}
                    </div>
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Reseñas</h6>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </div>
                    {product.countInStock > 0 ? (
                      <>
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>Cantidad</h6>
                          <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <button
                          onClick={AddToCartHandle}
                          className="round-black-btn"
                        >
                          Añadir al carrito
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
