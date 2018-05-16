import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { LoadingBar } from 'react-redux-loading-bar';
import _ from 'lodash';
import moment from 'moment';
import { List, ListItem } from 'material-ui/List';
import * as R from 'ramda';
import LinearProgress from 'material-ui/LinearProgress';
import Toggle from 'material-ui/Checkbox';
import { Card, CardHeader, CardTitle } from 'material-ui/Card';
import { withRouter, Redirect } from 'react-router-dom';

import { submitAnswer } from '../actions/submitAnswer';

var getText = R.prop('text');

class Question extends Component {
    state = {
        selected: null,
    };
    render() {
        var { question, loginUser, routeId, users, err } = this.props;
        if (!question) {
            return <LoadingBar loading={1} />;
        }

        if (err) {
            return <Redirect to="/404" />;
        }

        var { name, avatarURL } = users[question.author];

        return (
            <Card>
                <CardHeader
                    title={name}
                    subtitle={moment(new Date(question.timestamp)).format(
                        'MMMM Do YYYY, h:mm:ss a'
                    )}
                    avatar={avatarURL}
                />
                <CardTitle title="Would You Rather" />
                {loginUser.answers[routeId]
                    ? this.renderAnswered(question)
                    : this.renderUnAnswered(question)}
            </Card>
        );
    }

    renderAnswered(question) {
        var { loginUser } = this.props;
        var { optionOne, optionTwo } = question;
        var optionOneLength = optionOne.votes.length;
        var optionTwoLength = optionTwo.votes.length;
        var total = optionOneLength + optionTwoLength;
        var p1 = optionOneLength / total * 100;
        var p2 = optionTwoLength / total * 100;
        var contains = R.contains(loginUser.id);
        return (
            <List>
                <ListItem
                    disabled={true}
                    style={{
                        background: contains(optionOne.votes)
                            ? '#BDBDBD'
                            : 'white',
                    }}
                >
                    <div>
                        {getText(optionOne)}{' '}
                        {`(${optionOneLength} votes | ${p1}%)`}
                    </div>
                    <LinearProgress mode="determinate" value={p1} />
                </ListItem>
                <ListItem
                    disabled={true}
                    style={{
                        background: contains(optionTwo.votes)
                            ? '#BDBDBD'
                            : 'white',
                    }}
                >
                    <div>
                        {getText(optionTwo)}{' '}
                        {`(${optionTwoLength} votes | ${p2}%)`}
                    </div>
                    <LinearProgress mode="determinate" value={p2} />
                </ListItem>
            </List>
        );
    }

    renderUnAnswered(question) {
        var { optionOne, optionTwo } = question;
        var { selected } = this.state;

        return (
            <Fragment>
                <List>
                    <ListItem
                        rightToggle={
                            <Toggle
                                checked={selected === 'optionOne'}
                                onCheck={() => {
                                    this.setState({
                                        selected: 'optionOne',
                                    });
                                }}
                            />
                        }
                    >
                        {getText(optionOne)}
                    </ListItem>
                    <ListItem
                        rightToggle={
                            <Toggle
                                checked={selected === 'optionTwo'}
                                onCheck={() => {
                                    this.setState({
                                        selected: 'optionTwo',
                                    });
                                }}
                            />
                        }
                    >
                        {getText(optionTwo)}
                    </ListItem>
                </List>
                <RaisedButton
                    label="SUBMIT"
                    secondary={true}
                    onClick={this.handleClick}
                    disabled={!this.state.selected}
                />
            </Fragment>
        );
    }

    handleClick = () => {
        var {
            submitAnswer,
            routeId,
            loginUser: { id },
        } = this.props;
        submitAnswer({
            authedUser: id,
            qid: routeId,
            answer: this.state.selected,
        });
        this.props.history.push('/');
    };
}

function mapStateToProps({ questions, loginUser, users }, { match }) {
    var routeId = _.result(match, 'params.id');
    var question = questions[routeId];
    var err = questions && routeId && !question;
    return {
        loginUser: users[loginUser],
        question,
        users,
        routeId,
        err,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ submitAnswer }, dispatch);
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Question)
);
