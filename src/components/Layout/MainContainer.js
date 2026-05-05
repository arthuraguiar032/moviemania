import Header from '@/components/Layout/Header';
import Footer from "@/components/Layout/Footer";

import styles from "@/styles/MainContainer.module.css";

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