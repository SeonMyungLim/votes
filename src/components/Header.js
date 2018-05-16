import React, { Component, Fragment } from 'react';
import Avatar from 'material-ui/Avatar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setMenuStatus } from '../actions/setMenuStatus';

import AppBar from 'material-ui/AppBar';
import DropDownMenu from './DropdownMenu';

class Header extends Component {
    render() {
        var { loginUser, setMenuStatus } = this.props;
        return (
            <AppBar
                title="Would You Rather"
                showMenuIconButton={!!loginUser}
                onLeftIconButtonClick={() => {
                    setMenuStatus(true);
                }}
                iconElementRight={loginUser ? this.renderRight() : null}
            />
        );
    }
    renderRight() {
        var {
            loginUser: { avatarURL, name },
        } = this.props;
        return (
            <Fragment>
                <span>{name}</span>
                <Avatar src={avatarURL} />
                <DropDownMenu />
            </Fragment>
        );
    }
}

function mapStateToProps({ loginUser, users }, props) {
    return {
        loginUser: users[loginUser],
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ setMenuStatus }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
