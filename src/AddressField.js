import React from 'react';
import DebounceInput from 'react-debounce-input';

class AddressField extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.props.onAddressChange(event.target.value);
    }

    render() {
        return (
            <DebounceInput
                minLength={4}
                debounceTimeout={300}
                onChange={this.handleChange} />
        );
    }
}

export default AddressField