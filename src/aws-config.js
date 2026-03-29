const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: "us-east-2_WAxl422nF",
      userPoolClientId: "5so38a2ljo9hjvl5une795390g",
      loginWith: {
        email: true
      }
    }
  }
};

export default awsConfig;