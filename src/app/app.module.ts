import { HomePage } from './../pages/home/home';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { ConnexionPage } from '../pages/connexion/connexion';
import { InscriptionPage } from '../pages/inscription/inscription';
import { CommandesPage } from '../pages/commandes/commandes';
import { RecettesPage } from '../pages/recettes/recettes';
import { ProfilPage } from '../pages/profil/profil';
import { TabsPage } from '../pages/tabs/tabs';

import { MapsPage } from '../pages/maps/maps';
import { Geolocation } from '@ionic-native/geolocation';
import { HttpModule } from '@angular/http';

import { FileTransfer} from '@ionic-native/file-transfer';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { ImageHandlerProvider } from '../providers/image-handler/image-handler';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { FCM } from '@ionic-native/fcm';
import { HTTP } from '@ionic-native/http';
import { Crop } from '@ionic-native/crop';
import { AngularFireModule } from '@angular/fire';
import { LaunchNavigatorOptions, LaunchNavigator } from '@ionic-native/launch-navigator';
import { CommandePage } from '../pages/commande/commande';
import { BrowserTab } from '@ionic-native/browser-tab';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import firebase from 'firebase';
export var config = {
  apiKey: "AIzaSyA3cIp5YWe-LeUpkaXEA-Z500gamLItwTs",
  authDomain: "clic1steak-ab43e.firebaseapp.com",
  databaseURL: "https://clic1steak-ab43e.firebaseio.com",
  projectId: "clic1steak-ab43e",
  storageBucket: "clic1steak-ab43e.appspot.com",
  messagingSenderId: "1021593324196"
};
 
var firebaseConfig = {
  apiKey: "AIzaSyDr-ZcmV-34BLWYLDa9mlaurQTsCRBzfZA",
  authDomain: "clic1steak-livreur.firebaseapp.com",
  databaseURL: "https://clic1steak-livreur.firebaseio.com",
  projectId: "clic1steak-livreur",
  storageBucket: "",
  messagingSenderId: "241613038373",
  appId: "1:241613038373:web:ee6302fe1f9554e3"
};

firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [
    MyApp,
    ConnexionPage,
    InscriptionPage,
    CommandesPage,
    RecettesPage,
    ProfilPage,
    TabsPage,
    MapsPage,
    CommandePage,
    HomePage
  ],
  imports: [

    HttpModule,
    BrowserModule,
    AngularFireModule.initializeApp(config),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ConnexionPage,
    InscriptionPage,
    CommandesPage,
    RecettesPage,
    ProfilPage,
    TabsPage,
    MapsPage,
    CommandePage,
    HomePage
  ],
  providers: [
    Geolocation,
    StatusBar,
    InAppBrowser,
    BrowserTab,
    SplashScreen,
    Camera,
    FileTransfer,
    File,
    FileChooser,
    FilePath,
    Crop,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImageHandlerProvider,
    FCM,
    HTTP,
    LaunchNavigator,
  ]
})
export class AppModule {}
