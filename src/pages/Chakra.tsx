
import React from 'react';

import { Plugins, FilesystemDirectory, Capacitor, FilesystemEncoding } from '@capacitor/core';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { IonContent, IonText, IonButton } from '@ionic/react';
import './Chakra.css';
export const Chakra: React.FC = () => {

  let fileOpener: FileOpener;

  let generatePDF = () => {
    console.log('Generate pdf called');
    const { Filesystem } = Plugins;

    if (Capacitor.isNative) {
      // Save the PDF to the device
      const fileName = 'timesheet.txt';
      try {
        Filesystem.writeFile({
          path: fileName,
          data: "This is sample text",
          directory: FilesystemDirectory.Documents,
          encoding: FilesystemEncoding.UTF8
        }).then((writeFileResult) => {
          Filesystem.getUri({
            directory: FilesystemDirectory.Documents,
            path: fileName
          }).then((getUriResult) => {
            const path = getUriResult.uri;
            fileOpener.open(path, 'text/plain').then(() => console.log('File is opened'))
              .catch(error => console.log('Error openening file', error));
          }, (error) => {
            console.log(error);
          });
        });
      } catch (error) {
        console.error('Unable to write file', error);
      }
    } else {
      console.log('Running in web');
      // On a browser simply use download
      // this.pdfObj.download();
    }
  }

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

      <div>
        <IonButton onClick={generatePDF}>Export PDF</IonButton>

      </div>
    </IonContent>

  );
};


