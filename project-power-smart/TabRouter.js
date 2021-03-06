import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import appliancePage from "./components/AppliancePage";
import efficientPage from "./components/EfficientPage";
import homePage from "./components/HomePage";
import dailyTipsPage from "./components/TipsPage";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import mapContainer from "./components/mapContainer";
const Tab = createBottomTabNavigator();
const screenOptions = (route, color) => {
    let iconName;

    switch (route.name) {
        case 'Home':
            iconName = 'chart';
            break;
        case 'Tips':
            iconName = 'bulb';
            break;
        case 'Appliances':
            iconName = 'printer';
            break;
        case 'Efficient':
            iconName = 'energy';
            break;
        case 'Map':
            iconName = 'map';
            break;
        default:
            break;
    }

    return <SimpleLineIcons name={iconName} color={color} size={20} />;
};
const TabNav = ({route, navigation}) => {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                headerShown : false,
                tabBarIcon: ({color}) => screenOptions(route, color),
            })}           initialRouteName="Home"
        >
            <Tab.Screen name="Home" component={homePage}  />
            <Tab.Screen name="Tips" component={dailyTipsPage} />
            <Tab.Screen name="Appliances" component={appliancePage} />
            <Tab.Screen name="Efficient" component={efficientPage} />
            <Tab.Screen name="Map" component={mapContainer} />
        </Tab.Navigator>
    );
};

export default TabNav;