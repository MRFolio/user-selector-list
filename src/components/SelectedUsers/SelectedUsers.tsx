import { Dispatch, SetStateAction, useMemo } from 'react';

import crossIcon from '../../assets/crossIcon.svg';
import { users } from '../../helpers/usersData';
import AvatarName from '../AvatarName';

import { getFilteredUsers } from '../../helpers/utils';
import styles from './SelectedUsers.module.scss';

interface SelectedUsersProps {
	selectedUsersIds: number[];
	setSelectedUsersIds: Dispatch<SetStateAction<number[]>>;
}

const SelectedUsers = ({ selectedUsersIds, setSelectedUsersIds }: SelectedUsersProps) => {
	const filteredUsers = useMemo(() => getFilteredUsers(users, selectedUsersIds), [selectedUsersIds]);

	return (
		<div>
			<ul className={styles.container}>
				{filteredUsers.map(({ id, name, img }) => {
					const handleOnClick = () => {
						const newSelectedUsers = selectedUsersIds.filter((selectedUserId) => selectedUserId !== id);

						setSelectedUsersIds(newSelectedUsers);
					};

					return (
						<li onClick={handleOnClick} key={id} className={styles.listItem}>
							<AvatarName name={name} img={img} />
							<img className={styles.crossIcon} src={crossIcon} alt="cross icon" loading="lazy" />
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default SelectedUsers;
