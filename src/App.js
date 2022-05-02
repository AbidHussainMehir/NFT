import React, { useEffect } from "react";
import ApolloClient from "apollo-boost";
// importing MyRouts where we located all of our theme
import MyRouts from "./routers/routes";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Test from "./Test";

function App() {

  return (
    <div>
          <ToastContainer/>
      <MyRouts />
      {/* <Test/> */}
    </div>
  );
}

export default App;
