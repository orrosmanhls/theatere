import React, { useLayoutEffect } from 'react';
import NetworkManager from './framework/NetworkManager';
import { Amplify } from 'aws-amplify';

import { Authenticator, Heading, useTheme, Text } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Example from './components/Example/Example';
import { Items } from './Items';
Amplify.configure({
  Auth: {
    region: process.env.NX_APP_AWS_REGION || '',
    userPoolId: process.env.NX_APP_AWS_POOL_ID || '',
    userPoolWebClientId: process.env.NX_APP_AWS_WEB_CLIENT_ID || ''
  }
});

const formFields = {
  confirmVerifyUser: {
    confirmation_code: {
      labelHidden: false,
      label: 'New Label',
      placeholder: 'Enter your Confirmation Code:',
      isRequired: false
    }
  }
};
const components = {
  VerifyUser: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    }
  },

  ConfirmVerifyUser: {
    Header() {
      const { tokens } = useTheme();
      return (
        <Heading padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`} level={3}>
          Enter Information:
        </Heading>
      );
    },
    Footer() {
      return <Text>Footer Information</Text>;
    }
  }
};

const App: React.FC = () => {
  useLayoutEffect(() => NetworkManager.init(), []);

  return (
    <Authenticator
      loginMechanisms={['email']}
      formFields={formFields}
      components={components}
      hideSignUp={true}
    >
      {() => (
        <>
          <Example text="Hello World!" />
          <Items />
        </>
      )}
    </Authenticator>
  );
};

export default App;
