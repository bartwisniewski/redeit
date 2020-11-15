import {ImgProfile, ImgLogoBig, LogoBanner16_9} from '../static'

class ExerciseData {
  constructor(id, title, categories, level) {
    this.id = id;
    this.title = title;
    this.type = 0;
    this.categories = categories;
    this.level = level;
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


class SortData extends ExerciseData{
  constructor(id, title, categories, level, groups) {
    super(id, title, categories, level);
    this.groups = groups;
    this.type = 20;
  }
}


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


class GroupData {
  constructor(word, words){
    this.word = word;
    this.words = words;
  }
}

const sein = new WordData("sein", "być", "", ["bin", "bist", "ist", "sind", "seid", "sind"]);
const haben = new WordData("haben", "mieć", "", ["habe", "hast", "hat", "haben", "habt", "haben"]);
const nominativ = new WordData("Nominativ", "mianownik", "", []);
const akkusativ = new WordData("Akkusativ", "biernik", "", []);
const dativ = new WordData("Dativ", "celownik", "", []);
const der = new WordData("der", "", "der", ["der", "den", "dem", "des"]);
const die = new WordData("die", "", "die", ["die", "die", "der", "der"]);
const das = new WordData("das", "", "das", ["das", "das", "dem", "des"]);
const plural = new WordData("die", "", "pl", ["die", "die", "den", "der"]);

const auto = new WordData("Auto", "samochód", "das", []);
const fahrrad = new WordData("Fahrrad", "rower", "der", []);
const motorrad = new WordData("Motorrad", "motocykl", "der", []);

const exercise_data = [
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
  //new SortData(2, "test2", "gramatyka", "A2", new GroupData(dativ, []))
  ];


export default exercise_data;

export {
  ExerciseData, ConjugationData, WordData
}
