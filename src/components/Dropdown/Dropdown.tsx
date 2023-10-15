import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

import { users } from '../../helpers/usersData';
import { getVisibleUsers } from '../../helpers/utils';
import AddButton from '../AddButton';
import SearchBar from '../SearchBar';
import UsersList from '../UsersList';

import styles from './Dropdown.module.scss';

interface DropdownProps {
	selectedUsersIds: number[];
	closeDropdown: () => void;
	setSelectedUsersIds: Dispatch<SetStateAction<number[]>>;
}

const Dropdown = ({ selectedUsersIds, closeDropdown, setSelectedUsersIds }: DropdownProps) => {
	const [searchValue, setSearchValue] = useState('');
	const [dropdownSelectedUsersIds, setDropDownSelectedUsersIds] = useState<number[]>(selectedUsersIds);

	useEffect(() => {
		setDropDownSelectedUsersIds(selectedUsersIds);
	}, [selectedUsersIds]);

	const visibleUsers = useMemo(() => getVisibleUsers(users, searchValue), [searchValue]);

	const handleAddClick = () => {
		setSelectedUsersIds(dropdownSelectedUsersIds);
	};

	return (
		<div className={styles.container}>
			<div className={styles.headerSearchBarWrapper}>
				<header className={styles.headerWrapper}>
					<h1 className={styles.heading}>Add users</h1>
					<button onClick={closeDropdown} className={styles.cancelButton}>
						Cancel
					</button>
				</header>
				<SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<UsersList
				selectedUsersIds={dropdownSelectedUsersIds}
				setSelectedUsersIds={setDropDownSelectedUsersIds}
				visibleUsers={visibleUsers}
				searchValue={searchValue}
			/>
			<AddButton handleAddClick={handleAddClick} />
		</div>
	);
};

export default Dropdown;
