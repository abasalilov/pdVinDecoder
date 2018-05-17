import "babel-polyfill";
import axios from "axios";
import "mocha";
import { expect } from "chai";
import { decoder, DropDownAPI } from "./src/index.js";

const baseURL =
  "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json";

describe("decoder", () => {
  it("should return false when vin is empty", async () => {
    const vinResponse = await decoder();
    expect(vinResponse.results).to.be.equal(false);
  });

  it("should return true when vin entered for a 2002 Acura TL", async () => {
    const vinResponse = await decoder("19UUA56602A801534");
    expect(vinResponse.results).to.be.equal(true);
  });

  it("should return data with a ModeYear property of `2002` when vin entered for a 2002 Acura TL", async () => {
    const vinResponse = await decoder("19UUA56602A801534");
    // console.log('vinResponse', vinResponse)
    expect(vinResponse.ModelYear).to.be.equal("2002");
  });
});



const currentYear = new Date().getFullYear();
const dropDownInstance = new DropDownAPI();
const Solara  = { Make_ID: 448,
  Make_Name: 'Toyota',
  Model_ID: 2803,
  Model_Name: 'Solara'};

describe("YMM", () => {

  it("instance is able to set years", async () => {
    dropDownInstance.setYear(2010);
    expect(dropDownInstance.year).to.be.equal(2010);
  })

  it("instance is able to set make", async () => {
    dropDownInstance.setMake('Toyota');
    expect(dropDownInstance.make).to.be.equal("Toyota");
  })

  it("instance is able to set model", async () => {
    dropDownInstance.setModel("Altima");
    expect(dropDownInstance.model).to.be.equal("Altima");
  })

  it("instance is able to set engine size", async () => {
    dropDownInstance.setEngineSize("3.5 l v6");
    expect(dropDownInstance.engSize).to.be.equal("3.5 l v6");
  })

  it("getYears returns min of 1941 and max of current year", async () => {
    const years = await dropDownInstance.getYears();
    const max = years.maxYear;
    const min = years.minYear;
    expect(max).to.be.equal(currentYear);
    expect(min).to.be.equal(1941);
  });

  it("getMakesByYear returns an Array of models data", async () => {
    const makes = await dropDownInstance.getMakesByYear(2010);
    expect(makes.length).to.be.equal(72);
  });

  it("getAllMakes returns an Array of all makes", async () => {
    const all_makes = await dropDownInstance.getAllMakes();
    expect(all_makes.length).to.be.equal(156);
  });

  it("getAllUSMakesByYear returns an Array of all makes sold in US", async () => {
    const all_makes = await dropDownInstance.getAllUSMakesByYear(2017);
    expect(all_makes.length).to.be.equal(94);
  });

  it("getAllUSMakesByYear returns an Array of all makes sold in US", async () => {
    const all_makes = await dropDownInstance.getAllUSMakesByYear(2008);
    console.log(all_makes)
    // expect(all_makes.length).to.be.equal(94);
  });

  it("getModels returns an Array of models for year and make", async () => {
    dropDownInstance.setYear(2008);
    dropDownInstance.setMake('toyota');
    const models = await dropDownInstance.getModels();
    expect(models.length).to.be.equal(29);
  });

  it.only("getTrims returns an Array of engine sizes for the ", async () => {
    dropDownInstance.setYear(2006);
    dropDownInstance.setMake('Dodge');
    dropDownInstance.setModel('Durango');
    const engines = await dropDownInstance.getTrims();
    const data = await dropDownInstance.getModelData();
    console.log('data', data)
    // expect(models.length).to.be.equal(22);
  });

  // it.only("getModelData returns an Array of engine sizes for the ", async () => {
  //   const data = await dropDownInstance.getModelData(39585);
  //   console.log('this', data)
  //   // engineLiters
  //   // expect(models.length).to.be.equal(22);
  // });
});

// //SAMPLES TO TEST

// //19UUA56602A801534
// //VIN Description: 2002 Acura TL
// //2HNYD28809H002590
// //VIN Description: 2009 Acura MDX
// // 5YJSA1DG9DFP14705
// //VIN Description: 2013 Tesla Model S
// //1FDCA14X0L0013299
// //VIN Description: 1990 Ford Aerostar
// //JF1ZNAA18D2706977
// //Make: TOYOTA || Model: SCION FR-S || Year: 2013
// //SAMPLES TO TEST
// //19UUA56602A801534
// //VIN Description: 2002 Acura TL
// //2HNYD28809H002590
// //VIN Description: 2009 Acura MDX
// // 5YJSA1DG9DFP14705
// //VIN Description: 2013 Tesla Model S
// //1FDCA14X0L0013299
// //VIN Description: 1990 Ford Aerostar
// //JF1ZNAA18D2706977
// //Make: TOYOTA || Model: SCION FR-S || Year: 2013
