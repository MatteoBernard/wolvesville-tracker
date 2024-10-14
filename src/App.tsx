import React from 'react';
import './App.css';
import {RootNavigation} from "./navigation";
import {HashRouter} from "react-router-dom";

export const App = () => {
  return (
    <HashRouter>
        <div className={"min-h-screen flex flex-col font-sans font-medium"}>
            <RootNavigation />
        </div>
    </HashRouter>
  );
}

export default App;
