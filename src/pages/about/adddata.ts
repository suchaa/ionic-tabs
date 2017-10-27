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

  data = { id: "", name: "", nickname: "" };
  mode: string = "ADD";
  id: string;
  name: string;
  nickname: string;

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
    this.data.id = this.navParams.get('id');
  }

  ionViewDidLoad() {
    if (this.data.id) {
      let id = this.data.id;

      this.mode = 'EDIT';
      this.data.id = id;
    }
  }

  add() {
    if (this.mode === "EDIT") {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        return db.executeSql('UPDATE tbUser SET name=?,nickname=? WHERE id=?', [this.data.name, this.data.nickname, this.data.id])
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

  createTable() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      return db.executeSql('create table IF NOT EXISTS tbUser(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, nickname TEXT)', {})
        //.then(() => this.dialogs.alert('Executed SQL', 'Title', 'Ok'))
        .catch(e => console.log(e));
    })
      .catch(e => console.log(e));
  }

}