import React, {Component} from "react";
import {shuffleArray} from "./Utils";
import {WordButton, ResultDisplay} from "./ExerciseComponents";


class ConjugationPreview extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        };
    };

    checkDone = (word_idx, person_idx) => {
      const {results} = this.props;
      if (!results)
        return false;
      if (results[word_idx].length < person_idx)
        return false;
      if (typeof(results[word_idx][person_idx]) === 'undefined')
        return false;
      return true;
    }
    
    render () {
    const {data, results} = this.props;
    const {words } = data;
    //if (words.length === 0){
    //  return <p>Brak słów</p>
    //}

    const persons = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];
    const conjugation = words.map((el, index) => {return el.variant});

    return (
      <React.Fragment>
      <div className="level">
        <div className="level-item">
        <table className="table is-narrower is-hoverable">
        <thead>
            <tr>
              <th key={"persons-th"}></th>
              {words.map((el, index) => (
                    <th key={"word"+index}>
                      <WordButton
                        data={el}
                      />
              </th>))}
            </tr>
          </thead>
          <tbody>
          {persons.map((person, row_index) => (
            <tr key={"person"+row_index}>
                <td>
                  <ResultDisplay text={person} result={this.checkDone(0, row_index) ? results[0][row_index] : undefined}/>
                </td>
                {conjugation.map((el, index) => (
                      <td key={"word"+row_index+"-person"+index}>
                        <ResultDisplay text={el[row_index]} result={this.checkDone(index+1, row_index) ? results[index][row_index] : undefined}/>
                      </td>))}
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      </div>
      </React.Fragment>
    );
  };
}


class ConjugationPlay extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        selection: [],
        };
    };

    handleCheck = (index) => {
      const {results} = this.props;
      results[index] = true;
      //this.props.setResults(results);
    };

    checkFinished = (results) => {
      const {data } = this.props;
      const {words } = data;
      if (results.length < words.length+1){
        return false;
      }
      else {
        for (var i = 0; i < results.length; i++) {
          if (results[i].length < 6){
            return false;
          }
          else {
            for (var j = 0; j < 6; j++) {
                if (results[i][j] == null || typeof(results[i][j]) === 'undefined'){
                  return false;
                }
            }
          }
        }
      }
      return true;
    }

    checkDone = (word_idx, person_idx) => {
        const {results} = this.props;
        if (!results)
          return false;
        if (results.length < word_idx)
          return false;
        if (results[word_idx] == null || typeof(results[word_idx]) === 'undefined')
          return false;
        if (results[word_idx].length < person_idx)
          return false;
        if (results[word_idx][person_idx] == null || typeof(results[word_idx][person_idx]) === 'undefined')
          return false;
        return true;
      }

  checkResult = (word_idx, person_idx) => {
    const {results} = this.props;
    if (this.checkDone(word_idx, person_idx)){
        return results[word_idx][person_idx];
    }
    else {
      return undefined;
    }
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

  drop = (ev, index, row_index) => {
    ev.preventDefault();
    const {selection} = this.state;
    const {data, results} = this.props;
    const {words } = data;
    let drag_index = parseInt(ev.dataTransfer.getData("text"));
    const drag_text = selection[drag_index];
    const persons = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];
    const conjugation = words.map((el, index) => {return el.variant});
    let result = false;
    if (index===0){
        result = drag_text === persons[row_index];
    }
    else {

      result = drag_text === conjugation[index-1][row_index];
    }
    let length = results.length;
    if (length <= index){
      for(let i = 0; i < (index - length + 1); i++) {
          const new_column = [];
          results.push(new_column);
        }
    }
    length = results[index].length;
    if (length <= row_index){
      for(let i = 0; i < (row_index - length + 1); i++) {
          results[index].push(undefined);
        }
    }
    if(result){
      results[index][row_index] = result;
      selection.splice(drag_index, 1);

    }
    //this.setState({selection: selection}, () => this.props.setResults(results));
    const finished = this.checkFinished(results);
    const callback = () => {this.props.setResults(results, finished)};
    this.setState({selection: selection}, callback);
  }

  componentDidMount() {
    const {data, results} = this.props;
    const {words, with_persons } = data;
    const persons = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];
    const conjugation = words.length === 0 ? [] : words.map((el, index) => {return el.variant});
    let selection = [];
    if (with_persons){
      for(let i = 0; i < persons.length; i++) {
        if (!this.checkDone(0,i)){
          selection.push(persons[i]);
        }
      }
    }
    else {
      results.push([true,true,true,true,true,true]);
      const finished = this.checkFinished(results);
      this.props.setResults(results, finished);
    }

    for(let j = 0; j < conjugation.length; j++) {
        for(let i = 0; i < conjugation[j].length; i++) {
          if (!this.checkDone(j+1,i)){
            selection.push(conjugation[j][i]);
          }
        }
    }
    shuffleArray(selection);

    this.setState({selection: selection});
  }

  render () {
    const {data, results} = this.props;
    const {words } = data;
    const {selection} = this.state;
    //if (words.length === 0){
    //  return <p>Brak słów</p>;
    //}

    const persons = ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];
    const conjugation = words.map((el, index) => {return el.variant});

    const result = <ResultDisplay text="aaa" result={this.checkResult(0, 0)}/>;
    return (
      <React.Fragment>
        <div className="level">
        <div className="level-item">
        <table className="table is-narrower is-hoverable">
              <thead>
                <tr>
                  <th key={"persons-th"}></th>
                  {words.map((el, index) => (
                        <th key={"word"+index}>
                          <WordButton
                            data={el}
                          />
                  </th>))}
                </tr>
              </thead>
              <tbody>
              {persons.map((person, row_index) => (
                <tr key={"person"+row_index}>
                    <td onDrop={(ev) => this.drop(ev, 0, row_index)} onDragOver={this.allowDrop}>
                      {<ResultDisplay text={this.checkDone(0,row_index) ? person : (row_index%3)+1} result={this.checkResult(0, row_index)}/>}
                    </td>
                    {conjugation.map((el, index) => (
                          <td key={"word"+row_index+"-person"+index}  onDrop={(ev) => this.drop(ev, index+1, row_index)} onDragOver={this.allowDrop}>
{                            <ResultDisplay text={this.checkDone(index+1, row_index) ? el[row_index] : <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>} result={this.checkResult(index+1,row_index)}/>}
                          </td>))}
                </tr>
              ))}
              </tbody>
            </table>
            </div>
        </div>
        <div className="buttons">
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


export {ConjugationPreview, ConjugationPlay};
