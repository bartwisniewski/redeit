import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import App from "./components/App";
import './static/bulma.css';
import './static/index.css';
import './static/open-iconic/font/css/open-iconic.css';
import './static/essential/font/flaticon.css';
import './static/essential/sprites/essential_sprites_16.css';
import './static/essential/sprites/essential_sprites_32.css';
import './static/essential/sprites/essential_sprites_64.css';
import './static/business/sprites/business_sprites_16.css';
import './static/business/sprites/business_sprites_32.css';
import './static/business/sprites/business_sprites_64.css';

// ========================================

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
