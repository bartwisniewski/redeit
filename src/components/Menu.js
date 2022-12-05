import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ImgLogoBanner } from '../static'


class Menu extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      burger: false,
      };
  }

  toggle_burger(){
    const {burger} = this.state;
    this.setState({ burger: !burger});
  }

  render(){
    const {burger} = this.state;
    const navbar_burger_is_active = burger ? " is-active" : ""
    return(
      <nav className="navbar is-transparent is-spaced">
        <div className="navbar-brand">
          <div className="navbar-item">
            <Link to="/"><img src={ImgLogoBanner} width="84" height="28" alt="Deutsch ist toll!"/></Link>
          </div>
          <a role="button" className={"navbar-burger" + navbar_burger_is_active} aria-label="menu" aria-expanded="false" onClick={() => {this.toggle_burger()}}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div className="container">
          <div className={"navbar-menu"+ navbar_burger_is_active}>
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
