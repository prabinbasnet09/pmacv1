/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $username: String
  ) {
    onCreateUser(filter: $filter, username: $username) {
      id
      username
      email
      name
      group
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $username: String
  ) {
    onUpdateUser(filter: $filter, username: $username) {
      id
      username
      email
      name
      group
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $username: String
  ) {
    onDeleteUser(filter: $filter, username: $username) {
      id
      username
      email
      name
      group
      createdAt
      updatedAt
    }
  }
`;
export const onCreateApplicantForm = /* GraphQL */ `
  subscription OnCreateApplicantForm(
    $filter: ModelSubscriptionApplicantFormFilterInput
    $userId: String
  ) {
    onCreateApplicantForm(filter: $filter, userId: $userId) {
      userId
      fullName
      cwid
      cellPhone
      email
      major
      minor
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateApplicantForm = /* GraphQL */ `
  subscription OnUpdateApplicantForm(
    $filter: ModelSubscriptionApplicantFormFilterInput
    $userId: String
  ) {
    onUpdateApplicantForm(filter: $filter, userId: $userId) {
      userId
      fullName
      cwid
      cellPhone
      email
      major
      minor
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteApplicantForm = /* GraphQL */ `
  subscription OnDeleteApplicantForm(
    $filter: ModelSubscriptionApplicantFormFilterInput
    $userId: String
  ) {
    onDeleteApplicantForm(filter: $filter, userId: $userId) {
      userId
      fullName
      cwid
      cellPhone
      email
      major
      minor
      createdAt
      updatedAt
    }
  }
`;
