import React from 'react';
import {  Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
 
import NPLHome from './pages/NPLHome';
 

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import DataCapture from './pages/DataCapture';
 
import { Plugins } from '@capacitor/core'
  
const { SplashScreen } = Plugins;
SplashScreen.hide();

Plugins.App.addListener('backButton', (data: any) => {
  console.log('back called with path ', window.location.pathname);
  console.log('back called with data ', JSON.stringify(  data));
  console.log('History: ', JSON.stringify(  window.history));
  if (window.location.pathname === "/") {
    Plugins.App.exitApp();
  } else {
    console.log('History: ', JSON.stringify(  window.history));
    // window.history.back();
    
    
  }
}
);

const App: React.FC = () => { 
  
 
  return ( 
  <IonApp>
    <IonReactRouter> 
      <IonRouterOutlet>
 
        <Route  path="/nplhome" render={(props) => <NPLHome {...props} />  }  exact={true} />
        <Route  path="/" component={DataCapture}  exact={true} />
         
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);
}
export default App;
