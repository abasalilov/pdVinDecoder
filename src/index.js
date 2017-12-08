import axios from 'axios';

const baseURL = [ 'https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/','?format=json&modelyear='];

const makeVinReq = (url) => (
   axios.create({
    timeout: 10000,
    method: 'get',
    url: url.replace(/\s/g, '')
  })
)

const sortData = (data) =>{
  const nonEmptyData = {}
    for(const key in data){
      if(data[key] !== ''){
          nonEmptyData[key] = data[key]
      }
    }
    nonEmptyData['results'] = true;
    return nonEmptyData;
}

async function decode(vin) {
  if(vin === undefined || vin.length < 1 || vin === null){
    return {results: false};
  }
  const url = baseURL[0] + vin + baseURL[1];
  const vinReq = makeVinReq(url);
  try {
       const vinResponse = await vinReq();
       return sortData(vinResponse.data.Results[0]);

    } catch(e) {
       console.log('Error in the request', e)
       return e;
    }
}


export default decode;