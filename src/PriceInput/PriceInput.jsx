import React from 'react';
import { connect } from 'react-redux';
class PriceInput extends React.Component {

    constructor(props) {
        super(props);

        this.state = { price: this.props.defaultPrice };
        debugger;
        this.handleChange = this.handleChange.bind(this);
    }
    
    
    handleChange = event => {
        this.setState({ price: event.target.value });
    };

    render() {
        
        return <input type="number" className="form-control" id="shareLink" name="shareLink" value={this.state.price} onChange={this.handleChange} placeholder="Price..." />
    }
}

function mapStateToProps(state) {
    //const { loggingIn, token } = state.authentication;
    return {
        //,
        //token
    };
}

const connectedPriceInput = connect(mapStateToProps)(PriceInput);
export { connectedPriceInput as PriceInput }; 