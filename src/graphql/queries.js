/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        name
        group
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getApplicantForm = /* GraphQL */ `
  query GetApplicantForm($userId: String!) {
    getApplicantForm(userId: $userId) {
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
export const listApplicantForms = /* GraphQL */ `
  query ListApplicantForms(
    $userId: String
    $filter: ModelApplicantFormFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listApplicantForms(
      userId: $userId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
