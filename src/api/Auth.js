import AuthenticationContext from 'adal-angular';
import {getToken} from '../utils';

const config = {
    clientId: process.env.REACT_APP_CLIENT_ID,
    redirectUri: window.location.origin,
    cacheLocation: "sessionStorage",
    postLogoutRedirectUri: window.location.origin,
    endpoints: {"https://api.powerbi.com/v1.0/": "https://analysis.windows.net/powerbi/api"}
};


const data = {
    powerBiApiResourceId: "https://analysis.windows.net/powerbi/api",
    authContext: null,
    userName: '',
    userIsAuthenticated: false,
    loginInProgress: false,
    accessToken: null,
    uiUpdateCallback: null,
}

export const getData = () => data;

export const setUiUpdateCallback = (cb) => {
    data.uiUpdateCallback = cb.bind(null, data);
}

export const init = () => {
    data.authContext = new AuthenticationContext(config);
    const isCallback = data.authContext.isCallback(window.location.hash);
    data.authContext.handleWindowCallback();
    data.loginInProgress = data.authContext.loginInProgress();

    if (isCallback && !data.authContext.getLoginError()) {
        const loginRequest = data.authContext.CONSTANTS.STORAGE.LOGIN_REQUEST;
        window.location.href = data.authContext._getItem(loginRequest);
    }

    const user = data.authContext.getCachedUser();
    if (user) {
        data.authContext.acquireToken(
            data.powerBiApiResourceId,
            (error, token) => {

                data.loginInProgress = data.authContext.loginInProgress();
                if (error || !token) {
                    alert('ERROR:\n\n' + error);
                    return;
                }
                localStorage.setItem('token', token);
                console.log("Access token:", token);
                data.accessToken = token;
                data.userIsAuthenticated = true;
                data.userName = user.profile["name"];
                if (data.uiUpdateCallback) {
                    data.uiUpdateCallback();
                }
            });
    }
    if (!user && data.uiUpdateCallback) {
        data.uiUpdateCallback();
    }
}

export const login = () => {
    data.authContext.login();
}

export const logout = () => {
    data.authContext.clearCache();
    data.authContext.logOut();
    data.userName = "";
    data.accessToken = "";
    localStorage.removeItem('token');
}