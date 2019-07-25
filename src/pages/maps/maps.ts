import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController, Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { TabsPage } from '../tabs/tabs';
import { Http, RequestOptions, Headers,  } from '@angular/http';
import { Storage } from '@ionic/storage';
import { HTTP } from '@ionic-native/http';
import { FCM } from '@ionic-native/fcm';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

declare var google : any;


@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {
 public UrlLivreur ="https://clic1steak.fr/api/livreur/me";
 public OrderUsers ="https://clic1steak.fr/api/livreur/order/"
 public orderCurrent ="https://clic1steak.fr/api/livreur/order/"
 public Nom; Prenom; avatar: string;
  Destination: any = '';
  public map : any;
  public errMessage : string;
  public directionsDisplay : any;
  public directionsService : any ;
  pinB: any;
  pinD : any;
  i : number=0;
  public markerA : any;  
  public markerB : any;
  public newMap : boolean;
  public status : any;
  public urlCommande = "https://clic1steak.fr/api/livreur/commandes";
  public urlCommandAccept = "https://clic1steak.fr/api/livreur/accepter";
@ViewChild('map') mapElement : ElementRef;


        public commande = [];

        constructor( public launchNavigator : LaunchNavigator, public httpN: HTTP, public fcm :FCM, private geolocationn: Geolocation,public events : Events,
                      public storage : Storage,public http : Http, public alert : AlertController, public navCtrl: NavController, 
                      public navParams: NavParams, public geolocation : Geolocation,public menuCtrl : MenuController, public loadingCtrl : LoadingController, ) 
        {       
          
                this.storage.get('map').then,(val=>
                {
                  this.newMap =val;
                });
                this.directionsService = new google.maps.DirectionsService();

                this.directionsDisplay = new google.maps.DirectionsRenderer({
                    suppressMarkers: true
                });

                this.storage.get('status').then( val=>
                {
                    this.status= val;
                });
                this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=CulturalCenterBusStop,AvePalestine,Fes30050,Maroc&key=AIzaSyBCJ6Xgg6KCkVfGOCCj6PnD17KRfcmfqIQ&libraries=places', {}).subscribe((data)=>
               {
                    let reponse = JSON.parse(data['_body']);
                    console.log(reponse);
                
               }),
          
              this.storage.get('token').then((val) => 
              {
                  let token = val;
                  let headers = new Headers({
                    'Accept' : 'application/json',
                    'Authorization' : 'Bearer '+ token});    
                  let options = new RequestOptions({headers:headers});
                  this.http.get(this.UrlLivreur, options).subscribe((data) =>
                  {   
                        let  reponse =JSON.parse(data['_body']);
                        console.log(reponse); 
                        this.Nom =reponse['success']['name']; 
                        this.Prenom=reponse['success']['prenom'];  
                        this.Nom =reponse['success']['name']; 
                        this.Prenom=reponse['success']['prenom'];
                        this.avatar = reponse['success']['avatar'];                        
                        this.storage.set('Nom',this.Nom);
                        this.storage.set('Prenom',this.Prenom);
                        this.storage.set('avatar', reponse['success']['avatar']);
                        this.storage.set('Telephone', reponse['success']['phone']);
                        this.storage.set('Deplacement', reponse['success']['moyen_deplacement']);
                        this.storage.set('Ville', reponse['success']['city']);
                        this.storage.set('CodePostal', reponse['success']['code_postal']);
                        this.storage.set('Adresse', reponse['success']['adresse']);
                        this.storage.set('ComplementAdresse', reponse['success']['complement_adresse']);

                        this.events.publish('user',this.Nom ,this.Prenom);
                        this.events.publish('avatar',this.avatar);
                          
                  }),
                      (error) => {  
                      
                      };

                }),
                    (error) =>
                    {

                    };
          }


      userOrder(p : any)
      {    

            this.http.get(this.OrderUsers, {}).subscribe((data) =>
            {
            console.log(data);
            })
      }

      ionViewWillEnter() 
      {
            let loader = this.loadingCtrl.create({
              content: 'Patientez S\'il vous plait...'
            });
            loader.present();

            this.storage.get('order_id').then(id=>{
            console.log(id);
            this.storage.get('token').then (val=>{
            let headers = new Headers
            ({
                'Accept' : 'application/json',
                'Authorization' :'Bearer '+  val,
                'TypeContent' : 'application/x-www-form-urlenconded'
            });
          
            let options = new RequestOptions ({headers:headers});
            if(id != null) 
            {             
              this.http.get(this.orderCurrent+id,options).subscribe(data=>
              {
                    let reponse = JSON.parse (data['_body']);
                    console.log(reponse['success']['status']);
                    this.status = reponse['success']['status'];
                    if (this.status != "Livraison en cours")
                    { 
          
                        this.markerA = new google.maps.MarkerImage('https://img.icons8.com/ios/50/000000/near-me-filled.png');                   
                        this.markerB = new google.maps.MarkerImage('https://img.icons8.com/doodle/48/000000/user.png');                  
                        this.commande = [];
                        this.i=0;
                        let latitude;
                        let longitude; 
                        this.geolocation.getCurrentPosition().then((pos) => 
                        {
                            console.log("Position ", pos);
                            let mapOptions =
                            {
                              center: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                              zoom: 18,
                              mapTypeControl: false,
                              streetViewControl: false,
                              scaleControl: false,
                              zoomControl: true,
                            }                    
                              var uluru = {lat: pos.coords.latitude, lng: pos.coords.longitude};
                              latitude = pos.coords.latitude;
                              longitude = pos.coords.longitude;
                              this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
                              new google.maps.Marker
                            ({
                              position: uluru, 
                              map: this.map,
                              icon:  { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, scale: 6},
                              title : "Moi"
                            });
                              this.directionsDisplay.setMap(this.map);
                        }); 

                        this.storage.get('token').then((val) => 
                        {
                              let token = val;
                              let headers = new Headers
                              ({
                                  'Accept' : 'application/json',
                                  'Authorization' : 'Bearer '+ token
                              });    
                                let options = new RequestOptions({headers:headers});
                            this.http.get(this.urlCommande, options).subscribe(data =>
                            {   
                                  let  reponse =JSON.parse(data['_body']);
                                  console.log(reponse); 
                                  let reponsee = reponse ['data'];
                                  this.commande =[];
                                  console.log("Size", reponsee.length);
                                  reponsee.forEach(element => 
                                {
                                  this.i++;
                                  this.events.publish('tab',this.i),
                                  this.commande.push({
                                  "id" : element.id,
                                  "status": element.status,
                                  "name" : element.seller_id.name,
                                  "adresse" : element.listing_options.adresse_livraison,
                                  "adresseBoucher" : element.seller_id.adresse,
                                  "ville" : element.user_id.city,
                                  "codePostal" : element.user_id.code_postal,
                                  "complement" : element.user_id.complement_adresse,
                                  "nom" : element.user_id.name,
                                  "prenom": element.user_id.prenom,
                                  "telephone" : element.user_id.phone,
                                  "order_id" : element.id,
                                  "firebase_token" : element.user_id.firebase_token
                                    });
                                });
                                
                                this.commande = this.commande.reverse();
                                console.log(this.commande);
                                if(this.commande.length <= 0)
                                {
                                      this.commande.push({            
                                      "name" : "Aucune commande",
                                      "adresse" : "disponible",            
                                      });
                                }
                            },
                              (error) => {
                              this.errMessage = error['0'];
                              console.log(this.errMessage);          
                              });
                        });                  
                        let loading = this.loadingCtrl.create(
                        {
                          content: 'Patientez S\'il vous plait...'
                        });

                        loading.present();              
                        setTimeout(() => {
                        loading.dismiss();
                        }, 3000);
                      }
                    
                      else{
                          if(this.status == "Livraison en cours")
                          {
                            console.log("non");
                            this.newMap = false;
                            this.storage.get('commande').then(val=>
                            {
                              this.mapsReccurent(val);
                            });
                          }
                      }
              });
            } 
            }); 
            if(id=== null)
            {
                this.markerA = new google.maps.MarkerImage('https://img.icons8.com/ios/50/000000/near-me-filled.png');                   
                this.markerB = new google.maps.MarkerImage('https://img.icons8.com/doodle/48/000000/user.png');              
                this.commande = [];
                this.i=0;
                let latitude;
                let longitude; 
              
                this.geolocation.getCurrentPosition().then((pos) => 
                {
                        console.log("Position ", pos);
                        let mapOptions =
                        {
                          center: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                          zoom: 18,
                          mapTypeControl: false,
                          streetViewControl: false,
                          scaleControl: false,
                          zoomControl: true,
                        }     
                
                        var uluru = {lat: pos.coords.latitude, lng: pos.coords.longitude};
                        latitude = pos.coords.latitude;
                        longitude = pos.coords.longitude;
                        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
                        new google.maps.Marker
                        ({
                            position: uluru, 
                            map: this.map,
                            icon:  { path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, scale: 6},
                            
                        });
                        this.directionsDisplay.setMap(this.map);
                  }); 
                
                this.storage.get('token').then((val) => 
                {
                        let token = val;
                        let headers = new Headers
                      ({
                          'Accept' : 'application/json',
                          'Authorization' : 'Bearer '+ token
                      });    
                        let options = new RequestOptions({headers:headers});
                  this.http.get(this.urlCommande, options).subscribe(data =>
                  {   
                        let  reponse =JSON.parse(data['_body']);
                        console.log(reponse); 
                        let reponsee = reponse ['data'];
                        this.commande =[];
                        console.log("Size", reponsee.length);
                        reponsee.forEach(element => 
                        {
                        this.i++;
                        this.events.publish('tab',this.i),
                        this.commande.push({
                        "id" : element.id,
                        "status": element.status,
                        "name" : element.seller_id.name,
                        "adresse" : element.listing_options.adresse_livraison,
                        "adresseBoucher" : element.seller_id.adresse,
                        "ville" : element.user_id.city,
                        "codePostal" : element.user_id.code_postal,
                        "complement" : element.user_id.complement_adresse,
                        "nom" : element.user_id.name,
                        "prenom": element.user_id.prenom,
                        "telephone" : element.user_id.phone,
                        "order_id" : element.id,
                        "firebase_token" : element.user_id.firebase_token
                          });
                        });
                        
                    this.commande = this.commande.reverse();
                      console.log(this.commande);
                      if(this.commande.length <= 0)
                      {
                            this.commande.push({            
                          "name" : "Aucune commande",
                          "adresse" : "disponible",            
                          });
                      }
                  },
                    (error) => {
                    this.errMessage = error['0'];
                    console.log(this.errMessage);          
                    });
                  });
        
              }
              
      
        });        
        
        this.menuCtrl.enable(true, 'menuLivraison'); 
        
        setTimeout(() => {
          loader.dismiss();
          }, 3000);
      }

       mapsReccurent(p : any)
      {
            let loader = this.loadingCtrl.create
            ({
               content: 'Patientez S\'il vous plait...'
            }); 
            loader.present();
            var contentString = 
            '<p style ="text-align : center"><b>'+p.nom+' '+p.prenom+'</b>.<br/>'+p.adresse+'<br/>'+p.complement+'</p>';
            var contentStringg= 
            '<p style ="text-align : center"><b>'+p.name+'</b>.<br/>'+p.adresseBoucher+'<br/></p>';
           
            let infowindow = new google.maps.InfoWindow
            ({
                content: contentString,
            });

            let infowindoww = new google.maps.InfoWindow
            ({
              cancel : false,
              content: contentStringg
            });
              this.updatOrderStatus(p.order_id);
              this.statusCommande(p.order_id);
              this.storage.set('order_id', p.order_id); 
              this.storage.set('commande', p);
              this.newMap = !this.newMap;
              this.storage.set('map',this.newMap);
              console.log(p);
              let adresse = p.adresseBoucher;
              let adresseLivreurp= p.adresse;  
              console.log(adresse);

              this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ adresse +'&key=AIzaSyBCJ6Xgg6KCkVfGOCCj6PnD17KRfcmfqIQ&libraries=places', {}).subscribe((data)=> 
              {
                  let reponsee = JSON.parse(data['_body']);
                  console.log(reponsee);

                  this.map= new google.maps.Map(document.getElementById('map'),
                 {
                      center: reponsee['results'][0]['geometry']['location'],
                      zoom: 11,
                      mapTypeControl: false,
                      streetViewControl: false,
                      scaleControl: false,
                      zoomControl: true,
                 }); 
                

                this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ adresseLivreurp +'&key=AIzaSyBCJ6Xgg6KCkVfGOCCj6PnD17KRfcmfqIQ&libraries=places', {}).subscribe((data)=> 
                {    
                    let reponse = JSON.parse(data['_body']);
                    console.log(reponse);
                    this.pinB= new google.maps.Marker
                    ({
                        center : reponse['results'][0]['geometry']['location'],
                        position: reponse['results'][0]['geometry']['location'],
                        map: this.map,                  
                        animation: google.maps.Animation.DROP,
                        icon: 
                        {
                          url : 'https://img.icons8.com/doodle/48/000000/user.png'
                        }
                     });
                      infowindow.open(this.pinD.get('map'), this.pinB); 
                      this.pinB.addListener('click', ()=> {      
                      this.launchNavigator.navigate(p.adresse)
                      console.log(p.adresse);
                  });
                });  
                loader.dismiss();       
                this.pinD= new google.maps.Marker
                ({
                    position: reponsee['results'][0]['geometry']['location'],
                    map: this.map,                  
                    animation: google.maps.Animation.DROP,
                    icon:{
                      url  :'https://img.icons8.com/ios-glyphs/2x/cleaver.png'
                    }
                 }); 
                infowindoww.open(this.pinD.get('map'), this.pinD);
                this.pinD.addListener('click', ()=> 
                {
                  console.log(p.adresseBoucher);
                  this.launchNavigator.navigate(p.adresseBoucher)
                });         
            }); 
            
       }

      openPage(p : any) {
                console.log(p);
                if (p.name != "Aucune commande"){
                let pomt = this.alert.create(
                {
                    title : "Voulez-vous faire la livraison ?",
                    inputs : [

                    ],
                    buttons : 
                    [
                        {
                          text : 'Non',
                          role : 'cancel'
                        },
                        {
                          text : 'Oui',
                          handler: () => 
                          {   
                            var contentString = 
                                '<p style ="text-align : center"><b>'+p.nom+' '+p.prenom+'</b>.<br/>'+p.adresse+'<br/>'+p.complement+'</p>';
                                var contentStringg= 
                                '<p style ="text-align : center"><b>'+p.name+'</b>.<br/>'+p.adresseBoucher+'<br/></p>';
                            let infowindow = new google.maps.InfoWindow({
                                content: contentString
                            });

                            let infowindoww = new google.maps.InfoWindow({
                                content: contentStringg
                            });
                            this.updatOrderStatus(p.order_id);
                            this.statusCommande(p.order_id);
                            this.storage.set('order_id', p.order_id);     
                            this.sendNotifications(p);
                            this.storage.set('commande', p);
                            this.newMap = !this.newMap;
                            this.storage.set('map',this.newMap);
                            console.log(p);
                            let adresse = p.adresseBoucher;
                            let adresseLivreurp= p.adresse;       
                          
                            console.log(adresse);
                    
                          
                            this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ adresse +'&key=AIzaSyBCJ6Xgg6KCkVfGOCCj6PnD17KRfcmfqIQ&libraries=places', {}).subscribe((data)=> 
                            {
                                let reponsee = JSON.parse(data['_body']);
                                console.log(reponsee);
                              
                                this.map= new google.maps.Map(document.getElementById('map'),
                                {
                                    center: reponsee['results'][0]['geometry']['location'],
                                    zoom: 11,
                                    mapTypeControl: false,
                                    streetViewControl: false,
                                    scaleControl: false,
                                    zoomControl: true,
                                }); 
                                this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address='+ adresseLivreurp +'&key=AIzaSyBCJ6Xgg6KCkVfGOCCj6PnD17KRfcmfqIQ&libraries=places', {}).subscribe((data)=> 
                                {    
                                    let reponse = JSON.parse(data['_body']);
                                    console.log(reponse);
                                    this.pinB= new google.maps.Marker
                                  ({
                                      center : reponse['results'][0]['geometry']['location'],
                                      position: reponse['results'][0]['geometry']['location'],
                                      map: this.map,                  
                                      animation: google.maps.Animation.DROP,
                                      icon: this.markerB
                                    });
                                      infowindow.open(this.pinD.get('map'), this.pinB); 
                                      this.pinB.addListener('click', ()=> 
                                    {
                                      console.log(p.adresse);
                                      this.launchNavigator.navigate(p.adresse)
                                    }); 
                                });          
                                this.pinD= new google.maps.Marker
                                ({
                                  position: reponsee['results'][0]['geometry']['location'],
                                  map: this.map,                  
                                  animation: google.maps.Animation.DROP,
                                  icon : 
                                  {
                                    url  :'https://img.icons8.com/ios-glyphs/2x/cleaver.png'
                                  }
                                }); 

                                  infowindoww.open(this.pinD.get('map'), this.pinD);

                                this.pinD.addListener('click', ()=>
                                {                        
                                  this.launchNavigator.navigate(p.adresseBoucher);                                  
                                });        
                            });        
                          }
                        }
                    ]
                  });
              pomt.present();
            }
      }

      updatOrderStatus(order : any)
      {
                let order_id= order;
                console.log(order_id);
                this.storage.get('token').then((val) => 
                {
                    let token = val;
                    let headers = new Headers
                    ({
                        'Accept' : 'application/json',
                        'Authorization' : 'Bearer '+ token
                    });

                    let options = new RequestOptions({headers:headers});
                    this.http.post(this.urlCommandAccept+"?order_id="+order_id,{}, options).subscribe((data)=>
                    {
                         console.log(data);
                    })
                });        
      }

      sendNotifications(p : any)
      {
                  console.log("Firebase ",p.firebase_token);
                  console.log(p.nom);
                  let body = 
                    { 
                      "to": p.firebase_token,
                      "notification":
                      {
                        "title": "Clic1Steak",
                        "body": p.nom + " " + p.prenom + " vous serez livré.e d'ici 30 minutes au plus tard. Veuillez consulter votre historique.",
                        "click_action": "FCM_PLUGIN_ACTIVITY",
                        "sound": "default"
                      },
                      "data":
                      {
                        "landing_page": "TabsPage"
                      }
                  };

                  let header: any = 
                    {
                        'Content-Type': 'application/json',
                        'Authorization' : 'key=AIzaSyDat15KbMfaXf8hJbRpkTviX7qNQdQdbMM'
                    }

                  this.httpN.setDataSerializer('json');

                  this.httpN.post('https://fcm.googleapis.com/fcm/send', body, header).then(data =>
                  {
                    console.log(JSON.parse(data.data));
                    let alert1 = this.alert.create({
                      title: 'Clic1Steak',
                      subTitle: 'Votre demande de prise en charge de la commande a été acceptée avec succès.',
                      buttons: 
                      [
                        {
                          text:'OK',
                          handler : () =>
                          {
                                    
                          }
                
                        },
                      ]
                    });
                    alert1.present();   
                  },
                  (err) =>
                  {
                    console.log(err);               
                  });
              
      } 
      statusCommande(order)
      {

              this.storage.get('token').then (val=>
                {
                  let headers = new Headers({
                    'Accept' : 'application/json',
                    'Authorization' :'Bearer '+  val,
                    'TypeContent' : 'application/x-www-form-urlenconded'
                  });

                    let options = new RequestOptions ({headers:headers});                      
                    this.http.get(this.orderCurrent+order,options).subscribe(data=>{
                    let reponse = JSON.parse (data['_body']);
                    console.log(reponse['success']['status']);
                    this.status = reponse['success']['status'];
                    this.storage.set('status',this.status);
                    });
                });
      }
 
}