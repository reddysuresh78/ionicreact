
import React from 'react';
import { Plugins, FilesystemDirectory, Capacitor } from '@capacitor/core';
import { IonContent, IonButton, IonText } from '@ionic/react';
import './Chakra.css';
import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { RouteComponentProps } from 'react-router';

import { useEffect, useState } from 'react';


const Chakra: React.FC<RouteComponentProps<{}>> = (props: any) => {

  const [chartDetails1, setChartDetails1] = useState("NPL CHART");
  const [chartDetails2, setChartDetails2] = useState("");


  let initialChakraInfo: { [key: string]: string; } = {
    MESHAM: "", VRISHABHAM: "", MIDHUNAM: "", KARKATAKAM: "",
    SIMHAM: "", KANYA: "", THULA: "", VRUSCHIKA: "",
    DHANUS: "", MAKARAM: "", KUMBHAM: "", MEENAM: ""
  };

  const [chakraInfo, setChakraInfo] = useState(initialChakraInfo);

  const [planetStarInfo, setPlanetStarInfo] = useState({
    LAGNA: "", SUN: "", MOON: "", MARS: "", MERCURY: "",
    JUPITER: "", VENUS: "", SATURN: "", RAHU: "",
    KETU: ""
  });

  const [nplInfo, setNPLInfo] = useState({
    DRM: "", HRM: "", HRM_LORD: "", HRML_JEEVA: "", HRML_SAREERA: "",
    KALAMSA_LORD: "", NPL: "", YK_PLANETS: "", PLANETS_IN_YK: "",
    DIGBALA_PLANETS: "", UD_PLANETS: "", VUD_PLANETS: "", BHINNAPADA_PLANETS: "",
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
    let placeInfo: string[] = serverInfo.placeOfBirth.split("La:");
    let finalStr1 = 'NPL CHART \n' + serverInfo.birthDetails + "\n" + placeInfo[0].replace('(', '\n').replace(',', ' ').replace(')', '');

    let finalStr2 = "La:" + placeInfo[1].replace(',Lo:', '\nLo:').replace(')', '');;
    setChartDetails1(finalStr1);
    setChartDetails2(finalStr2);
  }


  let populateNPLInfo = () => {

    let newNPLInfo = { ...nplInfo };
    let serverInfo = props.location.state;

    console.log('DRM ', serverInfo.nplDetails.drm);
    newNPLInfo = { ...newNPLInfo, DRM: camelCase(serverInfo.nplDetails.drm) };
    newNPLInfo = { ...newNPLInfo, HRM: camelCase(serverInfo.nplDetails.hrm) + '(' + serverInfo.nplDetails.hrmPada + ')' };
    newNPLInfo = { ...newNPLInfo, HRM_LORD: camelCase(serverInfo.nplDetails.hrmLord) };
    newNPLInfo = { ...newNPLInfo, HRML_JEEVA: camelCase(serverInfo.nplDetails.hrmJeeva) };
    newNPLInfo = { ...newNPLInfo, HRML_SAREERA: camelCase(serverInfo.nplDetails.hrmSareera) };
    newNPLInfo = { ...newNPLInfo, NPL: camelCase(serverInfo.nplDetails.npl) };
    newNPLInfo = { ...newNPLInfo, KALAMSA_LORD: camelCase(serverInfo.nplDetails.kalamsaLord) };
    newNPLInfo = { ...newNPLInfo, YK_PLANETS: camelCaseList(serverInfo.yogakarakas) };  //
    newNPLInfo = { ...newNPLInfo, PLANETS_IN_YK: camelCaseList(serverInfo.planetsInYKStar) }; //
    newNPLInfo = { ...newNPLInfo, DIGBALA_PLANETS: camelCaseList(serverInfo.digbalaPlanets) };//
    newNPLInfo = { ...newNPLInfo, UD_PLANETS: camelCaseList(serverInfo.udPlanets) };  //
    newNPLInfo = { ...newNPLInfo, VUD_PLANETS: camelCaseList(serverInfo.vudPlanets) };//
    newNPLInfo = { ...newNPLInfo, BHINNAPADA_PLANETS: camelCaseList(serverInfo.bpPlanets) };//
    newNPLInfo = { ...newNPLInfo, RAHU_REPS: camelCaseList(serverInfo.rahuRepresentations) }; //
    newNPLInfo = { ...newNPLInfo, KETU_REPS: camelCaseList(serverInfo.ketuRepresentations) };//

    setNPLInfo(newNPLInfo);
  }

  let populatePlanetStarInfo = () => {

    let newPlanetStarInfo = { ...planetStarInfo };
    let orderedHouses = props.location.state.raasiChakra.orderedHouses;

    orderedHouses.forEach((item: any, index: number) => {

      if (item.planets) {
        item.planets.forEach((planetItem: any) => {
          let starInfo = camelCase(planetItem.planetStar) + '(' + planetItem.pada + ')';
          let key = planetItem.planet;
          newPlanetStarInfo = { ...newPlanetStarInfo, [key]: starInfo };
        }, []);

      }
    });
    setPlanetStarInfo(newPlanetStarInfo);
  }

  let camelCaseList = (planets: string[]) => {
    let retValue = planets.reduce((finalStr, planet) => {
      return finalStr + " " + camelCaseShortPlanet(planet);
    }, "");

    return retValue;
  };



  let camelCase = (planet: string) => {
    return planet.substr(0, 1) + planet.substr(1).toLowerCase();
  };

  let camelCaseShortPlanet = (planet: string) => {
    return planet.substr(0, 1) + planet.substr(1, 1).toLowerCase();
  };


  let populateChakraInfo = () => {

    let newChakraInfo = { ...chakraInfo };
    let orderedHouses = props.location.state.raasiChakra.orderedHouses;

    orderedHouses.forEach((item: any, index: number) => {

      let hasLagna = false;
      let planetsInHouse = "";
      if (item.planets) {
        let planetsArray = item.planets.reduce((initialValue: string[], planetItem: any) => {
          // console.log('Current planet: ', planetItem.planet);
          let curPlanet = planetItem.planet;
          let degrees = deg_to_dms(planetItem.longitude)
          if (curPlanet === 'LAGNA') {
            hasLagna = true;
          } else {
            curPlanet = camelCaseShortPlanet(curPlanet)
            if (planetItem.isRetrograde && curPlanet !== 'Ra' && curPlanet !== 'Ke') {
              curPlanet = '<span class="' + curPlanet + '">(' + curPlanet + ') ' + degrees + '</span>';
            } else {
              curPlanet = '<span class="' + curPlanet + '">' + curPlanet + ' ' + degrees + '</span>';
            }
            initialValue.push(curPlanet);
          }
          //planetItem.planetStar + '(' + planetItem.pada + ')'
          return initialValue;
        }, []);
        if (hasLagna) {
          planetsArray.push('<span class="NPL">NPL</span>');
          // moveElement
          // planetsArray.unshift('<span class="NPL">NPL</span>' );
        }
        planetsInHouse = planetsArray.join('<br>');
        if (planetsInHouse.indexOf("Mo") >= 0) {
          planetsInHouse = '<span class="img-span"><img class="img-moon" src="./assets/icon/crescent_moon.png"/></span>' + planetsInHouse;
        }

      }
      let key = item.raasi;
      newChakraInfo = { ...newChakraInfo, [key]: planetsInHouse };

      // console.log(item.raasi + ': ' , planetsInHouse);
    });
    let serverInfo = props.location.state;
    let key = serverInfo.nplDetails.hrmSign;
    let hrmPlanetList = newChakraInfo[key];
    hrmPlanetList = '<span class="img-span"><img class="img-moon" src="./assets/icon/crescent_moon_lined.png"/></span>' + hrmPlanetList;
    newChakraInfo = { ...newChakraInfo, [key]: hrmPlanetList };

    setChakraInfo(newChakraInfo);

  }

  console.log('Chakra called with props ', props.location.state['nativeName']);
  return (

    <IonContent>
      <table className="chakra-table">
        <tbody>
          <tr>
            <td> <IonText> <span dangerouslySetInnerHTML={{ __html: chakraInfo.MEENAM }} />    </IonText></td>
            <td> <IonText> <span dangerouslySetInnerHTML={{ __html: chakraInfo.MESHAM }} />    </IonText></td>
            <td><IonText> <span dangerouslySetInnerHTML={{ __html: chakraInfo.VRISHABHAM }} />    </IonText></td>
            <td> <IonText> <span dangerouslySetInnerHTML={{ __html: chakraInfo.MIDHUNAM }} />    </IonText> </td>

          </tr>
          <tr>

            <td><IonText> <span dangerouslySetInnerHTML={{ __html: chakraInfo.KUMBHAM }} />    </IonText></td>
            <td id="cell6" colSpan={2}> <IonText> <span className="main_label1" dangerouslySetInnerHTML={{ __html: chartDetails1 }} />    </IonText></td>
            <td><IonText> <span dangerouslySetInnerHTML={{ __html: chakraInfo.KARKATAKAM }} />    </IonText> </td>

          </tr>
          <tr>
            <td><IonText> <span dangerouslySetInnerHTML={{ __html: chakraInfo.MAKARAM }} /> </IonText>  </td>

            <td id="cell10" colSpan={2}> <IonText> <span className="main_label2" dangerouslySetInnerHTML={{ __html: chartDetails2 }} />    </IonText></td>

            <td><IonText> <span dangerouslySetInnerHTML={{ __html: chakraInfo.SIMHAM }} /></IonText>  </td>

          </tr>
          <tr>
            <td><IonText> <span dangerouslySetInnerHTML={{ __html: chakraInfo.DHANUS }} />  </IonText> </td>
            <td><IonText> <span dangerouslySetInnerHTML={{ __html: chakraInfo.VRUSCHIKA }} />  </IonText> </td>
            <td><IonText> <span dangerouslySetInnerHTML={{ __html: chakraInfo.THULA }} /> </IonText>  </td>
            <td><IonText> <span dangerouslySetInnerHTML={{ __html: chakraInfo.KANYA }} /></IonText>  </td>
          </tr>
        </tbody>
      </table>

      <table className="planet-table">
        <tbody>
          <tr>

            <td className="DRM">DRM</td>
            <td className="DRM">{nplInfo.DRM}</td>
            <td className="HRM">HRM</td>
            <td className="HRM">{nplInfo.HRM}</td>
            <td> </td>
            <td> </td>

          </tr>

          <tr>
            <td className="Su1">Su</td>
            <td className="Su1">{planetStarInfo.SUN}</td>
            <td ><span className="MoStar1">Mo</span></td>
            <td ><span className="MoStar1">{planetStarInfo.MOON}</span></td>
            <td className="Ma1">Ma</td>
            <td className="Ma1">{planetStarInfo.MARS}</td>

          </tr>


          <tr>
            <td className="Me1">Me</td>
            <td className="Me1">{planetStarInfo.MERCURY}</td>
            <td className="Ju1">Ju</td>
            <td className="Ju1">{planetStarInfo.JUPITER}</td>
            <td className="Ve1">Ve</td>
            <td className="Ve1">{planetStarInfo.VENUS}</td>

          </tr>

          <tr>
            <td className="Sa1">Sa</td>
            <td className="Sa1">{planetStarInfo.SATURN}</td>
            <td className="Ra1">Ra</td>
            <td className="Ra1">{planetStarInfo.RAHU}</td>
            <td className="Ke1">Ke</td>
            <td className="Ke1">{planetStarInfo.KETU}</td>

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