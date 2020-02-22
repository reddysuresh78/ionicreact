
import React, { useRef, useEffect, useState } from 'react';

import { IonContent, IonPage, IonHeader, IonToolbar, IonButton, IonLabel, IonGrid, IonRow, IonCol, IonDatetime, IonInput, IonTitle } from '@ionic/react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByPlaceId, getLatLng } from 'react-google-places-autocomplete';
import { Capacitor } from '@capacitor/core';

import 'react-google-places-autocomplete/dist/assets/index.css';
import './DataCapture.css';
import axios from 'axios';

import { Plugins } from '@capacitor/core';

// class RaasiChakra extends Component<{},{}> {
const DataCapture: React.FC = (props: any) => {
    const [serverData, setServerData] = useState(null);
    const [locData, setLocData] = useState({ longitude: 0, latitude: 0, address: '' });
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");
    const { StatusBar } = Plugins;

    useEffect(() => {
        resetAll();
        // makePostRequest();
    }, []);
    useEffect(() => {
        if (serverData != null) {
            // console.log('useeffect called with state ', serverData);
            props.history.push({ pathname: '/npl', state: serverData });
        }
    }, [serverData]);
    //https://6xdsi8hkl5.execute-api.us-east-1.amazonaws.com/dev/hello
    let makePostRequest = async () => {
        console.log('serverless is called');
        await axios.get<any>('http://localhost:3000/')
            .then(response => {
                // console.log('Before setting data ', response.data.input.NPL);
                setServerData(response.data.input.NPL);

                // this.setState( { loadedPost: response.data } );
                return;
            });
    }

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


    let getLatLang = (val: any) => {
        console.log(val.place_id);
        geocodeByPlaceId(val.place_id)
            .then((results: any) => getLatLng(results[0]))
            .then((latlng: any) =>
                console.log('Successfully got latitude and longitude', latlng.lat, latlng.lng)
            );

    }

    let getNPL = async (e: any) => {
        console.log('getNPL Called');
        e.preventDefault();
        await makePostRequest();
        // console.log('Response frm getnpl ', serverData);
        // let data = {
        //     date: '12-05-2019',
        //     time: '05:30',
        //     place: 'Hyderabad'
        // };


    }

    const slideOpts = {
        initialSlide: 0,
        speed: 10
    };

    const dateRef = useRef<HTMLIonDatetimeElement>(null);
    const timeRef = useRef<HTMLIonDatetimeElement>(null);
    const placeRef = useRef<HTMLIonInputElement>(null);

    const placeStyle = {

        marginLeft: 10
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
                        <IonCol class="label-align" sizeLg="6" sizeSm="4" sizeMd="4" size="4">
                            <IonLabel >Time</IonLabel>
                        </IonCol>
                        <IonCol>
                            <IonDatetime placeholder="Time" ref={timeRef} value={selectedTime} displayFormat="h:mm A" pickerFormat="h:mm A" >Time</IonDatetime>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol class="label-align" sizeLg="6" sizeSm="4" sizeMd="4" size="4">
                            <IonLabel  >Place</IonLabel>
                        </IonCol>
                        <IonCol >
                            <IonInput class="input-align" ref={placeRef} value={locData.address} />
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol class="label-align" sizeLg="6" sizeSm="4" sizeMd="4" size="4">
                            <IonLabel >Select Place</IonLabel>
                        </IonCol>
                        <IonCol>

                            <GooglePlacesAutocomplete inputStyle={placeStyle} onSelect={(val: any) => getLatLang(val)} />

                        </IonCol>
                    </IonRow>

                    <IonRow>
                        <IonCol class="label-align" sizeLg="6" sizeSm="4" sizeMd="4" size="4">
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

export default React.memo(DataCapture);
