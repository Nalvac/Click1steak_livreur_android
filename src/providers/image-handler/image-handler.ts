import { Injectable } from '@angular/core';
import { LoadingController, Platform, ToastController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';
import { CameraOptions, Camera } from '@ionic-native/camera';
import { FileTransferObject, FileUploadOptions, FileTransfer } from '@ionic-native/file-transfer';


@Injectable()
export class ImageHandlerProvider
{
  nativepath: any;
  public static imgSrc;
  public static imgUrl : any;
  urlAvatar = 'https://clic1steak.fr/api/livreur/update_avatar';
  constructor(public fileChooser :FileChooser,public filePath:FilePath, public file :File,
              public loadingCtrl: LoadingController, private camera: Camera,
              public transfer: FileTransfer, private toastCtrl: ToastController) 
  {
    console.log('Hello ImagehandlerProvider Provider');
  }

  
  uploadFile(imageSrc : any, token: any) 
  {
   
    const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = 
    {
      fileKey: 'image',
      fileName: 'avatar',
      chunkedMode: false,
      headers: {
        'Authorization' : 'Bearer ' + token
      }
    }
    console.log('Image ', imageSrc);
    fileTransfer.upload(imageSrc, this.urlAvatar, options).then((data) => 
    {
      console.log(token);
      console.log(JSON.stringify(data) + " Uploaded Successfully");
      this.presentToast("Votre photo a été modifiée avec succès.");
    }, 
    (err) => 
    {
      console.log(err);
      this.presentToast(err);
    });
  }

  uploadImageFile(token)
  {
    let loader = this.loadingCtrl.create({
      content: "Chargement de la photo..."
    });
    loader.present();
     const fileTransfer: FileTransferObject = this.transfer.create();
  
    let options: FileUploadOptions = 
    {
      fileKey: 'image',
      fileName: 'avatar',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Accept' : 'application/json',
        'Authorization' : 'Bearer ' + token
      }
    }
    let cameraOptions = 
    {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,      
      quality: 100,
      targetWidth        : 320,
      targetHeight       : 240,
      encodingType: this.camera.EncodingType.JPEG, 
      correctOrientation: true,
      allowEdit: true,    
    }
    this.camera.getPicture(cameraOptions).then(imageData => 
      {
        fileTransfer.upload(imageData, this.urlAvatar, options).then((data) => 
        {
          console.log(data+" Uploaded Successfully");
          loader.dismiss();
          this.presentToast("Votre photo a été modifiée avec succès.");
        }, 
        (err) => 
        {
          console.log(err);
          loader.dismiss();
          this.presentToast(err);
        });
          loader.dismiss();
        })
    loader.dismiss();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}