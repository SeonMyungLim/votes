import React, { Component, Fragment } from 'react';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';
import Divider from 'material-ui/Divider';
import QuestionCard from './QuestionCard';
import * as R from 'ramda';

class Profile extends Component {
    render() {
        var { loginUser } = this.props;
        return (
            <Fragment>
                <div>
                    <Avatar src={loginUser.avatarURL} size={100} />
                    <span>{loginUser.name}</span>
                </div>
                <Divider />
                <h1>QUESTION ANSWERED</h1>
                <div>{this.renderAnswered()}</div>
                <Divider />
                <h1>QUESTION ASKED</h1>
                <div>{this.renderAsked()}</div>
                <Divider />
            </Fragment>
        );
    }
    renderQuestions(questions = []) {
        return R.compose(
            R.map(({ id, optionOne, optionTwo }) => {
                return (
                    <QuestionCard
                        optionOne={optionOne}
                        optionTwo={optionTwo}
                        id={id}
                        key={id}
                    />
                );
            }),
            R.sort(({ timestamp: ta }, { timestamp: tb }) => tb - ta)
        )(questions);
    }

    renderAnswered() {
        var { loginUser, questions } = this.props;
        return R.compose(
            this.renderQuestions,
            R.map(R.prop(R.__, questions)),
            R.keys,
            R.prop('answers')
        )(loginUser);
    }

    renderAsked() {
        var { loginUser, questions } = this.props;
        return R.compose(
            this.renderQuestions,
            R.map(R.prop(R.__, questions)),
            R.prop('questions')
        )(loginUser);
    }
}

function mapStateToProps({ loginUser, questions, users }) {
    return {
        loginUser: users[loginUser],
        questions,
    };
}

export default connect(mapStateToProps)(Profile);
