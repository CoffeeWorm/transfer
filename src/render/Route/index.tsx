import React, { Component, ReactElement } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import routes, { RouteConfig } from './routes';

class AppRoute extends Component {
  renderRoute(routes: Array<RouteConfig>): Array<ReactElement> {
    return routes.map(({ childrenList, ...route }) =>
      childrenList ? (
        <Route {...route}>
          {childrenList.map((child) => this.renderRoute([child]))}
        </Route>
      ) : (
        <Route {...route} />
      )
    );
  }

  render() {
    return (
      <HashRouter>
        <Switch>{this.renderRoute(routes)}</Switch>
      </HashRouter>
    );
  }
}
export default AppRoute;
