import React from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge  } from '@ionic/react';
import { calendar, contacts, map } from 'ionicons/icons';
import { Route, Redirect    } from 'react-router';
import ListDemo from './ListDemo';
import ListDemo2 from './ListDemo2';
import CardDemo from './CardDemo';
 
export const Tabs: React.FC = () => (
  <IonTabs>
      <IonRouterOutlet>
        <Redirect exact path="/tabs" to="/tabs/schedule" /> 
        <Route path="/tabs/schedule" render={() =>     <CardDemo />  } exact={true} />
        <Route path="/tabs/speakers" render={() => <ListDemo />} exact={true} />
        <Route path="/tabs/maps" render={() => <ListDemo2 />} exact={true} />
      </IonRouterOutlet>
    <IonTabBar slot="top">
      <IonTabButton tab="schedule" href="/tabs/schedule">
        <IonIcon icon= {   calendar }  />
        <IonLabel>Schedule</IonLabel>
        
     
      </IonTabButton>

      <IonTabButton tab="speakers" href="/tabs/speakers">
        <IonIcon icon = {contacts} />
        <IonLabel>Speakers</IonLabel>
        
      </IonTabButton>

      <IonTabButton tab="map" href="/tabs/maps">
        <IonIcon icon={map} />
        <IonLabel>Map</IonLabel>
      </IonTabButton>

     
    </IonTabBar>
  </IonTabs>
);

export default React.memo(Tabs);