import 'babel-polyfill';
import 'mocha';
import {expect} from 'chai'
import decoder from './src/index.js';

const exampleAnswer = {

}

describe('decoder', () => {
  it('should return false when vin is empty', async () => {
    const vinResponse = await decoder()
    expect(vinResponse.results).to.be.equal(false)
    });

    it('should return true when vin entered for a 2002 Acura TL', async () => {
    const vinResponse = await decoder('19UUA56602A801534')
    expect(vinResponse.results).to.be.equal(true)
    });

    it('should return data with a ModeYear property of `2002` when vin entered for a 2002 Acura TL', async () => {
    const vinResponse = await decoder('19UUA56602A801534')
    // console.log('vinResponse', vinResponse)
    expect(vinResponse.ModelYear).to.be.equal('2002')
    });
});



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
