
import React, { useRef, useEffect, useState } from 'react';
import  Chakra   from './Chakra'
import  Observations   from './Observations'
import NPLRules from './NPLRules'
import { grid,  document, thumbsUp } from 'ionicons/icons';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonSegment, IonSegmentButton, IonIcon, IonSlides, IonSlide, IonText, IonLabel, IonItem } from '@ionic/react';
 
 
import './Home.css';
 
import { Plugins } from '@capacitor/core';
import { RouteComponentProps } from 'react-router';


// class RaasiChakra extends Component<{},{}> {
const Home: React.FC<RouteComponentProps<{}>> = (props:any) => {
 
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
           
          
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonSlides onIonSlideDidChange={e => clickSegment() } ref={slidesRef} className="slides"  options={slideOpts}>
          <IonSlide className="slide1">
            <Chakra {...props}/>

          </IonSlide>
          <IonSlide className="slide">
             
             <Observations  {...props}/>
          </IonSlide>
          <IonSlide className="slide">
            <NPLRules />
         
          </IonSlide>  
         
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(Home);
