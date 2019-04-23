import React from "react";
import { Redirect } from 'react-router-dom';

import { isLogged } from '../../store/actions/authAction';

/**
 * High Order Component to verify user is logged, if is logged shows Component, otherwise
 * shows Login Component.
 * 
 * @param {Function} Component
 *      Component to be showed if user's logged
 * @author Thaynan Nunes
 */
export function requireAuthentication(Component) {
    return class AuthenticatedComponent extends React.Component {

        /**
         * Check if the user is authenticated.
         */
        isAuthenticated() {
            return isLogged();
        }

        render() {
            return (
                <div>
                    { this.isAuthenticated() ? <Component {...this.props} /> : <Redirect to='/login' /> }
                </div>
            );
        }
    };
}

export default requireAuthentication;