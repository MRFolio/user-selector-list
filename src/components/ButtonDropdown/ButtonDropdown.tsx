import { Dispatch, SetStateAction, useState } from 'react';

import addUsersIcon from '../../assets/addUsersIcon.svg';
import Dropdown from '../Dropdown';

import styles from './ButtonDropdown.module.scss';

interface ButtonDropdownProps {
	selectedUsersIds: number[];
	setSelectedUsersIds: Dispatch<SetStateAction<number[]>>;
}

const ButtonDropdown = ({ selectedUsersIds, setSelectedUsersIds }: ButtonDropdownProps) => {
	const [showDropdown, setShowDropDown] = useState(false);

	const handleOnClick = () => {
		setShowDropDown((previousValue) => !previousValue);
	};

	const closeDropDown = () => {
		setShowDropDown(false);
	};

	return (
		<div className={styles.container}>
			<button onClick={handleOnClick} className={styles.button} type="button">
				<img src={addUsersIcon} alt="" />
				Add users
			</button>
			{showDropdown && (
				<Dropdown
					selectedUsersIds={selectedUsersIds}
					setSelectedUsersIds={setSelectedUsersIds}
					closeDropdown={closeDropDown}
				/>
			)}
		</div>
	);
};

export default ButtonDropdown;
