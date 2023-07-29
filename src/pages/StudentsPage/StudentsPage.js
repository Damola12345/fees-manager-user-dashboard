import { alertMessage } from '../../GlobalFunctions/GlobalFunctions';
import { Loader } from '../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import BigBtn from '../../components/BigBtn/BigBtn';
import React, { useState, useEffect } from 'react';
import'./StudentsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import FileDB from "../../FileDB/methods/DBMethods";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
const DATABASE = process.env.REACT_APP_DATABASE;

const StudentsPage = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [students, setStudents] = useState('');
	const [studentList, setStudentList] = useState('');
	const [classnames, setClassnames] = useState([]);
	const [searchParams] = useSearchParams();
	const [classroom] = useState(searchParams.get('classroom'));
	const [filterActive, setFilterActive] = useState(false);

	const getStudents = (classes) => {
		let uri;
		let filter = {};
		if (classroom && new Set(classes).has(classroom.replace(new RegExp('_', 'g'), ' '))) {
			uri = `${BACKEND_HOST}/students?schoolName=${localStorage.currentSchool}&classroom=${classroom}`;
			filter = { classroom: classroom };
		} else {
			uri = `${BACKEND_HOST}/students?schoolName=${localStorage.currentSchool}`
		}
		//alertMessage('', 'none', 'green');
		DATABASE === 'BACKEND' && fetch(uri, {
		method: "GET",
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: "include",
		})
		.then((response) => {
		if (response.ok) { 
			response.json().then((data) => {
				setStudents(data.success);
				setStudentList(data.success);
				setTimeout(() => {
				setIsLoading(false);
				}, 1000);
			});
		} else if(response.status === 401) {
			navigate('/login');
		} else {
			response.json().then((message) => {
				setIsLoading(false);
				//alertMessage(message.error, 'block', 'red');
			})
		}
		})
		.catch((err) => {
			setIsLoading(false);
			//alertMessage('An error occured. Please retry', 'block', 'red');
			console.log(err.message)
		});

		DATABASE === 'FILE' && (
			FileDB.get('students', filter)
				.then((data) => {
					setStudents(data);
					setStudentList(data);
					setTimeout(() => {
						setIsLoading(false);
					}, 1000)
				})
		);
	}

	useEffect(() => {
		DATABASE === 'BACKEND' && fetch(`${BACKEND_HOST}/classrooms?schoolName=${localStorage.currentSchool}`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: "include",
		})
		.then((response) => {
			console.log('backend')
			if (response.ok) { 
				response.json().then((data) => {
					const classList = data.success.sort().map((cls) => {
						return cls.name;
					})
					classList.sort();
					setClassnames(classList)
					setCheckedClassrooms(new Array(classList.length).fill(false))
					getStudents(classList);
					//setTimeout(() => {
						//setIsLoading(false);
					//}, 1000);
				});
			} else if(response.status === 401) {
				navigate('/login');
			} else {
				response.json().then((message) => {
					setIsLoading(false);
					//alertMessage(message.error, 'block', 'red');
				})
			}
		})
		.catch((err) => {
			setIsLoading(false);
			//alertMessage('An error occured. Please retry', 'block', 'red');
			console.log(err.message)
		});

		DATABASE === 'FILE' && (
			FileDB.get('classrooms', {})
				.then((data) => {
					const classList = data.sort().map((cls) => {
						return cls.name;
					})
					classList.sort();
					setClassnames(classList)
					setCheckedClassrooms(new Array(classList.length).fill(false))
					getStudents(classList)
				})
		)
	}, []);

	//const classnames = ['Primary 1', 'Primary 2', 'Primary 3', 'Primary 4', 'Primary 5', 'Primary 6'];
	const sexes = ['Male', 'Female'];
	const [checkedSex, setCheckedSex] = useState(new Array(2).fill(false));
	const [checkedClassrooms, setCheckedClassrooms] = useState([]);
	const [checkedDiscount, setCheckedDiscount] = useState(false);
	//const [searchText, setSearchText] = useState('');

	const CurrentFilters = () => {
		/* ==== Check current filters in place ==== */
		let i = 0;
		let classEmpty = true;
		let updatedStudentList = [];
		let currentStudents = [];
		for (const state of checkedClassrooms) {
			if (state) {
				classEmpty = false;
				let temp = ((students.filter((stu) => {
					return (stu.class === classnames[i]);
				})))
				updatedStudentList = updatedStudentList.concat(temp);
			}
			i++;
		}
		if (classEmpty) {
			currentStudents = students;
		}
		currentStudents = currentStudents.concat(updatedStudentList);
		return currentStudents;
	}

	const FilterClass = (position) => {
		/* ==== Filter based on classrooms ==== */
		/* Resetting other filters */
		setCheckedSex([false, false]);
		setCheckedDiscount(false);
		/* Done resetting! */
		let updatedClassState = checkedClassrooms;
		updatedClassState = checkedClassrooms.map((cls, index) => {
			return (index === position ? !cls : cls);
		});
		setCheckedClassrooms(updatedClassState)

		// Update the students
		let updatedStudentList = [];
		let classEmpty = true;
		let i = 0;
		for (const state of updatedClassState) {
			if (state) {
				classEmpty = false;
				let temp = ((students.filter((stu) => {
					return (stu.classroom === classnames[i]);
				})))
				updatedStudentList = updatedStudentList.concat(temp);
			}
			i++;
		}
		if (classEmpty) {
			setStudentList(students);
		} else {
			setStudentList(updatedStudentList);
		}
		/* ==== Done updating list based on classrooms ==== */
	}
			
	const FilterSex = (position) => {
		/* ==== Filter based on selected sex ==== */
		const currentStudents = CurrentFilters();

		// Update true, false values in array
		const updatedSexState = checkedSex.map((sex, index) => {
			return (index === position ? !sex : sex);
		})
		setCheckedSex(updatedSexState);

		// Update students based on sex
		let updatedStudentList = [];
		let sexEmpty = true;
		let i = 0;
		for (const state of updatedSexState) {
			if (state) {
				sexEmpty = false;
				let temp = ((currentStudents.filter((stu) => {
					return (stu.sex === sexes[i]);
				})))
				updatedStudentList = updatedStudentList.concat(temp);
			}
			i++;
		}
		if (sexEmpty) {
			setStudentList(currentStudents);
		} else {
			setStudentList(updatedStudentList);
		}

		/* ==== Done updating based on sex ==== */
	}

	const FilterDiscount = () => {
		/* ==== Filter based on discounted fees ==== */
		const currentStudents = CurrentFilters();

		// Uncheck other boxes except class boxes
		setCheckedSex([false, false]);

		const currentDiscount = !checkedDiscount;
		setCheckedDiscount(currentDiscount);

		// Update students based on applied discounts    
		if (currentDiscount) {
			const updatedStudentList = ((currentStudents.filter((stu) => {
				return (stu.discount > 0);
			})))
			setStudentList(updatedStudentList);
		} else {
			setStudentList(currentStudents);
		}  
	}

	const SearchStudent = (event) => {
		//setSearchText(event.target.value);

		// Reset checkboxes
		setCheckedDiscount(false);
		setCheckedSex([false, false]);
		const resetClass = new Array(classnames.length).fill(false);
		setCheckedClassrooms(resetClass);
		if (event.target.value.length > 0) {
			const currentStudents = students.filter((stu) => {
				return (stu.fullname.toLowerCase().includes(event.target.value));
			})
			setStudentList(currentStudents);
		}
		else {
			setStudentList(students);
		}
	}

	const ClassFilterComponent = () => {
		//console.log(new Set(classnames).has(classroom))
		if (classroom && new Set(classnames).has(classroom.replace(new RegExp('_', 'g'), ' '))) {
			return <div></div>
		}
		return (
			<div className='bg-[whitesmoke] py-5 pl-5 pr-10 rounded-lg'>
				<p className='font-bold pb-2'>Classroom</p>
				<div>
					{
						classnames.map((cls, index) => {
							const checkValue = checkedClassrooms[index];
							return(
								<div className='w-full flex flex-row items-center' key={cls}>
									<input
										type="checkbox"
										id={index}
										value={cls}
										checked={checkValue}
										onChange={() => FilterClass(classnames.indexOf(cls))}
										className='h-10'
									>
									</input>
									<label className='text-sm nowrap'>{cls}</label>
									<br/>
								</div>
							);
						})
					}
				</div>
			</div>
		)
	}

	const SexFilterComponent = () => {
		return (
			<div className='bg-[whitesmoke] py-5 pl-5 pr-10 mb-5 rounded-lg'>
				<p className='font-bold pb-2'>Sex</p>
				<input type="checkbox" id="male" value="male" className='h-10' checked={checkedSex[0]} onChange={() => FilterSex(0)}></input>
				<label className='text-sm nowrap'>M</label>
				<br/>
				<input type="checkbox" id="female" value="female" className='h-10' checked={checkedSex[1]} onChange={() => FilterSex(1)}></input>
				<label className='text-sm nowrap'>F</label>
				<br/>
			</div>
		)
	}

	return (
		<section className='relative flex flex-col items-center'>
			<div className='w-full sticky top-[60px] bg-white z-[99999] border-opacity-20 border-[grey] border-t-[0.5px]'>
				<div className='w-full
					flex flex-col items-start justify-between z-[99999999]
					stickytop-[90px] w-full bg-white px-5 md:px-14 py-3
					border-opacity-20 border-[grey] border-b-[0.5px]'
				>
					<div className='w-full flex flex-row justify-between'>
						<div className='flex flex-row items-center'>
							<div
								className='w-full flex flex-row items-end' onClick={() => setFilterActive(!filterActive)}
							>
								<FontAwesomeIcon icon={faFilter} size='lg' className='text-[purple]' />
								<FontAwesomeIcon icon={filterActive ? faCaretRight : faCaretDown} className='text-[purple]' />
							</div>
							<input type="text"
								placeholder='Search student' 
								className='hidden md:flex h-7 focus:outline-[purple] border-[0.5px] border-opacity-20 border-[grey] border-b-[0.5px] rounded-sm '
								onChange={SearchStudent}
							/>
						</div>
						<div onClick={() => {
							navigate("/register-student");
						}}>
							<button className='px-3 py-1 bg-[purple] text-white text-sm rounded-[3px]'>
								Register Student
							</button>
							{/* <BigBtn id='reg-btn' color="white" bcolor="purple" text="Register Student" grid/> */}
						</div>
					</div>
					<div className={`${filterActive ? 'flex' : 'hidden'} flex-col gap-5`}>
						<div className={`
							w-full flex flex-row items-start justify-start gap-5 md:gap-10 mt-5`
						}>
							<ClassFilterComponent />
							<SexFilterComponent />
						</div>
						<input type="text"
							placeholder='Search student' 
							className='md:hidden flex h-7 focus:outline-[purple] border-[0.5px] border-opacity-20 border-[grey] border-b-[0.5px] rounded-sm '
							onChange={SearchStudent}
						/>
					</div>
				</div>
			</div>
			{/* <div className='relative w-full flex flex-col items-center'> */}
			<div className='sticky top-[120px] flex flex-row mt-20 py-2 w-[95%] bg-white
				border-[grey] border-[0.5px] border-opacity-20 mx-5 px-2 shadow-md'>
				<ScrollOption
					one={'Name'}
					two={'Class'}
					three={'Fees paid'}
					four={'Discount'}
					five={'Sex'}
					header={true}
				/>
			</div>
			{/* </div> */}
			{/* <div id="login-signup-msg">
				<h5 id="err-msg"></h5>
			</div> */}
			<div className='w-[95%] mx-2 px-2 border-opacity-10 border-[grey]
				border-[0.5px]'
			>
				{
					isLoading ? <Loader loadingText={'Loading...'} /> :
					studentList ? studentList.map((stu) => {
						return (
							<div key={stu._id} onClick={() => {
								console.log(stu)
								navigate(`/students/${String(stu._id)}`)
							}}>
								<ScrollOption
									key={stu._id}
									one={stu.fullname}
									two={stu.classroom}
									three={stu.totalPaidFees}
									four={stu.discount}
									five={stu.sex}
									header={false}
								/>
							</div>
						);
					}) : <div></div>
				}
			</div>
			<div className='h-[2000px]'></div>
		</section>
	)
}

export const FeesFilter = () => {
	//const percentages = ["0 - 25", "26 - 50", "51 - 75", "76 - 100", "> 100" ]
	return (
		<div className="filter-component" id="FeesFilter">
			<div className="filter-option"><p>..Fees percentage</p></div>
			<input type="number" max="100" maxLength="3" className="filter-input" placeholder="min" id="min-percent"></input>
			<input type="number" max="100" maxLength="3" className="filter-input" placeholder="max" id="max-percent"></input>
		</div>
	)
}

export const ScrollOption = (props) => {
	const headerStyle = `font-extrabold text-sm flex flex-row justify-star`
	const rowStyle = `overflow-x-ellipsis truncate
		nowrap text-sm h-12 border-b-[0.5px] flex flex-row items-center
		border-opacity-20 border-[grey] cursor-pointer `

	return (
		<div className='w-full flex flex-row items-center justify-between'>
			<div className={`w-[5%] pl-5 md:pl-10 bg-[green`}>
				<div className={`${props.header ? 'hidden' : 'flex'} h-2 w-2 rounded-full bg-[purple]`}></div>
			</div>
			<div className={`${props.header ? headerStyle : rowStyle} w-[65%] md:[30%] pl-5 md:pl-10 bg-[green`}>{props.one}</div>
			<div className={`${props.header ? headerStyle : rowStyle} w-[30%] md:[20%] bg-[grey`}>{props.two}</div>
			<div className={`${props.header ? headerStyle : rowStyle} w-[15%] hidden md:flex bg-[blue`}>{props.three}</div>
			<div className={`${props.header ? headerStyle : rowStyle} w-[15%] hidden lg:flex bg-[pink`}>{props.four}</div>
			<div className={`${props.header ? headerStyle : rowStyle} w-[15%] hidden lg:flex pr-5 md:pr-10 bg-[red`}>{props.five}</div>
		</div>
	)
}

export default StudentsPage;

// #3BB75E