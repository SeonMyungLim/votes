import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { connect } from 'react-redux';
import { logout } from '../actions/user';
import { withRouter } from 'react-router-dom';

class DropDownMenu extends Component {
    render() {
        return (
            <Fragment>
                <IconMenu
                    iconButtonElement={
                        <IconButton>
                            <MoreVertIcon />
                        </IconButton>
                    }
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                    iconStyle={{ color: 'white' }}
                >
                    <MenuItem
                        primaryText="Profile"
                        onClick={() => {
                            this.props.history.push('/profile');
                        }}
                    />
                    <MenuItem
                        primaryText="Logout"
                        onClick={() => {
                            this.props.logout();
                        }}
                    />
                </IconMenu>
            </Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logout }, dispatch);
}

export default withRouter(connect(undefined, mapDispatchToProps)(DropDownMenu));
