import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Dialogs } from '@ionic-native/dialogs';

@Component({
  selector: 'page-adddata',
  templateUrl: 'adddata.html'
})
export class AdddataPage {

  data = { name: "suchada", nickname: "su" };

  constructor(public navCtrl: NavController,public viewCtrl: ViewController, private sqlite: SQLite, private toast: Toast, private dialogs: Dialogs) {
    this.createTable();
  }

  createTable() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('create table tbUser(name VARCHAR(32), nickname VARCHAR(32))', {})
        .then(() => this.dialogs.alert('Executed SQL', 'Title', 'Ok'))
        .catch(e => console.log(e));
    })
      .catch(e => console.log(e));
  }

  add(){
    this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('INSERT INTO tbUser VALUES(NULL,?,?)', [this.data.name, this.data.nickname])
          .then(res =>
            this.dialogs.alert('Insert Into SQL', 'Title', 'Ok')
          )
          .catch(e => console.log(e));
      })
        .catch(e => console.log(e));
  }

  close(){
    this.viewCtrl.dismiss();
  }

}