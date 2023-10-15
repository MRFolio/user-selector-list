import { SELECTED_USERS_KEY } from '../constants/localStorageKeys';

export type User = {
	id: number;
	name: string;
	img: string;
};

export type SelectedUsersLocalStorageKey = typeof SELECTED_USERS_KEY;
