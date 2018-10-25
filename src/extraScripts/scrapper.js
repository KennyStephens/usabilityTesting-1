const request = require('request');
const fs = require('fs');
const shortid = require('shortid');



// This will be our JS file that we load into the page that will track everything that the user does
const ourScript = '<script type="text/javascript" src="http://localhost:3000/js/recMove.js"></script>';


// Our URL that will be used to request extra href on the page
const ourURL = 'http://localhost:3000/req/?url=';

module.exports = {
	requestURL(URL, id) {

		let requestingURL = URL.trim();
		const splitURL = requestingURL.split("");

		// check to see if they added http
		const addedItems = splitURL[0] + splitURL[1] + splitURL[2] + splitURL[3];
		if (addedItems != 'http') {
			requestingURL = 'http://' + requestingURL;
		}
		const res = requestingURL.split("/");
		const rootURL = res[0] + '//' + res[2];
		let largeString = '';


		// having issues with redirects throwing error that destroys work
		try {
			const s = request(requestingURL);
			s.on('response', (response) => {
				if (response.statusCode != '200') {
					console.log('Bad response from server');
					// res.send 404 page?
				} else {
					s.on('data', (chunk) => {
						const chunkString = chunk.toString();
						largeString += chunkString;

					});
					s.on('end', () => {
						// change HREF links to link back to request URL
						const changeHREFString = largeString.replace(/href="http/g, 'HREF="HTTP');
						const replaceHREFString = changeHREFString.replace(/href="\/|href="/g, `href="${rootURL}/`);
						const changeHREFBack = replaceHREFString.replace(/HREF="HTTP/g, 'href="http');

						// change SRC links to link back to request URL
						const changeSRCString = changeHREFBack.replace(/src="http/g, 'SRC="HTTP');
						const replaceSRCString = changeSRCString.replace(/src="\/|src="/g, `src="${rootURL}/`);
						const changeSRCBack = replaceSRCString.replace(/SRC="HTTP/g, 'src="http');
						// change inline stlyes on any background image loaded
						const changeStyleURL = changeSRCBack.replace(/url\(http/g, 'URL(HTTP');
						const replaceStyleURL = changeStyleURL.replace(/url\(\/|url\(/g, `url(${rootURL}/`);
						const changeStyleBack = replaceStyleURL.replace(/URL\(HTTP/g, 'url(http');

						// add our JS script to the end of the file, name is at top of file to change
						const addOurScript = changeStyleBack.replace(/<\/body>/, `<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.0/socket.io.dev.js"></script><span style="display: hidden;" id="usableRootURL">${rootURL}</span>${ourScript}<\/body>`);

						// split HTML into two parts, body and not body
						const newSplit = addOurScript.split('<body');

						// take body part
						let string = newSplit[1];
						// replace all HREF with unique identifier
						var newstringreplaced = string.replace(/href="/gi, '1,A,2,B,href="');
						// split all body part on hrefs
						let strings = newstringreplaced.split('1,A,2,B,');

						let newRequest;
						// loop through both arrays, encode all urls, add the text to our big string for checking the site
						for (let i = 0; i < strings.length; i++) {
							let newTest = strings[i].split('"');
							if (i >= 1) {
								newTest[1] = ourURL + encodeURIComponent(newTest[1]);
							}
							for (let j = 0; j < newTest.length; j++) {
								newRequest += newTest[j] + '"';
							}
						}

						// fix quote issue throughout the page
						newRequest = newRequest.replace(/"href=/gi, 'href=');


						// combine the two parts of the HTML and adding our script listeners
						const newCombine = newSplit[0] + '<body id="usableBody" ' + newRequest;

						// if id is null
						if (id === null) {
							// this should never be called but just in case, we create a new id for it so the page doesnt crash
							let newID = shortid.generate();
							fs.appendFile(`files/${newID}.ejs`, newCombine, (err) => {
								if (err) throw err;
							});
						} else {
							fs.appendFile(`files/${id}.ejs`, newCombine, (err) => {
								if (err) throw err;
							});
						}
					});
				}
			})

		} catch (err) {
			console.log(`request issue: ${err}`);
		}
	}
};