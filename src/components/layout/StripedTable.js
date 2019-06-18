import React from 'react';

/**
 * Stateless component with the function of presenting a striped table.
 * 
 * @author Thaynan Nunes
 */
const StripedTable = ({ children }) => (
    <table className="striped highlight responsive-table">
        { children }
    </table>
);

export default StripedTable;