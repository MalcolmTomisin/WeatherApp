import React from 'react';
import Navigation from './navigation';
import { Provider } from "react-redux";
import store from './redux/store';

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
