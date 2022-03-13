import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../styles/createExercise.css"
import { useForm } from "react-hook-form";
import axios  from "axios"
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';


const CreateExercise = () => {
	const { register, handleSubmit } = useForm();
  const [users, setUsers] = React.useState([]);
  const [user, setUser] = React.useState("");

	useEffect(() => {
		// get all users
		axios.get('http://localhost:5000/users/')
		.then(res => setUsers(res.data))
		.catch(err => console.log("Error: " + err))
	}, [])

	const onSubmit = data => {
		const exercise = {
			username: user,
			description: data.description,
			duration: parseInt(data.duration),
			date: data.date
		}

		// create new exercise
		axios.post('http://localhost:5000/exercises/add', exercise)
		.then(res => console.log(res.data))
		alert('Exercise created!')
	}


	return (
		<form className='create_exercise' onSubmit={handleSubmit(onSubmit)} >
			<h1>Create new exercise</h1>
			<div>
				<InputLabel id="demo-simple-select-label">Username</InputLabel>
				<Select
					fullWidth
          id="demo-simple-select"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        >
					{ users.map(user => (
						<MenuItem  key={user._id} value={user.username}>{user.username}</MenuItem>
					))}
        </Select>
			</div>
			<TextField label="description" variant="outlined"  {...register("description")}/>
			<TextField label="duration" variant="outlined" type="number"  {...register("duration")}/>
			<TextField variant="outlined" type="date"  {...register("date")}/>
			<Button type='submit' variant="contained">Create exercise</Button>
		</form>
	);
};

export default CreateExercise;