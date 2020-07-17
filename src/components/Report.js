import React, {useEffect, useRef} from 'react';
import {useParams} from 'react-router-dom';
import {getReportInWorkspace} from '../api/PowerBI';
import {PowerBiEmbeddingService} from '../utils';

const Report = () => {
    let {reportId, workspaceId} = useParams();
    const reportIdRef = useRef();

    useEffect(() => {
        if (reportId && reportIdRef.current !== reportId) {
            reportIdRef.current = reportId;
            getReportInWorkspace(workspaceId, reportId)
                .then((data) => {
                    updateEmbeddedReport(reportId, data);
                })
                .catch((e) => {console.error(e)});

        }
    }, [reportId]);

    const updateEmbeddedReport = (reportId, data) => {
        const embedContainer = document.getElementById('embed-container');
        if (data && embedContainer)
            PowerBiEmbeddingService.embedReport(data, embedContainer);
    };

    return (

        <div id="embedded-report" className='w-100 d-flex flex-grow-1'>
            <div id='embed-container' className='flex-grow-1'></div>
        </div>

    );
}

export default Report;
