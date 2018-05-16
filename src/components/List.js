import React, { Component, Fragment } from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { connect } from 'react-redux';
import * as R from 'ramda';
import QuestionCard from './QuestionCard';

class List extends Component {
    render() {
        return (
            <Fragment>
                <Tabs>
                    <Tab label="UNANSWEREED">{this.renderUnAnswered()}</Tab>
                    <Tab label="ANSWEREED">{this.renderAnswered()}</Tab>
                </Tabs>
            </Fragment>
        );
    }

    renderUnAnswered() {
        var { questions, loginUser } = this.props;

        return R.compose(
            this.renderQuestions,
            R.values,
            R.filter(
                R.compose(R.not, R.has(R.__, loginUser.answers), R.prop('id'))
            )
        )(questions);
    }
    renderAnswered() {
        var { questions, loginUser } = this.props;

        return R.compose(
            this.renderQuestions,
            R.values,
            R.filter(R.compose(R.has(R.__, loginUser.answers), R.prop('id')))
        )(questions);
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
}

function mapStateToProps({ loginUser, questions, users } = {}, props) {
    return {
        loginUser: users[loginUser],
        questions,
        users,
    };
}

export default connect(mapStateToProps)(List);
