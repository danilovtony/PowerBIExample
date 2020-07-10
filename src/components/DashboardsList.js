import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from 'react';
import {getDashboardsInWorkspace} from '../api/PowerBI';

const DashboardsList = () => {
    const {workspaceId} = useParams();
    const [dashboards, setDashboards] = useState([]);

    useEffect(() => {
        getDashboardsInWorkspace(workspaceId)
            .then((data) => {
                setDashboards(data)
            })
            .catch((e) => console.log(e));
    }, []);

    return (
        <div className='container'>
            <h1>Select Dashboard</h1>
            <div className="row">
                {dashboards.map((dashboard, index) =>
                    <div className="col-3 ">
                        <div key={dashboard.id} className="card card-item mb-3">
                            <Link to={`/workspaces/${workspaceId}/dashboards/${dashboard.id}`}
                                  className="card-body card-content"
                            >
                                <div className="trim">{dashboard.displayName}</div>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashboardsList;
