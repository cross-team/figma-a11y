import * as React from 'react';
import AddRole from './views/add-role';
import '../styles/ui.css';

declare function require(path: string): any;

const App = ({}) => {
    var [state, setState] = React.useState({
        selected: [],
        view: 'home',
    });

    window.onmessage = event => {
        setState({
            ...state,
            selected: event.data.pluginMessage,
        });
    };

    React.useEffect(() => {
        console.log(state);
    }, [state]);

    function handleAdd() {
        console.log('triggered');
        setState({
            ...state,
            view: 'add',
        });
    }

    switch (state.view) {
        case 'home':
            return (
                <div id="root">
                    {state.selected.length === 0 ? (
                        'Select a component to add a role to'
                    ) : (
                        <button onClick={handleAdd}>Add Role</button>
                    )}
                </div>
            );
        case 'add':
            return (
                <div id="root">
                    <AddRole selected={state.selected} />
                </div>
            );
        default:
            return <div id="root">Error</div>;
    }
};

export default App;
