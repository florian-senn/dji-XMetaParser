import { parseText } from '../src'
import { describe } from 'mocha'
import chai from 'chai'
import chaiPromise from 'chai-as-promised'

chai.should()
chai.use(chaiPromise)

// const testJpg1 = 'C:\\Users\\Florian\\PhpstormProjects\\dji-XMetaParser\\test\\test1.jpg'
const testString1 = '<x:xmpmeta xmlns:x="adobe:ns:meta/">\n' +
  ' <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">\n' +
  '  <rdf:Description rdf:about="DJI Meta Data"\n' +
  '    xmlns:tiff="http://ns.adobe.com/tiff/1.0/"\n' +
  '    xmlns:exif="http://ns.adobe.com/exif/1.0/"\n' +
  '    xmlns:xmp="http://ns.adobe.com/xap/1.0/"\n' +
  '    xmlns:xmpMM="http://ns.adobe.com/xap/1.0/mm/"\n' +
  '    xmlns:dc="http://purl.org/dc/elements/1.1/"\n' +
  '    xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/"\n' +
  '    xmlns:drone-dji="http://www.dji.com/drone-dji/1.0/"\n' +
  '    xmlns:GPano="http://ns.google.com/photos/1.0/panorama/"\n' +
  '   xmp:ModifyDate="1970-01-01"\n' +
  '   xmp:CreateDate="1970-01-01"\n' +
  '   tiff:Make="DJI"\n' +
  '   tiff:Model="Test_Pro"\n' +
  '   dc:format="image/jpg"\n' +
  '   drone-dji:GpsLatitude="+48.7968800"\n' +
  '   drone-dji:GpsLongitude="+8.8548813"\n' +
  '   drone-dji:AbsoluteAltitude="+400.33"\n' +
  '   drone-dji:RelativeAltitude="+0.00"\n' +
  '   drone-dji:GimbalRollDegree="+0.00"\n' +
  '   drone-dji:GimbalYawDegree="-27.00"\n' +
  '   drone-dji:GimbalPitchDegree="+0.00"\n' +
  '   drone-dji:FlightRollDegree="-3.00"\n' +
  '   drone-dji:FlightYawDegree="-19.10"\n' +
  '   drone-dji:FlightPitchDegree="+3.00"\n' +
  '   drone-dji:CamReverse="0"\n' +
  '   drone-dji:GimbalReverse="0"\n' +
  '   drone-dji:SelfData="Self data"\n' +
  '   crs:Version="7.0"\n' +
  '   crs:HasSettings="False"\n' +
  '   crs:HasCrop="False"\n' +
  '   crs:AlreadyApplied="False">\n' +
  '  </rdf:Description>\n' +
  ' </rdf:RDF>\n' +
  '</x:xmpmeta>'

const testObject1 = {
  crs: {
    alreadyApplied: false,
    hasCrop: false,
    hasSettings: false,
    version: 7,
  },
  dc: {
    format: 'image/jpg',
  },
  droneDji: {
    absoluteAltitude: 400.33,
    camReverse: 0,
    flightPitchDegree: 3,
    flightRollDegree: -3,
    flightYawDegree: -19.1,
    gimbalPitchDegree: 0,
    gimbalReverse: 0,
    gimbalRollDegree: 0,
    gimbalYawDegree: -27,
    gpsLatitude: 48.79688,
    gpsLongitude: 8.8548813,
    relativeAltitude: 0,
    selfData: 'Self data',
  },
  rdf: {
    about: 'DJI Meta Data',
  },
  tiff: {
    make: 'DJI',
    model: 'Test_Pro',
  },
  xmlns: {
    gPano: 'http://ns.google.com/photos/1.0/panorama/',
    crs: 'http://ns.adobe.com/camera-raw-settings/1.0/',
    dc: 'http://purl.org/dc/elements/1.1/',
    droneDji: 'http://www.dji.com/drone-dji/1.0/',
    exif: 'http://ns.adobe.com/exif/1.0/',
    tiff: 'http://ns.adobe.com/tiff/1.0/',
    xmp: 'http://ns.adobe.com/xap/1.0/',
    xmpMm: 'http://ns.adobe.com/xap/1.0/mm/',
  },
  xmp: {
    createDate: 1970,
    modifyDate: 1970,
  },
}

describe('Text to Metadata Object', () => {
  it('creates a metadata object', async () => {
    return parseText(testString1).should.eventually.deep.equal(testObject1)
  })
})
