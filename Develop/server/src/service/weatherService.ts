import dotenv from 'dotenv';
import { json } from 'stream/consumers';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  tempF: number;
  humidity: number;
  windSpeed: number;
  icon: string;
  iconDescription: string;

  constructor(city: string, date: string, tempF: number, humidity: number, windSpeed: number, icon: string, iconDescription: string) {
    this.city = city;
    this.date = date;
    this.tempF = tempF;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.icon = icon;
    this.iconDescription = iconDescription;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties 
  // Should these be private?
  baseURL?: string;
  apiKey?: string;
  cityName: string;

  constructor() {
    this.baseURL = process.env.API_URL_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    this.cityName = '';
  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const response = await fetch(query);
    return await response.json();
  }

  // TODO: Create destructureLocationData method
   private destructureLocationData(locationData: any): Coordinates {
    const { lat, lon } = locationData[0];
    console.log(`Location data: ${JSON.stringify({ lat, lon })}`);
    return { lat, lon };
   }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}geo/1.0/direct?q=${this.cityName}&limit=5&appid=${this.apiKey}`;
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/weather?units=imperial&lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const locationData = await this.fetchLocationData(this.buildGeocodeQuery());
    return this.destructureLocationData(locationData);
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    let currentweatherResponse = await fetch(this.buildWeatherQuery(coordinates));
    currentweatherResponse = await currentweatherResponse.json();
    const current = this.parseCurrentWeather(currentweatherResponse);
    const forecastResponse = await fetch(this.buildForecastQuery(coordinates));
    const forecast = await forecastResponse.json();
    const forecastDays = this.getForecastForDays(forecast);
    console.log(`Forecast Days: ${JSON.stringify(forecastDays)}`);
    return this.buildForecastArray(current, forecastDays);
  }

  // TODO: Create buildForecastQuery method
  private buildForecastQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?units=imperial&lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}`;
  }

  // TODO: Create getForecastForDays method
  private getForecastForDays(forecast: any): Weather[] {
    if (!this.cityName) {
      throw new Error("City name is not defined");
    }
    return forecast.list.map((weather: any) => {
      return new Weather(
        this.cityName,
        this.convertUnixTime(weather.dt),
        weather.main.temp,
        weather.main.humidity,
        weather.wind.speed,
        weather.weather[0].icon,
        weather.weather[0].description
      );
    });
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    const weather = response.weather[0];
    return new Weather(
      this.cityName,
      this.convertUnixTime(response.dt),
      response.main.temp,
      response.main.humidity,
      response.wind.speed,
      weather.icon,
      weather.description
    );
  }
  // TODO: Complete buildForecastArray method
   private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    let weatherArray: Weather[] = [];
    weatherArray[0] = currentWeather;
    weatherArray = weatherArray.concat(weatherData);
    return weatherArray;
   }

  // TODO: Create convertUnixTime method
  private convertUnixTime(unixTime: number): string {
    const date = new Date(unixTime * 1000);
    return date.toISOString();
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    return weatherData;
  }
}

export default new WeatherService();
