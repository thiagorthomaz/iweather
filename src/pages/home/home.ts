import { Component } from '@angular/core';
import { NavController,AlertController,LoadingController  } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  condition:any;
  location_api:any;
  forecast:any;
  loader : any;

  location:{
    city:string;
    state:string;
  }

  constructor(
    public navCtrl: NavController, 
    private weatherProvider:WeatherProvider,
    private storage:Storage,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {

    

  }


  ionViewWillEnter(){

    let loader = this.loadingCtrl.create({
      content: "Retrieving weather..."
    });
    loader.present();

    this.storage.get('location').then((val) => {

      if (val) {
        this.location = JSON.parse(val);
      } else {
        this.location = {city:"Curitiba", state:"PR"}
      }

      this.weatherProvider.getWeather(this.location.city, this.location.state).subscribe(weather => {

        if (!weather.query 
          || !weather.query.results
          || !weather.query.results.channel
         ) {
           this.storage.clear();
          this.presentAlert();
        } else {
          this.condition = weather.query.results.channel.item.condition;
          this.location_api = weather.query.results.channel.location;
          this.forecast = weather.query.results.channel.item.forecast;
        }
        
        loader.dismissAll();
        
      });

    });

  }


  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Something wet wrong.',
      subTitle: "Sorry for that, try reload the app.",
      buttons: ['Dismiss']
    });
    alert.present();
  }


}
