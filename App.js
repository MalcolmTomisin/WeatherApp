import React from 'react';
import {ActivityIndicator} from 'react-native';
import Navigation from './navigation';
import { Provider } from "react-redux";
import store, { persistor } from './redux/store';
import useCachedResources from "./hooks/useCachedResources";
import { PersistGate } from "redux-persist/integration/react";

const App: () => React$Node = () => {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  }
  
  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator size="large" color="blue" />}
        persistor={persistor}
      >
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
