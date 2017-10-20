import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Dialogs } from '@ionic-native/dialogs';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  data = { name: "suchada", nickname: "su" };
  datas: any = [];

  constructor(public navCtrl: NavController, private sqlite: SQLite, private toast: Toast, private dialogs: Dialogs) {
    this.getData();
  }

  getData() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('create table tbUser(name VARCHAR(32), nickname VARCHAR(32))', {})
        .then(() => this.dialogs.alert('Executed SQL'))
        .catch(e => console.log(e));
    })
      .catch(e => console.log(e));
  }

  loadData() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('SELECT * FROM tbUser ORDER BY rowid DESC', {})
        .then(res => {
          this.datas = [];
          for(let i=0; i<res.rows.length; i++){
            this.datas.push({name: res.rows.item(i).name, nickname: res.rows.item(i).nickname});
          }
        })
      })
      .catch(e => console.log(e));
  }

  addData() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO tbUser VALUES()', [this.data.name, this.data.nickname])
        .then(res =>
          this.dialogs.alert('Insert Into SQL')
        )
        .catch(e => console.log(e));
    })
      .catch(e => console.log(e));
  }


}
