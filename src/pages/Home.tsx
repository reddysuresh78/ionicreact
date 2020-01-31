
import React, { useRef, useEffect, useState } from 'react';
import { Chakra } from './Chakra'
import { grid, search } from 'ionicons/icons';
import { IonContent, IonPage, IonHeader, IonToolbar, IonSegment, IonSegmentButton, IonIcon, IonSlides, IonSlide, IonText, IonLabel } from '@ionic/react';

import ListDemo from './ListDemo';
 
import './Home.css';
import axios  from 'axios';

// class RaasiChakra extends Component<{},{}> {
const Home: React.FC = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    makePostRequest();
  }, []);   

  let makePostRequest = () => {
    axios.get<any>('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => {
        setData(response.data.title);
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
             
            <IonText>DBA details will be shown here: Extracted Info {data}</IonText>
          </IonSlide>
          <IonSlide className="slide">
          
            <IonText>info 1</IonText>
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
