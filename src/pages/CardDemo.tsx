
import React from 'react';
import { star } from 'ionicons/icons';
import { IonContent, IonText, IonPage } from '@ionic/react';

const CardDemo: React.FC = () => {
  console.log('Card demo called');
  return (
    <IonPage>
      <IonContent>
        <IonText>Some text</IonText> 
      </IonContent>
    </IonPage>
  );
};

export default React.memo(CardDemo);
