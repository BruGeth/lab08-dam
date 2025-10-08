import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, Button } from 'react-native';
import { fetchPokemonDetail } from '../api/pokeapi';

export default function DetallePokemon({ route, navigation }) {
    const { url, name } = route.params || {};
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const d = await fetchPokemonDetail(url || name);
                setData(d);
            } catch (e) {
                setError('No se pudo cargar');
            } finally {
                setLoading(false);
            }
        })();
    }, [url, name]);

    if (loading) return (<View style={{ flex:1, justifyContent:'center', alignItems:'center' }}><ActivityIndicator size="large" /></View>);
    if (error) return (<View style={{ flex:1, justifyContent:'center', alignItems:'center' }}><Text>{error}</Text><Button title="Reintentar" onPress={() => { setLoading(true); setError(null); setData(null); }} /></View>);

    return (
        <View style={{ flex:1, padding: 16, alignItems: 'center' }}>
            <Text style={{ fontSize: 22, fontWeight: '700' }}>{data.name}</Text>
            <Image source={{ uri: data.sprites.front_default }} style={{ width: 150, height: 150 }} />
            <Text>Altura: {data.height}</Text>
            <Text>Peso: {data.weight}</Text>
        </View>
    );
}