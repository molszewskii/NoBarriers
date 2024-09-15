import React from 'react';
import { createContext } from 'react';
const ItemsContext = createContext({
    items: [],
    setItems: ()=>{},
    modeName: '',
    setModeName: ()=>{}
});

export default ItemsContext;
