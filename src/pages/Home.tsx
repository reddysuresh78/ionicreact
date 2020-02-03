
import React, { useRef, useEffect, useState } from 'react';
import { Chakra } from './Chakra'
import { grid, search } from 'ionicons/icons';
import { IonContent, IonPage, IonHeader, IonToolbar, IonSegment, IonSegmentButton, IonIcon, IonSlides, IonSlide, IonText, IonLabel, IonItem } from '@ionic/react';

import ListDemo from './ListDemo';
 
import './Home.css';
import axios  from 'axios';

import { Plugins } from '@capacitor/core';


// class RaasiChakra extends Component<{},{}> {
const Home: React.FC = () => {
  const [serverData, setServerData] = useState([]);
  const [locData, setLocData] = useState({longitude: 0 , latitude: 0});
  useEffect(() => {
    getLocation();
    makePostRequest();
  }, []);   

  let getLocation = async () => {
    const coordinates = await Plugins.Geolocation.getCurrentPosition();
    setLocData ( { longitude: coordinates.coords.longitude, latitude: coordinates.coords.latitude  } );
    console.log('Lang ' , coordinates.coords.longitude, coordinates.coords.latitude );
  }

  let makePostRequest = () => {
    axios.get<any>('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => {
        setServerData(response.data.title);
        // console.log(response.data.title);
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
  
  
  return (
    <IonPage id="raasi-chakra-page">
      <IonHeader>
        <IonToolbar  >
          <IonSegment scrollable ref={segmentRef} onIonChange={e => slideTo('' + e.detail.value)   }>
            <IonSegmentButton value="0" checked>
              <IonIcon icon={grid} />
              <IonLabel>Rasi Chakra</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="1">
              <IonIcon icon={search} />
              <IonLabel>Dasa</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="2">
              <IonIcon icon={search} />
              <IonLabel>Panchang</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="3">
              <IonIcon icon={search} />
              <IonLabel>Birth Details</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="4">
              <IonIcon icon={search} />
              <IonLabel>Transit</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="5">
              <IonIcon icon={search} />
              <IonLabel>Shadbala</IonLabel>
            </IonSegmentButton>

          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonSlides onIonSlideDidChange={e => clickSegment() } ref={slidesRef} className="slides"  options={slideOpts}>
          <IonSlide className="slide1">
            <Chakra />

          </IonSlide>
          <IonSlide className="slide">
             
            <IonText>DBA details will be shown here: Extracted Info {serverData}</IonText>
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
      
            <IonText>info 2</IonText>
          </IonSlide>  
          <IonSlide className="slide">
          
            <IonText>info 3</IonText>
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
