export const createRequestResponseTable = /* GraphQL */ `
  mutation CreateRequestResponseTable(
    $input: CreateRequestResponseTableInput!
    $condition: ModelRequestResponseTableConditionInput
  ) {
    createRequestResponseTable(input: $input, condition: $condition) {
      id
      requestId
      projectId
      requestTime
      inputType
      input
      inputSchema
      output
      mOutput
      outputSchema
      outputMetadata
      status
      errorMessage
      createdAt
      updatedAt
      _version
      __typename
    }
  }
`;

export const updateRequestResponseTable = /* GraphQL */ `
  mutation UpdateRequestResponseTable(
    $input: UpdateRequestResponseTableInput!
    $condition: ModelRequestResponseTableConditionInput
  ) {
    updateRequestResponseTable(input: $input, condition: $condition) {
      id
      requestId
      projectId
      requestTime
      inputType
      input
      inputSchema
      output
      mOutput
      outputSchema
      outputMetadata
      status
      errorMessage
      createdAt
      updatedAt
      _version
      __typename
    }
  }
`;
