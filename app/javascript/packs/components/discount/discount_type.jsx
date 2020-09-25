import React from 'react'
import {
  FormLayout, 
  ChoiceList,
} from '@shopify/polaris';
import { withGlobalState } from 'react-globally';
import { withRouter } from "react-router-dom";

class DiscountType extends React.Component {

  handleChange = (value) => { 
    if(this.props.onChange != null){
      this.props.onChange(value[0]);
    }
  }

  render(){
    const {
      selected
    } = this.props;

    return (
      <FormLayout>
        <ChoiceList
          choices={[
            {label: 'Percentage', value: 'percentage', helpText: 'Disabled in prototype version', disabled: true},
            {label: 'Fixed amount', value: 'fixed', helpText: 'Disabled in prototype version', disabled: true},
            {label: 'Buy X get Y', value: 'upsell', disabled: false},
          ]}
          selected={selected}
          onChange={this.handleChange}
        />
      </FormLayout>
    );
  }
}

export default withGlobalState(withRouter(DiscountType));