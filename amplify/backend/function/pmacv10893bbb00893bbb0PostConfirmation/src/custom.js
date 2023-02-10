const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB()

const cognitoIdp = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event, context) => {
  const username = event.userName;
  const email = event.request.userAttributes.email;

  // Determine the group name using the user's email address
  const groupName = email.endsWith("@ulm.edu") ? "Faculty" : "Student";

  // Define the parameters for the adminAddUserToGroup API
  const params = {
    UserPoolId: "us-east-1_K216AnHxh",
    Username: username,
    GroupName: groupName
  };

  try {
    console.log("Adding user to a group")
    // Call the adminAddUserToGroup API
    await cognitoIdp.adminAddUserToGroup(params).promise();
  } catch(err) {
    console.log("Error", err);
  }
  console.log("Added successfully")

  console.log("Now adding to the database")
  let date = new Date()

  if (event.request.userAttributes.sub) {
      let params = {
          Item: {
              'id': {S: event.request.userAttributes.sub},
              '__typename': {S: 'User'},
              'username': {S: username},
              'email': {S: email},
              'createdAt': {S: date.toISOString()},
              'updatedAt': {S: date.toISOString()},
          },
          TableName: process.env.USERTABLE
      }

      try {
          await ddb.putItem(params).promise()
          console.log("Successfull added user")
      } catch (err) {
          console.log("Error", err)
      }

      console.log("Success: Everything executed correctly")
      context.done(null, event)

  } else {
      console.log("Error: Nothing was written to DynamoDB")
      context.done(null, event)
  }
};