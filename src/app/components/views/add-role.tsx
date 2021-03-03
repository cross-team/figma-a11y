import * as React from 'react';
import {roles} from 'aria-query';

export default function AddRole({selected}) {
    var [state, setState] = React.useState({
        role: 'button',
        disabled: false,
        pressed: 'false',
        expanded: 'undefined',
        haspopup: 'false',
    });

    function handleRole(e) {
        setState({
            ...state,
            role: e.target.value,
        });
    }

    function handleChange(e) {
        setState({
            ...state,
            [e.target.name]: e.target.value,
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
        <form className="addRole">
            <p id="role-label">Role: Button</p>

            {/* <select aria-labelledby="role-label" value={state.role} onChange={handleRole}>
                <option value="">Choose a Role</option>
                {createOptions()}
            </select>
            {state.role !== '' && createProps(state.role)} */}

            <div className="inputWrapper">
                <label htmlFor="disabled-input">aria-disabled:</label>
                <input
                    name="disabled"
                    id="disabled-input"
                    type="checkbox"
                    aria-checked={state.disabled}
                    checked={state.disabled}
                    onChange={() => {
                        setState({
                            ...state,
                            disabled: !state.disabled,
                        });
                    }}
                />
            </div>

            <div className="inputWrapper">
                <label htmlFor="pressed-input">aria-pressed:</label>
                <select name="pressed" id="pressed-input" value={state.pressed} onChange={handleChange}>
                    <option>true</option>
                    <option>false</option>
                    <option>mixed</option>
                </select>
            </div>

            <div className="inputWrapper">
                <label htmlFor="expanded-input">aria-expanded:</label>
                <select name="expanded" id="expanded-input" value={state.expanded} onChange={handleChange}>
                    <option>undefined</option>
                    <option>false</option>
                    <option>true</option>
                </select>
            </div>

            <div className="inputWrapper">
                <label htmlFor="haspopup-input">aria-haspopup:</label>
                <select name="haspopup" id="haspopup-input" value={state.haspopup} onChange={handleChange}>
                    <option>false</option>
                    <option>true</option>
                    <option>menu</option>
                    <option>listbox</option>
                    <option>tree</option>
                    <option>grid</option>
                    <option>dialog</option>
                </select>
            </div>

            <button
                onClick={() => {
                    parent.postMessage({pluginMessage: {type: 'add', selected, state}}, '*');
                }}
            >
                Save Data
            </button>
        </form>
    );
}
