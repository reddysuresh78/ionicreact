
import React from 'react';
import { star } from 'ionicons/icons';
import {   IonContent, IonText } from '@ionic/react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,    IonIcon, IonItem, IonLabel } from '@ionic/react';

const CardDemo: React.FC = () => {
  console.log('Card demo called');
  return (
    <IonContent>
      <IonText>Some text</IonText>
  </IonContent>
  );
};

export default React.memo(CardDemo);
