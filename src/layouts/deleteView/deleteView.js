import './deleteView.css';
import { useNavigate } from 'react-router-dom';
import PreviousIcon from "../PreviousIcon/PreviousIcon";
import { useState } from "react";
import { Loader } from '../Loader/Loader';
const sha1 = require('sha1');

const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;

const DeleteView = (props) => {
    const navigate = useNavigate();
    const [password, setPassword] = useState(() => '');
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState('');
    const [errColor, setErrColor] = useState('red');
    const alertMessage = (message, display, color) => {
        const msg = document.getElementById('err-msg');
        msg.innerHTML = message;
        msg.style.display = display;
        msg.style.color = color;
    }

    let msg = '';
    const item = props.id.replace(new RegExp('_', 'g'), ' ').replace(new RegExp('%20', 'g'), ' ');
    if (props.view === 'school') {
        msg = `You are about to delete records for ${item} with all its classrooms and students!`;
    } else if (props.view === 'classroom') {
        msg = `You are about to delete records for ${item} with all its students!`;
    } else if (props.view === 'student') {
        msg = `You are about to delete records for the selected student`;
    }

    const deleteObj = () => {
        setErr();
        setIsLoading(true);
        let uri;
        props.id === 'school'
        ?
        uri = `${BACKEND_HOST}/${props.view}s/${props.id}/delete?password=${sha1(password)}`
        :
        uri = `${BACKEND_HOST}/${props.view}s/${props.id}/delete?schoolName=${localStorage.currentSchool}&password=${sha1(password)}`

        fetch(uri, {
        method: "DELETE",
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
                    navigate(`/${props.view}s`);
                }, 1000)
            });
        } else if(response.status === 401) {
            navigate('/login');
        } else {
            response.json().then((message) => {
                setIsLoading(false);
                setErr(message.error);
                setErrColor('red');
                //alertMessage(message.error, 'block', 'red');
            })
        }
        })
        .catch((err) => {
            setIsLoading(false);
            setErr('An error occured. Please retry');
            setErrColor('red');
            //alertMessage('An error occured. Please retry', 'block', 'red');
            console.log(err.message)
        });
    }

    return (
        <div>
            {
                isLoading
                ?
                <Loader loadingText={'Deleting records...'} />
                :
                <form id='del-container' onSubmit={(event) => {event.preventDefault(); deleteObj()}}>
                    <div id='del-prev'>
                        <PreviousIcon path={-1} />
                    </div>
                    <h2 id="edit-title">Delete {props.view}</h2>
                    <h4 id='del-txt' style={{color: errColor}}>{msg}</h4>
                    <div>
                        <h5 id='ent-txt'>Enter password to proceed</h5>
                        <input id='del-sch-input' type={'password'} placeholder='Password' onChange={(e) => {setPassword(e.target.value); setErr('')}} required></input>
                    </div>
                    <div id="login-signup-msg">
                        <h5 id="err-msg">{err}</h5>
                    </div>
                    <div id='final-buttons'>
                        <button className='checkout-btns' onClick={() => navigate(-1) }>Cancel</button>
                        <button type='submit' className='checkout-btns' id='confirm-btn'>Confirm</button>
                    </div>
                </form>
            }
        </div>
    )
}

export default DeleteView;
