import {formatCurrency} from '../../../scripts/utils/money.js'

describe('Test suite: formatCurrency', ()=>{
  it('should convert cents to dollars: ', ()=>{
    expect(formatCurrency(2095)).toEqual('20.95')
  });

  it('should work with zeros(0):', ()=>{
    expect(formatCurrency(0)).toEqual('0.00')
  });

  it('should round to the nearest cent:', ()=>{
    expect(formatCurrency(2000.5)).toEqual('20.01')
  });

  it('should round to the nearest cent:', ()=>{
    expect(formatCurrency(2000.4)).toEqual('20.00')
  });
})