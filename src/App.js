import './App.css';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditUser from './users/EditUser';
import ViewUser from "./users/ViewUser";
import Check from './users/Check';
import AddWorkout from './users/AddWorkout';
import WorkOutHome from './pages/WorkoutHome';
import Navbar from './layouts/Navbar';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>

        <Routes>
          <Route exact path="/" element={<WorkOutHome/>} />
          <Route exact path="/adduser" element={<AddWorkout/>} />
          <Route exact path="/edituser/:id" element={<EditUser/>}/>
          <Route exact path="/viewuser/:id" element={<ViewUser />} />
          <Route exact path="/check" element={<Check />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
