
import React from 'react';
 
import { IonContent, IonText,   } from '@ionic/react';
import './Chakra.css';
export const Chakra: React.FC = () => {
  console.log('Chakra called');
  return (
     
      <IonContent>
         <table className="chakra-table">
          <tbody>
          <tr>
            <td>first</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td id="cell6" colSpan={2}>  <IonText>Some text</IonText></td>
            <td></td>

          </tr>
          <tr>
            <td></td>
            <td id="cell10" colSpan={2}></td>
            <td></td>

          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          </tbody>
        </table>
      </IonContent>
     
  );
};

 
