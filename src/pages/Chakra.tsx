
import React from 'react';

import { Plugins, FilesystemDirectory, Capacitor } from '@capacitor/core';
 

import { IonContent, IonText, IonButton } from '@ionic/react';
import './Chakra.css';


import pdfmake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

const Chakra: React.FC = () => {

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
        const fileName = 'file.pdf';
        pdfmake.vfs = pdfFonts.pdfMake.vfs;
         
        pdfmake.createPdf({ content: 'Hi. I am a PDF.' }).open();
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


export  default React.memo(Chakra);