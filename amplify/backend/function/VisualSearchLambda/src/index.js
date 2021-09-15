/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	AUTH_RECIPERECOGNIZERAPP8EBD3806_USERPOOLID
	STORAGE_S3STORAGERECIPERECOGNIZER_BUCKETNAME
	VISUAL_SEARCH_ENDPOINT_URL
Amplify Params - DO NOT EDIT */

exports.handler = async (event) => {
    // TODO implement
    const response = {
          statusCode: 200,
          headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Headers": "*"
          },
        body: JSON.stringify('Hello from Lambda!'),
        event
    };
    return response;
};
