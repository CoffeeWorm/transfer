import React, { ReactText } from 'react';
import { RouteProps, Redirect } from 'react-router-dom';
import Connect from '@/render/pages/Connect';
import Waiting from '@/render/pages/Waiting';

export interface RouteConfig extends RouteProps {
  key: ReactText;
  childrenList?: Array<RouteConfig>;
}

const routes: Array<RouteConfig> = [
  { path: '/index', component: Connect, key: 'connect' },
  { path: '/waiting', component: Waiting, key: 'waiting' },
  // { path: '/dialogueList', component: Connect, key: 'connectList' },
  // { path: '/dialogue/:id', component: Connect, key: 'connect' },
  { path: '*', component: () => <Redirect to="/index" />, key: 'connect' },
];

export default routes;
