import {createContext} from 'react';

export const ContextUser = createContext({
  access_token: '',
  refresh_token: '',
  name: '',
  id: '',
  expiry: ''
});
