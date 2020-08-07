/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCert = /* GraphQL */ `
  mutation CreateCert(
    $input: CreateCertInput!
    $condition: ModelCertConditionInput
  ) {
    createCert(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const updateCert = /* GraphQL */ `
  mutation UpdateCert(
    $input: UpdateCertInput!
    $condition: ModelCertConditionInput
  ) {
    updateCert(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
export const deleteCert = /* GraphQL */ `
  mutation DeleteCert(
    $input: DeleteCertInput!
    $condition: ModelCertConditionInput
  ) {
    deleteCert(input: $input, condition: $condition) {
      id
      name
      description
      image
      createdAt
      updatedAt
    }
  }
`;
