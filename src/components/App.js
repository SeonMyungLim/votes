import React, { Component, Fragment } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import '../styles/App.css';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { bindActionCreators } from 'redux';
import { LoadingBar } from 'react-redux-loading-bar';

import { BrowserRouter, Redirect } from 'react-router-dom';
import Header from './Header';
import List from './List';
import Login from './Login';
import Question from './Question';
import BuildQuestion from './BuildQuestion';
import LeaderBoard from './LeaderBoard';
import Profile from './Profile';
import NotFound from './NotFound';

import { getInitialDataAction } from '../actions/getData';
import { setMenuStatus } from '../actions/setMenuStatus';

class App extends Component {
    componentDidMount() {
        this.props.actions.getInitialDataAction();
    }
    render() {
        var { loading } = this.props;
        return (
            <BrowserRouter>
                <MuiThemeProvider>
                    <Fragment>
                        <LoadingBar
                            loading={loading.default}
                            style={{
                                backgroundColor: 'orange',
                                height: '2px',
                                zIndex: 1111,
                            }}
                        />
                        <Header />
                        <Route
                            exact
                            path="/"
                            render={() => this.checkAuth(<List />)}
                        />
                        <Route exact path="/login" component={Login} />
                        <Route
                            exact
                            path="/questions/:id"
                            render={() => this.checkAuth(<Question />)}
                        />
                        <Route
                            exact
                            path="/add"
                            render={() => this.checkAuth(<BuildQuestion />)}
                        />
                        <Route
                            exact
                            path="/leaderboard"
                            render={() => this.checkAuth(<LeaderBoard />)}
                        />
                        <Route
                            exact
                            path="/profile"
                            render={() => this.checkAuth(<Profile />)}
                        />
                        <Route exact path="/404" component={NotFound} />
                        <Drawer
                            open={this.props.isMenuOpen}
                            docked={false}
                            onRequestChange={(open) => {
                                this.props.actions.setMenuStatus(open);
                            }}
                        >
                            {this.renderLinks()}
                        </Drawer>
                    </Fragment>
                </MuiThemeProvider>
            </BrowserRouter>
        );
    }
    renderLinks() {
        return [
            ['/', 'Home'],
            ['/leaderboard', 'Leaderboard'],
            ['/add', 'Create Poll'],
        ].map(([to, name]) => {
            return (
                <Link
                    key={name}
                    to={to}
                    onClick={() => {
                        this.props.actions.setMenuStatus(false);
                    }}
                >
                    <MenuItem>{name}</MenuItem>
                </Link>
            );
        });
    }
    checkAuth(comp) {
        return this.props.loginUser ? comp : <Redirect to="/login" />;
    }
}

function mapStateToProps({ isMenuOpen, loading, loginUser } = {}, props) {
    return {
        isMenuOpen,
        loginUser,
        loading: loading || { default: 1 },
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(
            {
                getInitialDataAction,
                setMenuStatus,
            },
            dispatch
        ),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
