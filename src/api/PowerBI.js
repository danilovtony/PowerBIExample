import {getData} from "./Auth";

const apiRoot = "https://api.powerbi.com/v1.0/myorg/";


export const getWorkspaces = () => {
    const restUrl = apiRoot + "groups/";
    return fetch(restUrl, {
        headers: {
            "Accept": "application/json;odata.metadata=minimal;",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    }).then(response => response.json())
        .then(response => response.value || []);
}

export const getReportsInWorkspace = (workspaceId) => {
    const restUrl = `${apiRoot}groups/${workspaceId}/reports/`;
    return fetch(restUrl, {
        headers: {
            "Accept": "application/json;odata.metadata=minimal;",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    }).then(response => response.json())
        .then(response => response.value || []);
}


export const getDashboardsInWorkspace = (workspaceId) => {
    const restUrl = `${apiRoot}groups/${workspaceId}/dashboards/`;

    return fetch(restUrl, {
        headers: {
            "Accept": "application/json;odata.metadata=minimal;",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    }).then(response => response.json())
        .then(response => response.value || []);
}

export const getDashboardInWorkspace = (workspaceId, dashboardId) => {
    const restUrl = `${apiRoot}groups/${workspaceId}/dashboards/${dashboardId}`;

    return fetch(restUrl, {
        headers: {
            "Accept": "application/json;odata.metadata=minimal;",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    }).then(response => response.json());
}

export const getReportInWorkspace = (workspaceId, reportId) => {
    const restUrl = `${apiRoot}groups/${workspaceId}/reports/${reportId}`;

    return fetch(restUrl, {
        headers: {
            "Accept": "application/json;odata.metadata=minimal;",
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    }).then(response => response.json());
}

// export const getDashboardTiles = ( ,dashboardId) => {
//     restUrl = PowerBiService.appWorkspaceApiRoot + "Dashboards/" + dashboardId + "/tiles/";
//     return fetch(restUrl, {
//         headers: {
//             "Accept": "application/json;odata.metadata=minimal;",
//             "Authorization": "Bearer " + getData().accessToken
//         }
//     }).then(response => response.json())
//         .then(response => { return response.value; });
// }

// export const getDatasets = () => {
//     var restUrl = PowerBiService.appWorkspaceApiRoot + "Datasets/";
//     return fetch(restUrl, {
//         headers: {
//             "Accept": "application/json;odata.metadata=minimal;",
//             "Authorization": "Bearer " + getData().accessToken
//         }
//     }).then(response => response.json())
//         .then(response => { return response.value; });
// }