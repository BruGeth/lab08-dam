import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, Text, FlatList, ActivityIndicator, Button, RefreshControl, TextInput } from 'react-native';
import { fetchPokemonList } from '../api/pokeapi';
import PokemonItem from '../components/PokemonItem';
import { SettingsContext } from '../context/SettingsContext';

export default function Home({ navigation }) {
    const { pageSize } = useContext(SettingsContext);
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(0);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);
    const [count, setCount] = useState(0);
    const [query, setQuery] = useState('');

    const load = useCallback(async (reset = false) => {
        try {
            if (reset) {
                setLoadingInitial(true);
                setOffset(0);
            } else {
                setLoadingMore(true);
            }
            setError(null);
            const currentOffset = reset ? 0 : offset;
            const json = await fetchPokemonList(pageSize, currentOffset);
            setCount(json.count);
            const newResults = json.results || [];
            setData(prev => reset ? newResults : [...prev, ...newResults]);
            setOffset(currentOffset + pageSize);
        } catch (e) {
            setError(e.message || 'Error');
        } finally {
            setLoadingInitial(false);
            setLoadingMore(false);
            setRefreshing(false);
        }
    }, [offset, pageSize]);

    useEffect(() => {
        load(true);
    }, [pageSize]);

    const handleRefresh = () => {
        setRefreshing(true);
        load(true);
    };

    const handleLoadMore = () => {
        if (loadingMore || loadingInitial || data.length >= count) return;
        load(false);
    };

    const filtered = query ? data.filter(p => p.name.includes(query.toLowerCase())) : data;

    if (loadingInitial && data.length === 0) {
        return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
        </View>);
    }

    if (error && data.length === 0) {
        return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Text>Error: {error}</Text>
            <Button title="Reintentar" onPress={() => load(true)} />
        </View>);
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ padding: 8 }}>
                <TextInput placeholder="Buscar por nombre..." value={query} onChangeText={setQuery} style={{ borderWidth: 1, borderRadius: 6, padding: 8 }} />
            </View>
            <FlatList
                data={filtered}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => <PokemonItem item={item} onPress={(it) => navigation.navigate('Detalle', { url: it.url, name: it.name })} />}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.4}
                ListFooterComponent={() => (
                    <View style={{ padding: 12, alignItems: 'center' }}>
                        {loadingMore ? <ActivityIndicator size="small" /> : null}
                        <Text>{`Cargados: ${data.length}`}</Text>
                    </View>
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                initialNumToRender={10}
                getItemLayout={(data, index) => ({ length: 64, offset: 64 * index, index })}
            />
            <View style={{ position: 'absolute', right: 12, bottom: 12 }}>
                <Button title="Settings" onPress={() => navigation.navigate('Settings')} />
            </View>
        </View>
    );
}