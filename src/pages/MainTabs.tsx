import React from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { calendar, contacts, map } from 'ionicons/icons';
import ListDemo from './ListDemo';
 
import RaasiChakra from './Home';

interface MainTabsProps { }
 
const MainTabs: React.FC<MainTabsProps> = () => {

    return (
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/schedule" />
                {/* 
          Using the render method prop cuts down the number of renders your components will have due to route changes.
          Use the component prop when your component depends on the RouterComponentProps passed in automatically.        
        */}
                <Route path="/tabs/schedule" render={() => <RaasiChakra />} exact={true} />
                <Route path="/tabs/speakers" render={() => <ListDemo />} exact={true} />
 
            </IonRouterOutlet>
            <IonTabBar slot="top">
                <IonTabButton tab="schedule" href="/tabs/schedule">
                    <IonIcon icon={calendar} />
                    <IonLabel>Raasi Chakra</IonLabel>
                </IonTabButton>
                <IonTabButton tab="speakers" href="/tabs/speakers">
                    <IonIcon icon={contacts} />
                    <IonLabel>Navamsa Chakra</IonLabel>
                </IonTabButton>
                <IonTabButton tab="map" href="/tabs/map">
                    <IonIcon icon={map} />
                    <IonLabel>Gunas</IonLabel>
                </IonTabButton>

            </IonTabBar>
        </IonTabs>
    );
};

export default MainTabs;