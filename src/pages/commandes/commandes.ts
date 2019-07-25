import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, MenuController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-commandes',
  templateUrl: 'commandes.html',
})
export class CommandesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public alertCtrl : AlertController, public menuCtrl: MenuController) {    
  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true, 'menuLivraison');

  }
  alert(){
    const prompt = this.alertCtrl.create({
      
      message: "Voulez-vous accepter cette livraison ?",
      
      buttons: [
        {
          text: 'Annuler',
          role : 'Cancel'
        },
        {
          text: 'Oui',
          handler: ()=> {
            
            this.navCtrl.parent.select(1,{toi :"Bonjour"});
            
          }
        }
      ]
    });
    prompt.present();
  }
  OnMenu(){
    this.menuCtrl.open();
  }
}
