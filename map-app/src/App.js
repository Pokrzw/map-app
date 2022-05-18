import InputForm from './components/InputForm';
import MapComponent from './components/MapDetails/MapComponent';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import axios from 'axios';
import SearchHistory from './components/SearchHistory';
import { useEffect, useState } from 'react';

function App() {
  
  return (
    <Router>
      <SearchHistory/>
      <Routes>    
        <Route path='/map-app' element={<InputForm/>} />
        <Route path='/results' element={<MapComponent/>} />
      </Routes>
    </Router>
  );
}

export default App;
