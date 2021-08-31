import AWS from "aws-sdk";
import { APIGatewayProxyHandler } from "aws-lambda";
const CognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider({
  apiVersion: `2016-04-19`,
  region: process.env.COGNITO_AWS_REGION,
});

export const verifyEmail: APIGatewayProxyHandler = async function (event) {
  try {
    if (event.queryStringParameters) {
      const { clientId, code, username } = event.queryStringParameters;

      if (!clientId || !code || !username) {
        return { statusCode: 500, body: `Required query params missing` };
      }
      const confirmSignUp = CognitoIdentityServiceProvider.confirmSignUp({
        ClientId: clientId,
        ConfirmationCode: code,
        Username: username,
      }).promise();

      await confirmSignUp;
    }
  } catch (e) {
    console.error(e);
  }
  const redirectUrl = process.env.POST_REGISTRATION_VERIFICATION_REDIRECT_URL;
  return {
    statusCode: 302,
    body: ``,
    headers: {
      "Content-Type": `application/json`,
      "Access-Control-Expose-Headers": `*`,
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": `*`,
      "Access-Control-Allow-Methods": `*`,
      "Access-Control-Allow-Headers": `*`,
      Location: redirectUrl || `https://baggers.link/portfolios`,
    },
  };
};
