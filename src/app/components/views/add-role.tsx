import * as React from 'react';
import {roles} from 'aria-query';

export default function AddRole({selected}) {
    var [state, setState] = React.useState({
        role: '',
    });

    function handleRole(e) {
        setState({
            ...state,
            role: e.target.value,
        });
    }

    function createOptions() {
        let options = [];

        let roleIterator = roles.keys();
        let result = roleIterator.next();
        while (!result.done) {
            options.push(<option value={result.value}>{result.value}</option>);
            result = roleIterator.next();
        }

        return options;
    }

    function createProps(role) {
        let props;
        let roleData = roles.get(role);
        console.log(roles.get(role));

        return props;
    }

    return (
        <form>
            <label id="role-label">Role:</label>
            <select aria-labelledby="role-label" value={state.role} onChange={handleRole}>
                <option value="">Choose a Role</option>
                {createOptions()}
            </select>
            {state.role !== '' && createProps(state.role)}
        </form>
    );
}
