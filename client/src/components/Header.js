import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Actions/userActions";

const Header = () => {
  const [keyword, setKeyword] = useState();
  const dispatch = useDispatch();
  let history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <div>
      <div className="header">
        <div className="container">
          <div className="pc-header">
            <div className=" _coolor row">
              <div className="_coolortwo col-md-3 col-4 d-flex align-items-center">
                <Link className="navbar-brand" to="/">
                  <img
                    alt="logo"
                    src="https://umg.edu.gt/miumg/sesion_files/logo_white.png"
                  />
                </Link>
              </div>
              
              <div className="_coolortree col-md-6 col-8 d-flex align-items-center">
                <form onSubmit={submitHandler} className="input-group">
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Buscar..."
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button type="submit" className="search-button">
                    Buscar
                  </button>
                </form>
              </div>

              <div className="_coolorfoor col-md-3 d-flex align-items-center justify-content-end Login-Register">
                {userInfo ? (
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Hola, {userInfo.name}
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        Perfil
                      </Link>

                      <Link
                        className="dropdown-item"
                        to="#"
                        onClick={logoutHandler}
                      >
                        Salir
                      </Link>

                      {userInfo.isAdmin &&
                        <Link
                        className="dropdown-item"
                        to="/admin"
                      >
                        Administrador
                      </Link>
                      }
                      
                    </div>
                  </div>
                ) : (
                  <>
                    <Link to="/register">Regístrate</Link>
                    <Link to="/login">Iniciar Sesión</Link>
                  </>
                )}

                <Link to="/cart">
                  <i className="fas fa-shopping-bag"></i>
                  <span className="badge">{cartItems.length}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
