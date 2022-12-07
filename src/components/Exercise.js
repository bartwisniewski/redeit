import React from "react";
import { getData } from "./DataConnector"

import {ConjugationPlay, ConjugationPreview} from './Conjugation';
import {GapPlay, GapPreview} from './Gap';
import {TranslationSortPlay, TranslationSortPreview} from './TranslationSort';
import {ExternalExercise} from "./ExternalExercise";


class ExercisePlay extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      data: {},
      results: [],
      status: 0, // 0 - not started, 3 - complete ok, 2 - complete with faults, 1 - in progress
      imagePreviewUrl : "",
      loaded: false,
      last_dict_input: "",
      placeholder: "Ładowanie danych...",
      refresh: false,
      finished: false,
      };
  }


loadData(callback){
}

loadResults(){
  const {results, status} = this.props;
  if(typeof(results) === "object" && results !==null && typeof(status) === "number"){
    this.setState({ results: results, status: status, results_loaded: true}, this.checkComplete);
  }
  else {
    this.setState({results_loaded: true});
  }
}

componentDidMount() {
  const {id} = this.props;
  getData('exercise', id).then(ret => {this.setState({ data: ret.data, loaded: true })});
}

componentDidUpdate(prevProps) {
  if(this.props.data){
    if(this.props.data.id !== prevProps.data.id){
      this.loadData(this.loadResults);
    }
  }
  else {
    if (this.props.id !== prevProps.id) {
        this.getExercise(this.loadResults);
      }
  }
}

setResults = (results, finished) => {
  this.setState({ results: results, finished: finished});
}

handleRestart = () => {
  this.setState({ status: 0, results: [], finished: false});
}

  render() {
    const {loaded} = this.state;
    if(!loaded){
      const {placeholder} = this.state;
      return <p>{placeholder}</p>;
    }
    const { data, status, last_dict_input, imagePreviewUrl, results,
      model_config, finished} = this.state;

    if(!data){
        const {placeholder} = this.state;
        return <p>{placeholder}</p>;
      }

    Object.keys(data).map(function(key, index) {
      data[key] = data[key] ? data[key] : "";
    });
    const { title, type, categories, level, picture, favourite, words } = data;
    const { id } = this.props;

    let exercise = data.id;

    switch(data.type) {
          case 0:
              exercise = finished ? <ConjugationPreview data ={data} results={results}/> : <ConjugationPlay data ={data} results={results} setResults={this.setResults}/>;
              break;
          case 1:
              exercise = finished ? <ConjugationPreview data ={data} results={results}/> : <ConjugationPlay data ={data} results={results} setResults={this.setResults}/>;
              break;
          case 10:
              exercise = finished ? <TranslationSortPreview data ={data} results={results}/> : <TranslationSortPlay data ={data} results={results} setResults={this.setResults}/>;
              break;
          case 30:
              exercise = finished ? <GapPreview data ={data} results={results}/> : <GapPlay data ={data} results={results} setResults={this.setResults}/>;
              break;
          case 90:
            exercise = <ExternalExercise data ={data}/>;
            break;
            }
    return  <React.Fragment>
          <div className="level">
            <div className="level-item">
              <h3 className="title is-5 has-text-centred">{title}</h3>
            </div>
          </div>
          {exercise}
          {finished && <div className="level">
                        <div className="level-item">
                          <div className="buttons are-medium">
                            <a className="button" onClick={this.handleRestart}>Powtórz ćwiczenie</a>
                          </div>
                        </div>
                      </div>
          }
      </React.Fragment>
  }
}

export default ExercisePlay;
