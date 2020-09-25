import React from 'react'
import {
  Page,
  Layout,
  Card,
  SkeletonPage,
  TextContainer,
  SkeletonBodyText,
  SkeletonDisplayText,
  FormLayout,
  TextField,
  Label,
  Subheading,
  Heading,
  RadioButton, 
  Button
} from "@shopify/polaris";
import { withGlobalState } from 'react-globally';
import { withRouter } from "react-router-dom";
import { create_discount, delete_discount, get_discount, update_discount } from '../middleware/api';
import ProductSelector from '../components/discount/product_selector';

class Discount extends React.Component {
  state = {
    isLoading: true,
    discount: false,
    newDiscount: true,
    pageActionLoading: false,
    errorDiscountName: '',
    saveLoading: false,
    saveDisabled: true,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
		this.loadData();
	}

  initDiscount() {
    return {
      title: 'New Discount',
      active: true,
      buy_type: 'quantity',
      buy_value: 1,
      buy_products: [],
      buy_products_id: '',
      get_products: [],
      get_products_id: '',
      get_value: 1,
      offer_type: 'fixed',
      offer_value: 0,
    };
  }

  loadData() {
    let id = this.props.match.params.id;
    if (id == undefined) {
      this.setState({ isLoading: false, discount: this.initDiscount(), newDiscount: true, saveDisabled: false});
    } else {
      get_discount(id).then(
        (discount) => {
          if(discount == null){
            this.props.history.push("/notfound");
            return;
          }
          this.setState({ isLoading: false, discount: discount, newDiscount: false });
        }
      );
    }
  }

  handleDelete = () => {
    delete_discount(this.state.discount).then(
      result =>{
        this.props.history.push("/");
      }
    ); 
  }
  handleSave = () =>{
    this.setState({saveLoading: true});
    if(this.state.newDiscount){
      create_discount(this.state.discount).then(
        (result)=>{
          this.setState({newDiscount: false, saveLoading: false, saveDisabled: true, discount: result});
          this.props.globalState.showToast("Created.", false);
        }
      );
    }else{
      update_discount(this.state.discount).then(
        (result)=>{
          this.setState({saveLoading: false, saveDisabled: true});
          this.props.globalState.showToast("Updated.", false);
        }
      );
    }
  }

  handleNameChange = (value) => {
    let discount = this.state.discount;
    discount.title = value;
    let errorDiscountName = '';
    if(value.trim() == ""){
      errorDiscountName = 'Title cannot be blank.';
    }
    this.setState({saveDisabled: false, discount: discount, errorDiscountName: errorDiscountName});
  }

  handleBuyChange = (value) => {
    let discount = this.state.discount;
    discount.buy_products = value;
    let temp = value.map( item => this.convertGidToId(item.id));
    discount.buy_products_id = temp.join('-');
    this.setState({discount: discount});
  }

  convertGidToId = (gid) => {
    gid = gid.split('/');
    return gid[gid.length-1];
  }

  handleGetChange = (value) => {
    let discount = this.state.discount;
    discount.get_products = value;
    let temp = value.map( item => this.convertGidToId(item.id));
    discount.get_products_id = temp.join('-');
    this.setState({discount: discount});
  }

  handleOfferTypeChange = (_checked, value) => {
    let discount = this.state.discount;
    discount.offer_type = value;
    this.setState({discount: discount});
  }

  handleOfferValueChange = (value) => {
    let discount = this.state.discount;
    discount.offer_value = value;
    this.setState({discount: discount});
  }

  render() {
    const {
      isLoading,
      discount,
      newDiscount,
      pageActionLoading,
      errorDiscountName,
      saveDisabled,
      saveLoading,
    } = this.state;

    const {
      shop,
    } = this.props.globalState;

    const loadingMarkup = (
      <SkeletonPage>
        <Layout>
          <Layout.Section>
            <Card sectioned>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText />
              </TextContainer>
            </Card>
          </Layout.Section>
        </Layout>
      </SkeletonPage>
    );

    const actualMarkup = discount && (
      <Page
        breadcrumbs={[{ content: 'Back', onAction: ()=> this.props.history.push("/")}]}
        title={discount.title}
        primaryAction={{content: 'Save', disabled: saveDisabled, loading: saveLoading, onAction: this.handleSave}}
      >
        <Layout>
          <Layout.Section>
            <Card sectioned title='Discount title'>
              <FormLayout>
                <TextField
                  label='Title'
                  value={discount.title}
                  onChange={this.handleNameChange}
                  placeholder='e.g. Bundle A'
                  helpText='Meaningful name so you can manage it later in Dashboard.'
                  error={errorDiscountName}
                />
              </FormLayout>
            </Card>
            <Card title='Customer buys'>
              <Card.Section>
                <FormLayout>
                  <Label>Any items from specific products</Label>
                  <ProductSelector label='' selected = {discount.buy_products} onChange = {this.handleBuyChange}/>
                </FormLayout>
              </Card.Section>
              <Card.Section>
                <FormLayout>
                  <Heading>Customer gets</Heading>
                  <Label>Customers must add the quantity of items specified below to their cart.</Label>
                  <ProductSelector label='' selected = {discount.get_products} onChange = {this.handleGetChange}/>
                  <Subheading>At a discounted value</Subheading>
                  <div>
                    <RadioButton
                      label="Percentage"
                      checked={discount.offer_type === 'percentage'}
                      helpText='Not working yet.'
                      id="percentage"
                      disabled={true}
                      name="offer_type"
                      onChange={this.handleOfferTypeChange}
                    />
                    <RadioButton
                      label="Fixed"
                      id="fixed"
                      name="offer_type"
                      checked={discount.offer_type === 'fixed'}
                      onChange={this.handleOfferTypeChange}
                    />
                  </div>
                  <TextField
                    placeholder='0.00'
                    value={discount.offer_value}
                    onChange={this.handleOfferValueChange}
                    helpText='No validation check, so please enter valid number'
                    prefix="$"
                  />
                </FormLayout>
              </Card.Section>
            </Card>
          </Layout.Section>
          <Layout.Section secondary>
            <Card title="Title" sectioned secondaryFooterActions={[{content: 'Delete', destructive: true, onClick: this.handleDelete, disabled: newDiscount}]}> 
              <p>Information</p>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );

    const markup = isLoading ? loadingMarkup : actualMarkup;

    return (
      <div>
        {markup}
      </div>
    );
  }
}

export default withGlobalState(withRouter(Discount))
