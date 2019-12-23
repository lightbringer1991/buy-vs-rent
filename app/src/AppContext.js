import React from 'react';

const initialData = {
  radius: 1000, // 1000 metres
};

const { Provider, Consumer } = React.createContext(initialData);

export const AppProvider = Provider;

export const AppConsumer = Consumer;
