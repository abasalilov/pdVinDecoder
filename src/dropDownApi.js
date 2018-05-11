import axios from "axios";
import { CarQuery } from "car-query";
import { makeNHTSAReq } from './index'

export default class DropDown {
  constructor() {
    this.year = null;
    this.make = null;
    this.model = null;
    this.engSize = null;
  }

  sortMakes(data) {
    // const nonEmptyData = {};
    // for (const key in data) {
    //   if (data[key] !== "") {
    //     nonEmptyData[key] = data[key];
    //   }
    // }
    // nonEmptyData["results"] = true;
    // return nonEmptyData;
    console.log('data', data)
  };

  updateYear(yr) {
    this.year = yr;
  }

  updateMake(make) {
    this.make = make;
  }

  updateModel (model) {
      this.model = model;
  }

  updateEngineSize(engSize){
      this.engSize = engSize;
  }

  async getAvailableYears() {
    const carQuery = new CarQuery();
    return carQuery.getYears().then(years => years);
  };

  async getNewModels(make) {
    const carMakesReq = makeNHTSAReq(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
    );
    try {
      const carMakesResponse = await carMakesReq();
      return sortMakes(carMakesResponse.data.Results);
    } catch (e) {
      console.log("Error in the request", e);
      return e;
    }
  }

  async getModelsByMake(make) {
    const url =
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeId/" +
      make +
      "?format=json";
    const modelsReq = makeNHTSAReq(url);
    try {
      const modelsResponse = await modelsReq();
    } catch (e) {
      console.log("Error in the request", e);
      return e;
    }
  }
  
  async  getMakesByYear(yr) {
    const carQuery = new CarQuery();
    const makeResults = await carQuery.getMakes(yr).then(makes => makes);
    return makeResults;
  };
  
  async getAllMakes() {
    const makesReq = makeNHTSAReq(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
    );
    try {
      const makeResponse = await makesReq();
      return sortMakes(makeResponse.data.Results);
    } catch (e) {
      console.log("Error in the request", e);
      return e;
    }
  }
  

}

 



