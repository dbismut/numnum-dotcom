import fetch from "node-fetch";
// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
export const handler = async (event) => {
  try {
    const response = await fetch(
      "https://imdb-api.com/en/API/Top250Movies/k_c9j0cngm"
    );
    const rawData = await response.json();
    const items = rawData.items.map((i) => ({
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
