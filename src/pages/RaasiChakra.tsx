
import React from 'react';
import { star } from 'ionicons/icons';
import { IonContent, IonText, IonPage } from '@ionic/react';
import './RaasiChakra.css';

const RaasiChakra: React.FC = () => {
  console.log('RaasiChakra called');
  return (
    <IonPage id="raasi-chakra-page">
      <IonContent>
        <table id="chakra-table">
            <tr className="chakra-cell">
              <td>first</td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td className="cell6"></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td className="cell6"></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

          </table>
        <IonText>Some text</IonText>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(RaasiChakra);
