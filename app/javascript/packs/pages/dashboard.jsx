import React from 'react'
import { withGlobalState } from 'react-globally';
import { withRouter } from "react-router-dom";
import {
  TextContainer,
  Layout,
  Page,
  Card,
  TextStyle,
  Link,
  Heading,
  List,
  AppProvider
} from '@shopify/polaris';
class Dashboard extends React.Component {
  render() {
    return (
      <AppProvider>
        <Page
        >
          <Layout sectioned>
            <Card title='PSwatch Privacy Policy' sectioned>
              <TextContainer>
                <p>PSwatch provides the best way to transform basic product options to beautiful swatches. This Privacy Policy describes how personal information is collected, used, and shared when you install or use the App in connection with your Shopify-supported store.</p>
                <Heading>Personal Information the App Collects</Heading>
                <p>When you install the App, we are automatically able to access certain types of information from your Shopify account</p>
                <List type="bullet">
                  <List.Item><Link url='https://help.shopify.com/api/reference/store_properties/shop'>Your shop data</Link></List.Item>
                </List>
                <Heading>How Do We Use Your Personal Information?</Heading>
                <p>We use the personal information we collect from you and your customers in order to provide the Service and to operate the App. Additionally, we use this personal information to: Communicate with you; Optimize or improve the App; and Provide you with information or advertising relating to our products or services.</p>
                <Heading>Sharing Your Personal Information</Heading>
                <p>Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</p>
                <p>Your Rights If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.</p>
                <p>Additionally, if you are a European resident we note that we are processing your information in order to fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information will be transferred outside of Europe, including to Canada and the United States.</p>
                <Heading>Changes </Heading>
                <p>We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.</p>
                <Heading>Contact Us </Heading>
                <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <TextStyle variation='code'>supports@dotbrick.io</TextStyle>.</p>
              </TextContainer>
            </Card>
          </Layout>
        </Page>
      </AppProvider>
    );
  }
}

export default withGlobalState(withRouter(Dashboard));