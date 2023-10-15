import styles from './AvatarName.module.scss';

interface AvatarNameProps {
	name: string;
	img: string;
}

const AvatarName = ({ name, img }: AvatarNameProps) => {
	return (
		<div className={styles.container}>
			<img className={styles.avatarImage} src={img} alt={`${name} avatar`} loading="lazy" />
			{name}
		</div>
	);
};

export default AvatarName;
