import React from 'react';

/**
 * Stateless component with the function of presenting a Collapsible component.
 * 
 * @author Thaynan Nunes
 */
const Collapsible = ({ children }) => (
    <ul className="collapsible">
        { children }
    </ul>
);

export default Collapsible;