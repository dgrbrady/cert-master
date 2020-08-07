/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCert = /* GraphQL */ `
  query GetCert($id: ID!) {
    getCert(id: $id) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const listCerts = /* GraphQL */ `
  query ListCerts(
    $filter: ModelCertFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCerts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
