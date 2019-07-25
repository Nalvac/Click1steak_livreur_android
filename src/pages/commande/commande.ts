import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CommandesPage } from '../commandes/commandes';


@Component({
  selector: 'page-commande',
  templateUrl: 'commande.html',
})
export class CommandePage {
  tab1 : any = CommandesPage;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }

}
