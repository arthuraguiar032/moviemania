import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

import styles from './MainContainer.module.css';

const MainContainer = ({children}) => {

    return (
        <>
            <Header />
            <main className={styles.container}>
                {children}
            </main>
            <Footer />

        </>
    );
};

export default MainContainer;