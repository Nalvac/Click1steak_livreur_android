import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController, Events, LoadingController } from 'ionic-angular';
import { InscriptionPage } from '../inscription/inscription';

import { TabsPage } from '../tabs/tabs';
import { MapsPage } from '../maps/maps';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Http, RequestOptions,Headers } from '@angular/http';
import { FCM } from '@ionic-native/fcm';

@Component({
  selector: 'page-connexion',
  templateUrl: 'connexion.html',
})
export class ConnexionPage {
  public Nom; Prenom : string;
  public UrlLivreur ="https://clic1steak.fr/api/livreur/me";
  public urlLogin = "https://clic1steak.fr/api/livreur/login";
  public UpdateToken = "https://clic1steak.fr/api/livreur/update_token";
  public passwordForgett = "https://clic1steak.fr/api/livreur/resetLink";
  public formGroup : FormGroup;
  public mail: AbstractControl;
  public password:AbstractControl;
  passWordType : string = 'password';
  seePassWord : boolean = true;
  passIcon : string = 'eye-off'
  public avatar;errMessage;maill;passwordd : string;
  constructor(public loadingCtrl : LoadingController, public fcm: FCM , public events: Events,private storage: Storage,public alert: AlertController,   public http : Http,public navCtrl: NavController, public navParams: NavParams, public menu: MenuController,public formbuilder:FormBuilder) {
   
    this.formGroup = formbuilder.group({
       mail : ['',[ Validators.required, Validators.email]],
      password : ['', Validators.required,]
    });
    
    this.mail = this.formGroup.controls['mail'];
    this.password = this.formGroup.controls['password'];  

   } 

  ionViewDidLoad() {
    this.menu.enable(false, 'menuLivraison');     
  }
  voirPassWord(){
    
    if (!this.seePassWord){
      this.passWordType = 'password';      
      this.passIcon  = 'eye-off';
    }
    else {
      this.passWordType = '';     
      this.passIcon  = 'eye';
    }
    
    this.seePassWord = !this.seePassWord;
  }
 
  ouvInscription(){
    this.navCtrl.push(InscriptionPage)
  }
  passwordForget(){
    let alert1 = this.alert.create({
      title: 'Clic1Steak',
      subTitle: 'Entrer votre Mail ',
      
      inputs : [
        {
          name: 'title',
          value: 'Entrer votre Mail '
        },
      ],
      buttons: [
        {
          text : "Quitter",
          role : "cancel"
        },
        {
          
          text:'OK',
          handler : data =>
          {
              let headers = new Headers({
              'Accept' : 'application/json',
              'content-type':'application/x-www-form-urlenconded'});    
              let options = new RequestOptions({headers:headers});
       
           this.http.post(this.passwordForgett+"?email="+data.title,{}, options).subscribe((data) =>{   
            let  reponse =JSON.parse(data['_body']);
             console.log(reponse);   
         
           })
          }
        }
      ]
      });
      alert1.present();
  
   
  }
  OuvHome(){
        let loader = this.loadingCtrl.create({
          content: 'Patientez S\'il vous plait...'
        });
        loader.present();
      
        let  body ={
          "email" : this.maill,
          "password" : this.passwordd,       
        }
      this.http.post(this.urlLogin, body, {}).subscribe(data =>{

              let  reponse =JSON.parse(data['_body']);    
              
              this.navCtrl.setRoot(TabsPage);

              loader.dismiss();

              let token = reponse['success']['token'];

              this.storage.set('token', token);

              this.storage.set('Password', this.passwordd);

              this.storage.set('Mail', this.maill);
              
                let headers = new Headers({
                  'Accept' : 'application/json',
                  'Authorization' : 'Bearer '+  token,
                  'content-type':'application/x-www-form-urlenconded'
                });    
                let options = new RequestOptions({headers:headers});
                
                this.fcm.getToken().then( val=>{
                    this.http.post(this.UpdateToken+'?firebase_token='+val , {},  options).subscribe(()=>{
                    this.storage.set('fireBase_Token', val);
                  },
                  (error)=>{
            
                  }
                  )
                });
              
              this.http.get(this.UrlLivreur, options).subscribe((data) =>{   
                    let  reponse =JSON.parse(data['_body']);
                       
                      this.Nom =reponse['success']['name'];

                      this.Prenom=reponse['success']['prenom'];

                      this.avatar=reponse['success']['avatar'];

                    
                      this.storage.set('avatar', this.avatar);

                      this.events.publish('user',this.Nom ,this.Prenom);

                      this.events.publish('avatar');
              
              },
              (error) => {
                
              
              });
            },
            (error) => 
            {
            
              const po = this.alert.create({
                  message : "Mot de passe ou Adresse mail Incorrecte",
                  inputs: [
                  ],
                  buttons: [
                    {
                      text: 'Ok',
                      role : 'Cancel'
                    },
                  ],
                });
                  po.present();
                  loader.dismiss();
            },
        );
  }
  

}
