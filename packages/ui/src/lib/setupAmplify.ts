import Amplify from 'aws-amplify';

const AMPLIFY_CONFIG = {
  aws_project_region: process.env.NEXT_PUBLIC_AWS_REGION,
  aws_cognito_region: process.env.NEXT_PUBLIC_AWS_REGION,
  aws_cognito_identity_pool_id: process.env.NEXT_PUBLIC_COGNITO_IDENTITYPOOL_ID,
  aws_user_pools_id: process.env.NEXT_PUBLIC_COGNITO_USERPOOL_ID,
  aws_user_pools_web_client_id:
    process.env.NEXT_PUBLIC_COGNITO_USERPOOL_WEBCLIENT_ID,
  oauth: {},
  ssr: true,
};

Amplify.configure(AMPLIFY_CONFIG);
