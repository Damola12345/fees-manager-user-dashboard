import React, { useContext, useEffect, useState } from "react";
import './IconOption.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HeaderContext } from "../../contexts/HeaderContext";


const IconOption = (props) => {
	const [headerState, setHeaderState] = useContext(HeaderContext);
	const [hideBar, setHideBar] = useState(true);
	const [hideProfile, setHideProfile] = useState(true);
	const linkStyle = `
		flex flex-row items-center justify-start bg-[white] pl-5 w-full
		${!props.empty && !props.fill ? 'hover:bg-[whitesmoke]' : ''} hover:text-[purple] text-purple
		${hideBar && (props.sidebar || props.fill) ? 'invisible' : 'visible'}
		${hideProfile && props.profile ? 'invisible' : 'visible'}
		${props.first ? 'rounded-tr-md' : ''}
		${props.last ? 'rounded-br-md' : ''}
		`

	useEffect(() => {
		if (!headerState.sideBar) {
			setTimeout(() => {
				setHideBar(true);
			}, 100)
		} else {
			setTimeout(() => {
				setHideBar(false);
			}, 0)
		}
	}, [headerState]);

	useEffect(() => {
		if (!headerState.profileDropdown) {
			setTimeout(() => {
				setHideProfile(true);
			}, 100)
		} else {
			setTimeout(() => {
				setHideProfile(false);
			}, 0)
		}
	}, [headerState.profileDropdown]);

	return (
		<div className={`
			relative w-full flex flex-row capitalize z-[99999]
			transition-all ease-in ease-out duration-300
			${props.profile ? 'h-[45px]' : props.sidebar ? 'h-[50px]' : 'h-[100vh]'}
			${props.fill ? '' : 'cursor-pointer'}
			`
		}>
			<div className={`
				flex flex-row items-center justify-center w-[70px] bg-purple
				${hideBar && (props.sidebar || props.fill) ? 'hidden' : ''}
				${hideProfile && props.profile ? 'hidden' : ''}
				${props.first ? 'rounded-tl-md' : ''}
				${props.last ? 'rounded-bl-md' : ''}`
			}>
				<div>
					{
						!props.empty && !props.fill
						?
						<FontAwesomeIcon icon={props.iconName} color="white" />
						:
						<></>
					}
				</div>
			</div>
			{
				props.link
				?
				<a href={props.link} className={linkStyle}>
					<p className={`${!headerState.sideBar && props.sidebar ? 'hidden' : 'flex'}`}>
						{props.option}
					</p>
				</a>
				:
				<div className={linkStyle}>
					<p className={`${!headerState.sideBar && props.sidebar ? 'hidden' : 'flex'}`}>
						{props.option}
					</p>
				</div>
			}
		</div>
	)
}

export default IconOption;
