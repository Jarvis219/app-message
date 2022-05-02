import React from 'react';
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'Layout/Layout';
import './css/App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <React.Suspense fallback={'Loading...'}>
          <React.Fragment>
            <Routes>
              {Layout.map(({ path, element }, index) => {
                return <Route key={index} path={path} element={element} />;
              })}
            </Routes>
          </React.Fragment>
        </React.Suspense>
      </Router>
    </div>
  );
}

export default App;
