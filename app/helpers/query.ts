export const createRequestResponseTable = /* GraphQL */ `
  mutation CreateRequestResponseTable(
    $input: CreateRequestResponseTableInput!
    $condition: ModelRequestResponseTableConditionInput
  ) {
    createRequestResponseTable(input: $input, condition: $condition) {
      id
      requestId
      projectId
      clientEventTime
      requestTime
      requestDay
      inputType
      input
      inputSchema
      output
      mOutput
      outputSchema
      outputMetadata
      status
      errorMessage
      approvalStatus
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
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
      clientEventTime
      requestTime
      requestDay
      inputType
      input
      inputSchema
      output
      mOutput
      outputSchema
      outputMetadata
      status
      errorMessage
      approvalStatus
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      __typename
    }
  }
`;
