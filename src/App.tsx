import { useEffect, useState } from 'react';

import ButtonDropdown from './components/ButtonDropdown';
import SelectedUsers from './components/SelectedUsers';
import { SELECTED_USERS_KEY } from './constants/localStorageKeys';
import { getLocalStorageItem, setLocalStorageItem } from './helpers/utils';

import styles from './App.module.scss';

const App = () => {
	const [selectedUsersIds, setSelectedUsersIds] = useState<number[]>(getLocalStorageItem(SELECTED_USERS_KEY));

	useEffect(() => {
		setLocalStorageItem(SELECTED_USERS_KEY, JSON.stringify(selectedUsersIds));
	}, [selectedUsersIds]);

	return (
		<main className={styles.rootContainer}>
			<SelectedUsers selectedUsersIds={selectedUsersIds} setSelectedUsersIds={setSelectedUsersIds} />
			<ButtonDropdown selectedUsersIds={selectedUsersIds} setSelectedUsersIds={setSelectedUsersIds} />
		</main>
	);
};

export default App;
