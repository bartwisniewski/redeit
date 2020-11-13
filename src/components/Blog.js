import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import { Icon, SearchBar, Tile } from './Components';
import { getData, getCookie, dateToYMD } from "./Utils";
import ExercisePlay from "./Exercise";

import { ContactSmall, ContactSmallAbout } from "./Contact";

//const Data = require('./Blog.xml');
import blog_data from './BlogData.js';
import exercise_data from './ExerciseData.js';

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
    // console.log("force refresh");
    const refresh = this.state.refresh;
    this.setState({ refresh: !refresh });
  };


  componentDidMount() {
  }

  componentDidUpdate(prevProps) {
}

  render(){
    // console.log("render Blogs site");
    const {view, entry_id, refresh} = this.state;
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
      query: '',
      loaded: false,
      placeholder: "Ładowanie...",
    };
  }

    handleChange = e => {
      this.setState({ [e.target.name]: e.target.value});
    };

  componentDidMount() {
    //console.log("Mount Blog");
    //console.log(blog_data);
    this.setState({ data: blog_data, loaded: true });
    //this.state.data = blog_data;// new XMLParser().parseFromString(blog_data);    // Assume xmlText contains the example XML
    //console.log(this.state.data);
    //console.log(this.state.data.getElementsByTagName('Entry'));
  }

  componentDidUpdate(prevProps) {
    if (this.props.refresh !== prevProps.refresh) {
  };
}


  render(){
    const { loaded, placeholder, endpoint, data, query} = this.state;
    if (!loaded)
      return <p>{placeholder}</p>;

    const {match} = this.props;
    let elements = [];
    let el1 = <p>brak wpisów</p>;
    let el2 = [];
    console.log("Render");
    let data_count = data.length;
    console.log(data_count);
    if (data_count > 0){
      elements = [...data];
      console.log(elements);
      const el1_data = elements.splice(0, 1)
      console.log(el1_data);
      el1 = <BlogEntry size={1} data = {el1_data[0]} width = {6} match={match}/>;
      console.log(el1);
      el2 = elements.length >= 2 ? elements.splice(0, 2) : (elements.length >=1 ? elements.splice(0, 1) : []);
      console.log(el2);
    }

    const colours = ["is-dark","is-danger","is-warning", "is-info", "is-link", "is-success"];
    //
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
    const blog_entry = blog_data.filter(entry => {return(entry.id == id)})[0];
    //console.log(blog_entry);
    this.setState({ data: blog_entry, loaded: true });
  }

  componentDidMount() {
    console.log("Mount BlogRead");
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
      side : 0,
      count: 10,
      loaded: false,
      placeholder: "Ładowanie...",
    };
  }


  loadMore = () => {
      let {side, count} = this.state;
      if (blog_data.length > (side+1)*count)
        {
        side+=1;
        this.setState({ side: side}, this.getEntries);
        }
  }
/*
  compare = ( a, b ) => {
    if ( a.date < b.date ){
      return -1;
    }
    if ( a.last_nom > b.last_nom ){
      return 1;
    }
    return 0;
  }
*/
  getEntries = () => {
    const {side, count} = this.state;
    const {query} = this.props;
    const start = side*count;
    const filter = query ? query.length >= 2 : false;
    const blog_list = filter ?
      blog_data.filter((entry) => {
        const exercise = entry.exercise ? exercise_data.filter(ex => {return(ex.id == entry.exercise)})[0] : undefined;
        const exercise_found = exercise ? exercise.title.includes(query) || exercise.level.includes(query) || exercise.categories.includes(query) : false;
        const ret = entry.title.includes(query) ||
                    entry.subtitle.includes(query) ||
                    entry.text.includes(query) ||
                    exercise_found;
        return ret;
      }).splice(start, count)
      :
      [...blog_data].splice(start, count);
    //console.log(blog_list[0].date);
    //console.log(blog_list);
    this.setState({ data: blog_list, loaded: true });
  };

  componentDidMount() {
    //console.log("Mount BlogList");
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
    const { loaded, placeholder, data} = this.state;
    const { query, match} = this.props;
    const no_entries = query ? "brak pasujących wpisów" : "brak wpisów";

    if (!loaded)
      return <p>{placeholder}</p>;

    if (!data)
      return <p>{no_entries}</p>;

    const elements = [...data];
    const colours = ["is-dark","is-danger","is-warning", "is-info", "is-link", "is-success"];
    return (<React.Fragment>
              <div>
                <ul>
                    {elements.map((el, index) => {
                        const blog_entry = <BlogEntry size={3} data = {el} match={match}/>;
                        return <li style={{paddingBottom: "1.5rem"}} key={"blog_entry_"+index}><div className={"notification "+colours[index%(colours.length-1)]}>{blog_entry}</div></li>
                        })}
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
    //console.log("blog entry render, data:");
    //console.log(data);
    if (!data)
      return placeholder;
    let title_size = 4;
    let subtitle_size = 5;
    let content_size = "is-medium";
    let text = data.text;
    let garbage_icon = "essentials32-garbage-1";
    let edit_icon = "essentials32-edit";
    let img_style = {display: "block", marginLeft: "auto", marginRight: "auto", width: "70%", marginTop: 10, marginBottom: 20};
    const {picture} = data;
    let picture_url = "";
    let picture_name = "";
    if (picture) {
      if (typeof picture === 'string'){
        picture_url = picture;
        var res = picture.split("/");
        picture_name = res[res.length-1];
      }
      else {
        picture_url = URL.createObjectURL(picture);
        picture_name = picture.name;
      }
    };

    let exercise =  data.exercise_id;// ? <ExercisePlay id={data.exercise_id} blog={true}/> : undefined;

    switch(size) {
      case 1:
        title_size = 4;
        subtitle_size = 5;
        content_size = "is-medium";
        garbage_icon = "essentials32-garbage-1";
        edit_icon = "essentials32-edit";
        exercise = data.exercise ? <ExercisePlay id={data.exercise} blog={true}/> : "";
        //img_style = {maxWidth: 800};
        if (data.text.length > 270)
          text = data.text.substring(0, 270) + " ...";
        break;
      case 2:
        title_size = 5;
        subtitle_size = 6;
        content_size = "is-small";
        garbage_icon = "essentials16-garbage-1";
        edit_icon = "essentials16-edit";
        exercise = undefined;//data.exercise;// ? <ExercisePreview id={data.exercise_id} blog={true} no_pictures={true}/> : undefined;
        //img_style = {maxWidth: 200};
        text = data.text.substring(0, 180) + " ...";
        break;
      case 3:
        title_size = 6;
        subtitle_size = 7;
        content_size = "is-small";
        garbage_icon = "essentials16-garbage-1";
        edit_icon = "essentials16-edit";
        exercise = undefined;
        img_style = {display: "block", marginLeft: "auto", marginRight: "auto", width: "30%", marginTop: 10, marginBottom: 20};
        //img_style = {maxWidth: 100};
        text = data.text.substring(0, 90) + " ...";
        break;
      default:
          ;
        };

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
            <div className={"content "+content_size+" has-text-justified"}>
              <p dangerouslySetInnerHTML={{__html: text}}></p>
            </div>
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
