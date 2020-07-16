import {createContext} from 'react';

export const ContextUser = createContext({token: '', name: '', expiry: ''});
