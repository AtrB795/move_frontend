import './App.css';
import {WorkoutExplorer} from "./Workout";

import data from './data.json';


function App() {
  return (<WorkoutExplorer sessionData={data}></WorkoutExplorer>);
}

export default App;
