exports.handler = (event: any, context: any, callback: any) => {
  // Identify why was this function invoked
  if (
    event.triggerSource === `CustomMessage_SignUp` ||
    event.triggerSource === `CustomMessage_ResendCode`
  ) {
    // Ensure that your message contains event.request.codeParameter. This is the placeholder for code that will be sent
    const { codeParameter } = event.request;
    event.response.emailSubject = `Baggers - Verify your email`; // event.request.codeParameter
    event.response.emailMessage = `<h1>Thank you for signing up to Baggers</h1><p>To finish signing up, please enter the following code at https://baggers.link</p>
    <div style="background: #f8f8f8 ;text-align: center;width: 500px;height: 100px;display: flex; align-items: center;"><h1>${codeParameter}</h1></div>`;
  }

  // Return to Amazon Cognito
  callback(null, event);
};

export {};
