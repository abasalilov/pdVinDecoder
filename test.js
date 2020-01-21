import "babel-polyfill";
import "mocha";
import { expect } from "chai";
import decoder from "./src/index.js";

describe("decoder", () => {
  describe("Empty/Bad Vin", () => {
    it("should return false when vin is empty", async () => {
      const vinResponse = await decoder();
      expect(vinResponse.results).to.be.equal(false);
    });
  });

  describe("Acura w/ recall", () => {
    it("should return ModelYear, Model, Make, recall details when vin entered for a 2002 Acura TL", async () => {
      const vinResponse = await decoder("19UUA56602A801534");
      expect(vinResponse.Model).to.be.equal("TL");
      expect(vinResponse.ModelYear).to.be.equal("2002");
      expect(vinResponse.Make).to.be.equal("ACURA");
      expect(vinResponse.hasRecall).to.be.equal(true);
      expect(vinResponse.recallDetails.length).to.be.equal(7);
    });
  });

  describe("BMW w/ recall", () => {
    it("should return ModelYear, Model, Make, recall details when vin entered for a 2002 Acura TL", async () => {
      const vinResponse = await decoder("WBA3A5G55CNP16177");
      expect(vinResponse.Model).to.be.equal("328i");
      expect(vinResponse.ModelYear).to.be.equal("2012");
      expect(vinResponse.Make).to.be.equal("BMW");
      expect(vinResponse.hasRecall).to.be.equal(true);
      expect(vinResponse.recallDetails.length).to.be.equal(4);
    });
  });

  describe("Toyota w/o recall", () => {
    it("should return ModelYear, Model, Make, recall details when vin entered for a 2013 Scion FR-S", async () => {
      const vinResponse = await decoder("JF1ZNAA18D2706977");
      expect(vinResponse.Model).to.be.equal("Scion FR-S");
      expect(vinResponse.ModelYear).to.be.equal("2013");
      expect(vinResponse.Make).to.be.equal("TOYOTA");
      expect(vinResponse.hasRecall).to.be.equal(false);
    });
  });
});

//SAMPLES TO TEST
//
//19UUA56602A801534
//VIN Description: 2002 Acura TL
//2HNYD28809H002590
//VIN Description: 2009 Acura MDX
// 5YJSA1DG9DFP14705
//VIN Description: 2013 Tesla Model S
//1FDCA14X0L0013299
//VIN Description: 1990 Ford Aerostar
//JF1ZNAA18D2706977
//Make: TOYOTA || Model: SCION FR-S || Year: 2013
//SAMPLES TO TEST
//19UUA56602A801534
//VIN Description: 2002 Acura TL
//2HNYD28809H002590
//VIN Description: 2009 Acura MDX
// 5YJSA1DG9DFP14705
//VIN Description: 2013 Tesla Model S
//1FDCA14X0L0013299
//VIN Description: 1990 Ford Aerostar
//JF1ZNAA18D2706977
//Make: TOYOTA || Model: SCION FR-S || Year: 2013
//WBA3A5G55CNP16177
//Make: BMW || Model: 3-Series|| Year: 2012
