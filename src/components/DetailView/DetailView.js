import React, { useEffect } from 'react';
import './DetailView.css';
import { Loader } from "../Loader/Loader";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PreviousIcon from '../PreviousIcon/PreviousIcon';
import SchoolDetails from './SchoolDetails';
import StudentDetails from './StudentDetails';
import ClassroomDetails from './ClassroomDetails';
import PaymentDetails from './PaymentDetails';
import FileDB from '../../FileDB/methods/DBMethods';

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
const DATABASE = process.env.REACT_APP_DATABASE;

const DetailView = (props) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [table, setTable] = useState('');
	const [fetchData, setFetchData] = useState({});

	useEffect(() => {
	  DATABASE === 'BACKEND' &&  fetch(`${BACKEND_HOST}/${props.queryObj.resource}/${props.queryObj.filter}?schoolName=${localStorage.currentSchool}`, {
		method: "GET",
		headers: {
		  'Content-Type': 'application/json',
		},
		credentials: "include",
	  })
	  .then((response) => {
		if (response.ok) { 
			response.json().then((obj) => {
			  setTimeout(() => {
				const data = obj.success;
				setFetchData(data)
				if (props.view === "school") {
					localStorage.setItem('currentSchool', data.name);
					setTable(<SchoolDetails data={data} />);
				} else if (props.view === "classroom") setTable(<ClassroomDetails data={data} />)
				  else if (props.view === "student") setTable(<StudentDetails data={data} />)
					else if (props.view === "payment") setTable(<PaymentDetails data={data} />)

				setIsLoading(false);
				//var r = document.querySelector(':root');
				//r.style.setProperty('--percentage', percentage)
			  }, 1000)
			});
		} else if(response.status === 401) {
			navigate('/login');
		} else {
			response.json().then((message) => {
				setTimeout(() => {
					setIsLoading(false);
					//alertMessage(message.error, 'block', 'red');
				}, 3000)
			})
		}
	  })
	  .catch((err) => {
		setIsLoading(false);
		//alertMessage('An error occured. Please retry', 'block', 'red');
		console.log(err.message)
	  });
		

		// Using the file database system
		let filter;
		if (props.view === 'school') filter = { name: props.queryObj.filter.replace(new RegExp('_', 'g'), ' ') }
		else if (props.view === 'classroom') filter = { name: props.queryObj.filter.replace(new RegExp('_', 'g'), ' ') }
		else if (props.view === "student") filter = { _id: props.queryObj.filter }
		else if (props.view === "payment") filter = { _id: props.queryObj.filter }

		DATABASE === 'FILE' && (
			FileDB.get(props.queryObj.resource, filter)
				.then((data) => {
					if (props.view === "school") {
						localStorage.setItem('currentSchool', data.name);
						setTable(<SchoolDetails data={data[0]} />);
					} else if (props.view === "classroom") setTable(<ClassroomDetails data={data[0]} />)
						else if (props.view === "student") setTable(<StudentDetails data={data[0]} />)
						else if (props.view === "payment") setTable(<PaymentDetails data={data[0]} />)
					setTimeout(() => {
						setIsLoading(false);
					}, 1000)
				})
		)
	}, []);

	return (
		<section className={`
			w-full bg-white
			px-5 py-10 sm:p-10 md:p-20
			flex flex-col gap-10`
		}>
			<div>
				<PreviousIcon path={-1} />
			</div>
			{isLoading ? <Loader loadingText={'Loading...'} /> : table }
		</section>
	)
}

export default DetailView