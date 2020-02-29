
import React from 'react';

import { IonContent,  IonItem, IonText } from '@ionic/react';

import './NPLRules.css';

// class RaasiChakra extends Component<{},{}> {
const NPLRules: React.FC = (props: any) => {

    return (
        
            <IonContent >
                <IonItem class="npl-rules">
                    <IonText>Rule 1: If DRM & HRM are in 7 x 7 position or Jeeva & Sareera are in 7 x 7 position, positive result can be expected. </IonText>
                </IonItem>
                <IonItem>
                    <IonText>Rule 2: Ruling planet at question time will become ruling planet at result time. </IonText>
                </IonItem>
                <IonItem>
                    <IonText>Rule 3: Event may take place whenever Jeeva or Sareera touches NPL or NPL Lord. </IonText>
                </IonItem>
                <IonItem>
                    <IonText>Rule 4: If Prasna chart is in Kala Sarpa Dosha,  positive result cannot be expected. </IonText>
                </IonItem>
                <IonItem>
                    <IonText>Rule 5: Jeeva and Sareera should be friendly to expect positive result. </IonText>
                </IonItem>
                <IonItem>
                    <IonText>Rule 6: Even when Jeeva and Sareera are in 6 x 8 position, if they are in conjunction with Yogakaraka, positive results can be expected.  </IonText>
                </IonItem>
                <IonItem>
                    <IonText>Rule 7: If DRM or HRM is aspected by Jeeva or Sareera, good results can be expected</IonText>
                </IonItem>
                <IonItem>
                    <IonText>Rule 8: If Jeeva or Sareera are fast moving planets, quick results can be expected </IonText>
                </IonItem>
                <IonItem>
                    <IonText>Rule 9: If HRM is in Chara Raasi, it may indicate event will happen fast.</IonText>
                </IonItem>
                <IonItem>
                    <IonText>Rule 10: If Sun & Moon don't have any bad connections and are connected with Jeeva and Sareera, expect good results.   </IonText>
                </IonItem>
            </IonContent>
        
    );
};

export default React.memo(NPLRules);
