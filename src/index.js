import axios from "axios";
import { CarQuery } from "car-query";

const baseURL = [
  "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/",
  "?format=json&modelyear="
];

export const makeNHTSAReq = url =>
  axios.create({
    timeout: 10000,
    method: "get",
    url: url.replace(/\s/g, "")
  });

const sortData = data => {
  const nonEmptyData = {};
  for (const key in data) {
    if (data[key] !== "") {
      nonEmptyData[key] = data[key];
    }
  }
  nonEmptyData["results"] = true;
  return nonEmptyData;
};

async function decode(vin) {
  if (vin === undefined || vin.length < 1 || vin === null) {
    return { results: false };
  }
  const url = baseURL[0] + vin + baseURL[1];
  const vinReq = makeNHTSAReq(url);
  try {
    const vinResponse = await vinReq();
    return sortData(vinResponse.data.Results[0]);
  } catch (e) {
    console.log("Error in the request", e);
    return e;
  }
}

export async function getAllMakes() {
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

export async function models(make) {
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

export default decode;

export class DropDownMenuFetch {
  constructor() {
    this.year = null;
    this.make = null;
    this.model = null;
  }

  updateYear(yr) {
    this.year = yr;
  }

  updateMake(make) {
    this.make = make;
  }
}

export async function getNewModels(make) {
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

export async function getYears() {
  const carQuery = new CarQuery();
  return carQuery.getYears().then(years => years);
}

export async function getMakesByYear(yr) {
  const carQuery = new CarQuery();
  const makeResults = await carQuery.getMakes(yr).then(makes => makes);
  return makeResults;
}
