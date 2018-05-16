import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import { Card, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import _ from 'lodash';
import { buildQuestionAction } from '../actions/buildQuestion';
import { withRouter } from 'react-router-dom';

class BuildQuestion extends Component {
    state = {
        optionOneText: '',
        optionTwoText: '',
    };

    render() {
        return (
            <Card>
                <CardTitle title="Would You Rather" />
                <div>
                    <TextField
                        floatingLabelText="optionOneText"
                        onChange={(e) => {
                            this.setState({
                                optionOneText: _.result(e, 'target.value'),
                            });
                        }}
                        value={this.state.optionOneText}
                    />
                    <br />
                    <TextField
                        floatingLabelText="optionTwoText"
                        onChange={(e) => {
                            this.setState({
                                optionTwoText: _.result(e, 'target.value'),
                            });
                        }}
                        value={this.state.optionTwoText}
                    />
                </div>
                <RaisedButton
                    label="ADD"
                    secondary={true}
                    disabled={
                        !this.state.optionOneText || !this.state.optionTwoText
                    }
                    onClick={this.handleClick}
                />
            </Card>
        );
    }
    handleClick = (e) => {
        e.preventDefault();
        var {
            loginUser: { id },
            buildQuestionAction,
        } = this.props;
        var { optionOneText, optionTwoText } = this.state;
        buildQuestionAction({
            optionOneText,
            optionTwoText,
            author: id,
        });
        this.props.history.push('/');
    };
}

function mapStateToProps({ loginUser, users }, props) {
    return { loginUser: users[loginUser] };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ buildQuestionAction }, dispatch);
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(BuildQuestion)
);
