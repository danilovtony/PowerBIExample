import React from 'react';
import {Redirect} from 'react-router-dom';
import {login, getData} from '../api/Auth.js';


const Login = () => {
    const {userIsAuthenticated, loginInProgress} = getData();


    return (
        userIsAuthenticated
            ? <Redirect to={'/workspaces'}/>
            : loginInProgress
                ? <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
                : <div>
                    <button className='btn btn-primary' onClick={() => login()}>
                        Login
                    </button>
                </div>
    );
}

export default Login;
