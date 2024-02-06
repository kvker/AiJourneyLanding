import { describe, expect, it } from 'vitest'
import { ll2Lnglat, lnglat2Ll } from './map'

describe('ll2Lnglat', () => {
  it('should convert latitude and longitude to lnglat format', () => {
    const lnglat = ll2Lnglat({ longitude: -74.0060, latitude: 40.7128 })
    expect(lnglat).toEqual({ lng: -74.0060, lat: 40.7128 })
  })
})

describe('lnglat2Ll', () => {
  it('should convert lnglat format to latitude and longitude', () => {
    const ll = lnglat2Ll({ lng: -74.0060, lat: 40.7128 })
    expect(ll).toEqual({ longitude: -74.0060, latitude: 40.7128 })
  })
})


