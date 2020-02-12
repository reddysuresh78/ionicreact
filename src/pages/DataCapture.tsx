
import React, { useRef, useEffect, useState } from 'react';
import { grid, document, thumbsUp, calendar } from 'ionicons/icons';
import { IonContent, IonPage, IonHeader, IonToolbar, IonButton, IonText, IonLabel, IonItem, IonGrid, IonRow, IonCol, IonDatetime, IonInput, IonTitle } from '@ionic/react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';
import { Capacitor } from '@capacitor/core';

import 'react-google-places-autocomplete/dist/assets/index.css';
import './DataCapture.css';
import axios from 'axios';

import { Plugins, StatusBarStyle } from '@capacitor/core';

// class RaasiChakra extends Component<{},{}> {
const Home: React.FC = (props: any) => {
    const [serverData, setServerData] = useState([]);
    const [locData, setLocData] = useState({ longitude: 0, latitude: 0, address: '' });
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const { StatusBar } = Plugins;
    useEffect(() => {
        resetAll();
        // makePostRequest();
    }, []);

    let resetAll = () => {

        const isStatusBarAvailable = Capacitor.isPluginAvailable('StatusBar');
        if (isStatusBarAvailable) {
            console.log('setting status bar color');
            StatusBar.setBackgroundColor({ color: '#ffffff' });
        }

        // StatusBar.setBackgroundColor( {color: "primary" } );
        var today = new Date();
        var date = (today.getMonth() + 1) + '-' + today.getDate() + "-" + today.getFullYear();
        var time = today.getHours() + ":" + (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes());
        console.log('Date has been set to ', date, time);
        setSelectedTime(time);
        setSelectedDate(date);
        dateRef.current!.value = date;
        timeRef.current!.value = time;
        getLocation();
    }
    let getLocation = async () => {
        const coordinates = await Plugins.Geolocation.getCurrentPosition();

        var address = await getPlaceAddress(coordinates.coords.latitude, coordinates.coords.longitude)
        console.log('Lang ', coordinates.coords.longitude, coordinates.coords.latitude, address);
        setLocData({ longitude: coordinates.coords.longitude, latitude: coordinates.coords.latitude, address: address });
    }
    let getPlaceAddress = async (latitude: number, longitude: number) => {
        console.log('place api is called');
        let address = '';
        let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyCGNs19uVo_jdtJQwqXUbXE0xET4I4YgLs';
        await axios.get<any>(url)
            .then(response => {
                // console.log('Response', response.data.results[0]);
                let locality = "";
                let sublocality = "";
                for (const comp of response.data.results[0].address_components) {
                    // console.log('Response', comp.types);
                    for (const type of comp.types) {
                        if (type === 'locality')
                            locality = comp.long_name;

                        if (type === 'sublocality')
                            sublocality = comp.long_name;
                    }
                }
                console.log('lo/sub ', sublocality, locality);
                address = sublocality + ',' + locality;
                return sublocality + ',' + locality;
                // setServerData(response.data.message);
                // this.setState( { loadedPost: response.data } );
            });
        return address;
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

    let getLatLang = (val: any) => {
        console.log(val.place_id);
        geocodeByPlaceId(val.place_id)
            .then((results: any) => getLatLng(results[0]))
            .then((latlng: any) =>
                console.log('Successfully got latitude and longitude', latlng.lat, latlng.lng)
            );

    }

    let getNPL = (e: any) => {
        console.log('getNPL Called');
        e.preventDefault();
        props.history.push({
            pathname: '/npl',
            // search: '?query=abc',
            state: { detail: serverData }
          })

        props.history.push('/npl');
        
    }

    const slideOpts = {
        initialSlide: 0,
        speed: 10
    };

    const dateRef = useRef<HTMLIonDatetimeElement>(null);
    const timeRef = useRef<HTMLIonDatetimeElement>(null);
    const placeRef = useRef<HTMLIonInputElement>(null);

    const placeStyle = {
       
         marginLeft : 10
      };
    return (
        <IonPage id="raasi-chakra-page">
            <IonHeader>
                <IonToolbar color="primary" >

                    <IonTitle class="ion-text-center">DR. RAJA'S NPL</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    

                    <IonRow>
                        <IonCol class="label-align" sizeLg="6" sizeSm="4" sizeMd="4" size="4" >
                            <IonLabel>Date</IonLabel>
                        </IonCol>
                        <IonCol>
                            <IonDatetime placeholder="Date" ref={dateRef} value={selectedDate}>Date</IonDatetime>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol class="label-align"  sizeLg="6" sizeSm="4" sizeMd="4" size="4">
                            <IonLabel >Time</IonLabel>
                        </IonCol>
                        <IonCol>
                            <IonDatetime placeholder="Time" ref={timeRef} value={selectedTime} displayFormat="h:mm A" pickerFormat="h:mm A" >Time</IonDatetime>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol class="label-align"  sizeLg="6" sizeSm="4" sizeMd="4" size="4">
                            <IonLabel  >Place</IonLabel>
                        </IonCol>
                        <IonCol >
                            <IonInput class="input-align" ref={placeRef} value={locData.address} />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol class="label-align"  sizeLg="6" sizeSm="4" sizeMd="4" size="4">
                            <IonLabel >Select Place</IonLabel>
                        </IonCol>
                        <IonCol>
                            
                            <GooglePlacesAutocomplete  inputStyle={placeStyle}  onSelect={(val: any) => getLatLang(val)} />
                            
                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol class="label-align"  sizeLg="6" sizeSm="4" sizeMd="4" size="4">
                            <IonButton onClick={resetAll}>RESET</IonButton>
                        </IonCol>
                        <IonCol class="button-align">
                            <IonButton onClick={getNPL}>Generate NPL</IonButton>
                        </IonCol>
                    </IonRow>

                </IonGrid>

            </IonContent>
        </IonPage>
    );
};

export default React.memo(Home);
