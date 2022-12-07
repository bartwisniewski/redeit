import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Icon, SearchBar, Tile } from './Components';
import { getData } from "./DataConnector"
import ExercisePlay from "./Exercise";

import { ContactSmall, ContactSmallAbout } from "./Contact";


class Blog extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      view: 0,  // 0 - tiles, 1 - form, 4 - read
      entry_id : 0,
      refresh: false,
      query: ""
    };
  }

  handleView = (view, id) => {
    this.setState({view: view, entry_id: id});
  }

  endEdit = () => {
    this.handleView(0, 0);
  };

  forceRefresh = () => {
    const refresh = this.state.refresh;
    this.setState({ refresh: !refresh });
  };


  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
}

  render(){
    const {refresh} = this.state;
    const {match} = this.props;
    const match_parent = match;

      return  <React.Fragment>
                <section className={"hero hero-bg-img is-primary"}>
                  <div className="hero-body">
                    <div className="container">
                      <h1 className="title">Blog</h1>
                      <div className="button is-static">Informacje oraz ćwiczenia z języka niemieckiego</div>
                    </div>
                  </div>
                </section>
                <section className="section columns" style={{paddingTop: 20}}>
                  <Switch>
                    <Route path={`${match.path}/:blog_id`}>
                      {({match}) => <BlogRead id={parseInt(match.params.blog_id)} match={match} match_parent={match_parent} refresh={refresh}/>}
                    </Route>
                    <Route path={match.path}>
                      {({match}) =><BlogTiles match={match} refresh={refresh} />}
                    </Route>
                  </Switch>
                </section>
      </React.Fragment>
  }
}


class BlogTiles extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data : [],
      data_length : 0,
      query: '',
      loaded: false,
      placeholder: "Ładowanie...",
    };
  }

    handleChange = e => {
      this.setState({ [e.target.name]: e.target.value});
    };

  componentDidMount() {
    getData('blog', undefined, undefined, undefined, undefined).then(ret => this.setState({ data: ret.data, data_length: ret.count, loaded: true }));
  }

  componentDidUpdate(prevProps) {
    if (this.props.refresh !== prevProps.refresh) {
  };
}


  render(){
    const { loaded, placeholder, data, query} = this.state;
    if (!loaded)
      return <p>{placeholder}</p>;

    const {match} = this.props;
    let elements = [];
    let el1 = <p>brak wpisów</p>;
    let el2 = [];
    let data_count = data.length;
    if (data_count > 0){
      elements = [...data];
      const el1_data = elements.splice(0, 1)
      el1 = <BlogEntry size={1} data = {el1_data[0]} width = {6} match={match}/>;
      el2 = elements.length >= 2 ? elements.splice(0, 2) : (elements.length >=1 ? elements.splice(0, 1) : []);
    }

    return (<React.Fragment>
              <div className="column is-2 is-offset-1">
                <div className="level">
                  <div className="level-item" style={{display: "inline"}}>
                    <SearchBar value={query} handleChange={this.handleChange} name={"query"}/>
                  </div>
                </div>
                <BlogList match={match} query={query} />
              </div>
              <div className="column is-6">
                  <div className="tile is-ancestor">
                    <div className="tile is-vertical">
                      <div className="tile">
                        <Tile tag={el1}/>
                      </div>
                      {el2 &&
                      <div className="tile">
                        {el2.map((el, index) => {
                            const blog_entry = <BlogEntry size={2} data = {el} match={match}/>;
                            return <Tile key={"blog_medium_"+index} tag={blog_entry} />
                            })}
                      </div>}
                    </div>
                  </div>
                </div>
              <div className="column is-2">
                <div className="tile is-ancestor">
                  <div className="tile is-vertical">
                    <div className="tile">
                      <Tile tag={<ContactSmallAbout/>} colour_class="is-primary"/>
                    </div>
                    <div className="tile">
                      <ContactSmall/>
                    </div>
                  </div>
                </div>
              </div>
         </React.Fragment>);
  }
}


class BlogRead extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data : [],
      loaded: false,
      placeholder: "Ładowanie...",
    };
  }

  getEntry = () => {
    const {id} = this.props;
    getData('blog', id, undefined, undefined, undefined).then(ret => this.setState({ data: ret.data, loaded: true }));
  }

  componentDidMount() {
    this.getEntry();
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
        this.getEntry();
      }
  }

  render(){
    const { loaded, placeholder, data} = this.state;
    const { match, match_parent } = this.props;
    if (!loaded)
      return <p>{placeholder}</p>;
//
    return (<React.Fragment>
                <div className="column is-6 is-offset-3">
                  <div className="tile is-ancestor">
                    <Tile tag={<BlogEntry size={1} data={data} match={match}/> }/>
                  </div>
                </div>
                <div className="column is-1">
                    <Link to={match_parent.url}>
                      <Icon active={true} active_class="essentials32-back" inactive_class="essentials32-back"/>
                    </Link>
                </div>
         </React.Fragment>);
  }
}


class BlogList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data : [],
      page : 0,
      count: 10,
      previous: undefined,
      next: undefined,
      loaded: false,
      placeholder: "Ładowanie...",
    };
  }

  nextPage = () => {
      const {next} = this.state;
      if (next !== undefined && next !== null)
        {
        this.setState({ page: next}, this.getEntries);
        }
  }

  prevPage = () => {
    const {previous} = this.state;
    if (previous !== undefined && previous !== null)
      {
      this.setState({ page: previous}, this.getEntries);
      }
}

  getEntries = () => {
    const {page, count} = this.state;
    const {query} = this.props;
    getData('blog', undefined, query, page, count)
    .then(ret => this.setState({ data: ret.data, next: ret.next, previous: ret.previous, loaded: true }));
  };

  componentDidMount() {
    this.getEntries();

  }

  componentDidUpdate(prevProps) {
    if (this.props.refresh !== prevProps.refresh) {
        this.getEntries();
  };
    if (this.props.query !== prevProps.query) {
        this.getEntries();
  };
}

  render(){
    const { loaded, placeholder, data, next, previous} = this.state;
    const { query, match} = this.props;
    const no_entries = query ? "brak pasujących wpisów" : "brak wpisów";

    if (!loaded)
      return <p>{placeholder}</p>;

    if (!data)
      return <p>{no_entries}</p>;

    const elements = [...data];
    const colours = ["is-dark","is-danger","is-warning", "is-info", "is-link", "is-success"];
    const prev_en = previous !== undefined && previous !== null;
    const next_en = next !== undefined && next !== null 
    const nav_en = prev_en || next_en;

    return (<React.Fragment>

              <div>
                <ul>
                  {nav_en && <li key="buttons top" style={{paddingBottom: "0.5rem"}}>
                    {prev_en && <button onClick={this.prevPage}>{'<'}</button>}
                    {next_en && <button onClick={this.nextPage}>{'>'}</button>}
                  </li>}
                    {elements.map((el, index) => {
                        const blog_entry = <BlogEntry size={3} data = {el} match={match}/>;
                        return <li style={{paddingBottom: "1.5rem"}} key={"blog_entry_"+index}><div className={"notification "+colours[index%(colours.length-1)]}>{blog_entry}</div></li>
                        })}
                  {nav_en && <li key="buttons bottom">
                    {prev_en && <button onClick={this.prevPage}>{'<'}</button>}
                    {next_en && <button onClick={this.nextPage}>{'>'}</button>}
                  </li>}
                </ul>
              </div>

         </React.Fragment>);
  }
}


class BlogEntry extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      placeholder: "Błąd",
    };
  }

  render() {
    const {placeholder} = this.state;

    const {data, size, match} = this.props; // size - 0 full, 1 big, 2 medium, 3 small
    if (!data)
      return placeholder;
    let title_size = 4;
    let subtitle_size = 5;
    let content_size = "is-medium";
    let text = data.entry_text;
    let img_style = {display: "block", marginLeft: "auto", marginRight: "auto", width: "70%", marginTop: 10, marginBottom: 20};
    const {picture} = data;
    let picture_url = "";
    if (picture) {
      if (typeof picture === 'string'){
        picture_url = picture;
      }
      else {
        picture_url = URL.createObjectURL(picture);
      }
    };

    let exercise =  data.exercise;// ? <ExercisePlay id={data.exercise_id} blog={true}/> : undefined;

    switch(size) {
      case 1:
        title_size = 4;
        subtitle_size = 5;
        content_size = "is-medium";
        exercise = data.exercise ? <ExercisePlay id={data.exercise} blog={true}/> : "";
        text = data.entry_text;//.split('\n').map(str => <p>{str}</p>);//.substring(0, 270) + " ...";
        break;
      case 2:
        title_size = 5;
        subtitle_size = 6;
        content_size = "is-small";
        exercise = data.exercise ? <ExercisePlay id={data.exercise} blog={true}/> : "";
        text = data.entry_text && data.entry_text.length > 180 ? data.entry_text.substring(0, 180) + " ..." : data.entry_text;
        break;
      case 3:
        title_size = 6;
        subtitle_size = 7;
        content_size = "is-small";
        exercise = undefined;
        img_style = {display: "block", marginLeft: "auto", marginRight: "auto", width: "30%", marginTop: 10, marginBottom: 20};
        text = data.entry_text && data.entry_text.length > 90 ? data.entry_text.substring(0, 90) + " ..." : data.entry_text;
        break;
      default:
          ;
        };
//<p dangerouslySetInnerHTML={{__html: text}}></p>
    const title = <React.Fragment><Link className={"title is-"+title_size+" has-text-centred"} to={match.path+"/"+data.id}>{data.title}</Link></React.Fragment>

    return <React.Fragment>
              <div className="level" style={{marginBottom: "0.5rem"}}>
                <div className="level-left">
                  <div className="level-item">
                    <h1 className={"title is-"+title_size+" has-text-centred"}>{title}</h1>
                  </div>
                </div>
                <div className="level-right">
                  <div className="level-item">
                  </div>
                </div>
              </div>
              {data.subtitle &&
              <div className="level" style={{marginBottom: "0.5rem"}}>
                <div className="level-item">
                  <h2 className={"subtitle is-"+subtitle_size+" has-text-centred"}>{data.subtitle}</h2>
                </div>
              </div>
            }

            <hr style={{marginTop: "0.0rem", marginBottom: "0.5rem"}}/>
              {picture_url &&
                  <figure className="image" style={img_style}>
                    <img src={picture_url} alt="Zdjęcie do wpisu"/>
                  </figure>
                }
            {text &&
            <div className={"content "+content_size+" has-text-justified"}>
                {text.split('\n').map((str, index) => <p key={"line"+index}>{str}</p>)}
            </div>
            }
            {exercise &&
            <div>
              {exercise}
            </div>
            }
                <div className={"content is-small"} style={{marginBottom: "0.5rem", marginTop: "0.5rem"}}>
                    <p className="has-text-right">{data.author + " // " +  data.date}</p>
                </div>
      </React.Fragment>
    };
}

export default Blog;
