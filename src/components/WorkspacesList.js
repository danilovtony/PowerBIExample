import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {getWorkspaces} from "../api/PowerBI";


const WorkspacesList = () => {
    const [workspaces, setWorkspaces] = useState([]);

    useEffect(() => {
        getWorkspaces()
            .then((data) => {
                setWorkspaces(data)
            })
            .catch((e) => console.error(e));
    }, []);

    return (
        <div className='container'>
            <h1>Select Workspace</h1>
            <div className="row">
                {workspaces.map((workspace, index) =>
                    <div className="col-3">
                        <div key={workspace.id} className="card card-item mb-3">
                            <Link to={
                                `/workspaces/${workspace.id}/`
                            }
                                  className="card-body card-content"
                            >
                                <div className='trim'>{workspace.name}</div>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WorkspacesList;
