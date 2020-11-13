import {ImgProfile, ImgLogoBig, LogoBanner16_9} from '../static'

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
  new BlogData(4,"Pojazdy - tłumaczenie","Dopasuj tłumaczenie",'',3,"", "Kamila Wiśniewska", "03.11.2020"),
  new BlogData(1,"Herzlich Willkommen!","witam na stronie szkoły językowej Deutsch ist toll!",LogoBanner16_9,0,"Witam", "Kamila Wiśniewska", "01.09.2019"),
  new BlogData(2,"Odmiana haben i sein","odmiana podstawowych czasowników przez przypadki",'',1,"", "Kamila Wiśniewska", "29.10.2020"),
  new BlogData(3,"Osoby","Posegreguj osoby",'',2,"", "Kamila Wiśniewska", "30.10.2020"),
];

const blog_data_xml = `<?xml version='1.0' encoding='utf-8'?>
                        <Blog>
                           <Entries count='1'>
                               <Entry id='1'>
                                   <Title>First entry</Title>
                                   <Picture>LogoBig4_3.jpg</Picture>
                                   <Exercise>1</Exercise>
                                   <Text>This is first blog entry</Text>
                               </Entry>
                           </Entries>
                        </Blog>`;

export default blog_data;

export {
  BlogData
}
