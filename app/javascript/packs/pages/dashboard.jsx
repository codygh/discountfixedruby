import React from 'react';
import {
  SkeletonPage,
  SkeletonDisplayText,
  SkeletonBodyText,
  Page,
  Banner,
  Stack,
  TextContainer,
  ResourceList,
  Layout,
  Filters,
  Card,
  TextStyle,
  Badge,
} from '@shopify/polaris';
import { withGlobalState } from 'react-globally';
import { withRouter } from "react-router-dom";
import { get_shop, get_discounts, create_discount, activate_discount, deactivate_discount, delete_discount, downgrade } from '../middleware/api';

class Dashboard extends React.Component {
  state = {
		isLoading: true,
		createLoading: false,
		selectedItems: [],
		searchValue: '',
		searchLoading: false,
		discounts: [],
    disableCreate: false,
	};

	constructor(props) {
		super(props);
	}

  handleCreate = () => {
    this.setState({createLoading: true});
    this.props.history.push("/discount");
	}

  componentDidMount() {
    this.loadData();
  }

  loadData() {
		get_discounts(this.state.searchValue).then(
			(discounts) => {
				if (discounts == null) {
					discounts = [];
				}
				this.setState({ discounts: discounts, selectedItems: [], isLoading: false , searchLoading: false});
			}
		);
	}

  handleSelectionChange = (selectedItems) => {
    this.setState({selectedItems});
	};

  timeoutLoadData = NaN;
	callLoadData = () => {
		this.timeoutLoadData = setTimeout(() => {
			//load data
			this.loadData();
		}, 800);
	}

  handleQueryChange = (searchValue) => {
		this.setState({ searchLoading: true, searchValue: searchValue });
		clearTimeout(this.timeoutLoadData);
		this.callLoadData();
	};

  renderItem = (item) => {
		const {
			id,
      title,
      active,
		} = item;

		return (
			<ResourceList.Item
				id={id}
				accessibilityLabel={`View details for ${title}`}
        onClick={()=>{this.props.history.push("/discount/"+id)}}
        persistActions
			>
			<Stack alignment='center'>
				<Stack.Item fullWidth>
				<h3>
					<TextStyle variation="strong">{title}</TextStyle>
				</h3>
				</Stack.Item>
        {active ? (<Badge status='success'>Enabled</Badge>) : (<Badge status='critical'>Disabled</Badge>)}
        <TextStyle variation='subdued'>Total upsell money earn: $0</TextStyle>
			</Stack>
			</ResourceList.Item>
		);
	};

  render() {
    const {
			isLoading,
      createLoading,
      selectedItems,
      searchValue,
      searchLoading,
      discounts,
      disableCreate,
		} = this.state;

    const resourceName = {
			singular: 'discount',
			plural: 'discounts',
		};

    const promotedBulkActions = [
		];

    const bulkActions = [
    ];

    const filterControl = (
      <Filters
        queryValue={searchValue}
        filters={[]}
        onQueryChange={this.handleQueryChange}
        onQueryClear={()=> this.handleQueryChange('')}
      >
      </Filters>
		);

    const loadingMarkup = (
			<SkeletonPage fullWidth primaryAction>
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

    const actualMarkup = (
			<Page fullWidth
				title='Dashboard'
				primaryAction={{ content: 'New discount', onAction: this.handleCreate, loading: createLoading, disabled: disableCreate}}
			>
        <Layout sectioned>
          <Card>
            <Banner status='info'>
              You can have more data to show here, like total upsell money earn, total time customers add item to cart and checkout, or even some charts to show you historical data.
            </Banner>
          </Card>

          <Card sectioned>
            <ResourceList
              resourceName={resourceName}
              items={discounts}
              renderItem={this.renderItem}
              selectedItems={selectedItems}
              onSelectionChange={this.handleSelectionChange}
              promotedBulkActions={promotedBulkActions}
              bulkActions={bulkActions}
              filterControl={filterControl}
              loading={searchLoading}
            />
          </Card>
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

export default withGlobalState(withRouter(Dashboard));