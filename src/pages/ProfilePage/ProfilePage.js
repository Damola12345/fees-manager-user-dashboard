import './ProfilePage.css';
import { alertMessage } from "../../GlobalFunctions/GlobalFunctions";
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loader } from '../../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import BigBtn from '../../components/BigBtn/BigBtn';
//const sha1 = require('sha1');

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const ProfilePage = () => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	//const [classrooms, setClassrooms] = useState([]);
	const [user] = useState(JSON.parse(localStorage.user));
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [phone, setPhone] = useState('');
	//const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [save, setSave] = useState(false);
	const [oldPwd, setOldPwd] = useState('');
	const [newPwd, setNewPwd] = useState('');
	const [samePwd, setSamePwd] = useState('');
	const [pwdSave, setPwdSave] = useState(false);
	const [info, setInfo] = useState({});
	let editForm;

	useEffect(() => {
		setFirstname(user.firstname);
		setLastname(user.lastname);
		setPhone(user.phone);
		//setEmail(user.email);
	},[]);

	useEffect(() => {
		if (!isLoading) {
			const p1 = document.getElementById("input-new-pwd");
			const p2 = document.getElementById("input-same-pwd");
			const errMsg = document.getElementById('err');
			(samePwd && newPwd) && (samePwd === newPwd) && p2 ? p2.style.borderColor = 'green' : p2.style.borderColor = 'red';
			!samePwd && p2 ? p2.style.borderColor = 'gray' : console.log();
			(oldPwd && newPwd) && (oldPwd === newPwd) && p1 ? p1.style.borderColor = 'red' : p1.style.borderColor = 'gray';
			(oldPwd && newPwd) && (oldPwd === newPwd) && errMsg ? errMsg.innerText = 'Old and new password can\'t be the same!' : errMsg.innerText = '';
			(oldPwd && newPwd) && (oldPwd === newPwd) && errMsg ? errMsg.style.display = 'block' : errMsg.style.display = 'none';
		}
		setTimeout(() => {
			setIsLoading(false)
		}, 1000);
	}, [samePwd, newPwd, oldPwd])

	editForm =
		<div>
			<div id='input-pair'>
				<h4 className='input-txt' >Fullname:</h4>
				<div className='edit-input'>
					<input type={'text'} defaultValue={user.firstname} name='Firstname' onChange={(event) => {setFirstname(event.target.value); alertMessage()}}></input>
				</div>
				<div className='edit-input'>
					<input type='text' defaultValue={user.lastname} name='Lastname' onChange={(event) => {setLastname(event.target.value); alertMessage()}}></input>
				</div>
			</div>
			<div id='input-single'>
				<h4 className='input-txt'>Phone:</h4>
				<div className='edit-input'>
					<input id='input-phone' type='text' defaultValue={user.phone} name='phone' onChange={(event) => {setPhone(event.target.value); alertMessage()}}></input>
				</div>
			</div>
			<div id='input-single'>
				<h4 className='input-txt'>Email:</h4>
				<div className='edit-input'>
					<input id='input-phone' className='immutable' type='text' defaultValue={user.email} name='phone' readOnly ></input>
				</div>
			</div>
			<div id='input-single' >
				<h4 className='input-txt' >user ID:</h4>
				<div className='edit-input'>
					<input id='input-id' className='immutable' type='text' value={user._id} name='id' readOnly ></input>
				</div>
			</div>
			<div id='input-single'>
				<h4 className='input-txt'>Password:</h4>
				<button className='change-pwd-btn' onClick={() => {
					alertMessage();
					setPwdSave(true);
					setSave(true);
				}}>
					Change password
				</button>
			</div>
		</div>

	const saveEdit = () => {
		if (user.firstname !== firstname) info.firstname = firstname;
		if (user.lastname !== lastname) info.lastname = lastname;
		if (user.phone !== phone) info.phone = phone;
		
		if (Object.keys(info).length > 0) {
			alertMessage();
			setSave(true);
		} else {
			alertMessage('No changes made. your profile is up to date!', 'block', 'green');
		}
	}

	const cancelSave = () => {
		setSave(false);
		alertMessage();
		setInfo({});
		setFirstname(user.firstname);
		setLastname(user.lastname);
		setPhone(user.phone);
		//setEmail(user.email);
	}

	const editUser = (event, editPassword=false) => {
		let move = false;
		if (editPassword) {
			if (samePwd != newPwd) {
				alertMessage('Passwords don\'t match', 'block', 'red');
				move = false;
			} else {
				info.oldPwd = oldPwd;
				info.newPwd = newPwd;
				move = true;
			}
		} else {
			info.password = password;
			move = true;
		}
		
		if (move) {
			setIsLoading(true);
			fetch(`${BACKEND_HOST}/users/${user._id}/edit`, {
				method: "PUT",
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: "include",
				body: JSON.stringify(info),
			})
			.then((response) => {
				if (response.ok) { 
					response.json().then((data) => {
						setTimeout(() => {
							if (!editPassword) {
								localStorage.setItem('user', JSON.stringify(data.success));
							}
							setIsLoading(false);
							setSave(false);
							alertMessage('Your profile has been updated successfully!', 'block', 'green');
						}, 1000)
					});
				} else if(response.status === 401) {
					navigate('/login');
				} else {
					response.json().then((message) => {
						setIsLoading(false);
						setOldPwd('');
						setNewPwd('');
						setSamePwd('');
						alertMessage(message.error, 'block', 'red');
					})
				}
			})
			.catch((err) => {
				setIsLoading(false);
				setSave(false)
				cancelSave();
				alertMessage('An error occured. Please retry', 'block', 'red');
				console.log(err.message)
			});
		}
	}

	const editUserPassword = (event) => {
		event.preventDefault();
		editUser(event, true);
	}

	const saveForm = 
		<form id='save-form' onSubmit={editUser}>
			<div id="input-single">
				<input className='immutable' value={lastname} readOnly></input>
			</div>
			<div id="input-single">
				<input className='immutable' value={firstname} readOnly></input>
			</div>
			<div id="input-single">
				<input className='immutable' value={`${phone}`} readOnly></input>
			</div>
			<div id="input-single">
				<input placeholder='Password' type={'password'} required onChange={(event) => setPassword(event.target.value)}></input>
			</div>
			<div id='final-buttons'>
				<button className='checkout-btns' onClick={() => cancelSave()}>Cancel</button>
				<button type='submit' className='checkout-btns' id='confirm-btn'>Confirm</button>
			</div>
		</form>

	const changePwd =
		<form id='save-pwd' onSubmit={(event) => editUserPassword(event)}>
			<div id='input-single'>
				<h4 className='input-txt-2'>Old password:</h4>
				<div className='edit-input'>
					<input id='input-old-pwd' type='password' name='old-pwd' onChange={(event) => {setOldPwd(event.target.value); alertMessage()}} required></input>
				</div>
			</div>
			<div id='input-single'>
				<h4 className='input-txt-2'>New password:</h4>
				<div className='edit-input'>
					<input id='input-new-pwd' type='password' name='new-pwd' onChange={(event) => {setNewPwd(event.target.value); alertMessage()}} required></input>
				</div>
			</div>
			<div id='input-single' >
				<h4 className='input-txt-2' >Confirm password:</h4>
				<div className='edit-input'>
					<input id='input-same-pwd' type='password' name='same-pwd' onChange={(event) => {setSamePwd(event.target.value); alertMessage()}} required></input>
				</div>
			</div>
			<div id='final-buttons'>
				<button className='checkout-btns' onClick={() => {
					setSave(false);
					setPwdSave(false);
					setOldPwd('');
					setNewPwd('');
					setSamePwd('');
				}}>
					Cancel
				</button>
				<button type='submit' className='checkout-btns' id='confirm-btn'>Confirm</button>
			</div>
		</form>

	return (
		<div id='profile-con'>
			<div id='nav-btns' >
				<div id='return' onClick={() => {
					navigate(-1);
				}}>
					<FontAwesomeIcon id='back' icon={faArrowLeftLong} color='rgb(60, 7, 60)' size='2x' />
				</div>
					{
						isLoading
						?
						<div></div>
						:
						save
						?
						<div></div>
						:
						<div id='save-btn' onClick={saveEdit}>
						<BigBtn text='save' bcolor='rgb(60, 7, 60)' color='white' />
						</div>
					}
				</div>
				<div id='info-page'>
					<div id="login-signup-msg">
						<h5 id="err-msg"></h5>
					</div>
				<div >
					{
						save
						?
						<div id='profile-title'>
							{
								pwdSave
								?
								<h3>Change password</h3>
								:
								<h3>Confirm changes</h3>
							}
							<h5 id='err'></h5>
						</div>
						:
						<div id='pic-and-title'>
							<div id='upload-and-pic'>
								<img id='profile-pic' src='https://drive.google.com/uc?export=view&id=1gGHVqJMTHHr0WUslAde0RVDnUpkTUCS-' />
								<input type="file" text='upload' id="input-pic" name="pic" accept="image/*"></input>
							</div>
							<h3 id='profile-title'>Your profile</h3>
						</div>
					}
				</div>
				{
					isLoading
					?
					<Loader loadingText={'Loading...'} />
					:
					save && pwdSave
					?
					changePwd
					:
					save
					?
					saveForm
					:
					<div id='form-info'>
						{editForm}
					</div>
				}
			</div>
		</div>
	)
}

export default ProfilePage;
