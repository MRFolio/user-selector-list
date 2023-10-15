import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

const getAddUsersButton = () => screen.getByRole('button', { name: /add users/i });

describe('App', () => {
	beforeEach(() => {
		window.localStorage.clear();
	});

	test('using the search query should filter out the results', async () => {
		const user = userEvent.setup();

		render(<App />);

		await user.click(getAddUsersButton());

		expect(screen.getAllByRole('listitem')).toHaveLength(8);
		expect(screen.getByText(/albert fox/i)).toBeInTheDocument();
		expect(screen.getByText(/devon richards/i)).toBeInTheDocument();

		const input = screen.getByPlaceholderText(/find user/i);
		const searchValue = 'albert';

		await user.type(input, searchValue);

		expect(input).toHaveDisplayValue(searchValue);
		expect(screen.getAllByRole('listitem')).toHaveLength(1);
		expect(screen.getByText(/albert fox/i)).toBeInTheDocument();
		expect(screen.queryByText(/devon richards/i)).not.toBeInTheDocument();

		await user.type(input, 'random string Kääärijä that never matches with anything');

		expect(screen.queryByText(/albert fox/i)).not.toBeInTheDocument();
	});

	test('By clicking on the users, design changes to indicate the user state, is it selected or not', async () => {
		const user = userEvent.setup();

		render(<App />);

		await user.click(getAddUsersButton());

		const firstUser = screen.getAllByRole('listitem')[0];

		expect(firstUser).not.toHaveClass('isSelected');

		await user.click(firstUser);

		expect(firstUser).toHaveClass('isSelected');
		expect(within(firstUser).getByRole('img', { name: /blue checkmark/i })).toBeInTheDocument();

		await user.click(firstUser);

		expect(firstUser).not.toHaveClass('isSelected');
		expect(within(firstUser).queryByRole('img', { name: /blue checkmark/i })).not.toBeInTheDocument();
	});

	test('By clicking the “Add“ button in the dropdown, the selected users list is updated. After making initial changes and refreshing the browser, the selected users state should not change', async () => {
		const user = userEvent.setup();

		const { rerender } = render(<App />);

		const selectedUsersList = screen.getAllByRole('list')[0];

		expect(selectedUsersList).toBeEmptyDOMElement();

		await user.click(getAddUsersButton());

		expect(screen.getAllByRole('listitem')).toHaveLength(8);

		const userListItem = screen.getByText(/albert fox/i);
		const addButton = screen.getByRole('button', { name: /^add$/i });

		await user.click(userListItem);

		await user.click(addButton);

		expect(within(selectedUsersList).getAllByRole('listitem')).toHaveLength(1);
		expect(within(selectedUsersList).getByText(/albert fox/i)).toBeInTheDocument();

		rerender(<App />);

		expect(within(selectedUsersList).getAllByRole('listitem')).toHaveLength(1);
		expect(within(selectedUsersList).getByText(/albert fox/i)).toBeInTheDocument();

		// remove user from the selection list
		await user.click(within(selectedUsersList).getByText(/albert fox/i));

		expect(selectedUsersList).toBeEmptyDOMElement();

		rerender(<App />);

		expect(selectedUsersList).toBeEmptyDOMElement();
	});

	test('By clicking the “Cancel“ button, the temporary changes in the dropdown are rolled back and dropdown is closed', async () => {
		const user = userEvent.setup();

		render(<App />);

		expect(screen.queryByRole('heading', { name: /add users/i })).not.toBeInTheDocument();

		await user.click(getAddUsersButton());

		expect(screen.getByRole('heading', { name: /add users/i })).toBeInTheDocument();

		const firstUser = screen.getAllByRole('listitem')[0];

		expect(firstUser).not.toHaveClass('isSelected');

		await user.click(firstUser);

		expect(firstUser).toHaveClass('isSelected');
		expect(within(firstUser).getByRole('img', { name: /blue checkmark/i })).toBeInTheDocument();

		const cancelButton = screen.getByRole('button', { name: /cancel/i });

		await user.click(cancelButton);

		expect(screen.queryByRole('heading', { name: /add users/i })).not.toBeInTheDocument();

		await user.click(getAddUsersButton());

		expect(screen.getAllByRole('listitem')[0]).not.toHaveClass('isSelected');
		expect(screen.queryByRole('img', { name: /blue checkmark/i })).not.toBeInTheDocument();
	});
});
