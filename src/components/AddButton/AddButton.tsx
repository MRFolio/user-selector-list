import styles from './AddButton.module.scss';

interface ActionButtonProps {
	handleAddClick: () => void;
}

const AddButton = ({ handleAddClick }: ActionButtonProps) => {
	return (
		<footer className={styles.container}>
			<button className={styles.button} onClick={handleAddClick}>
				Add
			</button>
		</footer>
	);
};

export default AddButton;
