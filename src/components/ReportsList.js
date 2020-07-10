import React, {useEffect, useState} from 'react';
import {getReportsInWorkspace} from '../api/PowerBI';
import {Link, useParams} from "react-router-dom";

const   ReportsList = () => {
    const {workspaceId} = useParams();
    const [reports, setReports] = useState([]);

    useEffect(() => {
        getReportsInWorkspace(workspaceId)
            .then((data) => {
                setReports(data)
            })
            .catch((e) => console.log(e));
    }, []);

    return (
        <div className='container'>
            <h1>Select Dashboard</h1>
            <div className="row">
                {reports.map((report, index) =>
                    <div className="col-3 ">
                        <div key={report.id} className="card card-item mb-3">
                            <Link to={`/workspaces/${workspaceId}/reports/${report.id}`}
                                  className="card-body card-content"
                            >
                                <div className="trim">{report.name}</div>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default  ReportsList;
