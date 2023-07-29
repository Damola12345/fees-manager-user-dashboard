import './DisplayCard.css';
import BigBtn from '../BigBtn/BigBtn';
import React from 'react';


const DisplayCard = (props) => {
	const boxStyle = `bg-white shadow-md h-[270px] w-[280px]
		border border-[1px] border-[whitesmoke] border-opacity-50
		flex flex-col items-center p-10 rounded-md gap-5 text-center
		hover:shadow-xl transition-all ease-in ease-out duration-300`

	return (
		<div className={`${boxStyle} ${props.className}`}>{ props.children }</div>
	)
}
//<BigBtn text={"View " + props.object} />

export default DisplayCard;
