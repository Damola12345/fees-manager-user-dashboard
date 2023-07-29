import './CircleBar.css';
import React from 'react';


const CircleBar = (props) => {
	return (
		<div id="bar-container" className='scale-[0.8] md:scale-100'>
			<div id="outer-circle">
				<div id="inner-circle">
					<h3 className='font-extrabold text-3xl'>{props.percentage}</h3>
				</div>
			</div>

			<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="200px" height="200px" id="progress-bar">
				<defs>
					<linearGradient id="GradientColor">
						<stop offset="0%" stopColor="#e91e63" />
						<stop offset="100%" stopColor="#673ab7" />
					</linearGradient>
				</defs>
				<circle cx="100" cy="100" r="97.5" strokeLinecap="round" />
			</svg>
		</div>
	)
}

export default CircleBar;

