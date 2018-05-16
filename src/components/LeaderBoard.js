import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Avatar from 'material-ui/Avatar';
import * as R from 'ramda';

class LeaderBoard extends Component {
    render() {
        return (
            <Table>
                <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                    <TableRow>
                        <TableHeaderColumn>RANK</TableHeaderColumn>
                        <TableHeaderColumn>PROFILE</TableHeaderColumn>
                        <TableHeaderColumn>NAME</TableHeaderColumn>
                        <TableHeaderColumn>AKSED</TableHeaderColumn>
                        <TableHeaderColumn>ANSWEED</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {this.renderBody()}
                </TableBody>
            </Table>
        );
    }
    renderBody() {
        var map = R.addIndex(R.map);
        return R.compose(
            map(({ id, name, avatarURL, questions, answers }, idx) => {
                return (
                    <TableRow key={id}>
                        <TableRowColumn>{++idx}</TableRowColumn>
                        <TableRowColumn>
                            <Avatar src={avatarURL} />
                        </TableRowColumn>
                        <TableRowColumn>{name}</TableRowColumn>
                        <TableRowColumn>{questions.length}</TableRowColumn>
                        <TableRowColumn>
                            {R.compose(R.length, R.keys)(answers)}
                        </TableRowColumn>
                    </TableRow>
                );
            }),
            R.sortBy(({ questions, answers }) => {
                return -(questions.length + R.values(answers).length);
            }),
            R.values
        )(this.props.users);
    }
}

function mapStateToProps({ users }) {
    return {
        users,
    };
}

export default connect(mapStateToProps)(LeaderBoard);
