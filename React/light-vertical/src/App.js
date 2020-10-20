import React, { Component, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';

import { routes } from './routes';

// setup fake backend
import { configureFakeBackend } from './helpers';
import { isUserAuthenticated } from './helpers/authUtils';

// Themes
import './assets/scss/DefaultTheme.scss';


// Lazy loading and code splitting - 
// Derieved idea from https://blog.logrocket.com/lazy-loading-components-in-react-16-6-6cea535c0b52
const loading = () => <div></div>

// All layouts/containers
const NonAuthLayout = Loadable({
  loader: () => import('./components/NonAuthLayout'),
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
  loading
});

const AuthLayout = Loadable({
  loader: () => import('./components/AuthLayout'),
  render(loaded, props) {
    let Component = loaded.default;
    return <Component {...props} />;
  },
  loading
});

// configure fake backend
configureFakeBackend();

/**
 * Exports the component with layout wrapped to it
 * @param {} WrappedComponent 
 */
const withLayout = (WrappedComponent) => {
  const HOC = class extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return connect()(HOC);
}



/**
 * Main app component
 */
class App extends Component {
  /**
 * Returns the layout component based on different properties
 * @param {*} props 
 */
  getLayout = () => {
    return isUserAuthenticated() ? AuthLayout : NonAuthLayout;
  }

  render() {
    return (
      // rendering the router with layout
      <BrowserRouter>
        <React.Fragment>
          {routes.map((route, index) => {
            return (
              <route.route
                key={index}
                path={route.path}
                exact={route.exact}
                roles={route.roles}
                component={withLayout(props => {
                  const Layout = this.getLayout();
                  return (
                    <Suspense fallback={loading()}>
                      <Layout {...props} title={route.title}>
                        <route.component {...props} />
                      </Layout>
                    </Suspense>
                  );
                })}
              />
            );
          })}
        </React.Fragment>
      </BrowserRouter>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.Auth.isAuthenticated
  }
}

export default connect(mapStateToProps, null)(App);