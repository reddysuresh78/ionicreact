
import React from 'react';
import { Plugins, FilesystemDirectory, Capacitor } from '@capacitor/core';
import { IonContent, IonText, IonButton } from '@ionic/react';
import './Chakra.css';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { RouteComponentProps } from 'react-router';

import { useEffect, useState } from 'react';
 

const Chakra: React.FC<RouteComponentProps<{}>> = (props: any) => {

  const [chakraInfo, setChakraInfo] = useState({
    MESHAM: "", VRISHABHAM: "", MIDHUNAM: "", KARKATAKAM: "",
    SIMHAM: "", KANYA: "", THULA: "", VRUSCHIKA: "",
    DHANUS: "", MAKARAM: "", KUMBHAM: "", MEENAM: ""
  });

  const [planetStarInfo, setPlanetStarInfo] = useState({
    LAGNA: "", SUN: "", MOON: "", MARS: "", MERCURY: "",
    JUPITER: "", VENUS: "", SATURN: "", RAHU: "",
    KETU: "" 
  });

  const [nplInfo, setNPLInfo] = useState({
    DRM: "", HRM: "", HRM_LORD: "", HRML_JEEVA: "",  HRML_SAREERA: "",
    KALAMSA_LORD: "", NPL: "", YK_PLANETS: "", PLANETS_IN_YK: "",
    DIGBALA_PLANETS:"", UD_PLANETS:"", VUD_PLANETS:"", BHINNAPADA_PLANETS: "",
    RAHU_REPS: "", KETU_REPS: ""
  });



  let generatePDF = () => {
    console.log('Generate pdf called');

    const { Filesystem } = Plugins;

    if (Capacitor.isNative) {

      // Save the PDF to the device
      const fileName = 'file.pdf';
      try {

        pdfmake.vfs = pdfFonts.pdfMake.vfs;
        console.log('Create pdf called');
        const doc = pdfmake.createPdf({ content: 'Hi. I am a PDF.' });
        doc.getBase64((base64data) => {

          Filesystem.writeFile({
            path: fileName,
            data: base64data,
            directory: FilesystemDirectory.External
            // encoding: FilesystemEncoding.UTF8
          }).then((writeFileResult) => {
            Filesystem.getUri({
              directory: FilesystemDirectory.External,
              path: fileName
            }).then((getUriResult) => {
              console.log("Cache " + FilesystemDirectory.External);
              const path = getUriResult.uri;
              console.log("File found @ " + path);

              Plugins.CapFileOpener.open({ filePath: path.substr(7), fileMediaType: 'application/pdf' });

            }, (error) => {
              console.error('Error while opening pdf', error);
            });
          });
        });
      } catch (error) {
        console.error('Unable to write file', error);
      }

    } else {
      console.log('Running in web');
      // Save the PDF to the device

      pdfmake.vfs = pdfFonts.pdfMake.vfs;

      pdfmake.createPdf({ content: 'Hi. I am a PDF.' }).open();
      // On a browser simply use download
      // this.pdfObj.download();
    }
  }

  useEffect(() => { 
    populateChakraInfo(); 
    populatePlanetStarInfo(); 
    populateNPLInfo(); 
  }, []);

  let deg_to_dms = (deg: number) => {
    var d = Math.floor(deg);
    var minfloat = (deg - d) * 60;
    var m = Math.floor(minfloat);
    var secfloat = (minfloat - m) * 60;
    var s = Math.round(secfloat);
    // After rounding, the seconds might become 60. These two
    // if-tests are not necessary if no rounding is done.
    if (s === 60) {
      m++;
      s = 0;
    }
    if (m === 60) {
      d++;
      m = 0;
    }
    return ("" + d + '\xB0' + m + '\'' + s + '"');
  }

  
  let populateNPLInfo = () => {

    let newNPLInfo = { ...nplInfo };
    let serverInfo = props.location.state;

    console.log('DRM ', serverInfo.nplDetails.drm);
    newNPLInfo = { ...newNPLInfo,  DRM : serverInfo.nplDetails.drm };
 
    setNPLInfo(newNPLInfo);
  }

  let populatePlanetStarInfo = () => {

    let newPlanetStarInfo = { ...planetStarInfo };
    let orderedHouses = props.location.state.raasiChakra.orderedHouses;

    orderedHouses.forEach((item: any, index: number) => {
 
      if (item.planets) {
        item.planets.forEach( (planetItem :any ) => {
          let starInfo = planetItem.planetStar + '(' + planetItem.pada + ')';
          let key = planetItem.planet;
          newPlanetStarInfo = { ...newPlanetStarInfo, [key]: starInfo };
        }, []);
       
      }
    });
    setPlanetStarInfo(newPlanetStarInfo);
  }

  let populateChakraInfo = () => {

    let newChakraInfo = { ...chakraInfo };
    let orderedHouses = props.location.state.raasiChakra.orderedHouses;

    orderedHouses.forEach((item: any, index: number) => {

      let planetsInHouse = "";
      if (item.planets) {
        let planetsArray = item.planets.reduce((initialValue: string[], planetItem: any) => {
          // console.log('Current planet: ', planetItem.planet);
          initialValue.push(planetItem.planet.substr(0, 2) + ' ' + deg_to_dms(planetItem.longitude));
          //planetItem.planetStar + '(' + planetItem.pada + ')'
          return initialValue;
        }, []);
        planetsInHouse = planetsArray.join('\n');

      }
      let key = item.raasi;
      newChakraInfo = { ...newChakraInfo, [key]: planetsInHouse };

      // console.log(item.raasi + ': ' , planetsInHouse);
    });

    setChakraInfo(newChakraInfo);

  }

  console.log('Chakra called with props ', props.location.state['nativeName']);
  return (

    <IonContent>
      <table className="chakra-table">
        <tbody>
          <tr>
            <td>{chakraInfo.MEENAM}</td>
            <td>{chakraInfo.MESHAM}</td>
            <td>{chakraInfo.VRISHABHAM}</td>
            <td>{chakraInfo.MIDHUNAM}</td>

          </tr>
          <tr>
            <td>{chakraInfo.KUMBHAM}</td>
            <td id="cell6" colSpan={2}>  <IonText>Some text</IonText></td>
            <td>{chakraInfo.KARKATAKAM}</td>

          </tr>
          <tr>
            <td>{chakraInfo.MAKARAM}</td>
            <td id="cell10" colSpan={2}></td>
            <td>{chakraInfo.SIMHAM}</td>

          </tr>
          <tr>
            <td>{chakraInfo.DHANUS}</td>
            <td>{chakraInfo.VRUSCHIKA}</td>
            <td>{chakraInfo.THULA}</td>
            <td>{chakraInfo.KANYA}</td>
          </tr>
        </tbody>
      </table>

      <table className="planet-table">
        <tbody>
        <tr>
            <td>LAGNA</td>
            <td>{planetStarInfo.LAGNA}</td>
            <td>SUN</td>
            <td>{planetStarInfo.SUN}</td>
          </tr>
          
          <tr>
            <td>MOON</td>
            <td>{planetStarInfo.MOON}</td>
            <td>MARS</td>
            <td>{planetStarInfo.MARS}</td>
          </tr>
          <tr>
            
          </tr>
          <tr>
            <td>MERCURY</td>
            <td>{planetStarInfo.MERCURY}</td>
            <td>JUPITER</td>
            <td>{planetStarInfo.JUPITER}</td>
          </tr>
          
          <tr>
            <td>VENUS</td>
            <td>{planetStarInfo.VENUS}</td>
            <td>SATURN</td>
            <td>{planetStarInfo.SATURN}</td>
          </tr>
         
          <tr>
            <td>RAHU</td>
            <td>{planetStarInfo.RAHU}</td>
            <td>KETU</td>
            <td>{planetStarInfo.KETU}</td>
          </tr>
 
        </tbody>
      </table>

      <table className="npl-table">
        <tbody>
        <tr>
            <td>DRM</td>
            <td>{nplInfo.DRM}</td>
            <td>HRM</td>
            <td>{nplInfo.HRM}</td>
          </tr>
          
          <tr>
            <td>HRM_LORD</td>
            <td>{nplInfo.HRM_LORD}</td>
            <td>HRML_JEEVA</td>
            <td>{nplInfo.HRML_JEEVA}</td>
          </tr>
          <tr>
            
          </tr>
          <tr>
            <td>HRML_SAREERA</td>
            <td>{nplInfo.HRML_SAREERA}</td>
            <td>KALAMSA_LORD</td>
            <td>{nplInfo.KALAMSA_LORD}</td>
          </tr>
          
          <tr>
            <td>NPL</td>
            <td>{nplInfo.NPL}</td>
            <td>YK_PLANETS</td>
            <td>{nplInfo.YK_PLANETS}</td>
          </tr>
         
          <tr>
            <td>PLANETS_IN_YK</td>
            <td>{nplInfo.PLANETS_IN_YK}</td>
            <td>DIGBALA_PLANETS</td>
            <td>{nplInfo.DIGBALA_PLANETS}</td>
          </tr>

          <tr>
            <td>UD_PLANETS</td>
            <td>{nplInfo.UD_PLANETS}</td>
            <td>VUD_PLANETS</td>
            <td>{nplInfo.VUD_PLANETS}</td>
          </tr>

          <tr>
            <td>BHINNAPADA_PLANETS</td>
            <td>{nplInfo.BHINNAPADA_PLANETS}</td>
            <td>RAHU_REPS</td>
            <td>{nplInfo.RAHU_REPS}</td>
          </tr>

          <tr>
            <td>KETU_REPS</td>
            <td>{nplInfo.KETU_REPS}</td>
            <td>KETU_REPS</td>
            <td>{nplInfo.KETU_REPS}</td>
          </tr>
 
 
        </tbody>
      </table>

      <div>
        <IonButton onClick={generatePDF}>Export PDF</IonButton>

      </div>
    </IonContent>

  );
};


export default React.memo(Chakra);