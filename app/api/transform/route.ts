import { executeQuery } from "@/app/helpers/awsClient";
import { apiErrorHandler } from "@/app/helpers/data.util";
import {
  createRequestResponseTable,
  updateRequestResponseTable,
} from "@/app/helpers/query";
import { headers, cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const headersList = headers();
    const cookieStore = cookies();
    console.log("Headers", headersList);
    console.log("Cookies", cookieStore);

    const { context, requestBody } = body || {};
    const { requestId, organizationId, projectId } = context || {};
    const now = Math.floor(new Date().getTime() / 1000);
    const {
      timestamp,
      approvalStatus,
      inputType,
      input,
      inputSchema,
      output,
      outputSchema,
      outputMetadata,
      mOutput,
      status,
      errorMessage,
    } = requestBody || {};
    const postObject = {
      requestId,
      projectId,
      clientEventTime: timestamp,
      requestTime: now,
      requestDay: Math.floor(now / 86400),
      input: typeof input === "string" ? input : JSON.stringify(input),
      inputSchema,
      output: typeof output === "string" ? output : JSON.stringify(output),
      outputSchema,
      outputMetadata,
      mOutput: typeof mOutput === "string" ? mOutput : JSON.stringify(mOutput),
      status,
      approvalStatus: approvalStatus || "PENDING",
      errorMessage,
    };
    const response =
      (await executeQuery({
        queryName: "createRequestResponseTable",
        query: createRequestResponseTable,
        body: {
          input: postObject,
        },
        header: {
          "x-api-key": process.env.APPSYNC_APIKEY as string,
        },
      })) || {};

    if (!response) {
      return Response.json(
        {
          message: "Failed",
        },
        {
          status: 400,
        }
      );
    }

    return Response.json(
      {
        message: "Success",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return apiErrorHandler(error);
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const headersList = headers();
    const cookieStore = cookies();
    console.log("Headers", headersList);
    console.log("Cookies", cookieStore);
    const { context, requestBody } = body || {};
    const { requestId, organizationId, projectId } = context || {};
    const {
      id,
      timestamp,
      inputType,
      input,
      inputSchema,
      output,
      mOutput,
      outputSchema,
      outputMetadata,
      approvalStatus,
      status,
      errorMessage,
      _version,
    } = requestBody || {};
    const postObject = {
      id,
      requestId,
      projectId,
      timestamp,
      inputType,
      input: typeof input === "string" ? input : JSON.stringify(input),
      inputSchema,
      output: typeof output === "string" ? output : JSON.stringify(output),
      outputSchema,
      outputMetadata,
      mOutput: typeof mOutput === "string" ? mOutput : JSON.stringify(mOutput),
      status,
      approvalStatus: approvalStatus || "PENDING",
      errorMessage,
      _version,
    };
    const response =
      (await executeQuery({
        queryName: "updateRequestResponseTable",
        query: updateRequestResponseTable,
        body: {
          input: postObject,
        },
        header: {
          "x-api-key": process.env.APPSYNC_APIKEY as string,
        },
      })) || {};

    if (!response) {
      return Response.json(
        {
          message: "Failed",
        },
        {
          status: 400,
        }
      );
    }

    return Response.json(
      {
        message: "Success",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return apiErrorHandler(error);
  }
}
