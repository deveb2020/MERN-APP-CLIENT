import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "../styles/createExercise.css"
import { useForm } from "react-hook-form";
import axios  from "axios"

const CreateUser = () => {
	const { register, handleSubmit } = useForm();
 
	const onSubmit = data => {
		
		const user = { username: data.username }

		axios.post('http://localhost:5000/users/add', user)
		.then(res => console.log(res.data))
		alert("User created!")
	}


	return (
		<form className='create_exercise' onSubmit={handleSubmit(onSubmit)} >
			<h1>Create new user</h1>
			<TextField label="username" variant="outlined"  {...register("username")}/>
			<Button type='submit' variant="contained">Create user</Button>
		</form>
	);
};

export default CreateUser;