import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom"
import LandingPage from './components/LandingPage.jsx';
import Home from './components/Home'

function App() {
  return (
    <Router>
      <Route exact path="/" component={LandingPage} />
      <Route path="/" component={Home} />
    </Router>
  );
}

export default App;
