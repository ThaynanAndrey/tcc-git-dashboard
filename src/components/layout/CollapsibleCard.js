import React from 'react';

/**
 * Stateless component with the function of presenting a Collapsible Card.
 * 
 * @author Thaynan Nunes
 */
const CollapsibleCard = ({ children, isActive }) => (
    <li className={isActive ? "active" : ""}>
        { children }
    </li>
);

export default CollapsibleCard;