import React from 'react';

/**
 * Stateless component with the function to presenting the table's head.
 * 
 * @author Thaynan Nunes
 */
const TableHead = ({ headsNames}) => {
    const thHeadNames = headsNames.map((name, index) => (<th key={index}>{ name }</th>));

    return (
        <thead>
            <tr>
                { thHeadNames }
            </tr>
        </thead>
    );
}

export default TableHead;