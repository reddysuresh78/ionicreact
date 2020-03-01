
import React from 'react';
import { IonContent } from '@ionic/react';
import './Observations.css';
import { RouteComponentProps } from 'react-router';
import { useEffect, useState } from 'react';

const Observations: React.FC<RouteComponentProps<{}>> = (props: any) => {

  const [nplInfo, setNPLInfo] = useState({
    DRM: "", HRM: "", HRM_LORD: "", HRML_JEEVA: "", HRML_SAREERA: "",
    KALAMSA_LORD: "", NPL: "", YK_PLANETS: "", PLANETS_IN_YK: "",
    DIGBALA_PLANETS: "", UD_PLANETS: "", VUD_PLANETS: "", BHINNAPADA_PLANETS: "",
    RAHU_REPS: "", KETU_REPS: "", SUNRISE: "", ASSOCIATED_PLANETS: ""
  });

  useEffect(() => {
    populateNPLInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let populateNPLInfo = () => {

    let newNPLInfo = { ...nplInfo };
    let serverInfo = props.location.state;

    newNPLInfo = { ...newNPLInfo, DRM: camelCase(serverInfo.nplDetails.drm) };
    newNPLInfo = { ...newNPLInfo, HRM: camelCase(serverInfo.nplDetails.hrm) + '(' + serverInfo.nplDetails.hrmPada + ')' };
    newNPLInfo = { ...newNPLInfo, HRM_LORD: camelCaseShortPlanet(serverInfo.nplDetails.hrmLord) };
    newNPLInfo = { ...newNPLInfo, HRML_JEEVA: camelCaseShortPlanet(serverInfo.nplDetails.hrmJeeva) };
    newNPLInfo = { ...newNPLInfo, HRML_SAREERA: camelCaseShortPlanet(serverInfo.nplDetails.hrmSareera) };
    newNPLInfo = { ...newNPLInfo, NPL: camelCase(serverInfo.nplDetails.npl) };
    newNPLInfo = { ...newNPLInfo, KALAMSA_LORD: camelCaseShortPlanet(serverInfo.nplDetails.kalamsaLord) };
    newNPLInfo = { ...newNPLInfo, YK_PLANETS: camelCaseList(serverInfo.yogakarakas) };  //
    newNPLInfo = { ...newNPLInfo, PLANETS_IN_YK: camelCaseList(serverInfo.planetsInYKStar) }; //
    newNPLInfo = { ...newNPLInfo, DIGBALA_PLANETS: camelCaseList(serverInfo.digbalaPlanets) };//
    newNPLInfo = { ...newNPLInfo, UD_PLANETS: camelCaseList(serverInfo.udPlanets) };  //
    newNPLInfo = { ...newNPLInfo, VUD_PLANETS: camelCaseList(serverInfo.vudPlanets) };//
    newNPLInfo = { ...newNPLInfo, BHINNAPADA_PLANETS: camelCaseList(serverInfo.bpPlanets) };//
    newNPLInfo = { ...newNPLInfo, RAHU_REPS: camelCaseList(serverInfo.rahuRepresentations) }; //
    newNPLInfo = { ...newNPLInfo, KETU_REPS: camelCaseList(serverInfo.ketuRepresentations) };//
    newNPLInfo = { ...newNPLInfo, SUNRISE: serverInfo.sunrise };//
    newNPLInfo = { ...newNPLInfo, ASSOCIATED_PLANETS: camelCaseList(serverInfo.associatedPlanets) };//
    setNPLInfo(newNPLInfo);
  }


  let camelCaseList = (planets: string[]) => {
    if (!planets)
      return "";
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


  // console.log('Observations called with props ', props.location.state['nativeName']);
  return (

    <IonContent>

      <table className="npl-table">
        <tbody>
          <tr>
            <td>Sunrise</td>
            <td>{nplInfo.SUNRISE}</td>
          </tr>
          <tr>
            <td>DRM</td>
            <td>{nplInfo.DRM}</td>
          </tr>
          <tr>
            <td>HRM</td>
            <td>{nplInfo.HRM}</td>
          </tr>

          <tr>
            <td>HRM Lord</td>
            <td>{nplInfo.HRM_LORD}</td>
          </tr>
          <tr>
            <td>HRM Lord Jeeva</td>
            <td>{nplInfo.HRML_JEEVA}</td>
          </tr>

          <tr>
            <td>HRM Lord Sareera</td>
            <td>{nplInfo.HRML_SAREERA}</td>
          </tr>
          <tr>
            <td>KALAMSA Lord</td>
            <td>{nplInfo.KALAMSA_LORD}</td>
          </tr>

          <tr>
            <td>YK Planets</td>
            <td>{nplInfo.YK_PLANETS}</td>
          </tr>
          <tr>
            <td>Associated Planets</td>
            <td>{nplInfo.ASSOCIATED_PLANETS}</td>
          </tr>
          <tr>
            <td>Planets in YK Star</td>
            <td>{nplInfo.PLANETS_IN_YK}</td>
          </tr>

          <tr>
            <td>Digbala Planets</td>
            <td>{nplInfo.DIGBALA_PLANETS}</td>
          </tr>
          <tr>
            <td>Binnapada Planets</td>
            <td>{nplInfo.BHINNAPADA_PLANETS}</td>
          </tr>

          <tr>
            <td>UD Planets</td>
            <td>{nplInfo.UD_PLANETS}</td>
          </tr>
          <tr>
            <td>VUD Planets</td>
            <td>{nplInfo.VUD_PLANETS}</td>
          </tr>

          <tr>
            <td>Rahu Reps</td>
            <td>{nplInfo.RAHU_REPS}</td>
          </tr>
          <tr>
            <td>Ketu Reps</td>
            <td>{nplInfo.KETU_REPS}</td>
          </tr>
 
         </tbody>
      </table>

    </IonContent>
  );
};


export default React.memo(Observations);