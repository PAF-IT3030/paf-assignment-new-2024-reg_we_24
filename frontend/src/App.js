import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./layout/Navbar";
import Mealplans from "./pages/Mealplan/Mealplans";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddMealplan from "./pages/Mealplan/AddMealplan";
import EditMealplan from "./pages/Mealplan/EditMealplan";
import ViewMealplan from "./pages/Mealplan/ViewMealplan";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/mealplans" element={<Mealplans />} />
          <Route exact path="/addmealplan" element={<AddMealplan />} />
          <Route exact path="/editmealplan/:id" element={<EditMealplan />} />
          <Route exact path="/viewmealplan/:id" element={<ViewMealplan />} />
          {/* coment */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
