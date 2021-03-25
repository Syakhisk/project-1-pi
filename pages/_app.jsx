import { getToken } from "../lib/firebase";

import { useState } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	const [isTokenFound, setTokenFound] = useState(false);
	getToken(setTokenFound);

	return (
		<>
			{isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
			{!isTokenFound && <h1> Need notification permission ❗️ </h1>}
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
