import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";

import AV from 'leancloud-storage';

import logo from './logo.svg';
import './App.css';
import Home from './components/home/Home.js';
import Detail from './components/details/Detail.js';
import NewsList from './components/list/NewsList.js';
// import Home from './components/home/Home.js';

AV.init({
  appId: "Li68w4wITBEDquTBycaXb71i-gzGzoHsz",
  appKey: "DSepGH5ujdQnIYdEnLKQKvYS",
  serverURL: "https://li68w4wi.lc-cn-n1-shared.com"
});

function App() {
  return (
    <div className="App">
      {/* <Home/> */}
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route exact path="/list" component={NewsList} />
          <Route exact path="/detail/:id" component={Detail} />
        </div>
      </Router>
    </div>
  );
}

export default App;
