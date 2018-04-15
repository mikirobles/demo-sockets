import React from 'react';

class WithInput extends React.Component {
    constructor() {
        super();
        this.state = {
            inputValue: '',
        };
    }

    onChange = e => {
        this.setState({
            inputValue: e.target.value,
        });
    };

    render = () => {
        return this.props.children({
            inputValue: this.state.inputValue,
            onChange: this.onChange
        });
    };
}

export default WithInput;
