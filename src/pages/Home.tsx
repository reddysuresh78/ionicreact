import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar , IonIcon} from '@ionic/react';
import React from 'react';
import { star } from 'ionicons/icons';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ionic Demo App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        This is first app content and it gets refreshed automatically
        <IonIcon icon={ star }   />
 
 
      </IonContent>
    </IonPage>
  );
};

export default Home;
