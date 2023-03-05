export type AmplifyDependentResourcesAttributes = {
  "api": {
    "pmacv1": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string"
    }
  },
  "auth": {
    "pmacv10893bbb00893bbb0": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    },
    "userPoolGroups": {
      "AdminGroupRole": "string",
      "ChairGroupRole": "string",
      "FacultyGroupRole": "string",
      "StudentGroupRole": "string"
    }
  },
  "function": {
    "pmacv10893bbb00893bbb0PostConfirmation": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "storage": {
    "recommendationletters": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}