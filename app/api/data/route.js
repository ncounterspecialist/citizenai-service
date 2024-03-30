import { headers, cookies } from "next/headers";

export async function POST(request) {
  try {
    const body = await request.json();
    const headersList = headers();
    const cookieStore = cookies();
    console.log("Headers", headersList);
    console.log("Cookies", cookieStore);
    console.log("Body", body);
    return Response.json(
      {
        message: "Success",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json("Error in sending message");
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const headersList = headers();
    const cookieStore = cookies();
    console.log("Headers", headersList);
    console.log("Cookies", cookieStore);
    console.log("SearchParams", searchParams);

    return Response.json(
      {
        message: "Success",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return Response.json("Error in sending message");
  }
}
