import React, {useEffect, useState} from 'react';
import {
    Route,
    Switch,
    useHistory
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './components/Login';
import WorkspacesList from './components/WorkspacesList';
import DashboardsList from './components/DashboardsList';
import ReportsList from './components/ReportsList';
import Dashboard from './components/Dashboard';
import Report from './components/Report';
import Workspace from './components/Workspace';

import {init, setUiUpdateCallback} from "./api/Auth";


const App = () => {
    const history = useHistory();

    useEffect(()=> {
        setUiUpdateCallback ((data) => {
            if (data.userIsAuthenticated) {
                history.push('/workspaces');
            } else {
                history.push('/login');
            }
        });
        init();
    }, [history]);

    return (
        <div className='AppWrapper'>
            <div className='App'>
                <Switch>
                    <Route path='/login' component={Login} />

                    <Route exact path='/workspaces'>
                        <WorkspacesList />
                    </Route>

                    <Route exact path='/workspaces/:workspaceId'>
                        <Workspace />
                    </Route>

                    <Route exact path='/workspaces/:workspaceId/dashboards/:dashboardId'>
                        <Dashboard/>
                    </Route>

                    <Route exact path='/workspaces/:workspaceId/dashboards'>
                        <DashboardsList />
                    </Route>

                    <Route exact path='/workspaces/:workspaceId/reports'>
                        <ReportsList />
                    </Route>

                    <Route exact path='/workspaces/:workspaceId/reports/:reportId'>
                        <Report/>
                    </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;
