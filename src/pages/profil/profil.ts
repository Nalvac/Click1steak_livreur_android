import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, Events, AlertController, normalizeURL } from 'ionic-angular';

import { Http, RequestOptions, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { ImageHandlerProvider } from '../../providers/image-handler/image-handler';
import { FileTransferObject, FileUploadOptions, FileTransfer } from '@ionic-native/file-transfer';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';

@Component({
  selector: 'page-profil',
  templateUrl: 'profil.html',
})
export class ProfilPage {
public Nom: string;
 public Email: string; 
 public Deplacement: string;
 public Prenom: string;
 public Telephone: string;
 public Adresse: string;
 public ComplementAdresse: string;
 public Ville: string;
 public CodePostal: string;
 public MotDePasse : string;
 public avatar : string;
 public token : string;
 public imageURI : any;
 public UrlLivreur ="https://clic1steak.fr/api/livreur/me";
 public UrlLivreurUpdate ="https://clic1steak.fr/api/livreur/update";

  constructor( private camera: Camera,private fileChooser: FileChooser, 
               private filePath: FilePath, public imghandler : ImageHandlerProvider, 
               public alertCtrl: AlertController, public events :Events, 
               public loadingCtrl : LoadingController, public http : Http, 
               public navCtrl: NavController, public navParams: NavParams, 
               public modal : ModalController, public storage : Storage,
               public crop: Crop) 
  {
    
  }

  ionViewWillEnter() {
    this.events.subscribe('Nom', (Nom) => {
      // user and time are the same arguments passed in `events.publish(user, time)`
     this.Nom = Nom;
       
    });
    this.storage.get('Nom').then(val=>{
    this.Nom =val       });
    this.storage.get('Prenom').then(val=>{
    this.Prenom =val
    });
    this.storage.get('Adresse').then(val=>{
    this.Adresse =val       });
    this.storage.get('Telephone').then(val=>{
    this.Telephone =val
    });
    this.storage.get('Adresse').then(val=>{
    this.Adresse =val       });
    this.storage.get('Ville').then(val=>{
    this.Ville =val
    });
    this.storage.get('CodePostal').then(val=>{
    this.CodePostal =val       });
    this.storage.get('ComplementAdresse').then(val=>{
    this.ComplementAdresse =val
    });
    this.storage.get('Deplacement').then(val=>{
      this.Deplacement =val      
   });
   this.storage.get('avatar').then(val=>{
    this.avatar =val      
    });
    this.storage.get('Mail').then(val=>{
    this.Email =val       });
    this.storage.get('Password').then(val=>{
    this.MotDePasse =val
    });
 
}
  modifyLastname(){
    const prompt = this.alertCtrl.create({
      title: '',
     
      inputs: [
        {
          name: 'title',
          value: this.Nom
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role : 'Cancel'
        },
        {
          text: 'Enregistrer',
          handler: data => {
          
            this.events.publish('Nom',data.title);            
            
            this.storage.get('token').then((val) => {
            this.Nom= data.title;
            let token = val;
            let headers = new Headers({
             'Accept' : 'application/json',
            'Authorization' : 'Bearer '+ token,
            'content-type':'application/x-www-form-urlenconded',});    
          let options = new RequestOptions({headers:headers});
            let body ="name="+ this.Nom;                     
             this.http.post(this.UrlLivreurUpdate+'?'+body , {}, options).subscribe(data =>{
               let  reponse =JSON.parse(data['_body']);
               console.log(reponse);
                
             },
             (error) => {
            
             }
             );
            });     
                    
            }
          }
        ]
      });                 
      prompt.present();
  }
  modifyFirstname(){
    const prompt = this.alertCtrl.create({
      title: '',
     
      inputs: [
        {
          name: 'title',
          value: this.Prenom
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role : 'Cancel'
        },
        {
          text: 'Enregistrer',
          handler: data => {
          
            this.events.publish('Nom',data.title);            
            
            this.storage.get('token').then((val) => {
            this.Prenom= data.title;
            let token = val;
            let headers = new Headers({
             'Accept' : 'application/json',
            'Authorization' : 'Bearer '+ token,
            'content-type':'application/x-www-form-urlenconded',});    
          let options = new RequestOptions({headers:headers});
            let body ="prenom="+ this.Prenom;                     
             this.http.post(this.UrlLivreurUpdate+'?'+body , {}, options).subscribe(data =>{
               let  reponse =JSON.parse(data['_body']);
               console.log(reponse);
                
             },
             (error) => {
            
             }
             );
            });     
                    
            }
          }
        ]
      });                 
      prompt.present();
  }
  modifyTelephone(){
    const prompt = this.alertCtrl.create({
      title: '',
     
      inputs: [
        {
          name: 'title',
          value: this.Telephone
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role : 'Cancel'
        },
        {
          text: 'Enregistrer',
          handler: data => {
          
            this.events.publish('Nom',data.title);            
            
            this.storage.get('token').then((val) => {
            this.Telephone= data.title;
            let token = val;
            let headers = new Headers({
             'Accept' : 'application/json',
            'Authorization' : 'Bearer '+ token,
            'content-type':'application/x-www-form-urlenconded',});    
          let options = new RequestOptions({headers:headers});
            let body ="phone="+ this.Telephone;                     
             this.http.post(this.UrlLivreurUpdate+'?'+body , {}, options).subscribe(data =>{
               let  reponse =JSON.parse(data['_body']);
               console.log(reponse);
                
             },
             (error) => {
            
             }
             );
            });     
                    
            }
          }
        ]
      });                 
      prompt.present();
  }
  modifyAddress(){
    const prompt = this.alertCtrl.create({
      title: '',
     
      inputs: [
        {
          name: 'title',
          value: this.Adresse
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role : 'Cancel'
        },
        {
          text: 'Enregistrer',
          handler: data => {
          
            this.events.publish('Nom',data.title);            
            
            this.storage.get('token').then((val) => {
            this.Adresse= data.title;
            let token = val;
            let headers = new Headers({
             'Accept' : 'application/json',
            'Authorization' : 'Bearer '+ token,
            'content-type':'application/x-www-form-urlenconded',});    
          let options = new RequestOptions({headers:headers});
            let body ="adresse="+ this.Adresse;                     
             this.http.post(this.UrlLivreurUpdate+'?'+body , {}, options).subscribe(data =>{
               let  reponse =JSON.parse(data['_body']);
               console.log(reponse);
                
             },
             (error) => {
            
             }
             );
            });     
                    
            }
          }
        ]
      });                 
      prompt.present();
  }
  modifyCompAddress(){
    const prompt = this.alertCtrl.create({
      title: '',
     
      inputs: [
        {
          name: 'title',
          value: this.ComplementAdresse        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role : 'Cancel'
        },
        {
          text: 'Enregistrer',
          handler: data => {
          
            this.events.publish('Nom',data.title);            
            
            this.storage.get('token').then((val) => {
            this.ComplementAdresse= data.title;
            let token = val;
            let headers = new Headers({
             'Accept' : 'application/json',
            'Authorization' : 'Bearer '+ token,
            'content-type':'application/x-www-form-urlenconded',});    
          let options = new RequestOptions({headers:headers});
            let body ="prenom="+ this.Prenom;                     
             this.http.post(this.UrlLivreurUpdate+'?'+body , {}, options).subscribe(data =>{
               let  reponse =JSON.parse(data['_body']);
               console.log(reponse);
                
             },
             (error) => {
            
             }
             );
            });     
                    
            }
          }
        ]
      });                 
      prompt.present();
  }
  modifyCode(){
    const prompt = this.alertCtrl.create({
      title: '',
     
      inputs: [
        {
          name: 'title',
          value: this.CodePostal
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role : 'Cancel'
        },
        {
          text: 'Enregistrer',
          handler: data => {
          
            this.events.publish('Nom',data.title);            
            
            this.storage.get('token').then((val) => {
            this.CodePostal= data.title;
            let token = val;
            let headers = new Headers({
             'Accept' : 'application/json',
            'Authorization' : 'Bearer '+ token,
            'content-type':'application/x-www-form-urlenconded',});    
          let options = new RequestOptions({headers:headers});
            let body ="code_postal="+ this.CodePostal;                     
             this.http.post(this.UrlLivreurUpdate+'?'+body , {}, options).subscribe(data =>{
               let  reponse =JSON.parse(data['_body']);
               console.log(reponse);
                
             },
             (error) => {
            
             }
             );
            });     
                    
            }
          }
        ]
      });                 
      prompt.present();
  }
  modifyCity(){
    const prompt = this.alertCtrl.create({
      title: '',
     
      inputs: [
        {
          name: 'title',
          value: this.Ville
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role : 'Cancel'
        },
        {
          text: 'Enregistrer',
          handler: data => {
          
            this.events.publish('Nom',data.title);            
            
            this.storage.get('token').then((val) => {
            this.Ville= data.title;
            let token = val;
            let headers = new Headers({
             'Accept' : 'application/json',
            'Authorization' : 'Bearer '+ token,
            'content-type':'application/x-www-form-urlenconded',});    
          let options = new RequestOptions({headers:headers});
            let body ="city="+ this.Ville;                     
             this.http.post(this.UrlLivreurUpdate+'?'+body , {}, options).subscribe(data =>{
               let  reponse =JSON.parse(data['_body']);
               console.log(reponse);
                
             },
             (error) => {
            
             }
             );
            });     
                    
            }
          }
        ]
      });                 
      prompt.present();
  }
  modifyMail(){
    const prompt = this.alertCtrl.create({
      title: '',
     
      inputs: [
        {
          name: 'title',
          value: this.Email
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role : 'Cancel'
        },
        {
          text: 'Enregistrer',
          handler: data => {
          
            this.events.publish('Nom',data.title);            
            
            this.storage.get('token').then((val) => {
            this.Email= data.title;
            let token = val;
            let headers = new Headers({
             'Accept' : 'application/json',
            'Authorization' : 'Bearer '+ token,
            'content-type':'application/x-www-form-urlenconded',});    
          let options = new RequestOptions({headers:headers});
            let body ="email="+ this.Email;                     
             this.http.post(this.UrlLivreurUpdate+'?'+body , {}, options).subscribe(data =>{
               let  reponse =JSON.parse(data['_body']);
               console.log(reponse);
                
             },
             (error) => {
            
             }
             );
            });     
                    
            }
          }
        ]
      });                 
      prompt.present();
  }
  modifyPassword(){
    const prompt = this.alertCtrl.create({
      title: '',
     
      inputs: [
        {
          name: 'title',
          value: this.MotDePasse,
          type : 'password'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role : 'Cancel'
        },
        {
          text: 'Enregistrer',
          handler: data => {
          
            this.events.publish('Nom',data.title);            
            
            this.storage.get('token').then((val) => {
            this.MotDePasse= data.title;
            let token = val;
            let headers = new Headers({
             'Accept' : 'application/json',
            'Authorization' : 'Bearer '+ token,
            'content-type':'application/x-www-form-urlenconded',});    
          let options = new RequestOptions({headers:headers});
            let body ="password="+ this.MotDePasse;                     
             this.http.post(this.UrlLivreurUpdate+'?'+body , {}, options).subscribe(data =>{
               let  reponse =JSON.parse(data['_body']);
               console.log(reponse);
                
             },
             (error) => {
            
             }
             );
            });     
                    
            }
          }
        ]
      });                 
      prompt.present();
  }
  onDeplacement(){
    const prompt = this.alertCtrl.create({
      title: '',
     
      inputs: [
        {
          name: 'title',
          value: this.Deplacement
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          role : 'Cancel'
        },
        {
          text: 'Enregistrer',
          handler: data => {
          
            this.events.publish('Nom',data.title);            
            
            this.storage.get('token').then((val) => {
            this.Deplacement= data.title;
            let token = val;
            let headers = new Headers({
             'Accept' : 'application/json',
            'Authorization' : 'Bearer '+ token,
            'content-type':'application/x-www-form-urlenconded',});    
          let options = new RequestOptions({headers:headers});
            let body ="moyen_deplacement="+ this.Deplacement;                     
             this.http.post(this.UrlLivreurUpdate+'?'+body , {}, options).subscribe(data =>{
               let  reponse =JSON.parse(data['_body']);
               console.log(reponse);
                
             },
             (error) => {
            
             }
             );
            });     
                    
            }
          }
        ]
      });                 
      prompt.present();

  }
  chooseFile(){
      
     /* this.fileChooser.open().then(file => {
        this.filePath.resolveNativePath(file).then(resolvedFilePath => {
          this.fileOpener.open(resolvedFilePath, 'application/pdf').then(file => {
            alert("It worked!")
          }).catch(err => {
            alert(JSON.stringify(err));
          });
        }).catch(err => {
          alert(JSON.stringify(err));
        });
      }).catch(err => {
        alert(JSON.stringify(err));
      });*/

  }
  getImage() {
    this.storage.get('token').then(token =>
      {
        let loader = this.loadingCtrl.create({
          content: "Chargement de la photo..."
        });
        loader.present();
        let cameraOptions = 
        {
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          destinationType: this.camera.DestinationType.FILE_URI,      
          quality: 100,
          targetWidth        : 1024,
          targetHeight       : 1024,
          encodingType: this.camera.EncodingType.JPEG, 
          correctOrientation: true,
          allowEdit: false,
        }
        this.camera.getPicture(cameraOptions).then(imageData => 
        {
          console.log(imageData);
          let image = imageData.replace(/^file:\/\//, '');
          console.log(image);
          this.crop.crop(image, {quality: 100, targetWidth: 300, targetHeight : 300}).then(cropImage =>
          {
            let safeURL = normalizeURL(cropImage);
            this.avatar = safeURL;
            ImageHandlerProvider.imgSrc = safeURL;
            this.storage.get('name').then(data =>
            {
              this.events.publish('avatar', this.avatar, data);
            });
            console.log(cropImage);
            console.log(this.avatar);
            console.log('Imagesrc', ImageHandlerProvider.imgSrc);
            this.imghandler.uploadFile(ImageHandlerProvider.imgSrc, token);
          })
      
        })
          loader.dismiss();
    });
  }
}