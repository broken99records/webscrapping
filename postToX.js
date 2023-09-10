// Import twitter-api-v2
const { TwitterApi } = require("twitter-api-v2");

//using .env file
require('dotenv').config();

// Fill your API credentials
const client = new TwitterApi({
	appKey: process.env.API_Key,
	appSecret: process.env.API_Key_Secret,
	accessToken: process.env.Access_Token,
	accessSecret: process.env.Access_Token_Secret,
	bearerToken: process.env.BEARER_TOKEN,
});

// Provide read write controls
const rwClient = client.readWrite;

// Create textTweet function which post
// a text only tweet
const tweetText = async () => {
	try {

		// Use .tweet() method and pass the
		// text you want to post
		await rwClient.v2.tweet(
			"This tweet is for a test");

		console.log("success");
	} catch (error) {
		console.log(error);
	}
};

// Create tweet function which post
// tweet with media and text
const mediaTweet = async () => {
	try {

		// Create mediaID
		const mediaId = await client.v1.uploadMedia(

			// Put path of image you wish to post
			"./screenshotOnCarPage.jpg"
		);

		// Use tweet() method and pass object with text
		// in text feild and media items in media feild
		await rwClient.v2.tweet({
			text:"This tweet has been created using vscode, just testing!",

			media: { media_ids: [mediaId] },

     
		});
		console.log("success");
	} catch (error) {
		console.log(error);
	}
};

// Call any of methods and you are done
//tweetText();
mediaTweet();
