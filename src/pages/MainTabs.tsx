import React from 'react';
import { IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { Route, Redirect } from 'react-router';
import { calendar, contacts, map, informationCircle } from 'ionicons/icons';
import ListDemo from './ListDemo';
import ListDemo2 from './ListDemo2';
import CardDemo from './CardDemo';

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
                <Route path="/tabs/schedule" render={() => <CardDemo />} exact={true} />
                <Route path="/tabs/speakers" render={() => <ListDemo />} exact={true} />

                <Route path="/tabs/map" render={() => <ListDemo2 />} exact={true} />

            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="schedule" href="/tabs/schedule">
                    <IonIcon icon={calendar} />
                    <IonLabel>Schedule</IonLabel>
                </IonTabButton>
                <IonTabButton tab="speakers" href="/tabs/speakers">
                    <IonIcon icon={contacts} />
                    <IonLabel>Speakers</IonLabel>
                </IonTabButton>
                <IonTabButton tab="map" href="/tabs/map">
                    <IonIcon icon={map} />
                    <IonLabel>Map</IonLabel>
                </IonTabButton>

            </IonTabBar>
        </IonTabs>
    );
};

export default MainTabs;