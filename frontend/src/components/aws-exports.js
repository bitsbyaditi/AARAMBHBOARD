const awsconfig = {
  Auth: {
    region: 'ap-south-1',
    userPoolId: 'ap-south-1_0vdoVYeYp',
    userPoolWebClientId: '14e6n99bjmlduuob8d6m9cbiph',
    mandatorySignIn: true,
    oauth: {} // ✅ prevents loginWith crash
  }
};

export default awsconfig;
