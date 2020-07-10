import React from 'react';
import {Link, useParams} from 'react-router-dom';

const Workspace = () => {
    let {workspaceId} = useParams();

    return (
        <div className='container'>
            <h1>Select Category</h1>
            <div className="row justify-content-center">
                <div className="col-3">
                    <div className="card card-item mb-3">
                        <Link to={`/workspaces/${workspaceId}/dashboards/`}
                              className="card-body card-content"
                        >
                            <div className="trim">Dashboards</div>
                        </Link>
                    </div>
                </div>
                <div className="col-3">
                    <div className="card card-item mb-3">
                        <Link to={`/workspaces/${workspaceId}/reports/`}
                              className="card-body card-content"
                        >
                            <div className="trim">Reports</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Workspace;
