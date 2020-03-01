
import React, { useRef } from 'react';
import Chakra from './Chakra'
import Observations from './Observations'
import NPLRules from './NPLRules'
import { grid, document, thumbsUp } from 'ionicons/icons';
import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonButtons, IonBackButton, IonSegment, IonSegmentButton, IonIcon, IonSlides, IonSlide,  IonLabel  } from '@ionic/react';
import './NPLHome.css';
import { RouteComponentProps } from 'react-router';

const NPLHome: React.FC<RouteComponentProps<{}>> = (props: any) => {
 
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
    active.scrollIntoView({ behavior: "smooth", inline: 'center' });
  }

  const slideOpts = {
    initialSlide: 0,
    speed: 10
  };
 
  if (props.history.action === 'POP') {
    //This is required otherwise, it tries to access state and fails
    return (<IonPage id="raasi-chakra-page"><IonContent></IonContent></IonPage>)
  } else {
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
            <IonSegment scrollable ref={segmentRef} onIonChange={e => slideTo('' + e.detail.value)}>
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
          <IonSlides onIonSlideDidChange={e => clickSegment()} ref={slidesRef} className="slides" options={slideOpts}>
            <IonSlide className="slide1">
              <Chakra {...props} />
            </IonSlide>
            <IonSlide className="slide">
              <Observations  {...props} />
            </IonSlide>
            <IonSlide className="slide">
              <NPLRules {...props} />
            </IonSlide>
          </IonSlides>
        </IonContent>
      </IonPage>
    )
  }
}

export default React.memo(NPLHome);
