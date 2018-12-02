import React, { Component } from 'react';
import { maps } from '../../../common/services';

import './UserInputForm.scss';

/**
 * Component Name: UserInputForm
 * Description: This component will render the auto complete form
 */
class UserInputForm extends Component {
    originInput;
    originInputAutoComplete;
    destInput;
    destInputAutoComplete;

   
    getRoute = () => {
        const origin = this.originInputAutoComplete.getPlace();
        const dest = this.destInputAutoComplete.getPlace();
        this.props.getDirections(origin, dest);
    };

  
    renderAutoComplete = async () => {
        const maps = await this.props.maps();

        this.originInputAutoComplete = new maps.places.Autocomplete(this.originInput);

        this.destInputAutoComplete = new maps.places.Autocomplete(this.destInput);
    };

   
    componentDidMount() {
        this.renderAutoComplete();
    }

  
    render() {
        return (
            <div className="userinput-form">
                <div className="form-input">
                    <label>Starting Location</label>
                    <input type="text" ref={el => (this.originInput = el)} />
                </div>
                <div className="form-input">
                    <label>Drop-off point</label>
                    <input type="text" ref={el => (this.destInput = el)} />
                </div>
                <div className="go-btn">
                    <button onClick={this.getRoute}>Go</button>
                </div>
            </div>
        );
    }
}

UserInputForm.defaultProps = {
    maps
};

export default UserInputForm;
