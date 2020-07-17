import React, {useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {getDashboardInWorkspace} from '../api/PowerBI';
import {PowerBiEmbeddingService} from '../utils';

const Dashboard = () => {
    let {dashboardId, workspaceId} = useParams();
    const dashboardIdRef = useRef();

    useEffect(() => {

        if (dashboardId && dashboardIdRef.current !== dashboardId) {
            dashboardIdRef.current = dashboardId;
            getDashboardInWorkspace(workspaceId, dashboardId)
                .then((data) => {
                    updateEmbeddedDashboard(dashboardId, data);
                })
                .catch((e) => {console.error(e)});
        }
    }, [dashboardId]);

    const updateEmbeddedDashboard = (dashboardId, data) => {

        const embedContainer = document.getElementById('embed-container');
        if (data && embedContainer)
            PowerBiEmbeddingService.embedDashboard(data, embedContainer);
    };

    return (

        <div id="embedded-report" className='w-100 d-flex flex-grow-1'>
            <div id='embed-container' className='flex-grow-1'></div>
        </div>

    );
}

export default Dashboard;
