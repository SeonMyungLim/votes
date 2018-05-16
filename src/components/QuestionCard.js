import { Card, CardTitle } from 'material-ui/Card';
import React, { Component } from 'react';
import * as R from 'ramda';
import { withRouter } from 'react-router-dom';

var getText = R.prop('text');
class QuestionCard extends Component {
    render() {
        const { optionOne, optionTwo } = this.props;
        return (
            <Card style={{ paddingBottom: '10px' }} onClick={this.redirect}>
                <CardTitle title="Whould You Rather" />
                <ul>
                    <li>{getText(optionOne)}</li>
                    <li>{getText(optionTwo)}</li>
                </ul>
            </Card>
        );
    }
    redirect = () => {
        this.props.history.push(`/questions/${this.props.id}`);
    };
}

export default withRouter(QuestionCard);
