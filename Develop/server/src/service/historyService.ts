import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
// TODO: Define a City class with name and id properties
class City {
  id: string;
  name: string;

  constructor(name: string, id: string) {
    this.id = id;
    this.name = name;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
 private async read() {
  return await fs.readFile('db/db.json', {
    flag: 'a+',
    encoding: 'utf8'
  });
 }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {
    return await fs.writeFile('db/db.json', JSON.stringify(cities, null, '/t'));
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
   async getCities() {
    return await this.read().then((cities) => {
      let parsedCities: City[];
      try {
        parsedCities = [].concat(JSON.parse(cities));
      } catch (error) {
        parsedCities = [];
      }
      return parsedCities;
   });
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {
    const cities = await this.getCities();
    const newCity = new City(city, uuidv4());
    cities.push(newCity);
    return await this.write(cities);
  }
  // async addCity(city: string) {}
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();
