import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [pageSize, setPageSize] = useState(20);

    useEffect(() => {
        (async () => {
            const v = await AsyncStorage.getItem('pageSize');
            if (v) setPageSize(Number(v));
        })();
    }, []);

    const savePageSize = async (n) => {
        setPageSize(n);
        await AsyncStorage.setItem('pageSize', String(n));
    };

    return (
        <SettingsContext.Provider value={{ pageSize, savePageSize }}>
            {children}
        </SettingsContext.Provider>
    );
};