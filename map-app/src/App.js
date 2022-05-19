import InputForm from './components/InputForm';
import MapComponent from './components/MapDetails/MapComponent';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import SearchHistory from './components/SearchHistory';

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
