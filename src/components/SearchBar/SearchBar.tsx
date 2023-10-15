import { Dispatch, SetStateAction } from 'react';

import searchIcon from '../../assets/searchIcon.svg';

import styles from './SearchBar.module.scss';

interface SearchBarProps {
	searchValue: string;
	setSearchValue: Dispatch<SetStateAction<string>>;
}

const SearchBar = ({ searchValue, setSearchValue }: SearchBarProps) => {
	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;

		setSearchValue(newValue);
	};

	return (
		<div className={styles.container}>
			<img src={searchIcon} alt="search icon" />
			<input value={searchValue} onChange={handleOnChange} placeholder="Find user" />
		</div>
	);
};

export default SearchBar;
