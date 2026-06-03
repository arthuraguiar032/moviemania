import { Children, useState } from "react";
import PropTypes from "prop-types";
import styles from './Tabs.module.css';


const Tabs = ({children}) => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = Children.toArray(children);
    const names = tabs.map((tab) => tab.props.name);

    return (
      <div className={styles.tabs}>
        <nav className={styles.nav}>
          <ul className={styles.list}>
            {names.map((name, index) => (
              <li key={index}>
                <button
                  onClick={() => setActiveTab(index)}
                  className={`${styles.button} ${activeTab === index ? styles.buttonActive : ""}`}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.content}>{tabs[activeTab].props.children}</div>
      </div>
    );

};

export default Tabs;

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
};

