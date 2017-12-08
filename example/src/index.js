import decode from 'pdvindecoder/lib';

//VIN Description: 2013 Tesla Model S
//5YJSA1DG9DFP14705

async function buildAlert(vin) {

  const exampleData = await decode(vin)
  console.log(`I'd like to get a ${exampleData.NCSAModel}, maybe a used ${exampleData.Model}, a ${exampleData.ModelYear}, or should I get a new one?`)
}


buildAlert('5YJSA1DG9DFP14705')