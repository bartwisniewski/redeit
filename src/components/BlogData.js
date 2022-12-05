import { LogoBanner16_9} from '../static'
import { compare_date_arr } from "./Utils";

class BlogData {
  constructor(id, title, subtitle, picture, exercise, text, author, date) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.picture = picture;
    this.exercise = exercise;
    this.text = text;
    this.author = author;
    this.date = date;
  }
}

const blog_data = [
  new BlogData(5,"Das Zimmer ist möbliert","",'',4,"", "Kamila Wiśniewska", "11.11.2020"),
  new BlogData(4,"Pojazdy","",'',3,"", "Kamila Wiśniewska", "03.11.2020"),
  new BlogData(3,"Osoby","",'',2,"", "Kamila Wiśniewska", "02.09.2020"),
  new BlogData(2,"Czasowniki posiłkowe","",'',1,"", "Kamila Wiśniewska", "29.10.2020"),
  new BlogData(1,"Herzlich Willkommen!","Witam na stronie szkoły językowej Deutsch ist toll!",LogoBanner16_9,0, "O mnie: Nauczycielka języka niemieckiego. 4 lata pracy i nauki w Niemczech. Absolwentka wydziału neofilologii Uniwersytetu Warszawskiego. Stawiam nacisk na umiejętność praktycznego wykorzystania języka.\n Prowadzę zajęcia dla osób w każdym wieku i na każdym poziomie zaawansowania.\n Dla dzieci: Nauka poprzez zabawę, posiadam wiele niemieckich gier edukacyjnych, filmów, bajek oraz książek, pozwalających dziecku na szybkie i przyjemne oswojenie się z nowym językiem. Dla uczniów: Przygotowanie do egzaminów, sprawdzianów. Pomoc w zrozumieniu materiału szkolnego. Dla dorosłych: Nauka na każdym poziomie. Przygotowanie do korzystania z języka w codziennych sytuacjach oraz w pracy.\n Program dopasowuję indywidualnie do każdego ucznia. Lekcje odbywają się u mnie w mieszkaniu (al. Rzeczypospolitej, Warszawa Wilanów).\n Dla zainteresowanych, prowadzę również zajęcia ONLINE na SKYPE!\n Serdecznie zapraszam na moją stronę detuschisttoll.waw.pl.\n Serdecznie zapraszam\n Kamila", "Kamila Wiśniewska", "01.09.2019")
].sort(compare_date_arr);

export default blog_data;

export {
  BlogData
}
