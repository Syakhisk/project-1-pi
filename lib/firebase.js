import firebase from "firebase/app";
import "firebase/messaging";

// require("dotenv").config({ path: "../.env" });
const firebaseConfig = {
	apiKey: process.env.apiKey,
	authDomain: process.env.authDomain,
	projectId: process.env.projectId,
	storageBucket: process.env.storageBucket,
	messagingSenderId: process.env.messagingSenderId,
	appId: process.env.appId,
};

let messaging;

if (typeof window !== "undefined" && !firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
	window.firebase = firebase;
	messaging = firebase.messaging();
}

export const getToken = (setTokenFound) => {
	return messaging
		.getToken({ vapidKey: "GENERATED_MESSAGING_KEY" })
		.then((currentToken) => {
			if (currentToken) {
				console.log("current token for client: ", currentToken);
				setTokenFound(true);
				// Track the token -> client mapping, by sending to backend server
				// show on the UI that permission is secured
			} else {
				console.log(
					"No registration token available. Request permission to generate one."
				);
				setTokenFound(false);
				// shows on the UI that permission is required
			}
		})
		.catch((err) => {
			console.log("An error occurred while retrieving token. ", err);
			// catch error while creating client token
		});
};
