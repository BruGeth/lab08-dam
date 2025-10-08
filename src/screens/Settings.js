import React, { useContext, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { SettingsContext } from '../context/SettingsContext';

export default function Settings() {
    const { pageSize, savePageSize } = useContext(SettingsContext);
    const options = [10, 20, 50];

    return (
        <View style={{ flex:1, padding: 16 }}>
            <Text>Pokémon por página (actual: {pageSize})</Text>
            {options.map(o => (
                <View key={o} style={{ marginTop: 8 }}>
                    <Button title={`Usar ${o}`} onPress={() => savePageSize(o)} />
                </View>
            ))}
        </View>
    );
}