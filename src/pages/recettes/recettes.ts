
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RequestOptions, Headers, Http} from '@angular/http';

import { p } from '@angular/core/src/render3';
@Component({
  selector: 'page-recettes',
  templateUrl: 'recettes.html',
})
export class RecettesPage {
  public Nom;
  public Prenom;avatar;
  public solde;
  public retrait : boolean;
  public historique = [];
  public UrlHistorique ="https://clic1steak.fr/api/livreur/historique";
  public UrlRetrait ="https://clic1steak.fr/api/livreur/retrait"
  constructor(public loadingCtrl : LoadingController, public alert : AlertController, public http : Http, public storage : Storage,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: 'Patientez S\'il vous plait...'
    });
    loader.present();
    console.log('ionViewDidLoad RecettesPage');
    this.storage.get('Nom').then(val =>{
     this.Nom = val;
    });
    this.storage.get('Prenom').then(val =>{
      this.Prenom = val;
     });
     this.storage.get('avatar').then(val=>{
      this.avatar=val;
      console.log(this.avatar);
     });

     this.storage.get('token').then (val=>{
     let headers = new Headers({
        'Accept' : 'application/json',
        'Authorization' :'Bearer '+  val,
        'TypeContent' : 'application/x-www-form-urlenconded'
      });
      let options = new RequestOptions ({headers:headers});
      this.http.get(this.UrlHistorique,options).subscribe(data=>{
        console.log(data['_body']);
       let reponse = JSON.parse(data['_body']);
       let reponsee =  [reponse['success']];
       reponsee.forEach(element => 
        {   element =[element];
            element.forEach(elements=>{
               this.historique = elements.historique
            })
        });
        loader.dismiss();
     console.log(data);
     
      console.log(this.historique);

      for(let i=0 ; i< this.historique.length; i++){
        let date
        
        console.log(this.historique[i]["created_at"]);
      }

       console.log(reponse['success'])
       if (reponse['success']['solde'] == null){
         this.solde = "0.00"
       }
       else {
         this.solde= reponse['success']['solde']/100;
       }
      },
       (error)=>{

       }
      )

    });
   
  }
  Ouvretrait(solde){
    
    let alert1 = this.alert.create({
      title: 'Clic1Steak',
      subTitle: 'Entrer votre Mail PayPal ',
      
      inputs : [
        {
          name: 'title',
          value: 'Entrer votre Mail PayPal '
        },
        {
          name: 'title1',
          value: 'Montant à retirer'
        }
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
            let alert1 = this.alert.create({
              title: 'Clic1Steak',
              subTitle: 'Êtes vous sur que c’est votre Mail PayPal ?',
              inputs : [
        
              ],
              buttons: [
                {
                  text : "Quitter",
                  role : "cancel"
                },
                {
                  text:'Oui',
                  handler : () =>
                  {
                    console.log(data.title);  
                    this.storage.get('token').then (val=>{
                      let headers = new Headers({
                         'Accept' : 'application/json',
                         'Authorization' :'Bearer '+  val,
                         'TypeContent' : 'application/x-www-form-urlenconded'
                       });
                       console.log(data);
                       let montant  = Number(data.title1);
                        let options = new RequestOptions ({headers:headers});
                        if(montant <= solde ){
                        this.http.post(this.UrlRetrait+"?email="+data.title+"amount="+data.title1,{},options).subscribe(data=>{
                       
                      });
                     }
                     else{
                     let alert1 = this.alert.create({
                      title: 'Clic1Steak',
                      subTitle: 'Montant non valide.',
                      buttons: [
                        {
                          text:'OK',
                          handler : () =>
                          {
                                    
                          }
                
                        },
                      ]
                    });
                    alert1.present();
                   }
                   });
                  
                  }
        
                },
              ]
            });
            alert1.present();   
          }

        },
      ]
    });
    alert1.present();  

  }

 

}