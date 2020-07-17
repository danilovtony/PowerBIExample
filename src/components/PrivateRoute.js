import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import queryString from 'query-string';
import {getToken, setToken} from '../utils';

const PrivateRoute = ({component: Component, ...rest}) => {
    const searchObj = queryString.parse(rest.location.search);
    if (!searchObj.token) {
        searchObj.token = getToken();
    }

    if(searchObj.token) {
        setToken(searchObj.token);
    }

    return (
        <> {
            searchObj.token
                ? <Route {...rest}>
                    <Component/>
                </Route>
                : <Redirect to={'/login'}/>
        }
        </>
    )
}
export default PrivateRoute;