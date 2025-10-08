import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { fetchPokemonDetail } from '../api/pokeapi';

export default function PokemonItem({ item, onPress }) {
    const [sprite, setSprite] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const d = await fetchPokemonDetail(item.url);
                if (mounted) setSprite(d.sprites?.front_default || null);
            } catch (e) {
                // ignore sprite error
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => { mounted = false; };
    }, [item.url]);

    return (
        <TouchableOpacity onPress={() => onPress(item)} style={{ flexDirection: 'row', padding: 12, alignItems: 'center' }}>
            {loading ? <ActivityIndicator size="small" style={{ width: 40, height: 40 }} /> :
                <Image source={sprite ? { uri: sprite } : require('../../assets/placeholder.png')} style={{ width: 40, height: 40, marginRight: 12 }} />}
            <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '600' }}>{item.name}</Text>
                <Text style={{ color: '#666', fontSize: 12 }}>{item.url}</Text>
            </View>
        </TouchableOpacity>
    );
}