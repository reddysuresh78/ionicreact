
import React, { useRef } from 'react';
import {  Chakra } from './Chakra'
import { camera, bookmark } from 'ionicons/icons';
import { IonContent, IonPage, IonHeader, IonToolbar, IonSegment, IonSegmentButton, IonIcon, IonSlides, IonSlide, IonText } from '@ionic/react';

import   ListDemo   from './ListDemo';
import ListDemo2 from './ListDemo';


// class RaasiChakra extends Component<{},{}> {
const RaasiChakra: React.FC = () => {

  const slidesRef = useRef<HTMLIonSlidesElement>(null);

  const slideTo = (indexStr: string) => {
    let index = +indexStr
    console.log('selected index ' , index);
    slidesRef.current!.slideTo(index);
  }

  return (
    <IonPage id="raasi-chakra-page">
      <IonHeader>
        <IonToolbar>
          <IonSegment scrollable onIonChange={e => { console.log('Segment selected', e.detail.value); slideTo('' + e.detail.value); }}>
            <IonSegmentButton value="1">
              <IonIcon icon={camera} />
            </IonSegmentButton>
            <IonSegmentButton value="2">
              <IonIcon icon={bookmark} />
            </IonSegmentButton>
          </IonSegment>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonSlides onIonSlideDidChange={e => console.log('Slide changed', e)} ref={slidesRef}>
          <IonSlide class="slide-1">
             <Chakra />  
           
          </IonSlide>
          <IonSlide class="slide-2">
             <ListDemo />  
            <IonText>This is some text 2</IonText>
          </IonSlide>
          <IonSlide class="slide-3">
            <ListDemo2 />
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default React.memo(RaasiChakra);
