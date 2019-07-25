import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, Events } from 'ionic-angular';
import { CommandesPage } from '../commandes/commandes';
import { RecettesPage } from '../recettes/recettes';
import { ProfilPage } from '../profil/profil';
import { CommandePage } from '../commande/commande';
import { MapsPage } from '../maps/maps';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  @ViewChild('myTabs') tabRef: Tabs;

 
  tab1 : any = MapsPage;
  tab2 : any =  RecettesPage;
  tab3 :any =  ProfilPage;

  public increment : any;

  constructor(public events: Events, public navCtrl: NavController, public navParams: NavParams, public getpara :NavParams) {
    events.subscribe('tab', (i) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
     this.increment = i;
     
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
    
  }

  ionViewDidEnter() {
    
  }
}
