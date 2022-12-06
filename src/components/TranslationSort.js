import React from "react";
import {shuffleArray} from "./Utils";
import {WordButton, ResultDisplay} from "./ExerciseComponents";


class TranslationSortPreview extends React.Component {
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
    const {data, results} = this.props;
    const {words} = data;

    if (words.length === 0){
      return <p>Brak słów</p>;
    }

    return (

      <React.Fragment>
      <div className="level">
        <div className="level-item">
        <table className="table is-narrower is-hoverable">
        <thead>
          <tr>
            <th key={"word-th"}>
              DE
            </th>
            <th key={"translation-th"}>
              PL
            </th>
          </tr>
        </thead>
        <tbody>
        {words.map((word, row_index) => (
          <tr key={"word"+row_index}>
            <td>
              <WordButton data={word}/>
            </td>
            <td key={"translation-"+row_index}>
              <ResultDisplay text={word.translation} result={this.checkDone(row_index) ? results[row_index] : undefined}/>
            </td>
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


class TranslationSortPlay extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        selection: [],
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
    const {words } = data;
    if (results.length < words.length){
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
    const {data, results} = this.props;
    const {words} = data;
    const {selection} = this.state;
    const drag_index_sel = parseInt(ev.dataTransfer.getData("text"));
    const drag_selection = selection[drag_index_sel];
    const drop_word = words[index];
    let drag_index = 0;

    for(let i = 0; i < words.length; i++) {
      if(drag_selection === words[i].translation){
        drag_index = i;
        break;
      }
    }

    let length = results.length;
    if (length <= drag_index){
      for(let i = 0; i < (drag_index - length + 1); i++) {
          results.push(undefined);
        }
    }

    const result = drag_selection === drop_word.translation;

    if(result){
      results[drag_index] = result;
      selection.splice(drag_index_sel, 1);
    }

    //console.log("check finished");
    const finished = this.checkFinished(results);
    //console.log(finished);
    this.setState({selection: selection}, () => this.props.setResults(results, finished));
  }

  componentDidMount() {
    const {data, results} = this.props;
    const {words} = data;
    const selection = [];
    //console.log("Mount Exercise.js");
    for(let i = 0; i < words.length; i++) {
        selection.push(words[i].translation);
    }

    shuffleArray(selection);

    this.setState({selection: selection});
  }

  render () {
    const {data, results, set_results} = this.props;
    const {words} = data;
    const {selection} = this.state;
    //console.log(words);
    //console.log(selection);

    if (words.length === 0){
      return <p>Brak słów</p>;
    }


    return (

      <React.Fragment>
      <div className="level">
        <div className="level-item">
        <table className="table is-narrower is-hoverable">
        <thead>
          <tr>
            <th key={"word-th"}>
              DE
            </th>
            <th key={"translation-th"}>
              PL
            </th>
          </tr>
        </thead>
        <tbody>
        {words.map((word, row_index) => (
          <tr key={"word"+row_index} onDrop={(ev) => this.drop(ev, row_index)} onDragOver={this.allowDrop}>
            <td >
              <WordButton data={word} />
            </td>
            <td key={"translation-"+row_index}>
              <ResultDisplay text={this.checkDone(row_index) ? word.translation : <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>}
                             result={this.checkDone(row_index) ? results[row_index] : undefined}/>
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

export {TranslationSortPreview, TranslationSortPlay};
