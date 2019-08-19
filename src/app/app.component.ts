import { Component, ViewChild } from '@angular/core';
import { Platform, MenuClose, MenuController, NavController, Tabs, Events, Avatar } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen, } from '@ionic-native/splash-screen';
import { ConnexionPage } from '../pages/connexion/connexion';
import { TabsPage } from '../pages/tabs/tabs';
import { Storage } from '@ionic/storage';
import {Http } from '@angular/http';
import { MapsPage } from '../pages/maps/maps';
import { ProfilPage } from '../pages/profil/profil';
import { FCM } from '@ionic-native/fcm';
import { RecettesPage } from '../pages/recettes/recettes';
import { BrowserTab } from '@ionic-native/browser-tab';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  
  @ViewChild('content') content  : NavController;
  rootPage:any = ConnexionPage;
  public Nom; Prenom;avatar;mail;password : string;
  firebase_token_user: any;
  public accueil : string;
  constructor(public browserTab: BrowserTab,public fcm : FCM, public events: Events,public http : Http, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
     public menuCtrl : MenuController, public storage : Storage) {
      
      events.subscribe('user', (Nom, Prenom) => {
        // user and time are the same arguments passed in `events.publish(user, time)`
       this.Nom = Nom;
       this.Prenom = Prenom;       
      });
             
       events.subscribe('avatar', (avatar)=>{
        this.avatar=avatar;        
       });
        events.subscribe('accueil', (accueil)=>{
          this.accueil =accueil;
        })

       platform.ready().then(() => {
        this.fcm.onNotification().subscribe(data => 
          {
            console.log(data);
            if (data.wasTapped)
            {
              this.content.setRoot(TabsPage);
            } 
            else 
            {
              this.content.setRoot(TabsPage);          
            }
          });
        statusBar.styleDefault();
        splashScreen.hide();

      });
      this.storage.get('Mail').then(val=>{
        this.storage.get('Password').then(val=>{
          this.password=val;
        });
        if(val != null){
           this.content.setRoot(TabsPage);
        }
    });    
        
  }
  ionViewWillEnter(){
    
 
  }
  onBrowserTab(){    
    this.browserTab.isAvailable()
    .then(isAvailable => {
      if (isAvailable) {
        this.browserTab.openUrl('https://clic1steak.fr/account/bank-account');
      } else {
        // open URL with InAppBrowser instead or SafariViewController
      }
    });
    this.menuCtrl.close();
  }
  onNavigat(page : any ){
    this.content.setRoot(page);
    this.menuCtrl.close();
  }
  onHisto(){
    this.content.setRoot(RecettesPage);
    this.menuCtrl.close();
  }
  onHome(){
    this.content.setRoot(TabsPage);
    this.menuCtrl.close();
  }
  onParam(){
    this.content.setRoot(ProfilPage);
    this.menuCtrl.close();
  }
  onCon(){
    this.storage.remove('Nom');
    this.storage.remove('Prenom');
    this.storage.remove('token');
    this.storage.remove('Password'); 
    this.storage.remove('Mail'); 
    this.storage.remove('avatar');
    this.storage.remove('fireBase_Token');
    this.storage.remove('order_id');
    this.storage.remove('commande');
    this.content.setRoot(ConnexionPage);
    }
  
    

      
 
}