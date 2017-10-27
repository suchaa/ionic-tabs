import { Component } from '@angular/core';
import { NavController, ModalController  } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Dialogs } from '@ionic-native/dialogs';
import { AdddataPage } from '../about/adddata';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  datas: any = [];

  constructor(
    public modalCtrl: ModalController, 
    public navCtrl: NavController, 
    private sqlite: SQLite, 
    private toast: Toast, 
    private dialogs: Dialogs
  ){
    this.getData();
  }

  getData() {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        return db.executeSql('SELECT * FROM tbUser', {})
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
    let modal = this.modalCtrl.create(AdddataPage);
    modal.present();

    modal.onDidDismiss(data => {
      this.getData();
  });
  }


  EditItem(name){
    let modal = this.modalCtrl.create(AdddataPage, {name:name});
    modal.present();

    modal.onDidDismiss(data => {
      this.getData();
  });
  }

  DeleteItem(name){
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM tbUser WHERE name=?', [name])
      .then(res => {
        console.log(res);
        this.getData();
        this.dialogs.alert('Delete item', 'Delete', 'Ok');
      })
      .catch(e => console.log(e));
    }).catch(e => console.log(e));
  }
}
