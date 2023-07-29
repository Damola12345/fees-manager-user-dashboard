import './WelcomePage.css';
import { alertMessage } from '../../GlobalFunctions/GlobalFunctions';
import { Loader } from '../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import BigBtn from '../../components/BigBtn/BigBtn';
import DisplayCard from '../../components/DisplayCard/DisplayCard';
import React, { useEffect, useState } from 'react';
import CircleBar from '../../components/CircleBar/CircleBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowRightFromBracket, faBriefcase, faMoneyCheck, faBell, faUserGear } from '@fortawesome/free-solid-svg-icons';
import { logout } from '../../GlobalFunctions/GlobalFunctions';
import DisplayButton from '../../components/DisplayCard/DisplayButton';
import DisplayIcon from '../../components/DisplayCard/DisplayIcon';

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const WelcomePage = (props) => {
	
	const navigate = useNavigate();
	/* const [isLoading, setIsLoading] = useState(true);
	const [schools, setSchools] = useState([]); */

	useEffect(() => {
		/* fetch(`${BACKEND_HOST}/schools`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: "include",
		})
		.then((response) => {
			if (response.ok) {
				response.json().then((data) => {
					setTimeout(() => {
						setIsLoading(false);
						setSchools(data.success);
					}, 1000);
				})
			} else if(response.status === 401) {
				navigate('/login');
			} else {
				response.json().then((message) => {
					setTimeout(() => {
						setIsLoading(false);
						alertMessage(message.error, 'block', 'red');
					}, 1000)
				})
			}
		})
		.catch((err) => {
			setIsLoading(false);
			//alertMessage('An error occured. Please retry', 'block', 'red');
			console.log(err.message)
		}); */
	}, []);

	const boxStyle = `bg-white shadow-md h-[270px] w-[280px]
		border border-[1px] border-[whitesmoke] border-opacity-50
		flex flex-col items-center p-10 rounded-md gap-5 text-center
		hover:shadow-xl transition-all ease-in ease-out duration-300`

	return (
		<section className={`
			bg-[whitesmke] w-full text-purple
			flex flex-col items-center p-10 py-20`
		}>
			<h1 className='text-2xl font-light wrap text-center'>Welcome {props.name}!</h1>
			<div className={`
				flex flex-wrap d:flex-row gap-10 items-center justify-center w-full
				mt-20 md:mt-[70px] 2xl:mt-[100px]`
			}>
				<DisplayCard>
					<DisplayIcon>
						<FontAwesomeIcon icon={faBriefcase} size='lg' color='purple' />
					</DisplayIcon>
					<p className='text-sm'>
						Continue right where you left off!
					</p>
					<div onClick={() => {
						if (localStorage.currentSchool) navigate(`/schools/${localStorage.currentSchool}`)
						else navigate('/schools')
					}}>
						<DisplayButton>Management Console</DisplayButton>
					</div>
				</DisplayCard>
				<DisplayCard>
					<DisplayIcon>
						<FontAwesomeIcon icon={faMoneyCheck} size='lg' color='purple' />
					</DisplayIcon>
					<p className='text-sm'>
						Get a breakdown of all payments to your account.
					</p>
					<DisplayButton>View Payments</DisplayButton>
				</DisplayCard>
				<DisplayCard className='pt-20 gap-1 px-5'>		
					<div>
						<button className='
							w-[150px] h-[35px] bg-white text-[purple] text-sm rounded-md px-3
							flex flex-row gap-3 items-center justify-center mt-2 group
							border border-[1px] border-[purple] border-opacity-50'
						>
							Notifications
							<div className='group-hover:scale-[1.2]'>
								<FontAwesomeIcon icon={faBell} size='lg' className='transition-all duration-200' />
								<p className='
									absolute mt-[-25px] ml-2 bg-[red] text-white w-[13px] h-[13px] rounded-full text-[10px]
									flex items-center justify-center
								'>
									9
								</p>
							</div>
						</button>
					</div>
					<div>
						<button onClick={() => navigate('/profile')} className='
							w-[150px] h-[35px] bg-white text-[purple] text-sm rounded-md px-3
							flex flex-row gap-3 items-center justify-center mt-2 group
							border border-[1px] border-[purple] border-opacity-50'
						>
							Profile
							<FontAwesomeIcon icon={faUserGear} size='lg' className='group-hover transition-all duration-200' />
						</button>
					</div>
					<div className='self-end'>
						<button onClick={() => logout(navigate)} className='
							h-[25px] bg-[white] text-sm text-purple rounded-sm px-0
							borderborder-[1px]border-[purple]border-opacity-50 mt-10
							flex flex-row items-center justify-end hover:text-[purple] group'
						>
							<p className='hidden group-hover:block'>Logout</p>
							<FontAwesomeIcon icon={faArrowRightFromBracket} size='lg' className='group-hover:translate-x-0.5 transition-all ml-2 pr-3 duration-200' />
						</button>
					</div>
				</DisplayCard>
			</div>
			{/* <div className='2xl:hidden self-start text-2xl font-extrabold pl-20 mt-20'>More...</div> */}
			<div className='w-full mt-20 2xl:mt-[150px] md:px-20 gap-16 md:gap-0 flex flex-col md:flex-row justify-evenly items-center'>
				<div className='md:py-7 pl-10 px-10'>
					<h2 className='text-xl font-extrabold py-1'>Looking for content</h2>
					<p className='max-w-[500px] min-w-[250px]'>
						I need some content to go here to make the page look complete. It is really difficult
						to think of something right now. I am sure it will come around!
					</p>
				</div>
				<div className='hidden md:block h-[150px] border-r-[0.5px] border-r-[grey] border-opacity-50 lg:mx-10 mx-5'></div>
				<div className='w-full flex flex-row justify-center md:jusitfy-start items-center ml-10'>
					<div className='text-sm'>
						<p className='pb-5 min-w-[150px] max-w-[250px]'>100% of all fees have been paid accross all your schools.<br/></p>
						<DisplayButton light>See Breakdown</DisplayButton>
					</div>
					<div className='scale-[0.4] sm:scale-[0.6] ml-[-50px] sm:ml-0'>
						<CircleBar percentage={'100%'} />
					</div>
				</div>
			</div>
		</section>
	)
}

export default WelcomePage;
