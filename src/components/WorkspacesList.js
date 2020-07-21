import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {getWorkspaces} from "../api/PowerBI";
import {getToken} from '../utils';

const WorkspacesList = () => {
    const [workspaces, setWorkspaces] = useState([]);
    useEffect(() => {
        getWorkspaces()
            .then((data) => {
                setWorkspaces(data)
            })
            .catch((e) => {
                console.error(e)
            });
    }, []);

    return (
        <div className='container'>
            <h1>Select Workspace</h1>
            <div className="row">
                {workspaces.map((workspace, index) =>
                    <div key={workspace.id} className="col-3">
                        <div className="card card-item mb-3">
                            <Link to={{
                                pathname: `/workspaces/${workspace.id}/`,
                                search: `?token=${getToken()}`
                            }}
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
