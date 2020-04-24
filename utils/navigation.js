import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack";
import MainMenu from "./components/MainMenu";
import MovieDetail from "./components/MovieDetail";

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
                    component={MainMenu} />
                <Stack.Screen
                    name="Details"
                    options={
                        {
                            title: 'Movie detail'
                        }
                    }
                    component={MovieDetail} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
