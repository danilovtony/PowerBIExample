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
import PrivateRoute from "./components/PrivateRoute";

import {init, setUiUpdateCallback} from "./api/Auth";


const App = () => {
    const history = useHistory();

    const [loading, setLoading] = useState(false);

    useEffect(()=> {
        const token = localStorage.getItem('token');
        const locationPath = history.location.pathname;

        if (!token) {
            setLoading(true)
            setUiUpdateCallback ((data) => {
                setLoading(false);

                if (data.userIsAuthenticated) {
                    history.push('/workspaces');
                } else {
                    history.push('/login');
                }
            });
            init();
        } else if(token && locationPath === '/') {
             history.push('/workspaces')
        }
    }, [history]);
    return (
        <div className='AppWrapper'>
            <div className='App'>
                {loading ?
                    <p className='text-center'>Loading...</p>
                    :
                    <Switch>
                        <Route path='/login' component={Login} />

                        <PrivateRoute exact path='/workspaces' component={WorkspacesList}/>

                        <PrivateRoute exact path='/workspaces/:workspaceId' component={Workspace} />

                        <PrivateRoute exact path='/workspaces/:workspaceId/dashboards/:dashboardId' component={Dashboard} />

                        <PrivateRoute exact path='/workspaces/:workspaceId/dashboards' component={DashboardsList} />

                        <PrivateRoute exact path='/workspaces/:workspaceId/reports' component={ReportsList} />

                        <PrivateRoute exact path='/workspaces/:workspaceId/reports/:reportId' component={Report} />
                    </Switch>
                }
            </div>
        </div>
    );
}

export default App;
