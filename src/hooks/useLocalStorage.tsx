import { useState, useEffect } from "react";

const LOCAL_STORAGE_PREFIX = "swapit-";

const getOrCreateLocalStorage = (key: string, initialValue: any) => {
    const data = localStorage.getItem(key);
    if(!data || initialValue) localStorage.setItem(key, JSON.stringify(initialValue) || '{}');
    return JSON.parse(localStorage.getItem(key) || '{}');
}

export const deleteLocalStorage = (key: string) => localStorage.removeItem(LOCAL_STORAGE_PREFIX + key);


export function useLocalStorage(key: string, initialValue?: {}){
    const storageKey = `${LOCAL_STORAGE_PREFIX}${key}`;
    const localStorageData = getOrCreateLocalStorage(storageKey, initialValue)
    const [storageValue, setStorageValue] = useState(localStorageData);
    
    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(storageValue));
    }, [storageValue])

    return [storageValue, setStorageValue]
}