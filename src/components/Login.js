import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Toggle from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import { login } from '../actions/user';
import { withRouter } from 'react-router-dom';
import { Card } from 'material-ui/Card';

class Login extends Component {
    state = {
        selected: null,
    };
    render() {
        return (
            <Card>
                <List>{this.renderList()}</List>
                <RaisedButton
                    label="LOGIN"
                    secondary={true}
                    onClick={this.handleClick}
                />
            </Card>
        );
    }

    handleClick = () => {
        var { selected } = this.state;
        if (!selected) {
            return alert('select user');
        }
        this.props.login(this.props.users[selected]);
        this.props.history.push('/');
    };

    renderList() {
        return _.map(this.props.users, ({ id, avatarURL, name }) => {
            return (
                <ListItem
                    key={id}
                    leftAvatar={<Avatar src={avatarURL} />}
                    rightToggle={
                        <Toggle
                            checked={this.state.selected === id}
                            onCheck={() => {
                                this.setState({ selected: id });
                            }}
                        />
                    }
                >
                    {name}
                </ListItem>
            );
        });
    }
}

function mapStateToProps({ users }, props) {
    return {
        users,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ login }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
