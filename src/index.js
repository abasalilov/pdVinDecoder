import axios from "axios";
import vinDecoder from './vinDecoder';
import DropDown from './DropDownApi'

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

  export const decoder = vinDecoder;
  export const DropDownAPI = DropDown;