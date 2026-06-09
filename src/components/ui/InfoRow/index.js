import styles from './InfoRow.module.css';

const InfoRow = ({label, children}) => {

    return (
        <div className={styles.infoRow}>
            <strong className={styles.infoLabel}>
                {label}
            </strong>
            <div className={styles.textList}>
                {children}
            </div>
        </div>
    );
};

export default InfoRow; 