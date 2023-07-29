//import { faCircleXmark, faCaretDown } from '@fortawesome/free-solid-svg-icons';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import SelectionDropdown from "../../components/SelectionDropdown/SelectionDropdown";
import "./CreatePaymentPage.css";
import { Loader } from "../../components/Loader/Loader";
import { PaystackButton } from "react-paystack";
import { useNavigate } from "react-router-dom";
import BigBtn from "../../components/BigBtn/BigBtn";
import { alertMessage } from "../../GlobalFunctions/GlobalFunctions";
import PaneOption from "../../components/PaneOption/PaneOption";
import PreviousIcon from "../../components/PreviousIcon/PreviousIcon";
import React, { useState, useEffect } from "react";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
const PAYSTACK_API_KEY = process.env.REACT_APP_PAYSTACK_API_KEY;

const CreatePaymentPage = () => {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(true);
	const [students, setStudents] = useState('');
	const [studentList, setStudentList] = useState([]);
	//const [searchText, setSearchText] = useState('');
	const [email, setEmail] = useState("");
	const [depositorName, setDepositorName] = useState("");
	const [amount, setAmount] = useState("");
	const [purpose, setPurpose] = useState("");
	const [studentName, setStudentName] = useState("");
	const [studentId, setStudentId] = useState("");
	const [studentClass, setStudentClass] = useState("");

	useEffect(() => {
		fetch(`${BACKEND_HOST}/students?schoolName=${localStorage.currentSchool}`, {
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
				setTimeout(() => {
				  setIsLoading(false);
				}, 1000);
			  });
		  } else if(response.status === 401) {
			  navigate('/login');
		  } else {
			  response.json().then((message) => {
				  setIsLoading(false);
				  alertMessage(message.error, 'block', 'red');
			  })
		  }
		})
		.catch((err) => {
		  setIsLoading(false);
		  alertMessage('An error occured. Please retry', 'block', 'red');
		  console.log(err.message)
		});
	  }, []);

	const SearchStudent = (event) => {
		//setSearchText(event.target.value);

		if (event.target.value.length > 0) {
			const currentStudents = students.filter((stu) => {
				const name_id = stu.fullname + ' - ' + stu._id;
				return (name_id.toLowerCase().includes(event.target.value));
			})
			setStudentList(currentStudents);
		}
		else {
			setStudentList([]);
		}
	}

	const savePayment = (details) => {
		const payInfo = {
			depositorName,
			email,
			studentName,
			studentId,
			studentClass,
			amount: amount / 100,
			purpose,
			schoolName: localStorage.currentSchool,
			refNo: details.reference,
			status: details.status,
			message: details.message,
			transactionNo: details.transaction,
		}
		fetch(`${BACKEND_HOST}/save-payment`, {
		  method: "POST",
		  headers: {
			'Content-Type': 'application/json',
		  },
		  credentials: "include",
		  body: JSON.stringify(payInfo),
		})
		.then((response) => {
		  if (response.ok) {
			  response.json().then((data) => {
				setStudents(data.success);
				setTimeout(() => {
				  setIsLoading(false);
				  navigate('/payments');
				}, 1000);
			  });
		  } else if(response.status === 401) {
			  navigate('/login');
		  } else {
			  response.json().then((message) => {
				  setIsLoading(false);
				  alertMessage(message.error, 'block', 'red');
			  })
		  }
		})
		.catch((err) => {
		  setIsLoading(false);
		  alertMessage('An error occured. Please retry', 'block', 'red');
		  console.log(err.message)
		});
	  }

	const SelectStudent = (stu) => {
		alertMessage();
		const selected_stu = document.getElementById("search-stu");
		selected_stu.value = stu.fullname + ' - ' + '(' + stu.classroom + ') ' + stu._id
		setStudentName(stu.fullname)
		setStudentId(stu._id)
		setStudentClass(stu.classroom);
		setStudentList([]);
	}

	const ResetPayment = () => {
		setStudentName('');
		setStudentId('');
		setStudentClass('');
	}

	const componentProps = {
		email,
		amount,
		metadata: {
		  depositorName,
		  studentName,
		  studentId,
		},
		publicKey: PAYSTACK_API_KEY,
		text: "Pay Fees",
		onSuccess: (res) => {
		  //console.log(res)
		  alert("Payment successful! Please check for email for a receipt");
		  savePayment(res);
		},
		onClose: () => {
			setIsLoading(false);
			alert("Your paymebt will not be completed. Are you sure you want to exit?")
		},
	}

	const completeForm = () => {
		alertMessage('Please fill out form to proceed', 'block', 'red');
	}

	return (
		<div id="sch-reg-container">
			<PreviousIcon path={-1} />
			<h1 id="reg-school-title">Make Payment</h1>
			{
				isLoading ? <Loader loadingText={'Loading...'} /> :
				<div id="school-reg-container">
					{
						depositorName && email && amount && purpose && studentId && studentName
						?
						<div></div>
						:
						<form className="school-reg-form">
							<p className="form-text">Depositor name</p>
							<input className="input-field" type="text" placeholder="" name="school-address" required onChange={(e) => { alertMessage(); setDepositorName(e.target.value) } }></input>
							<p className="form-text">Depositor email</p>
							<input className="input-field" type="text" placeholder="" name="depositorEmail" required onChange={(e) => { alertMessage();setEmail(e.target.value) } }></input>
							<p className="form-text">Amount</p>
							<input id="payment-amount" className="input-field" type="number" placeholder="" name="level" required onChange={(e) => { alertMessage();setAmount(e.target.value * 100) } }></input>
							<p className="form-text">Purpose/Description</p>
							<input className="input-field" type="text" placeholder="" name="level" required onChange={(e) => setPurpose(e.target.value)}></input>
							<p className="form-text">Select student</p>
							<input id="search-stu" className="input-field" type="text" placeholder="Search student name and select" name="school-name" required onChange={ SearchStudent } ></input>
							<div id="students-dropdown">
								{
									studentList.map((stu) => {
										return (
											<div onClick={() => SelectStudent(stu)} key={stu._id + stu.fullname}>
												<PaneOption name={stu.fullname + ' - ' + '(' + stu.classroom + ')' } bcolor="whitesmoke" />
											</div>
										)
									})
								}
							</div>
						</form>
					}
					{
						depositorName && email && amount && purpose && studentId && studentName
						?
						<div id="student-dets">
							<p>You are about to make a payment for the student with the following details...</p>
							<p className="det" id="det-name">Studen name: {studentName}</p>
							<p className="det" id="det-id">Student Id: {studentId}</p>
							<p className="det" id="det-class">Student class: {studentClass}</p>
							<p className="det" id="det-amount">Amount: {amount}</p>
							<h4 style={{color: "orange"}}>
								Please confirm the details before proceeding
							</h4>
							<div id="cancel-student" onClick={() => {
								ResetPayment();
							}}>
								Cancel
							</div>
						</div>
						:
						<div></div>
					}
					<div id="login-signup-msg">
						<h3 id="err-msg"></h3>
					</div>
					{
						depositorName && email && amount && purpose && studentId && studentName
						?
						<div id="submit-pay" type='submit' onClick={(e) => {e.preventDefault(); setIsLoading(true)}}>
							<PaystackButton {...componentProps} />
						</div>
						:
						<div id="submit-pay" onClick={completeForm}>
							<BigBtn text="Pay Fees" bcolor="rgb(60, 7, 60)" color="white" />
						</div>
					}
					<h5 id='pay-message'>All payments are processed using <a href="https://paystack.com/" target={'blank'}>Paystack</a> click "Pay Fees" to continue.</h5>
				</div>
			}
		</div>
	)
}

export default CreatePaymentPage;

