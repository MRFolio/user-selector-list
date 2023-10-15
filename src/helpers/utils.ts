import { SelectedUsersLocalStorageKey, User } from '../types/types';

const sanitizeString = (string = '') => string.trim().toLowerCase();

export const userContainsString = (userName: string, searchValue: string) => {
	return sanitizeString(userName).includes(sanitizeString(searchValue));
};

export const getVisibleUsers = (users: User[], searchValue: string) =>
	users.filter((user) => !searchValue || userContainsString(user.name, searchValue));

export const removeUserFromList = (usersIds: number[], userId: number) => usersIds.filter((id) => id !== userId);

export const getFilteredUsers = (users: User[], selectedUsersIds: number[]) =>
	users.filter((user) => selectedUsersIds.includes(user.id));

export const setLocalStorageItem = (key: SelectedUsersLocalStorageKey, value: string) => {
	try {
		if (typeof Storage !== 'undefined') {
			window.localStorage.setItem(key, value);
		} else {
			throw new Error('Local storage is not supported in this browser');
		}
	} catch (error) {
		console.error('Error while storing data in localStorage: ' + error);
	}
};

export const getLocalStorageItem = (key: SelectedUsersLocalStorageKey): number[] => {
	try {
		if (typeof Storage !== 'undefined') {
			const data = window.localStorage.getItem(key);

			if (typeof data === 'string') {
				return JSON.parse(data);
			}

			return [];
		} else {
			throw new Error('Local storage is not supported in this browser');
		}
	} catch (error) {
		console.error('Error while retrieving data from localStorage: ' + error);

		return [];
	}
};
