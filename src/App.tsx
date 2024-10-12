import React from 'react';
import './App.css';
import {RootNavigation} from "./navigation";
import {HashRouter} from "react-router-dom";

export const App = () => {
  return (
    <HashRouter>
        <RootNavigation />
    </HashRouter>
  );
}

export default App;
