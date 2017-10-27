import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Dialogs } from '@ionic-native/dialogs';

@Component({
  selector: 'page-adddata',
  templateUrl: 'adddata.html'
})
export class AdddataPage {

  data = { name: "", nickname: "" };
  mode: string = "ADD";
  id: string;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    private sqlite: SQLite,
    private toast: Toast,
    private dialogs: Dialogs,
    public navParams: NavParams
  ) {
    this.createTable();
    this.data.name = this.navParams.get('name');
    this.data.nickname = this.navParams.get('nickname');

    if (this.id) {
      let id = this.id;

      this.mode = 'EDIT';
      this.id = id;
    }

  }

  createTable() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      return db.executeSql('create table IF NOT EXISTS tbUser(name TEXT, nickname TEXT)', {})
        //.then(() => this.dialogs.alert('Executed SQL', 'Title', 'Ok'))
        .catch(e => console.log(e));
    })
      .catch(e => console.log(e));
  }

  add() {

    if (this.mode === "EDIT") {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        return db.executeSql('UPDATE expense SET name=?,nickname=?', [this.data.name, this.data.nickname])
          .then(res =>
            //this.dialogs.alert('Insert Into SQL', 'Title', 'Ok');
            //this.viewCtrl.dismiss()
            this.toast.show('Update saved', '5000', 'center').subscribe(
              toast => {
                this.viewCtrl.dismiss()
              })
          )
          .catch(e => console.log(e));
      })
        .catch(e => console.log(e));
    } else {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        return db.executeSql('INSERT INTO tbUser VALUES(?,?)', [this.data.name, this.data.nickname])
          .then(res =>
            //this.dialogs.alert('Insert Into SQL', 'Title', 'Ok');
            //this.viewCtrl.dismiss()
            this.toast.show('Data saved', '5000', 'center').subscribe(
              toast => {
                this.viewCtrl.dismiss()
              })
          )
          .catch(e => console.log(e));
      })
        .catch(e => console.log(e));
    }
  }

  close() {
    this.viewCtrl.dismiss();
  }

}