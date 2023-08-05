import "./PaymentsPage.css";
import { alertMessage } from "../../GlobalFunctions/GlobalFunctions";
import { getDate, money } from "../../GlobalFunctions/GlobalFunctions";
import { Loader } from "../../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import BigBtn from "../../components/BigBtn/BigBtn";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faCaretDown,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import { ScrollOption } from "../students/StudentsPage";
import FileDB from "../../FileDB/methods/DBMethods";

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
const DATABASE = process.env.REACT_APP_DATABASE;

const PaymentsPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  //const [searchText, setSearchText] = useState('');
  const [classnames, setClassnames] = useState([]);
  const [checkedClassrooms, setCheckedClassrooms] = useState([]);
  const [searchParams] = useSearchParams();
  const [classroom] = useState(searchParams.get("classroom"));
  const [filterActive, setFilterActive] = useState(false);

  /* useEffect(() => {
		const getPayments = (classes) => {
			let uri;
			let filter = {};
			if (classroom && new Set(classes).has(classroom.replace(new RegExp('_', 'g'), ' '))) {
				uri = `${BACKEND_HOST}/payments?schoolName=${localStorage.currentSchool}&classroom=${classroom}`;
				filter = { classroom: classroom };
			} else {
				uri = `${BACKEND_HOST}/payments?schoolName=${localStorage.currentSchool}`
			}
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
						setPayments(data.success);
						setPaymentList(data.success)
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

			// For file database system
			DATABASE === 'FILE' && (
				FileDB.get('payments', filter)
					.then((data) => {
						setPayments(data);
						setPaymentList(data);
						setTimeout(() => {
							setIsLoading(false);
						}, 1000)
					})
			);
		}

		DATABASE === 'BACKEND' && fetch(`${BACKEND_HOST}/classrooms?schoolName=${localStorage.currentSchool}`, {
			method: "GET",
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: "include",
		})
		.then((response) => {
			if (response.ok) {
				response.json().then((data) => {
					const classList = data.success.sort().map((cls) => {
						return cls.name;
					})
					classList.sort();
					setClassnames(classList)
					setCheckedClassrooms(new Array(classList.length).fill(false))
					getPayments(classList);
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
			FileDB.get('classrooms', {})
				.then((data) => {
					const classList = data.sort().map((cls) => {
						return cls.name;
					})
					classList.sort();
					setClassnames(classList);
					setCheckedClassrooms(new Array(classList.length).fill(false))
					getPayments(classList)
				})
		)
	}, []); */

  /* const CurrentFilters = () => {
		/* ==== Check current filters in place ====
		let i = 0;
		let classEmpty = true;
		let updatedPaymentList = [];
		let currentPayments = [];
		for (const state of checkedClassrooms) {
			if (state) {
				classEmpty = false;
				let temp = ((payments.filter((stu) => {
					return (stu.class === classnames[i]);
				})))
				updatedPaymentList = updatedPaymentList.concat(temp);
			}
			i++;
		}
		if (classEmpty) {
			currentPayments = payments;
		}
		currentPayments = currentPayments.concat(updatedPaymentList);
		return currentPayments;
	} */

  const getPayments = async () => {
    if (DATABASE === "LOCAL_STORAGE") {
      setIsLoading(true);
      const payments = await FileDB.get("payments", null, "browser");
      const classrooms = await FileDB.get("classrooms", null, "browser");
      const classList = classrooms.sort().map((cls) => {
        return cls.name;
      });
      classList.sort();
      setClassnames(classList);
      setCheckedClassrooms(new Array(classList.length).fill(false));
      setPayments(payments);
      setPaymentList(payments);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPayments();
  }, []);

  const SearchPayment = (event) => {
    //setSearchText(event.target.value);

    // Reset checkboxes
    const resetClass = new Array(classnames.length).fill(false);
    setCheckedClassrooms(resetClass);
    if (event.target.value.length > 0) {
      const currentPayments = payments.filter((payment) => {
        return payment.studentName
          .toLowerCase()
          .includes(event.target.value.toLowerCase());
      });
      setPaymentList(currentPayments);
    } else {
      setPaymentList(payments);
    }
  };

  const FilterClass = (position) => {
    /* ==== Filter based on classrooms ==== */
    /* Resetting other filters */

    /* Done resetting! */
    let updatedClassState = checkedClassrooms;
    updatedClassState = checkedClassrooms.map((cls, index) => {
      return index === position ? !cls : cls;
    });
    setCheckedClassrooms(updatedClassState);

    // Update the payments
    let updatedPaymentList = [];
    let classEmpty = true;
    let i = 0;
    for (const state of updatedClassState) {
      if (state) {
        classEmpty = false;
        let temp = payments.filter((payment) => {
          return payment.studentClass === classnames[i];
        });
        updatedPaymentList = updatedPaymentList.concat(temp);
      }
      i++;
    }
    if (classEmpty) {
      setPaymentList(payments);
    } else {
      setPaymentList(updatedPaymentList);
    }
    /* ==== Done updating list based on classrooms ==== */
  };

  const ClassFilterComponent = () => {
    //console.log(new Set(classnames).has(classroom))
    if (
      classroom &&
      new Set(classnames).has(classroom.replace(new RegExp("_", "g"), " "))
    ) {
      return <div></div>;
    }
    return (
      <div className="bg-[whitesmoke] py-5 pl-5 pr-10 rounded-lg">
        <p className="font-bold pb-2">Classroom</p>
        <div>
          {classnames.map((cls, index) => {
            const checkValue = checkedClassrooms[index];
            return (
              <div className="w-full flex flex-row items-center" key={cls}>
                <input
                  type="checkbox"
                  id={index}
                  value={cls}
                  checked={checkValue}
                  onChange={() => FilterClass(classnames.indexOf(cls))}
                  className="h-10"
                ></input>
                <label className="text-sm nowrap">{cls}</label>
                <br />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  /* const ClassFilterComponent = () => {
		if (classroom && new Set(classnames).has(classroom.replace(new RegExp('_', 'g'), ' '))) {
			return <div></div>
		}
		return (
			<div className="filter-component" id="ClassFilter">
			<div className="filter-option"><p>..Classroom</p></div>
			<div id="class-options">
			{
				classnames.map((cls) => {
					return(
						<div key={cls} className="c-o">
						<input type="checkbox" id={cls + 'opt'} value={cls} checked={checkedClassrooms[classnames.indexOf(cls)]} onChange={() => FilterClass(classnames.indexOf(cls))}></input>
						<label>{cls}</label><br></br>
						</div>
						);
					})
				}
				</div>
				</div>
				)
			}
			
	const PaymentOption = (props) => {
		return (
			<div id={props.header ? "ScrollOption-header" : "ScrollOption"}>
			<div className={props.header ? "pay-header" : "pay-col"} id="scroll-studentName"><h5>{props.studentName}</h5></div>
			<div className={props.header ? "pay-header" : "pay-col"} id="scroll-depositorName"><h5>{props.depositorName}</h5></div>
			<div className={props.header ? "pay-header" : "pay-col"} id="scroll-amount"><h5>{props.amount}</h5></div>
			<div className={props.header ? "pay-header" : "pay-col"} id="scroll-purpose"><h5>{props.purpose}</h5></div>
			<div className={props.header ? "pay-header" : "pay-col"} id="scroll-date"><h5>{props.createdAt}</h5></div>
			</div>
		)
	} */

  return (
    <section className="relative flex flex-col items-center">
      <div className="w-full sticky top-[60px] bg-white z-[99999] border-opacity-20 border-[grey] border-t-[0.5px]">
        <div
          className="w-full
					flex flex-col items-start justify-between z-[99999999]
					stickytop-[90px] w-full bg-white px-5 md:px-14 py-3
					border-opacity-20 border-[grey] border-b-[0.5px]"
        >
          <div className="w-full flex flex-row justify-between">
            <div className="flex flex-row items-center">
              <div
                className="w-full flex flex-row items-end"
                onClick={() => setFilterActive(!filterActive)}
              >
                <FontAwesomeIcon
                  icon={faFilter}
                  size="lg"
                  className="text-[purple]"
                />
                <FontAwesomeIcon
                  icon={filterActive ? faCaretRight : faCaretDown}
                  className="text-[purple]"
                />
              </div>
              <input
                type="text"
                placeholder="Search payment"
                className="hidden md:flex h-7 focus:outline-[purple] border-[0.5px] border-opacity-20 border-[grey] border-b-[0.5px] rounded-sm "
                onChange={SearchPayment}
              />
            </div>
            <div
              onClick={() => {
                navigate("/make-payment");
              }}
            >
              <button className="px-3 py-1 bg-[purple] text-white text-sm rounded-[3px]">
                Make Payment
              </button>
              {/* <BigBtn id='reg-btn' color="white" bcolor="purple" text="Register Student" grid/> */}
            </div>
          </div>
          <div className={`${filterActive ? "flex" : "hidden"} flex-col gap-5`}>
            <div
              className={`
							w-full flex flex-row items-start justify-start gap-5 md:gap-10 mt-5`}
            >
              <ClassFilterComponent />
              {/* <SexFilterComponent /> */}
            </div>
            <input
              type="text"
              placeholder="Search payment"
              className="md:hidden flex h-7 focus:outline-[purple] border-[0.5px] border-opacity-20 border-[grey] border-b-[0.5px] rounded-sm "
              onChange={SearchPayment}
            />
          </div>
        </div>
      </div>
      {/* <div className='relative w-full flex flex-col items-center'> */}
      <div
        className="sticky top-[120px] flex flex-row mt-20 py-2 w-[95%] bg-white
				border-[grey] border-[0.5px] border-opacity-20 mx-5 px-2 shadow-md"
      >
        <ScrollOption
          one={"Student Name"}
          two={"Depositor"}
          three={"Amount"}
          four={"Purpose"}
          five={"Date"}
          header={true}
        />
      </div>
      {/* </div> */}
      {/* <div id="login-signup-msg">
				<h5 id="err-msg"></h5>
			</div> */}
      <div
        className="w-[95%] mx-2 px-2 border-opacity-10 border-[grey]
				border-[0.5px]"
      >
        {isLoading ? (
          <Loader loadingText={"Loading..."} />
        ) : paymentList ? (
          paymentList.map((payment, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  navigate(`/payments/${String(payment._id)}`);
                }}
              >
                <ScrollOption
                  key={payment._id}
                  one={payment.studentName}
                  two={payment.depositorName}
                  three={money(payment.amount)}
                  four={payment.purpose}
                  five={getDate(payment.createdAt)}
                  header={false}
                />
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
      <div className="h-[2000px]"></div>
    </section>
  );

  /* return (
		<div id="students-view-con">
			<div id="filters-con">
				<div id="filter-title"><h3>Filter by...</h3></div>
				<ClassFilterComponent />
				<div id="search-filter">
					<div className="filter-option"><p>Search payments</p></div>
					<input id="pay-search-box" type="text" className="filter-input" onChange={SearchPayment} placeholder="Student name"></input>
				</div>
			</div>
			<div id="students-con">
				<div id="top-section">
					<div id="regstu" onClick={() => {
						navigate("/make-payment");
					}}>
						<BigBtn color="white" bcolor="rgb(60, 7, 60)" text="Make Payment"/>
					</div>
					<div id="login-signup-msg">
						<h5 id="err-msg"></h5>
					</div>
					<div id="students-con-header">
						<PaymentOption depositorName={"Depositor name"} studentName={"Student name"} amount={"Amount"} purpose={"Purpose"} createdAt={"Date"} header={true} />
					</div>
				</div>
				<div id="students-scroll-view">
					<div id="bottom-section">
						{
							isLoading
							?
							<Loader loadingText={'Loading...'} />
							:
							paymentList.map((payment) => {
								return (
									<div key={payment._id} onClick={() => {
										navigate("/payments/" + payment._id)
									}}>
										<PaymentOption depositorName={payment.depositorName} studentName={payment.studentName} amount={`NGN ${money(payment.amount)}`} purpose={payment.purpose} createdAt={getDate(payment.createdAt)} header={false} />
									</div>
								);
							})
						}
					</div>
				</div>
			</div>
		</div>
	) */
};

export default PaymentsPage;
