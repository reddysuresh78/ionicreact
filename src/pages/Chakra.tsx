
import React from 'react';
import { Plugins, FilesystemDirectory, Capacitor } from '@capacitor/core';
import { IonContent,  IonButton, IonLabel } from '@ionic/react';
import './Chakra.css';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { RouteComponentProps } from 'react-router';

import { useEffect, useState } from 'react';
 

const Chakra: React.FC<RouteComponentProps<{}>> = (props: any) => {

  const [chartDetails, setChartDetails] = useState("NPL CHART");
 

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
    populateChartInfo();
   
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

  let populateChartInfo = () => {
    let serverInfo = props.location.state;
    console.log('Response from server: ', serverInfo.nplDetails);
    let finalStr = 'NPL CHART \n\n' + serverInfo.birthDetails + "\n" + serverInfo.placeOfBirth.replace('(' , '\n').replace(',', '\n').replace(')','');
    setChartDetails(finalStr);
  }
   

  let populateNPLInfo = () => {

    let newNPLInfo = { ...nplInfo };
    let serverInfo = props.location.state;
  
    console.log('DRM ', serverInfo.nplDetails.drm);
    newNPLInfo = { ...newNPLInfo,  DRM : camelCase(serverInfo.nplDetails.drm) };
    newNPLInfo = { ...newNPLInfo,  HRM : camelCase(serverInfo.nplDetails.hrm) + '(' + serverInfo.nplDetails.hrmPada + ')'};
    newNPLInfo = { ...newNPLInfo,  HRM_LORD : camelCase(serverInfo.nplDetails.hrmLord) };
    newNPLInfo = { ...newNPLInfo,  HRML_JEEVA : camelCase(serverInfo.nplDetails.hrmJeeva) };
    newNPLInfo = { ...newNPLInfo,  HRML_SAREERA : camelCase(serverInfo.nplDetails.hrmSareera) };
    newNPLInfo = { ...newNPLInfo,  NPL : camelCase(serverInfo.nplDetails.npl) };
    newNPLInfo = { ...newNPLInfo,  KALAMSA_LORD : camelCase(serverInfo.nplDetails.kalamsaLord) };
    newNPLInfo = { ...newNPLInfo,  YK_PLANETS : camelCaseList(serverInfo.yogakarakas) };  //
    newNPLInfo = { ...newNPLInfo,  PLANETS_IN_YK : camelCaseList(serverInfo.planetsInYKStar) }; //
    newNPLInfo = { ...newNPLInfo,  DIGBALA_PLANETS : camelCaseList(serverInfo.digbalaPlanets) };//
    newNPLInfo = { ...newNPLInfo,  UD_PLANETS : camelCaseList(serverInfo.udPlanets)  };  //
    newNPLInfo = { ...newNPLInfo,  VUD_PLANETS : camelCaseList(serverInfo.vudPlanets)  };//
    newNPLInfo = { ...newNPLInfo,  BHINNAPADA_PLANETS : camelCaseList(serverInfo.bpPlanets) };//
    newNPLInfo = { ...newNPLInfo,  RAHU_REPS : camelCaseList(serverInfo.rahuRepresentations) }; //
    newNPLInfo = { ...newNPLInfo,  KETU_REPS : camelCaseList(serverInfo.ketuRepresentations) };//
 
    setNPLInfo(newNPLInfo);
  }

  let populatePlanetStarInfo = () => {

    let newPlanetStarInfo = { ...planetStarInfo };
    let orderedHouses = props.location.state.raasiChakra.orderedHouses;

    orderedHouses.forEach((item: any, index: number) => {
 
      if (item.planets) {
        item.planets.forEach( (planetItem :any ) => {
          let starInfo = camelCase(  planetItem.planetStar ) + '(' + planetItem.pada + ')';
          let key = planetItem.planet;
          newPlanetStarInfo = { ...newPlanetStarInfo, [key]: starInfo };
        }, []);
       
      }
    });
    setPlanetStarInfo(newPlanetStarInfo);
  }

  let camelCaseList = (planets: string[]) => {
    let retValue = planets.reduce( (finalStr, planet ) => { 
      return finalStr + " " + camelCaseShortPlanet(planet); 
    }, "" );

    return retValue;
} ;

  

  let camelCase = (planet: string) => {
      return planet.substr(0,1) + planet.substr (1).toLowerCase();
  } ;

  let camelCaseShortPlanet = (planet: string) => {
    return planet.substr(0,1) + planet.substr (1,1).toLowerCase();
} ;

  let populateChakraInfo = () => {

    let newChakraInfo = { ...chakraInfo };
    let orderedHouses = props.location.state.raasiChakra.orderedHouses;
   
    orderedHouses.forEach((item: any, index: number) => {

      let planetsInHouse = "";
      if (item.planets) {
        let planetsArray = item.planets.reduce((initialValue: string[], planetItem: any) => {
          // console.log('Current planet: ', planetItem.planet);
          let curPlanet = planetItem.planet;
          if(curPlanet === 'LAGNA'){
              curPlanet = 'NPL';
          }else{
              curPlanet = camelCaseShortPlanet(curPlanet) 
          }
          initialValue.push(curPlanet  + ' ' + deg_to_dms(planetItem.longitude));
          
          //planetItem.planetStar + '(' + planetItem.pada + ')'
          return initialValue;
        }, []);
        planetsInHouse = planetsArray.join('\n');
        if(planetsInHouse.indexOf("Mo") >=0) {
          planetsInHouse = planetsInHouse + '\nDRM';
        }

      }
      let key = item.raasi;
      newChakraInfo = { ...newChakraInfo, [key]: planetsInHouse };

      // console.log(item.raasi + ': ' , planetsInHouse);
    });
    let serverInfo = props.location.state;
    let key = serverInfo.nplDetails.hrmSign;
    let hrmPlanetList = newChakraInfo.KANYA;
    hrmPlanetList = hrmPlanetList + '\nHRM';
    newChakraInfo = { ...newChakraInfo, [key]: hrmPlanetList };

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
            <td id="cell6" colSpan={2}>  <IonLabel class="main_label"> { chartDetails}</IonLabel></td>
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
            <td>NPL</td>
            <td>{planetStarInfo.LAGNA}</td>
            <td>DRM</td>
            <td>{nplInfo.DRM}</td>
            <td>HRM</td>
            <td>{nplInfo.HRM}</td>
           
          </tr>
          
          <tr>
            <td>Su</td>
            <td>{planetStarInfo.SUN}</td>
            <td>Mo</td>
            <td>{planetStarInfo.MOON}</td>
            <td>Ma</td>
            <td>{planetStarInfo.MARS}</td>
            
          </tr>
        
          
          <tr>
            <td>Me</td>
            <td>{planetStarInfo.MERCURY}</td>
            <td>Ju</td>
            <td>{planetStarInfo.JUPITER}</td>
            <td>Ve</td>
            <td>{planetStarInfo.VENUS}</td>
            
          </tr>
         
          <tr>
            <td>Sa</td>
            <td>{planetStarInfo.SATURN}</td>
            <td>Ra</td>
            <td>{planetStarInfo.RAHU}</td>
            <td>Ke</td>
            <td>{planetStarInfo.KETU}</td>
           
          </tr>
 
        </tbody>
      </table>

       

      <div>
        <IonButton onClick={generatePDF} class="btn">Export PDF</IonButton>

      </div>
    </IonContent>

  );
};


export default React.memo(Chakra);