import React, { useEffect } from 'react';
import './SelectionDropdown.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCaretDown, faCaretRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState, forwardRef, useImperativeHandle } from 'react';
import IconOption from '../IconOption/IconOption';

const SelectedItem = (props) => {
	return(
		<div className='border-[0.5px] border-[grey] border-opacity-40 px-2 cursor-default shadow-sm
			text-grey text-sm rounded-[5px] flex flex-row justify-between items-center gap-2'
		>
			{props.name}
			<div className='text-midPurple text-[12px]' onClick={ () => props.pop(props.item) }>
				<FontAwesomeIcon icon={faCircleXmark} className='cursor-pointer' />
			</div>
		</div>
	)
}

const SelectionDropdown = forwardRef((props, ref) => {

	const selected = [];
	const [items, setItems] = useState(selected);
	const [dropdown, setDropdown] = useState(false);
	useImperativeHandle(ref, () => ({getItems: () => {return items}}), [items]);

	const AddCustom = () => {
		const classroom = document.getElementById("custom").value
		if (classroom) {
			AddItem(classroom)
			document.getElementById("custom").value = ""
		}
	}

	const PopItem = (item) => {
		const index = items.indexOf(item)
		if (index > -1) {
			items.splice(index, 1)
			const new_items = items.map((item) => {
				return item
			})
			setItems(new_items)
		}
	}

	const AddItem = (item) => {
		if (props.mode === "single") {
			if (items.includes(item) === false && items.length === 0) {
				items.push(item)
				const new_items = items.map((item) => {
					return item
				})
				setItems(new_items)
			}
		}
		else {
			if (items.includes(item) === false) {
				items.push(item)
				const new_items = items.map((item) => {
					return item
				})
				setItems(new_items)
			}
		}
	}

	const dropOption = `w-full px-5 py-1 border-[0.5px bg-[whitesmoke] hover:bg-white cursor-pointer
		hover:border-[0.5px] hover:border-[grey] hover:border-opacity-70`;

	const form = <div>
		<div className='w-full max-w-[630p]'>
			<div className='w-full border-[0.5px] border-[grey]
				flex flex-col justify-between border-opacity-90'
			>
				<div className='w-full max-h-[200px] min-h-[100px] bg-white flex flex-wrap gap-3 justify-center overflow-y-scroll px-5 py-5'>
					{items.map((item) => {
						return <div key={item}><SelectedItem key={item} name={item} item={item} pop={PopItem} /></div>
					})}
				</div>

				{/* Custom option */}
				<div className='w-full flex flex-row justify-center gap-1 border-t-[0.5px] border-t-[grey] border-opacity-20 py-1'>
				{
					props.custom
					?
					<input
						className="w-[50%] h-[25px] text-sm py-1 border-[grey] border-opacity-50"
						id="custom"
						type="text"
						placeholder={`Create custom ${props.dropdownName}`}
						name="custom-name"
					/>
					:
					<></>
				}
				{
					props.custom
					?
					<button
						type='button'
						className='w-[7%] bg-midPurple text-white rounded-[5px]'
						onClick={ () => AddCustom() }
					>
						<FontAwesomeIcon icon={faPlus} />
					</button>
					:
					<></>
				}
				</div>
			</div>
			<div tabIndex={0} className='relative outline-none' onBlur={() => dropdown && setDropdown(false)}>
				<div
					onClick={() => setDropdown(!dropdown)}
					className='drop-button w-full border-opacity-90
					border-l-[0.5px] border-l-[grey]
					border-r-[0.5px] border-r-[grey]
					border-b-[0.5px] border-b-[grey]
					flex flex-row justify-between items-center px-5 py-1 rounded-b-md cursor-pointer'
				>
					<p className='text-sm'>Select {props.dropdownName}</p>
					<div><FontAwesomeIcon icon={dropdown ? faCaretRight : faCaretDown} color="grey" /></div>
				</div>
				<div
					className={`absolute w-full ${dropdown ? 'block' : 'hidden'}`}>
					{
						props.items ? props.items.map(item => {
							return <div key={item} className={`${dropOption}`} onClick={ () => AddItem(item) }><IconOption name={item} /></div>
						})
						:
						<div>
							<div className={`${dropOption}`} onClick={ () => AddItem("Primary 1") }>Primary 1</div>
							<div className={`${dropOption}`} onClick={ () => AddItem("Primary 2") }>Primary 2</div>
							<div className={`${dropOption}`} onClick={ () => AddItem("Primary 3") }>Primary 3</div>
							<div className={`${dropOption}`} onClick={ () => AddItem("Primary 4") }>Primary 4</div>
							<div className={`${dropOption}`} onClick={ () => AddItem("Primary 5") }>Primary 5</div>
							<div className={`${dropOption}`} onClick={ () => AddItem("Primary 6") }>Primary 6</div>
						</div>
					}
				</div>
			</div>
		</div>
	</div>

	return (
		form
	)
});

export default SelectionDropdown