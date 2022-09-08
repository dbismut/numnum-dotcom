import fetch from "node-fetch";
import qs from "querystring";
// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
export const handler = async (event) => {
  const search = event.queryStringParameters.q || "star wars";
  try {
    const response = await fetch(
      `https://imdb-api.com/en/API/Search/k_c9j0cngm/${search}`
    );
    const rawData = await response.json();
    const items = rawData.results.map((i) => ({
      id: i.id,
      body: i.title,
      image_url: i.image,
      data: i,
    }));
    const data = { items, total: items.length };
    return {
      statusCode: 200,
      body: JSON.stringify(data),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
