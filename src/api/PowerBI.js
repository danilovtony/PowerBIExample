import {getData} from "./Auth";

const apiRoot = "https://api.powerbi.com/v1.0/myorg/";

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    if (response.status === 403)
        localStorage.removeItem('token');
    return window.location.replace(process.env.REACT_APP_NGROK);
};

export const getWorkspaces = () => {
    const restUrl = apiRoot + "groups/";
    return fetch(restUrl, {
        headers: {
            "Accept": "application/json;odata.metadata=minimal;",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    })
        .then(response => checkStatus(response))
        .then(response => response.json())
        .then(response => response.value || []);
}

export const getReportsInWorkspace = (workspaceId) => {
    const restUrl = `${apiRoot}groups/${workspaceId}/reports/`;
    return fetch(restUrl, {
        headers: {
            "Accept": "application/json;odata.metadata=minimal;",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    }).then(response => checkStatus(response))
        .then(response => response.json())
        .then(response => response.value || []);
}


export const getDashboardsInWorkspace = (workspaceId) => {
    const restUrl = `${apiRoot}groups/${workspaceId}/dashboards/`;

    return fetch(restUrl, {
        headers: {
            "Accept": "application/json;odata.metadata=minimal;",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    }).then(response => checkStatus(response))
        .then(response => response.json())
        .then(response => response.value || []);
}

export const getDashboardInWorkspace = (workspaceId, dashboardId) => {
    const restUrl = `${apiRoot}groups/${workspaceId}/dashboards/${dashboardId}`;

    return fetch(restUrl, {
        headers: {
            "Accept": "application/json;odata.metadata=minimal;",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    }).then(response => checkStatus(response))
        .then(response => response.json());
}

export const getReportInWorkspace = (workspaceId, reportId) => {
    const restUrl = `${apiRoot}groups/${workspaceId}/reports/${reportId}`;

    return fetch(restUrl, {
        headers: {
            "Accept": "application/json;odata.metadata=minimal;",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    }).then(response => checkStatus(response))
        .then(response => response.json());
}