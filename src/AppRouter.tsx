import * as React from "react";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Navigate,
  Routes,
} from "react-router-dom";

import Home from "./pages/Home";

export const AppRouter = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <Router>
              <>
                <Routes>
                  <Route path="/" element={<Home />}></Route>
                </Routes>
              </>
            </Router>
          </div>
        </div>
      </div>
    </>
  );
};
