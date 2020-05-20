import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import MainMenu from "./components/MainMenu";
import TrackDetail from "./components/TrackDetail";

const Stack = createStackNavigator();

export function Main() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    options={
                        {
                            title: 'Home'
                        }
                    }
                    component={MainMenu}/>
                <Stack.Screen
                    name="Details"
                    options={
                        {
                            title: 'Track detail'
                        }
                    }
                    component={TrackDetail}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
