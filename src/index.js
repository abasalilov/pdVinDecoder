import axios from "axios";

const confirmValue = arg => (typeof arg !== "undefined" ? true : false);

const genRecallURL = (modelyear, make, model) =>
  `https://one.nhtsa.gov/webapi/api/Recalls/vehicle/modelyear/${modelyear}/make/${make}/model/${model}?format=json`;

const baseURL = [
  "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/",
  "?format=json&modelyear="
];

const makeVinReq = url =>
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
  const vinReq = makeVinReq(url);
  try {
    const vinResponse = await vinReq();
    const sortedVinResponse = sortData(vinResponse.data.Results[0]);
    const { Model, Make, ModelYear } = sortedVinResponse;
    if (confirmValue(Model) && confirmValue(Make) && confirmValue(ModelYear)) {
      const recallURL = genRecallURL(ModelYear, Make, Model);
      const recallConfirm = await axios.get(recallURL);
      if (recallConfirm.data.Count > 0) {
        sortedVinResponse.hasRecall = true;
        sortedVinResponse.recallDetails = recallConfirm.data.Results;
      } else {
        sortedVinResponse.hasRecall = false;
      }
    }
    return sortedVinResponse;
  } catch (e) {
    console.log("Error in the request", e);
    return e;
  }
}

export default decode;
