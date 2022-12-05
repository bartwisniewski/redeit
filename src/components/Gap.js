import React from "react";
import {shuffleArray} from "./Utils";
import {WordButton, ResultDisplay, Sentence} from "./ExerciseComponents";


class GapPreview extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        };
    };

    checkDone = (index) => {
        const {results} = this.props;
        if (!results)
          return false;
        if (results.length < index)
          return false;
        if (results[index] == null || typeof(results[index]) === 'undefined')
          return false;
        return true;
      }


  componentDidMount() {
  }

  render () {
    const {data, results, set_results} = this.props;
    const {sentences} = data;

    if (sentences.length === 0){
      return <p>Brak zdan</p>;
    }

    return (

      <React.Fragment>
      <div className="level">
        <div className="level-item">
        <table className="table is-narrower is-hoverable">
        <tbody>
        {sentences.map((sentence, row_index) => (
          <tr key={"sentence"+row_index}>
            <td><Sentence sentence={sentence} result={results[row_index]}/></td>
          </tr>
          ))
        }
        </tbody>
        </table>
        </div>
        </div>
      </React.Fragment>
    );
  };
}


class GapPlay extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        selection: [],
        sentences_arr: [],
        sentences_disp: [],
        loaded: false,
        };
    };

    handleCheck = (index) => {
      const {results} = this.props;
      results[index] = true;
      this.props.setResults(results);
    };

    checkDone = (index) => {
        const {results} = this.props;
        if (!results)
          return false;
        if (results.length < index)
          return false;
        if (results[index] == null || typeof(results[index]) === 'undefined')
          return false;
        return true;
      }

  checkResult = (index) => {
    const {results} = this.props;
    if (this.checkDone(index)){
        return results[index];
    }
    else {
      return undefined;
    }
  }

  checkFinished = (results) => {
    const {data } = this.props;
    const {sentences } = data;
    if (results.length < sentences.length){
      return false;
    }
    else {
      for (var i = 0; i < results.length; i++) {
          if (results[i] == null || typeof(results[i]) === 'undefined')
            {
              return false;
            }

          }
        }
    return true;
  }

  allowDrop = (ev) => {
    ev.preventDefault();
  }

  drag = (ev, index) => {
    try {
      ev.dataTransfer.setData("text", index);
    } catch (error) {
      const dataList = ev.dataTransfer.items;
      dataList.add(index, "text");
    }
  }

  drop = (ev, index) => {
    ev.preventDefault();
    const {data, results, set_results} = this.props;
    const {selection, sentences_arr, sentences_gap} = this.state;
    const drag_index_sel = parseInt(ev.dataTransfer.getData("text"));
    const drag_selection = selection[drag_index_sel];
    const drop_sentence_arr = sentences_arr[index];
    let drag_index = 0;


    for(let i = 0; i < sentences_arr.length; i++) {
      const gap = sentences_gap[i];
      if(drag_selection === sentences_arr[i][gap]){
        drag_index = i;
        break;
      }
    }

    let length = results.length;
    if (length <= index){
      for(let i = 0; i < (index - length + 1); i++) {
          results.push(undefined);
        }
    }
    const gap_index = sentences_gap[index];
    const result = drag_selection === drop_sentence_arr[gap_index];

    //if(result){
    results[drag_index] = result;
    selection.splice(drag_index_sel, 1);
    //}

    const finished = this.checkFinished(results);
    this.setState({selection: selection}, () => this.props.setResults(results, finished));
  }

  componentDidMount() {
    const {data, results} = this.props;
    const {sentences} = data;
    const selection = [];
    const sentences_arr = [];
    const sentences_disp = [];
    const sentences_gap = [];
    //console.log("Mount Exercise.js");
    for(let i = 0; i < sentences.length; i++) {
        //console.log(sentences[i]);
        const sentence_arr = sentences[i].sentence.split(" ");
        const gap_index = sentences[i].gap - 1;
        //console.log(sentence_arr);
        if (gap_index >= 0 && gap_index < sentences[i].sentence.length)
          {
          sentence_arr[gap_index] = sentence_arr[gap_index].replace(".","");
          selection.push(sentence_arr[gap_index]);
          sentences_arr.push(sentence_arr);
          sentences_gap.push(gap_index);
          // Prepare sentence to display
          const sentence_disp_arr = [...sentence_arr];
          sentence_disp_arr[gap_index] = "__________";
          sentences_disp.push(sentence_disp_arr.join(" "));
        }
    }
    shuffleArray(selection);
    //console.log(selection);
    this.setState({selection: selection, sentences_arr: sentences_arr, sentences_disp: sentences_disp, sentences_gap: sentences_gap, loaded: true});
  }

  render () {
    const {data, results, set_results} = this.props;
    const {sentences} = data;
    const {selection, sentences_arr, sentences_disp, loaded} = this.state;
    //console.log("render GAp play");
    //console.log(sentences_disp);
    //console.log(selection);

    if (sentences_disp.length === 0){
      return <p>Brak zdan</p>;
    }
//               {this.checkDone(row_index) ? sentences[row_index].sentence : sentence_disp }
//         {sentences_disp.map((sentence_disp, row_index) => (
    return (

      <React.Fragment>
      <div className="level">
        <div className="level-item">
        <table className="table is-narrower is-hoverable">
        <tbody>
        {sentences.map((sentence, row_index) => (
          <tr key={"word"+row_index}>
            <td onDrop={(ev) => this.drop(ev, row_index)} onDragOver={this.allowDrop}>
              {<Sentence sentence={sentence} result={this.checkDone(row_index) ? results[row_index] : undefined}/>}
            </td>
          </tr>
          ))
        }
        </tbody>
        </table>
        </div>
        </div>
        <div className="buttons" key="drag-area">
          {selection.map((el, index) => (
            <span className="button" key={"select-button"+index} style={{cursor: 'pointer'}} draggable="true" onDragStart={(ev) => this.drag(ev, index)}>
              {el}
            </span>
                ))}
        </div>

      </React.Fragment>
    );
  };
}

export {GapPreview, GapPlay};
