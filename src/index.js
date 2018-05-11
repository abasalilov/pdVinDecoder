import axios from "axios";
import decode from './vinDecoder';
import { baseURL, makeNHTSAReq } from './index'


export const baseURL = [
  "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/",
  "?format=json&modelyear="
];

export const makeNHTSAReq = url =>
  axios.create({
    timeout: 10000,
    method: "get",
    url: url.replace(/\s/g, "")
  });