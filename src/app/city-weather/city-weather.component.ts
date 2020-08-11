import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { observable } from 'rxjs';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.css']
})
export class CityWeatherComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  weatherApi: Object;
  cityExists: Boolean = false;
  errorMsg: String;
  //To hide error element and its styles on page load
  errorExist: Boolean = false;

  searchForm = new FormGroup({
    cityName: new FormControl('')
  });
  //Retrieve form input
  onSubmit(formValue){
    this.getData(formValue.cityName);
  }
  //Pull the weather data of an specific city from the API 
  getData(cityName: String){
    let url = "https://api.openweathermap.org/data/2.5/weather?q=" 
              + cityName + "&appid=YOURAPIKEY&units=metric";
    let obs = this.http.get<String>(url);
    this.validateSearch(obs);
  }
  //Check wether the city is found or not
  validateSearch(observable){
    observable.subscribe(
      (data: Object) => {
        //If the city is found, then assign its data to weatherApi
        this.weatherApi = data;
        this.cityExists = true;
        this.errorExist = false;
      }, 
      (e: any) => {
        //If there's an error, then display the error message
        this.errorMsg = "Opps, " + e.error.message;
        this.cityExists = false;
        this.errorExist = true;
      }
    );
  }

}
