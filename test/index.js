import { parseDjiMeta } from '../src'
import { describe } from 'mocha'

// const testJpg1 = 'C:\\Users\\Florian\\PhpstormProjects\\dji-XMetaParser\\test\\test1.jpg'
const testString = '<x:xmpmeta xmlns:x="adobe:ns:meta/">\n' +
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

describe('Image to Metadata Object', () => {
  it('should create a object containing metadata', () => {
    const buffer = Buffer.from(testString)
    parseDjiMeta(buffer)
    return true
  })
})
