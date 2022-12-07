import React from "react";
import {HighlightedText } from './Components';

function ResultDisplay(props){
  const {text, result} = props;
  let button_class = "button is-static";

  if (result === true) {
    button_class = "button is-primary";
  }
  else if (result === false) {
    button_class = "button is-danger";
  };

  return <span className={button_class}>{text}</span>;
}


function WordButton(props){
  const {data} = props;
  const {text} = data;
  const text_as_array = text.split(" ");
  const sentence = text_as_array.length > 1;
  const prepositions = ['der', 'die', 'das', 'pl'];
  const prep_colours = ['is-info', 'is-danger', 'is-warning', 'is-primary', '']
  const prep_index = prepositions.indexOf(data.preposition);

  // props.colour ? props.colour :
  const colour = props.colour ? props.colour : (prep_index !== -1 ? prep_colours[prep_index] : '')

  let preposition = sentence ? "" : data.preposition;

  if (preposition === 'pl')
    preposition = 'die';

  return (
    <React.Fragment>
    <p className={"button "+colour+" "+props.size}>
      {preposition} &nbsp; <HighlightedText text={text} highlight_start={props.highlight_start} highlight_end={props.highlight_end}/>
    </p>
    </React.Fragment>
  )
}


function Sentence(props){
    const {sentence, result} = props;
    const {mark, gap } = sentence;
    const words = sentence.sentence.split(" ");
    const colour = 'is-info'
  
    return (
      <React.Fragment>
      {words.map((word, index) => {
        let ret = index === mark-1 ? <span key={"word"+index} className={"is-italic "+colour+" "}>{word}</span> : word+" " ;
        if (index === gap-1)
          ret = result === undefined ? <span key={"word"+index} className={"has-background-light"}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          : <span key={"word"+index} className={result ? "has-text-weight-bold has-text-primary" : "has-text-weight-bold has-text-danger"}>{word}</span>;
        return ret;
      })
      }
      </React.Fragment>
    )
  }


export {WordButton, ResultDisplay, Sentence};
