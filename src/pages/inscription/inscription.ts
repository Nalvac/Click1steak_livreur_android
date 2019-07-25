import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events, LoadingController } from 'ionic-angular';
import { ConnexionPage } from '../connexion/connexion';
import { FormGroup, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { Http, RequestOptions,Headers } from '@angular/http';
import { text } from '@angular/core/src/render3/instructions';
import   { Storage } from '@ionic/storage'
import { TabsPage } from '../tabs/tabs';
import { FCM } from '@ionic-native/fcm';

/**
 * Generated class for the InscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-inscription',
  templateUrl: 'inscription.html',
})
export class InscriptionPage 
{
  public urlRegister ="https://clic1steak.fr/api/livreur/register";
  public UpdateToken = "https://clic1steak.fr/api/livreur/update_token"
  public formGroup : FormGroup;
  public ComplementAdresse;Confirmpassword;deplacement;nom;prenom;telephone;email;adresse;codePostal;password;ville : AbstractControl;
  public deplacementt :  string;
  public passwordd : string;
  public maill : string;  
  public precedent : boolean = true;
  public suivant : boolean = false;
  public etape : number=1;
  public radio1= "radio-button-on";
  public radio2="radio-button-off";
  public radio3="radio-button-off";
  public button : string= "Suivant  1/3";
  public avatar :string;
  passWordType : string = 'password';
  seePassWord : boolean = true;
  passIcon : string = 'eye-off';
  public condition : boolean;
  public UrlLivreur ="https://clic1steak.fr/api/livreur/me";
 
  constructor(public fcm : FCM,public load : LoadingController, public events : Events,public storage : Storage, public navCtrl: NavController, public navParams: NavParams,
              public formBuilder : FormBuilder, public alert : AlertController, public http: Http) 
  {

      this.formGroup = formBuilder.group({
          nom : ['', Validators.required],
          prenom : ['', Validators.required],
          telephone : ['', Validators.required],
          ville : ['', Validators.required],
          adresse: ['', Validators.required],
          email : ['', [Validators.required, Validators.email]],
          password : ['', Validators.required],
          codePostal : ['', Validators.required],
     
          Confirmpassword : ['', Validators.required],
          
          ComplementAdresse : ['', Validators.required]
      });

      this.nom = this.formGroup.controls['nom'];
      this.prenom = this.formGroup.controls['prenom'];
      this.telephone = this.formGroup.controls['telephone'];
      this.adresse = this.formGroup.controls['adresse'];
      this.ville = this.formGroup.controls['ville'];
      this.codePostal = this.formGroup.controls['codePostal'];
      this.email = this.formGroup.controls['email'];
      this.password = this.formGroup.controls['password'];
      this.Confirmpassword = this.formGroup.controls['Confirmpassword'];
  

      this.ComplementAdresse=  this.formGroup.controls['ComplementAdresse'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionPage');
  
   
  }
  ionViewWillEnter(){
    if (this.formGroup.valid === false && this.deplacement  != " "){
      return true;
    }
    
  }
  ouvConnexion(){
    this.navCtrl.push(ConnexionPage)
  }
  OuvetapePre(){
    if (this.etape<=3 && this.etape>1){
      
      this.etape--;
      
    }
    switch(this.etape) { 
      case 1: { 
        this.radio1="radio-button-on"
        this.radio2="radio-button-off"
        this.radio3="radio-button-off"
        this.button="Suivant "+this.etape+"/3"
        this.precedent = true
        this.suivant = false
         break; 
      } 
      case 2: { 
        this.radio2="radio-button-on"
        this.radio1="radio-button-off"
        this.radio3="radio-button-off"
        this.button="Suivant "+this.etape+"/3"
        this.precedent = false
        this.suivant = false
         break; 
      }
      case 3: { 
        this.radio1="radio-button-off"
        this.radio2="radio-button-off"
        this.radio3="radio-button-on"
        this.button="Enreigistré"
        this.precedent = false
        this.suivant = false
         break; 
      } 
      default: { 
         this.etape=1; 
         break; 
      } 
   } 
  
  }
  Ouvetape(){
    if(this.etape<3){
      this.etape++;
    }
    switch(this.etape) { 
      case 1: { 
        this.radio1="radio-button-on"
        this.radio2="radio-button-off"
        this.radio3="radio-button-off"
        this.button="Suivant "+this.etape+"/3"
        this.precedent = true
         break; 
      } 
      case 2: { 
        this.radio2="radio-button-on"
        this.radio1="radio-button-off"
        this.button="Suivant "+this.etape+"/3"
        this.precedent = false
         break; 
      }
      case 3: { 
        this.radio1="radio-button-off"
        this.radio2="radio-button-off"
        this.radio3="radio-button-on"
        this.button="Suivant"
        this.precedent = false
        this.suivant = true
         break; 
      } 
      default: { 
         this.etape=1; 
         break; 
      } 
   } 
  }

  onEnreigiistrer(){

    if(this.condition == true){
          
        const loading = this.load.create({
            content : "Patientez S'il vous plait..."
        });
      
        loading.present();
          if(this.formGroup.get('password').value != this.formGroup.get('Confirmpassword').value){
            const pomt = this.alert.create({
                message : "Mot de passe Incorrecte",
                inputs: [
                ],
                buttons: [
                  {
                    text: 'Annuler',
                    role : 'Cancel'
                  },
                ]
            });
              pomt.present();
            }
            else {

              if(this.formGroup.get('password').value === this.formGroup.get('Confirmpassword').value){
                  let  body ={
                    "name" : this.formGroup.get('nom').value,
                    "prenom" : this.formGroup.get('prenom').value,
                    "email" : this.formGroup.get('email').value,
                    "password" : this.formGroup.get('password').value,
                    "phone" : this.formGroup.get('telephone').value,
                    "city" : this.formGroup.get('ville').value,
                    "adresse" : this.formGroup.get('adresse').value,
                    "code_postal" : this.formGroup.get('codePostal').value,
                    "moyen_deplacement" :  this.deplacementt, 
                    "complement_adresse" : this.formGroup.get('ComplementAdresse').value,
                  }
                  console.log(body);

                this.http.post(this.urlRegister, body, {}).subscribe(data => {
                  let reponse =JSON.parse(data['_body']);
                  
                  let messageErrror ="";
                  
                
                    messageErrror = messageErrror + reponse['errors'];
                  
                  

                  if (messageErrror != " " &&  messageErrror != "undefined"){
                    const po = this.alert.create({
                        message : messageErrror,
                       
                        buttons :[
                          {
                            text : 'OK',
                            role : 'cancel'
                          }
                        ]

                    });

                    po.present();
                    loading.dismiss();
                  }
                  else {
                    
                    let token = reponse['success']['token'];
                    this.storage.set('token',token);
                    let headers = new Headers({
                      'Accept' : 'application/json',
                    'Authorization' : 'Bearer '+  token,
                    'content-type':'application/x-www-form-urlenconded'});    
                  let options = new RequestOptions({headers:headers});
                  this.http.get(this.UrlLivreur, options).subscribe((data) =>{   
                  let  reponse =JSON.parse(data['_body']);
                                 
                  this.avatar=reponse['success']['avatar'];
                  
                  this.storage.set('avatar', this.avatar);
                  this.storage.set ('Nom',reponse['success']['name']);
                  this.storage.set ('Prenom',reponse['success']['prenom']);
                  this.events.publish('user',reponse['success']['name'],['success']['prenom']);
                  this.events.publish('avatar',reponse['success']['avatar']);
                  this.storage.set('avatar', reponse['success']['avatar']);
                  this.storage.set('Telephone', reponse['success']['phone']);
                  this.storage.set('Deplacement', reponse['success']['moyen_deplacement']);
                  this.storage.set('Ville', reponse['success']['city']);
                  this.storage.set('CodePostal', reponse['success']['code_postal']);
                  this.storage.set('Adresse', reponse['success']['adresse']);
                  this.storage.set('ComplementAdresse', reponse['success']['complement_adresse']);
                  this.storage.set('Password', this.passwordd);
                  this.storage.set('Mail', this.maill);
                  loading.dismiss();
                  this.navCtrl.setRoot(TabsPage);

                  this.fcm.getToken().then( val=>{
                    this.http.post(this.UpdateToken+'?firebase_token='+val , {},  options).subscribe(()=>{
                      this.storage.set('fireBase_Token', val);
                    },
                    (error)=>{
              
                    }
                    )
                  });
                },
                (error) => {
                    
                
                });

                  }
                },

                
          
              );
                
              }
            }
        
       } 
       else{
         
            const pomt = this.alert.create({
              message : "Accepter les conditions générales d'utilisation ",
              inputs: [

              ],
              buttons: [
                {
                  text: 'OK',
                  role : 'Cancel'
                },
              ]
            });
            pomt.present();
       }
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

}
