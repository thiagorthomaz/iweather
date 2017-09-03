import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class WeatherProvider {

  apiKey = "";
  apiServer : string;
  query : string;

  constructor(public http: Http) {
    console.log('Hello WeatherProvider Provider');
    
    this.apiServer = "https:query.yahooapis.com/v1/public/yql?q=";



  }

  getWeather(city, state){
    
    this.query = 'select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + city + ', ' + state + '") and u="c"';

    return this.http.get(this.apiServer + this.query + "&format=json")
                        .map(res=>res.json());

  }

}
