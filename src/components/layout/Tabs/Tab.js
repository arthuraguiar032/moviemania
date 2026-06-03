import PropTypes from "prop-types";


const Tab = ({children, name}) => {
    return <div>{children}</div>
};

export default Tab;

Tab.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};