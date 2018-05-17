import axios from "axios";
import { CarQuery } from "car-query";
import { makeNHTSAReq } from './index'

export default class DropDown {
  constructor() {
    this.year = null;
    this.make = null;
    this.model_Name = null;
    this.model_ID = null;
    this.engSize = null;
    this.trims = null;
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

  // add an update fn here;

  setYear(yr) {
    this.year = yr;
  }

  setMake(make) {
    this.make = make;
  }

  setModel(name) {
    this.model_Name = name;
  }

  setEngineSize(engSize){
      this.engSize = engSize;
  }

  getYears() {
    const years = {minYear: 1941, maxYear:  new Date().getFullYear()};
    return years;
  };

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

  async getMakesByYear(yr) {
    const carQuery = new CarQuery();
    const makeResults = await carQuery.getMakes(yr).then(makes => makes);
    return makeResults;
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

  async getModels() {
    // const modelsReq = makeNHTSAReq("https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/"+this.make+"/modelyear/"+this.year+"?format=json")
    // try {
    //   const modelsResponse = await modelsReq();
    //   return modelsResponse.data.Results;
    // } catch (e) {
    //   console.log("Error in the request", e);
    //   return e;
    // }

    const searchCriteria = {
      year: this.year,
      make: this.make,
      soldInUSA: true,
    };

    try {
      const carQuery = new CarQuery();
      const models = await carQuery.getModels(searchCriteria).then(models => models);
      // return this.sortmodels(models);
      // console.log('models', models)
      return models;
    } catch (e) {
      console.log("Error in the request", e);
      return e;
    }
  }

  async getTrims() {
    const trimsArr = [];
    const searchCriteria = {
      year: this.year,
      make: this.make,
    };
    const carQuery = new CarQuery();
    const engineData = await carQuery.getTrims(searchCriteria).then(engineData => engineData);
    const data = await carQuery.getModelDetail(17555).then(data => data);
    engineData.forEach(trim => {
      if(trim.name === this.model_Name){
        console.log(trim.name)
        trimsArr.push({modelId: trim.modelId, engine: this.getEngine(trim)});
      };
    });
    this.trims = trimsArr;
    return trimsArr;
  };

  async getModelData(modelId){
    try {
      const carQuery = new CarQuery();
      const data = await carQuery.getModelDetail(modelId).then(data => data);
      return data;
    } catch (e) {
      console.log("Error in the request", e);
      return e;
    }
  }

  getEngine(data){
    console.log('data', data)
  const configs =  {
      AA: data.engineLiters + "L " + data.engineCubicInches + "CI V" + data.engineCyclinders,
      AZ: data.engineCyclinders +" Cylinders " + data.engineValvesPerCylinder + " "+ data.engineLiters + "L ",
  }
//  : {
//     AA: data.engineCubicInches + "CI V" + data.engineCyclinders,
//     AZ: data.engineCyclinders +" Cylinders " + data.engineValvesPerCylinder,
// } 
  // console.log('configs', configs)

  return configs;
}

}


// Most modern OHV engines have two valves per cylinder, 
// while many OHC engines can have three, four or even five valves per cylinder to achieve greater power.

// the DOHC engines usually have more valves per cylinder than the SOHC versions. 
// They will also usually have less parts involved (most DOHC directly actuate the valves, where SOHC usually have rocker arms). 
