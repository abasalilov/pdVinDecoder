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

  sortModels(data) {
    return data.sort((a, b) => {
      if(a.name.toUpperCase() < b.name.toUpperCase()) return -1;
      if(a.name.toUpperCase() > b.name.toUpperCase()) return 1;
      return 0;
    });
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
  
  getYears() {
    const years = {minYear: 1941, maxYear:  new Date().getFullYear()};
    return years;
  };

  async getModels() {
    const modelsReq = makeNHTSAReq("https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/"+this.make+"/modelyear/"+this.year+"?format=json")
    try {
      const modelsResponse = await modelsReq();
      return modelsResponse.data.Results;
    } catch (e) {
      console.log("Error in the request", e);
      return e;
    }
  
    //   const searchCriteria = {
  //     year: this.year,
  //     make: this.make
  // }
  //   try {
  //       const carQuery = new CarQuery();
  //       const models = await carQuery.getModels(searchCriteria).then(models => models);
  //       return this.sortModels(models);
  //     } catch (e) {
  //       console.log("Error in the request", e);
  //       return e;
  //     }  
  }

}

 



