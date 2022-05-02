import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./app/store";


let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <MoralisProvider initializeOnMount={true}
          serverUrl="https://liv6ukm6ikwr.usemoralis.com:2053/server" appId="xWjNPcmYmgTF4bwFY6qhn8jMekYtoJIIs1T3aATG">
          <App />
        </MoralisProvider>

      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
