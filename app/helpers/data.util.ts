export const parseData = (data: any) => {
  if (!data) {
    return null;
  }
  try {
    if (typeof data === "string") {
      return JSON.parse(data);
    } else {
      return data;
    }
  } catch (err) {
    console.log("parsing error");
    console.log(err);
    return null;
  }
};

export const getValueFromObject = (userData: any, key: string) => {
  let data = parseData(userData);
  return data?.[key];
};
