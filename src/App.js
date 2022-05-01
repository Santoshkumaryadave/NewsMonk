import "./App.css";
import NavBar from "./component/NavBar";
import React from "react";
import News from "./component/News";
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

 const App =()=> {
 const pageSize = 6;

    return (
      <div>
        
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route
              path="/"
              element={
                <News
                  key="general"
                  pageSize={pageSize}
                  country="in"
                  category="general"
                />
              }
            />
            <Route
              path="entertainment"
              element={
                <News
                  key="entertainment"
                  pageSize={pageSize}
                  country="in"
                  category="entertainment"
                />
              }
            />
            <Route
              path="/business"
              element={
                <News
                  key="business"
                  pageSize={pageSize}
                  country="in"
                  category="business"
                />
              }
            />
            <Route
              path="/health"
              element={
                <News
                  key="health"
                  pageSize={pageSize}
                  country="in"
                  category="health"
                />
              }
            />
            <Route
              path="/science"
              element={
                <News
                  key="science"
                  pageSize={pageSize}
                  country="in"
                  category="science"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  key="sports"
                  pageSize={pageSize}
                  country="in"
                  category="sports"
                />
              }
            />
            <Route
              path="/technology"
              element={
                <News
                  key="technology"
                  pageSize={pageSize}
                  country="in"
                  category="technology"
                />
              }
            />
          </Routes>
        </BrowserRouter>
      
      </div>
    );
  
}

export default App;