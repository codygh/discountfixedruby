import React from 'react';
import { withGlobalState } from 'react-globally';
import { withRouter } from "react-router-dom";
import {
  FormLayout, 
  TextField, 
  Icon,
  Button, 
  Stack, 
  Thumbnail, 
  SkeletonThumbnail
} from '@shopify/polaris';
import {
  SearchMinor,
  CancelSmallMinor,
} from '@shopify/polaris-icons';
import {
  ResourcePicker,
} from '@shopify/app-bridge-react'

class ProductSelector extends React.Component {
  state = {
    open: false,
    search: '',
  }

  handleSearchChange = (value) => {
    this.setState({search: value});
  }

  handleResourcePickerSelected = (selectPayload) =>{
    console.log(selectPayload);
    if(this.props.onChange != null){
      this.props.onChange(selectPayload.selection);
    }
    this.setState({open: false});
  }

  handleResourcePickerCancel = () =>{
    this.setState({open: false});
  }

  handleSearch = () => {
    this.setState({open: true});
  }

  handleDelete = (index) => {
    let selected = this.props.selected;
    selected.splice(index, 1);

    if(this.props.onChange != null){
      this.props.onChange(selected);
    }
  }


  renderItem = (item, index) => {
    const {
      title,
      images,
    } = item;

    const thumbnail = images.length == 0 ? <SkeletonThumbnail size='small'/> : <Thumbnail size='small' source={images[0].originalSrc}/>;

    return (
      <div key={index} style={{marginTop: '5px', marginBottom: '5px'}}>
        <Stack alignment='center'>
          <Stack.Item>
            {thumbnail}
          </Stack.Item>
          <Stack.Item fill>
            {title}
          </Stack.Item>
          <Stack.Item>
            <Button plain icon={CancelSmallMinor} onClick={()=>this.handleDelete(index)}></Button>
          </Stack.Item>
        </Stack>
      </div>
    );
  }

  render(){
    const {
      label,
      selected,
    } = this.props;

    const {
      open,
      search
    } = this.state;

    return (
      <FormLayout>
        <TextField 
          label= {label}
          placeholder='Search products'
          value={search}
          prefix= {<Icon source= {SearchMinor}/>}
          connectedRight={<Button onClick={this.handleSearch}>Search</Button>}
          onChange={this.handleSearchChange}
        />

        {selected && selected.map((item, index) => this.renderItem(item, index))}

        <ResourcePicker 
          resourceType="Product" open={open}
          initialSelectionIds = {selected}
          allowMultiple = {true}
          onSelection = {this.handleResourcePickerSelected}
          onCancel = {this.handleResourcePickerCancel}
          initialQuery = {search}
        />
      </FormLayout>
    );
  }
}

export default withGlobalState(withRouter(ProductSelector));