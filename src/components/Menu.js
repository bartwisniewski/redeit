import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ImgLogoBanner } from '../static'


class Menu extends React.Component{
  // static propTypes = {
  //   endpoint: PropTypes.string.isRequired
  // };

  render(){
    return(
      <nav className="navbar is-transparent is-spaced">
        <div className="container">
          <div className="navbar-menu">
            <div className="navbar-brand">
              <div className="navbar-item">
                <Link to="/"><img src={ImgLogoBanner} width="84" height="28" alt="Deutsch ist toll!"/></Link>
              </div>
              <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>
            <div className="navbar-start">
              <div className="navbar-item">
                <Link className="button is-primary" to="/blog">Ćwiczenia</Link>
              </div>
              <div className="navbar-item">
                <Link className="button is-warning" to="/kontakt">Kontakt</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Menu;
