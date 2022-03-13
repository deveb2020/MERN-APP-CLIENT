import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/exercisesList.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Link } from 'react-router-dom';
import moment from "moment"
import EditIcon from '@mui/icons-material/Edit';

const ExercisesList = () => {
	const [exercises, setExercises] = useState([])

	useEffect(() => {
		// get all exercises
		axios.get('http://localhost:5000/exercises/')
		.then(res => setExercises(res.data))
	}, [])

	const handleDelete = (id) => {
		// delete exercise
		axios.delete('http://localhost:5000/exercises/'+id)
		.then(res => alert("Exercise delted!"))
		.catch(err => console.log("Error: " + err ))
		
		// remove from the list the deleted exercise
		setExercises(exercises.filter(el => el._id !== id))
	}

	return (
		<div className='exercises_list'> 
				<h2>List of exercises</h2>
				<div className='exercise_card_header'>
					<p>Username</p>
					<p>Description</p>
					<p>Duration</p>
					<p>Date</p>
					<p>Actions</p>
				</div>
			{exercises.map(exercise => (
				<div key={exercise._id} className='exercise_card'>
					<p><b>{exercise.username}</b></p>
					<p>{exercise.description}</p>
					<p>{exercise.duration}</p>
					<p>{moment(exercise.date ).format("DD-MM-YYYY")}</p>
					<div>
						<Link to={`/edit/${exercise._id}`}><EditIcon/></Link>
						<button onClick={() => handleDelete(exercise._id)}><DeleteForeverIcon/></button>
					</div>
				</div>
			))}
		</div>
	);
};

export default ExercisesList;