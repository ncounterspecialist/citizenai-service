import { GraphQLClient } from "graphql-request";
import { getValueFromObject } from "./data.util";

type RequestType = {
  queryName: string;
  query: any;
  body: any;
  header: any;
};

type ResponseData = any | { items: any[] };
type ResponseType = {
  data: ResponseData;
  query: any;
  body: any;
  header: any;
};
const endpoint = process.env.REACT_APP_APPSYNC_ENDPOINT as string;
const awsClient: GraphQLClient = new GraphQLClient(endpoint);
export const executeQuery = async ({
  queryName,
  query,
  body,
  header,
}: RequestType) => {
  console.log("input is: " + JSON.stringify(body));
  console.log("URL: ", endpoint);
  let nextToken = null;
  let result: ResponseData = null;
  try {
    let input = { ...(body || {}) };
    let response: ResponseType = await awsClient.request(query, input, header);
    console.log("Succeeded: %j", queryName, "nextToken :", !!nextToken);
    let data: ResponseData = getValueFromObject(
      response?.data || response,
      queryName
    );
    nextToken = data?.nextToken;
    if (result?.items) {
      result.items = [...result.items, ...(data?.items || [])];
    } else {
      result = data;
    }
    console.log(
      "final result is: %j",
      result?.items?.length ||
        (typeof result == "string" ? result.substring(0, 100) : result)
    );
    return Promise.resolve(result);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const executeScanQuery = async ({
  queryName,
  query,
  body,
  header,
}: RequestType) => {
  console.log("input is: " + JSON.stringify(body));
  let nextToken = null;
  let result: ResponseData = null;
  try {
    do {
      let input = { ...(body || {}) };
      if (nextToken) {
        input["nextToken"] = nextToken;
      }
      let response: ResponseData = await awsClient.request(
        query,
        input,
        header
      );
      console.log("Succeeded: %j", queryName, "nextToken :", !!nextToken);
      let data: ResponseData = getValueFromObject(
        response?.data || response,
        queryName
      );
      nextToken = data?.nextToken;
      if (result?.items) {
        result.items = [...result.items, ...(data?.items || [])];
      } else {
        result = data;
      }
    } while (nextToken);
    console.log(
      "final result is: %j",
      result?.items?.length ||
        (typeof result == "string" ? result.substring(0, 100) : result)
    );
    return Promise.resolve(result);
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
export default awsClient;
