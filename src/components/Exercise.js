import React, { Component } from "react";
import PropTypes from "prop-types";
import { getData, getCookie, shuffleArray, quasiRandomColour} from "./Utils"
import {Icon, HighlightedText, SearchPicture  } from './Components';

import exercise_data from './ExerciseData.js';

function ResultDisplay(props){
  const {text, result} = props;
  let button_class = "button is-static";

  if (result == true) {
    button_class = "button is-primary";
  }
  else if (result == false) {
    button_class = "button is-danger";
  };

  return (<span className={button_class}>{text}</span>);
}


function WordButton(props){
  const {data} = props;
  const {text, translation } = data;
  const text_as_array = text.split(" ");
  const sentence = text_as_array.length > 1;
  const prepositions = ['der', 'die', 'das', 'pl'];
  const prep_colours = ['is-info', 'is-danger', 'is-warning', 'is-primary', '']
  const prep_index = prepositions.indexOf(data.preposition);

  // props.colour ? props.colour :
  const colour = props.colour ? props.colour : (prep_index != -1 ? prep_colours[prep_index] : '')

  let preposition = sentence ? "" : data.preposition;

  if (preposition === 'pl')
    preposition = 'die';

  return (
    <React.Fragment>
    <p className={"button" +" "+colour+" "+props.size}>
      {preposition} &nbsp; <HighlightedText text={text} highlight_start={props.highlight_start} highlight_end={props.highlight_end}/>
    </p>
    </React.Fragment>
  )
}


function Sentence(props){
  const {sentence, result} = props;
  const {mark, gap } = sentence;
  const words = sentence.sentence.split(" ");

  const prepositions = ['der', 'die', 'das', 'pl'];
  const prep_colours = ['is-info', 'is-danger', 'is-warning', 'is-primary', ''];
  const prep_index = 0;

  // props.colour ? props.colour :
  const colour = 'is-info'

  return (
    <React.Fragment>
    {words.map((word, index) => {
      let ret = index === mark-1 ? <span className={"is-italic" +" "+colour+" "}>{word}</span> : word+" " ;
      if (index === gap-1)
        ret = result === undefined ? <span className={"has-background-light"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        : <span className={result ? "has-text-weight-bold has-text-primary" : "has-text-weight-bold has-text-danger"}>{word}</span>;
      return ret;
    })
    }
    </React.Fragment>
  )
}

/*
class SortPreview extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        main_groups : [],
        groups: [],
        grouped: [],
        };
    };


  getWordIdx = (group_idx, word_idx) => {
      const {grouped} = this.state;
      const {words} = this.props;
      for(let i = 0; i < words.length; i++) {
        if(words[i].id === grouped[group_idx][word_idx].id)
          return i;
      }

      return undefined;
    }

  getResult= (group_idx, word_idx) => {
      const {results} = this.props;
      const words_idx = this.getWordIdx(group_idx, word_idx);
      if (!results)
        return undefined;
      if (results.length < words_idx)
        return undefined;
      if (typeof(results[words_idx]) === 'undefined')
        return undefined;
      return results[words_idx];
    }

  renderWord = (el, index) => {
      const {groups, grouped} = this.state;
      const {no_pictures} = this.props;
      const is_group = (el.comment === "group");
      var group_idx = undefined;
      var global_idx = 0;

      if (is_group){
        for(let i = 0; i < groups.length; i++) {
            if(groups[i].id === el.id){
              group_idx = i;
              break;
            }
            else{
              global_idx += grouped[i].length;
            }
        }
      }

      return (<React.Fragment>
        {is_group ? <div className="tile is-vertical" key={"group"+group_idx}>
                      <div className="tile is-parent" onDrop={(ev) => this.drop(ev, index)} onDragOver={this.allowDrop}>
                        <div className="tile is-child">
                          <div className="level">
                            <div className="level-item">
                              <Word
                                view={(el.icon == null || no_pictures) ? 4 : 6} // hero or picture
                                id={el.word}
                                colour={quasiRandomColour(group_idx)}
                                size=""
                                translation=""
                                highlight_start={el.highlight_start}
                                highlight_end={el.highlight_end}
                                exercise_icon={el.icon}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {grouped.length > group_idx &&
                      <div className="tile is-parent" onDrop={(ev) => this.drop(ev, index)} onDragOver={this.allowDrop}>
                        {grouped[group_idx].map((el2, index2) => <React.Fragment>
                                                                  {this.renderWord(el2, index2)}
                                                                  </React.Fragment>
                        )}
                      </div>
                      }
                    </div>
                  :
                    <span className="button" key={"grouped-button"+index}>
                      {el.text}
                    </span>
                  }
                  </React.Fragment>)
    }


  componentDidMount() {
    const {words, results} = this.props;
    const main_groups = [];
    const groups = [];
    const grouped = [];
    var length = 0;

    for(let i = 0; i < words.length; i++) {
        if (words[i].comment === "group") {
          groups.push(words[i]);
        }
    }

    for(let i = 0; i < groups.length; i++) {
        if (groups[i].group == null || groups[i].group === "") {
          main_groups.push(groups[i]);
        }
    }

    for(let i = 0; i < words.length; i++) {
          for(let j = 0; j < groups.length; j++) {

            if (words[i].group === groups[j].group_name){
              length = grouped.length;
              if (length <= j){
                for(let k = 0; k < (j - length + 1); k++) {
                    grouped.push([]);
                  }
              }
              grouped[j].push(words[i]);
          }
      }
    }

    this.setState({groups: groups, grouped: grouped, main_groups: main_groups});
  }

  render () {
    const {words, results, set_results} = this.props;
    const {main_groups, groups, grouped} = this.state;
    if (words.length === 0){
      return <p>Brak słów</p>
    }
    if (main_groups.length === 0){
      return <p>Błąd</p>
    }

    return (
      <React.Fragment>
        <div className="tile is-ancestor" key="drop area">
          {main_groups.map((el, index) => this.renderWord(el, index))}
        </div>
      </React.Fragment>
    );
  };
}


class SortPlay extends React.Component {
    constructor(props){
      super(props);
      this.state = {
        selection: [],
        main_groups: [],
        groups: [],
        grouped: [],
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
    const {words, results, set_results} = this.props;
    const {selection, groups, grouped} = this.state;
    const drag_index = parseInt(ev.dataTransfer.getData("text"));
    const drag_word = selection[drag_index];

    const drop_word = groups[index];
    let drag_word_index = 0;

    for(let i = 0; i < words.length; i++) {
      if(drag_word.id === words[i].id){
        drag_word_index = i;
        break;
      }
    }


    let length = results.length;
    if (length <= drag_word_index){
      for(let i = 0; i < (drag_word_index - length + 1); i++) {
          results.push(undefined);
        }
    }

    const result = drag_word.group === drop_word.group_name;

    if(result){
      results[drag_word_index] = result;
      length = grouped.length;
      if (length <= index){
        for(let i = 0; i < (index - length + 1); i++) {
            grouped.push([]);
          }
      }
      grouped[index].push(drag_word);
      selection.splice(drag_index, 1);
    }

    this.setState({selection: selection, grouped: grouped}, () => this.props.setResults(results));
  }

  renderWord = (el, index) => {
      const {groups, grouped} = this.state;
      const {no_pictures} = this.props;
      const is_group = (el.comment === "group");
      var group_idx = undefined;

      if (is_group){
        for(let i = 0; i < groups.length; i++) {
            if(groups[i].id === el.id){
              group_idx = i;
              break;
            }
        }
      }

      return (<React.Fragment>
        {is_group ? <div className="tile is-vertical" key={"group"+group_idx}>
                      <div className="tile is-parent" onDrop={(ev) => this.drop(ev, group_idx)} onDragOver={this.allowDrop}>
                        <div className="tile is-child">
                          <div className="level">
                            <div className="level-item">
                              <Word
                                view={(el.icon == null || no_pictures) ? 4 : 6} // button or picture
                                id={el.word}
                                colour={quasiRandomColour(group_idx)}
                                size=""
                                translation=""
                                highlight_start={el.highlight_start}
                                highlight_end={el.highlight_end}
                                exercise_icon={el.icon}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      {grouped.length > group_idx &&
                      <div className="tile is-parent">
                        {grouped[group_idx].map((el2, index2) => <React.Fragment>
                                                                  {this.renderWord(el2, index2)}
                                                                  </React.Fragment>
                        )}
                      </div>
                      }
                    </div>
                  :
                    <span className="button" key={"grouped-button"+index}>
                      {el.text}
                    </span>
                  }
                  </React.Fragment>)
    }

  componentDidMount() {
    const {groups, results} = this.props;
    const main_groups = [];
    const grouped = [];
    const selection = [...words];
    for(let i = 0; i < groups.length; i++) {
        length = results.length;
        if (length <= i){
          for(let j = length; j < (i - length + 1); j++) {
              results.push(undefined);
            }
        }
        results[i] = true;
        }
        selection = selection.concat(groups[i].words);
    }

    shuffleArray(selection);

    for(let i = 0; i < groups.length; i++) {
        if (groups[i].group == null || groups[i].group === "") {
          main_groups.push(groups[i]);
        }
    }

    for(let i = 0; i < words.length; i++) {
        if (words[i].comment === "group") {
          for(let j = 0; j < groups.length; j++) {
            if (words[i].group === groups[j].group_name){
              length = grouped.length;
              if (length <= j){
                for(let k = 0; k < (j - length + 1); k++) {
                    grouped.push([]);
                  }
              }
              grouped[j].push(words[i]);
            }
          }
        }
    }

    this.setState({groups: groups, grouped: grouped, main_groups: main_groups, selection: selection}, () => this.props.setResults(results));
  }

  render () {
    const {words, results, set_results} = this.props;
    const {selection, groups, grouped, main_groups} = this.state;

    if (words.length === 0){
      return <p>Brak słów</p>;
    }


    return (

      <React.Fragment>
        <div className="tile is-ancestor" key="drop area">
          {main_groups.map((el, index) => this.renderWord(el, index))}
        </div>
        <div className="buttons" key="drag area">
          {selection.map((el, index) => (
            <span className="button" key={"select-button"+index} style={{cursor: 'pointer'}} draggable="true" onDragStart={(ev) => this.drag(ev, index)}>
              {el.text}
            </span>
                ))}
        </div>
      </React.Fragment>
    );
  };
}
*/
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
    const {data, results, set_results} = this.props;
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
    //console.log(words);
    //console.log(results);
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
    const {data, results, set_results} = this.props;
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
      if (results.length < word_idx)
        return false;
      if (typeof(results[word_idx]) === 'undefined')
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
      //console.log("Check finished")
      const {data } = this.props;
      const {words } = data;
      //console.log(words);
      //console.log(results);
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
              //console.log(results[i][j]);
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
                      <ResultDisplay text={this.checkDone(0,row_index) ? person : (row_index%3)+1} result={this.checkResult(0, row_index)}/>
                    </td>
                    {conjugation.map((el, index) => (
                          <td key={"word"+row_index+"-person"+index}  onDrop={(ev) => this.drop(ev, index+1, row_index)} onDragOver={this.allowDrop}>
                            <ResultDisplay text={this.checkDone(index+1, row_index) ? el[row_index] : <React.Fragment>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</React.Fragment>} result={this.checkResult(index+1,row_index)}/>
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
  const data = exercise_data.filter(ex => {return(ex.id == id)})[0];
  this.setState({ data: data, loaded: true });

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
