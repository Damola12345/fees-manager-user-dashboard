import './editView.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import BigBtn from '../BigBtn/BigBtn'
import { useState, useEffect } from 'react'
import { Loader } from '../Loader/Loader'

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const EditSchool = (props) => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [school, setSchool] = useState({ name: '', address: '', level: '' });
    const [level, setLevel] = useState('');
    const [schName, setSchName] = useState('');
    const [address, setAddress] = useState('');
    const [save, setSave] = useState(false);
    const [info, setInfo] = useState({});
    let editForm;

    const alertMessage = (message = '', display = 'none', color = 'none') => {
        const msg = document.getElementById('err-msg');
        msg.innerHTML = message;
        msg.style.display = display;
        msg.style.color = color;
    }
    
    useEffect(() => {
        fetch(`${BACKEND_HOST}/schools/${localStorage.currentSchool}`, {
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
                setSchool(obj.success);
                setLevel(obj.success.level);
                setSchName(obj.success.name);
                setAddress(obj.success.address);  
                setIsLoading(false)          
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
    }, []);

    editForm =
        <div>
            <div id='input-single'>
                <h4 className='input-txt'>Name:</h4>
                <div className='edit-input'>
                    <input id='input-schname' type='text' defaultValue={school.name} name='schname' onChange={(event) => {setSchName(event.target.value); alertMessage()}}></input>
                </div>
            </div>
            <div id='input-single'>
                <h4 className='input-txt'>Address:</h4>
                <div className='edit-input'>
                    <input id='input-schname' type='text' defaultValue={school.address} name='address' onChange={(event) => {setAddress(event.target.value); alertMessage()}}></input>
                </div>
            </div>
            <div id='input-single'>
                <h4 className='input-txt'>Level:</h4>
                <select className="level-dropdown" name='level' required onChange={(event) => {setLevel(event.target.value); alertMessage()}}>
                  <option value="Primary">Primary</option>
                  <option value="Secondary">Secondary</option>
                  <option value="Tertiary">Tertiary</option>
                  <option value="Other">Other</option>
                </select>
            </div>
            <div id='input-single' >
                <h4 className='input-txt' >School ID:</h4>
                <div className='edit-input'>
                    <input id='input-id' className='immutable' type='text' value={school._id} name='id' readOnly ></input>
                </div>
            </div>
        </div>

    const saveEdit = () => {
        if (school.name !== schName) info.name = schName;
        if (school.address !== address) info.address = address;
        if (school.level !== level) info.level = level;

        if (Object.keys(info).length > 0) {
            setSave(true);
        } else {
            alertMessage('No changes made. School is up to date!', 'block', 'green');
        }
    }

    const editSchool = () => {
        setIsLoading(true);
        fetch(`${BACKEND_HOST}/schools/${props.id}/edit`, {
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
                    localStorage.setItem('currentSchool', data.success.name)
                    setIsLoading(false);
                    navigate(`/schools/${data.success.name}`);
                }, 1000)
            });
        } else if(response.status === 401) {
            navigate('/login');
        } else {
            response.json().then((message) => {
                setIsLoading(false)
                setSave(false)
                cancelSave();
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

    const cancelSave = () => {
        setSave(false);
        alertMessage();
        setInfo({});
        setSchName(school.name);
        setAddress(school.address);
        setLevel(school.level);
    }

    const saveForm = 
        <form id='save-form'>
            <div id="input-single">
                <input className='immutable' value={`${schName}`} readOnly></input>
            </div>
            <div id="input-single">
                <input className='immutable' value={`${address}`} readOnly></input>
            </div>
            <div id="input-single">
                <input className='immutable' value={`${level}`} readOnly></input>
            </div>
            <div id='final-buttons'>
                <button className='checkout-btns' onClick={() => cancelSave()}>Cancel</button>
                <button className='checkout-btns' id='confirm-btn' onClick={() => editSchool()}>Confirm</button>
            </div>
        </form>

    return (
        <div id='edit-con'>
            <div id='nav-btns' >
                <div id='return' onClick={() => {
                    navigate(`/schools/${schName}`);
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
                <div id='center'>
                    {
                        save
                        ?
                        <h3 id='edit-title'>Confirm changes</h3>
                        :
                        <h3 id='edit-title'>Edit school</h3>
                    }
                    <div id="login-signup-msg">
                        <h5 id="err-msg"></h5>
                    </div>
                </div>
                {
                    isLoading
                    ?
                    <Loader loadingText={'Loading...'} />
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

export default EditSchool;