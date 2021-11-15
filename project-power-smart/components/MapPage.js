import {Alert, Modal, Text, View, Pressable, StyleSheet} from "react-native";
import React, { useState , useEffect } from "react";
import styles from "../StyleSheets/AppStyling"
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/FontAwesome5';
import mapStyles from '../StyleSheets/mapStyles'

const renewableEnergyAreas = [
    {minLatitude : 20, maxLatitude : 40, minLongitude : -100, maxLongitude : -70}
]

function mapPage({navigation}) {
    const [latitude, setLatitude] = useState(0.0)
    const [longitude, setLongitude] = useState(0.0)
    const [located, setLocated] = useState(0)
    const [isRenewable, setIsRenewable] = useState(false);

    useEffect(() => {
        getLocation()
    })

    async function getLocation() {

        let location = await Location.getCurrentPositionAsync({})
        let latitude_ = location.coords.latitude
        let longitude_ = location.coords.longitude
        let altitude = location.coords.altitude

        setLatitude(latitude_)
        setLongitude(longitude_)
        checkIfRenewable();
        console.log("Latitude: " + latitude + " Longitude: " + longitude + " Altitude: " + altitude)
        let x = located;
        setLocated(++x);

    }

    function checkIfRenewable() {
        for (let i = 0; i < renewableEnergyAreas.length; i++) {
            //console.log(latitude);
            let lat = (renewableEnergyAreas[i].minLatitude < latitude) && (renewableEnergyAreas[i].maxLatitude > latitude);
            let lon = (renewableEnergyAreas[i].minLongitude < longitude) && (renewableEnergyAreas[i].maxLongitude > longitude);

            //console.log(lat);
            if (lat && lon) {
                setIsRenewable(true);
            }
        }
    }

    return (
        <View style={styles.container}>
            {!(located > 1) && <Text>Loading...</Text>}
            {(located > 1) &&
            <View style={styles.container}>
                <Text style={mapStyles.titleText}>Map Page</Text>
                {isRenewable ?
                    <View style={{width: 300, justifyContent: "center", alignItems: "center"}}>
                        <Text style={mapStyles.paragraph}>Based on your current location,
                            it would be optimal to use renewable energy resources</Text>
                        <Text style = {mapStyles.descriptionHeader}>Some examples include:</Text>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flexDirection: 'column'}}>
                                <Icon style={mapStyles.icon} size={30} color={"gray"}
                                      name={"solar-panel"}/>
                                <Icon style={mapStyles.icon} size={30} color={"green"}
                                      name={"leaf"}/>
                                <Icon style={mapStyles.icon} size={30} color={"white"}
                                      name={"wind"}/>
                                <Icon style={mapStyles.icon} size={30} color={"blue"}
                                      name={"water"}/>
                            </View>
                            <View style={{flexDirection: 'column'}}>
                                <Text style={mapStyles.text}>Solar Panels</Text>
                                <Text style={mapStyles.text}>Biomass</Text>
                                <Text style={mapStyles.text}>Wind</Text>
                                <Text style={mapStyles.text}>Hydropower</Text>
                            </View>
                        </View>

                    </View> :
                    <Text>it would not be optimal to use renewable energy resources.</Text>}
                <Pressable style = {mapStyles.button}onPress={() => navigation.navigate('Location', {
                    located: located,
                    latitude: latitude,
                    longitude: longitude
                })}>
                    <Text style = {mapStyles.textButton}>Show My Location</Text>
                    <Icon style = {{marginLeft : 8}} size={20} color={"black"} name={"compass"}/>
                </Pressable>
            </View>
            }
        </View>

    );
}
export default mapPage;
