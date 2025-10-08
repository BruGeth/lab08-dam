import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import DetallePokemon from './src/screens/DetallePokemon';
import Settings from './src/screens/Settings';
import { SettingsProvider } from './src/context/SettingsContext';

const Stack = createStackNavigator();

export default function App() {
    return (
        <SettingsProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Detalle" component={DetallePokemon} />
                    <Stack.Screen name="Settings" component={Settings} />
                </Stack.Navigator>
            </NavigationContainer>
        </SettingsProvider>
    );
}