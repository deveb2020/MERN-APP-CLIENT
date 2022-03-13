import React, {useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../styles/createExercise.css"
import { useForm } from "react-hook-form";
import axios  from "axios"
import moment from "moment"


import { useParams } from "react-router-dom";


const EditExercise = () => {
	const { register, handleSubmit } = useForm();
	const [exercise, setExercise] = React.useState([])
	const { id } = useParams();


	useEffect(() => {
		// get one particular exercise
		axios.get('http://localhost:5000/exercises/')
		.then(res => setExercise(res.data.filter(el => el._id === id)))
	}, [id])

	const onSubmit = data => {
		const exercise = {
			username: data.username,
			description: data.description,
			duration: parseInt(data.duration),
			date: data.date
		}

		// edit one particular exercise
		axios.post('http://localhost:5000/exercises/update/'+id, exercise)
		.then(res => console.log(res.data))
		alert("Exercise updated!")
	}

	return (
		<>
			{
				exercise && exercise.map(el => (
					<form className='create_exercise' onSubmit={handleSubmit(onSubmit)} >
						<h1>Update exercise</h1>
						<div>
							<label>Username</label>
							<TextField defaultValue={el.username} fullWidth  variant="outlined"  {...register("username")}/>
						</div>
						<div>
							<label>Description</label>
							<TextField defaultValue={el.description} fullWidth variant="outlined"  {...register("description")}/>
						</div>
						<div>
							<label>Duration</label>
							<TextField defaultValue={el.duration} fullWidth variant="outlined" type="number"  {...register("duration")}/>
						</div>
						<div>
							<label>Date</label>
							<TextField defaultValue={moment(el.date).format("YYYY-MM-DD")} fullWidth variant="outlined" type="date"  {...register("date")}/>
						</div>
						<Button type='submit' variant="contained">Create exercise</Button>
					</form>
				))
			}
		</>
	);
};

export default EditExercise;