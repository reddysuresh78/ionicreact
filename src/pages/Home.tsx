
import React, { useRef, useEffect, useState } from 'react';
import  Chakra   from './Chakra'
import { grid,  document, thumbsUp, calendar } from 'ionicons/icons';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonSegment, IonSegmentButton, IonIcon, IonSlides, IonSlide, IonText, IonLabel, IonItem } from '@ionic/react';

import ListDemo from './ListDemo';
 
import './Home.css';
import axios  from 'axios';

import { Plugins } from '@capacitor/core';
import { RouteComponentProps } from 'react-router';


// class RaasiChakra extends Component<{},{}> {
const Home: React.FC<RouteComponentProps<{}>> = (props:any) => {
  const [serverData, setServerData] = useState([]);
  const [locData, setLocData] = useState({longitude: 0 , latitude: 0});
  useEffect(() => {
    getLocation();
    // makePostRequest();
  }, []);   

  let getLocation = async () => {
    const coordinates = await Plugins.Geolocation.getCurrentPosition();
    setLocData ( { longitude: coordinates.coords.longitude, latitude: coordinates.coords.latitude  } );
    console.log('Lang ' , coordinates.coords.longitude, coordinates.coords.latitude );
  }

  let makePostRequest = () => {
    console.log('serverless is called');
    axios.get<any>('https://6xdsi8hkl5.execute-api.us-east-1.amazonaws.com/dev/hello')
      .then(response => {
        // console.log('Response', response.data);
        setServerData(response.data.message);
        // this.setState( { loadedPost: response.data } );
      });
  }

  const slidesRef = useRef<HTMLIonSlidesElement>(null);
  const segmentRef = useRef<HTMLIonSegmentElement>(null);

  const slideTo = (indexStr: string) => {
    let index = +indexStr
  
    slidesRef.current!.slideTo(index);
  }

  const clickSegment = async () => {
    let curIndex = await slidesRef.current!.getActiveIndex();
    segmentRef.current!.value = '' + curIndex;

    var active = segmentRef.current!.querySelectorAll('ion-segment-button')[curIndex];
    active.scrollIntoView({behavior: "smooth", inline:'center'});
  }

  const slideOpts = {
    initialSlide: 0,
    speed: 10
  };
  
  console.log('Received Props ', props.location.state['nativeName']);
  
  return (
    <IonPage id="raasi-chakra-page">
      <IonHeader>
       
            <IonToolbar color="primary" >
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/" />
                </IonButtons>
                <IonTitle class="ion-text-center">DR. RAJA'S NPL</IonTitle>
            </IonToolbar>
            
        <IonToolbar  >
          <IonSegment scrollable ref={segmentRef} onIonChange={e => slideTo('' + e.detail.value)   }>
            <IonSegmentButton value="0" checked>
              <IonIcon icon={grid} />
              <IonLabel>NPL Chakra</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="1">
              <IonIcon icon={document} />
              <IonLabel>Observations</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="2">
              <IonIcon icon={thumbsUp} />
              <IonLabel>NPL Rules</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="3">
              <IonIcon icon={calendar} />
              <IonLabel>NPL Today</IonLabel>
            </IonSegmentButton>
          
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonSlides onIonSlideDidChange={e => clickSegment() } ref={slidesRef} className="slides"  options={slideOpts}>
          <IonSlide className="slide1">
            <Chakra {...props}/>

          </IonSlide>
          <IonSlide className="slide">
             
            <IonText>Response from server: {serverData}</IonText>
          </IonSlide>
          <IonSlide className="slide">
           <IonItem>
            <IonText>Longitude: { locData.longitude} </IonText>
            </IonItem>
            <IonItem>
            <IonText>  Latitude: { locData.latitude} </IonText>
            </IonItem>
          </IonSlide>  
       
          <IonSlide className="slide">
            <ListDemo />
            
          </IonSlide>  
            

        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Home);
