import React from "react";
import DataList from "./DataList";
import { compare_id } from "./Utils";


class ExerciseData {
  constructor(id, title, categories, level) {
    this.id = id;
    this.title = title;
    this.type = 0;
    this.categories = categories;
    this.level = level;
  }

  test(query){
    const ret = this.title.includes(query) || 
                this.level.includes(query) || 
                this.categories.includes(query);
    return ret;
  }
}


class ConjugationData extends ExerciseData{
  constructor(id, title, categories, level, words, with_persons) {
    super(id, title, categories, level);
    this.words = words;
    this.type = 1;
    this.with_persons = with_persons ? with_persons : false;
  }
}


class TranslationData extends ExerciseData{
  constructor(id, title, categories, level, words, type) {
    super(id, title, categories, level);
    this.words = words;
    this.type = type; // 10 - drag and drop translation PL
  }
}


/* class SortData extends ExerciseData{
  constructor(id, title, categories, level, groups) {
    super(id, title, categories, level);
    this.groups = groups;
    this.type = 20;
  }
} */


class GapData extends ExerciseData{
  constructor(id, title, categories, level, sentences) {
    super(id, title, categories, level);
    this.sentences = sentences;
    this.type = 30;
  }
}


class WordData {
  constructor(text, translation, preposition, variant){
    this.text = text;
    this.translation = translation;
    this.preposition = preposition;
    this.variant = variant;
  }
}


class SentenceData {
  constructor(sentence, mark, gap){
    this.sentence = sentence;
    this.mark = mark;
    this.gap = gap;
  }
}


/* class GroupData {
  constructor(word, words){
    this.word = word;
    this.words = words;
  }
} */


class ExternalData extends ExerciseData{
  constructor(id, title, categories, level, external_code) {
    super(id, title, categories, level);
    this.type = 9;
    this.external_code = external_code;
  }
}


const sein = new WordData("sein", "być", "", ["bin", "bist", "ist", "sind", "seid", "sind"]);
const haben = new WordData("haben", "mieć", "", ["habe", "hast", "hat", "haben", "habt", "haben"]);
/* const nominativ = new WordData("Nominativ", "mianownik", "", []);
const akkusativ = new WordData("Akkusativ", "biernik", "", []);
const dativ = new WordData("Dativ", "celownik", "", []);
const der = new WordData("der", "", "der", ["der", "den", "dem", "des"]);
const die = new WordData("die", "", "die", ["die", "die", "der", "der"]);
const das = new WordData("das", "", "das", ["das", "das", "dem", "des"]);
const plural = new WordData("die", "", "pl", ["die", "die", "den", "der"]); */

const auto = new WordData("Auto", "samochód", "das", []);
const fahrrad = new WordData("Fahrrad", "rower", "der", []);
const motorrad = new WordData("Motorrad", "motocykl", "der", []);

const external1 = <React.Fragment>
<div style={{
  borderRadius: "8px",
  boxShadow: "rgba(63, 69, 81, 0.16) 0px 2px 8px 0px",
  height: "0px",
  marginBottom: "0.9em",
  marginTop: "1.6em",
  overflow: "hidden",
  paddingBottom: "0px",
  paddingTop: "141.429%",
  position: "relative",
  width: "100%",
  willChange: "transform"
}}>
  <iframe loading="lazy" style={{
  border: "medium none",
  height: "100%",
  left: "0px",
  margin: "0px",
  padding: "0px",
  position: "absolute",
  top: "0px",
  width: "100%"
}}
    src="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAFQzaeUatA&#x2F;view?embed" allowfullscreen="allowfullscreen" allow="fullscreen">
  </iframe>
</div>
<a href="https:&#x2F;&#x2F;www.canva.com&#x2F;design&#x2F;DAFQzaeUatA&#x2F;view?utm_content=DAFQzaeUatA&amp;utm_campaign=designshare&amp;utm_medium=embeds&amp;utm_source=link" target="_blank" rel="noopener">Snow Globe Synonyms</a> autorstwa Kamila Wiśniewska
</React.Fragment>

const external2 = <React.Fragment>
<iframe src="https://my.currikistudio.org/h5p/embed/176784" width="100%" height="800" frameborder="0" allowfullscreen="allowfullscreen">
</iframe>
<script src="https://my.currikistudio.org/api/storage/h5p/h5p-core/js/h5p-resizer.js" charset="UTF-8">
</script>
</React.Fragment>



class ExerciseDataList extends DataList{
    
      filter(query){
        const filter = query ? query.length >= 2 : false;
        if(filter){
          this.return_data = this.return_data.filter((single_object) => {single_object.test(query)});
        }
      }

  sort(){
    this.return_data.sort(compare_id);
  }
}



const exercise_data_def = [
  new ConjugationData(1, "Odmiana haben i sein", "gramatyka, podstawy", "A1", [sein, haben], false),
  new ConjugationData(2, "Osoby po niemiecku", "gramatyka, podstawy", "A1", [], true),
  new TranslationData(3, "Tłumaczenie", "słownictwo, podstawy", "A1", [auto, fahrrad, motorrad], 10),
  new GapData(4, "Wie heißt das Gegenteil? Ergänzen Sie.", "słowotwórstwo", "A2",
          [new SentenceData("Das Zimmer ist möbliert. <-> Das Zimmer ist unmöbliert.", 4, 9),
           new SentenceData("Die Nebenkosten sind exclusive. <-> Die Nebenkosten sind inklusive.", 4, 9),
           new SentenceData("Das Sofa ist bequem. <-> Das Sofa ist unbequem.", 4, 9),
           new SentenceData("Die Wohnung ist ungemütlich. <-> Die Wohnung ist gemütlich.", 4, 9),
           new SentenceData("Er muss die Hintertür aufschließen. <-> Er muss die Hintertür abschließen.", 5, 11),
         ]),
  new ExternalData(5, "Canva", "Test Canva", "A1", external1),
  new ExternalData(6, "CurrikiStudio", "słownictwo", "A1", external2)
  
  //new SortData(2, "test2", "gramatyka", "A2", new GroupData(dativ, []))
  ];


function conjugation_from_api(data){
  const with_persons = false;
  return new ConjugationData(data._id, data.title, data.categories, data.level, data.words, with_persons);
}


function translation_from_api(data){
  return new TranslationData(data._id, data.title, data.categories, data.level, data.words, 10);
}


function gap_from_api(data){
  const sentences = []
  for(const sentence of data.sentences){
    sentences.push(new SentenceData(sentence.sentence, sentence.mark, sentence.gap));
  }
  return new GapData(data._id, data.title, data.categories, data.level, sentences);
}


function extern_from_api(data){
  return new ExternalData(data._id, data.title, data.categories, data.level, data.externals[0]);
}


function exercise_from_api(data){
  switch(data.exercise_type) {
    case 0, 1:
        return conjugation_from_api(data);
    case 10:
        return translation_from_api(data);
    case 30:
        return gap_from_api(data);
    case 90:
        return extern_from_api(data);
      }
    return undefined;
}


function exercise_list_from_api(data_list){
  const exercise_objects = [];
  for(const exercise of data_list){
    exercise_objects.push(exercise_from_api(exercise));
  }
  const exercise_data_list = new ExerciseDataList(exercise_objects)
  return {data: exercise_data_list.data, count: exercise_data_list.count};
}

const exercise_data = new ExerciseDataList(exercise_data_def);

export default exercise_data;

export {
  ExerciseData, exercise_list_from_api, exercise_from_api, ConjugationData, WordData
}
