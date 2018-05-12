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
    return data.filter((a) => a.isCommon === true);
  };

  setYear(yr) {
    this.year = yr;
  }

  setMake(make) {
    this.make = make;
  }

  setModel (model) {
      this.model = model;
  }

  setEngineSize(engSize){
      this.engSize = engSize;
  }

  async getNewModels(make) {
    const carMakesReq = makeNHTSAReq(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json"
    );
    try {
      const carMakesResponse = await carMakesReq();
      console.log('carMakes', carMakesResponse)
      return this.sortMakes(carMakesResponse.data.Results);
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
  
  async getMakesByYear(yr) {
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
      return makeResponse.data.Results;
    } catch (e) {
      console.log("Error in the request", e);
      return e;
    }
  };

  async getAllUSMakesByYear(year) {
    try {
      const carQuery = new CarQuery();
      const makes = await carQuery.getMakes().then(makes => makes);
      return this.sortMakes(makes);
    } catch (e) {
      console.log("Error in the request", e);
      return e;
    }
  };
  
  async getYears() {
    const carQuery = new CarQuery();
    const years = await carQuery.getYears().then(years => years);
    return years;
  };

}

 



