import React, { useContext, FC, Component } from 'react';
import { HookRouter } from 'hookrouter';
import Dashboard from '../Dashboard';
import { Home } from '../Dashboard/Home';
import { Settings } from '../Dashboard/Settings';
import Auth from '../Auth';
import { UserContext } from '../App';

const withAuthentication = (TargetComponent: any) => {
    const user = useContext(UserContext);
    console.log(user);
    return class extends Component {
        constructor(TargetComponent: FC) {
            super(TargetComponent);
        }

        render() {
            if (user) {
                return <TargetComponent />;
            } else {
                return <Auth />;
            }
        }
    };
};

export const appRoutes: HookRouter.RouteObject = {
    '/dashboard*': () => withAuthentication(<Dashboard />),
    '/auth': () => <Auth />,
};

// Nested route of '/app'
export const viewRoutes: HookRouter.RouteObject = {
    '/': () => <Home />,
    '/settings': () => <Settings />,
};
