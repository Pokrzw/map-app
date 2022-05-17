import InputForm from './components/InputForm';
import MapComponent from './components/MapDetails/MapComponent';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/map-app' element={<InputForm/>} />
        <Route path='/results' element={<MapComponent/>} />
      </Routes>
    </Router>
  );
}

export default App;
