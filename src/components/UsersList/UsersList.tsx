import { Dispatch, SetStateAction } from 'react';

import checmarkIcon from '../../assets/checkmarkIcon.svg';
import { removeUserFromList } from '../../helpers/utils';
import { User } from '../../types/types';
import AvatarName from '../AvatarName';

import styles from './UsersList.module.scss';

interface UsersListProps {
	selectedUsersIds: number[];
	visibleUsers: User[];
	searchValue: string;
	setSelectedUsersIds: Dispatch<SetStateAction<number[]>>;
}

const UsersList = ({ selectedUsersIds, visibleUsers, searchValue, setSelectedUsersIds }: UsersListProps) => {
	if (visibleUsers.length === 0) {
		return <p className={styles.emptyState}>No results for {searchValue}</p>;
	}

	return (
		<ul className={styles.container}>
			{visibleUsers.map((visibleUser) => {
				const { id, name, img } = visibleUser;

				const isUserSelected = selectedUsersIds.includes(id);

				const handleOnClick = () => {
					const newSelectedUsers = isUserSelected
						? removeUserFromList(selectedUsersIds, id)
						: [...selectedUsersIds, id];

					setSelectedUsersIds(newSelectedUsers);
				};

				return (
					<li
						onClick={handleOnClick}
						key={id}
						className={`${styles.listItem} ${isUserSelected ? styles.isSelected : ''}`}
					>
						<AvatarName name={name} img={img} />
						{isUserSelected && (
							<img className={styles.checkmarkImage} src={checmarkIcon} alt="blue checkmark" />
						)}
					</li>
				);
			})}
		</ul>
	);
};

export default UsersList;
