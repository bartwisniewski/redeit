import React from "react";
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Menu from "./Menu"
import Contact from "./Contact"
import Blog from "./Blog"
import {ImgProfile, ImgLogoBig} from '../static'


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      site : 0,
      placeholder: "Ładowanie...",
    };
  }

  selectSite = (i) => {
    this.setState({site: i});
  }

  updateState = (state_var, value) => {
    let state = this.state;
    state[state_var] = value;
    this.setState(state);
  }

  initWebsite= () => {
    const {teacher} = this.state.user_data;
    const start_site = teacher ? 1 : 11;
    this.setState({teacher: teacher, site: start_site});
  }

  componentDidMount() {
  }

  render(){
    const {placeholder} = this.state;
    const loaded = true;

    const blog = ({ match }) => <Blog match={match}/>;

    return loaded ? (
      <Router>
        <div>
          <Menu selectSite={this.selectSite}/>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/kontakt">
              <Contact/>
            </Route>
            <Route path="/blog">
              {blog}
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    ) : <p>{placeholder}</p>;

  }
}


class Home extends React.Component{

  constructor(props){
    super(props);
    this.state = {
    };
  }

  render(){
    // console.log("render Blogs site");

      const logo = <figure className="image is-4by3">
                          <img src={ImgLogoBig} alt="Deutsch ist toll!"/>
                        </figure>

      const address = <article className="message is-dark">
                        <div className="message-header">
                          <p>Adres</p>
                        </div>
                        <div className="message-body has-text-centered">
                          al. Rzeczypospolitej 24B/3
                          <br/>
                          02-972 Warszawa
                        </div>
                      </article>

      const phone = <article className="message is-danger">
                        <div className="message-header">
                          <p>Telefon</p>
                        </div>
                        <div className="message-body has-text-centered">
                          +48 606 317 350
                        </div>
                      </article>

      const email = <article className="message is-warning">
                        <div className="message-header">
                          <p>e-mail</p>
                        </div>
                        <div className="message-body has-text-centered">
                          kamila-s@go2.pl
                        </div>
                      </article>

      const about = <React.Fragment>
                      <div className="level" style={{paddingTop: 10}}>
                        <div className="level-item">
                          <h1 className="title is-3 has-text-centered">
                            Herzlich Willkommen!
                          </h1>
                        </div>
                      </div>
                      <div className="columns" style={{paddingTop: 5, marginBottom: 0}}>
                        <div className="column is-4 is-offset-4">
                          <figure className="image is-3by4">
                              <img className="is-rounded" src={ImgProfile} alt="Moja fotografia"/>
                          </figure>
                        </div>
                      </div>
                      <div className="level" style={{paddingTop: 5, marginBottom: 5}}>
                        <div className="level-item">
                          <h1 className="title is-4">Kamila Wiśniewska</h1>
                        </div>
                      </div>
                      <div className="level" style={{paddingTop: 0}}>
                        <div className="level-item">
                          <h2 className="subtitle is-6">lektorka i autorka strony</h2>
                        </div>
                      </div>
                      <div className="content" style={{paddingLeft: 40, paddingRight: 40}}>
                          <p>
                          Jestem absolwentką wydziału neofilologii Uniwersytetu Warszawskiego. Od wielu lat uczę języka niemieckiego prywatnie oraz dla szkół językowych.
                          Spędziłam 4 lata pracując oraz ucząc się w Niemczech, wiedzę którą tam zdobyłam chętnie wykorzystuję na lekcjach.
                          Prowadzę zajęcia dla osób w każdym wieku i na każdym poziomie zaawansowania.
                          Program dopasowuję indywidualnie dla każdego ucznia.
                          Lekcje odbywają się na żywo lub online!
                          </p>
                          <p>Serdecznie zapraszam!<br/>Kamila</p>
                      </div>
                    </React.Fragment>

//<Tile tag={<Link to="/blog"><BlogNewest size={3}/></Link>} colour_class="is-primary"/>

      return  <React.Fragment>
      <section className={"hero hero-bg-img is-primary"}>
        <div className="hero-body">
        </div>
      </section>
      <section className="section columns" style={{paddingTop: 20}}>
      <div className="column is-8 is-offset-2">
        <div className="tile is-ancestor is-vertical">
          <div className="tile">
            <div className="tile is-vertical">
              <div className="tile is-parent">
                <div className="tile is-child notification has-background-yellow">
                  {logo}
                </div>
              </div>
            </div>
            <div className="tile is-parent">
              <div className="tile is-child">
                {about}
              </div>
            </div>
          </div>
          <div className="tile">
            <div className="tile is-parent">
              <div className="tile is-child">
                {address}
              </div>
            </div>
            <div className="tile is-parent">
              <div className="tile is-child">
                {phone}
              </div>
            </div>
            <div className="tile is-parent">
              <div className="tile is-child">
                {email}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  </React.Fragment>
  }
}

export default App;
