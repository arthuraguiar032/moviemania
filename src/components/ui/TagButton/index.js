import Link from "next/link";
import styles from './TagButton.module.css';

const TagButton = ({label, path}) => {
    return (
      <Link href={path} className={styles.tag}>
        {label}
      </Link>
    );
};

export default TagButton;