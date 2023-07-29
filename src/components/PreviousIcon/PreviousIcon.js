import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { config } from "../../app.config";
import './PreviousIcon.css';

const PreviousIcon = (props) => {
	const navigate = useNavigate();
	const { midPurple } = config.color;
	return (
		<div onClick={() => {
			navigate(props.path);
		}}>
			<FontAwesomeIcon id='back' icon={faArrowLeftLong} color={midPurple} size='2x' />
		</div>
	)
}

export default PreviousIcon;
