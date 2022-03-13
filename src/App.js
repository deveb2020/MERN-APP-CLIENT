import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateExercise from "./components/createExercise";
import CreateUser from "./components/createUser";
import EditExercise from "./components/editExercise";
import ExercisesList from "./components/exercisesList";
import Navbar from "./components/navbar";

const App = () => {
  return (
    <BrowserRouter>
			<Navbar/>
			<Routes>
				<Route path="/" element={<ExercisesList/>} />
      	<Route path="/edit/:id" element={<EditExercise/>} />
				<Route path="/create" element={<CreateExercise/>} />
      	<Route path="/user" element={<CreateUser/>} />
			</Routes>
    </BrowserRouter>
  );
}

export default App;
