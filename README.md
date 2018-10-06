## Usability Testing Server
This is a school project designed to create a website and database that will allow users to easily create usability tests and send them to people.
User should be able to do the following:

* Submit a link for a page that they want tested
* Submit a number of items they would like completed when they are testing
* Have a URL that will show them feedback on the website

## To Do

* Post javascript results to the test with all the answers to the questions
* Store the response in the same file each time and change out the body text? Then we dont have to reload JS?
* Add event listener on window lose focus so that we could show a message to user that tester is not active on it?
* Store a cookie on user browser with their DB ID so that any time they load a page with rec.js, we read the cookie and send that into the DB along with the current URL? This would potentially fix the issue of not knowing where people are going? [Stack Overflow](https://stackoverflow.com/questions/26021281/set-cookie-with-js-for-whole-domain-not-specific-page)

## Codepen links

* [mouse tracking](https://codepen.io/riderjensen/pen/xaRNEy)

## Broken List

* 404 page when we hit too many redirects
* Sometimes page directs too soon and the file isnt ready, we have a timeout set but need a better way to do it like passing a var into siteRouter or do a loading icon until its ready
* Change href/src after loading page broken on recMove.js because it changes out our URL - maybe add this URL after we do all the loading in a dif script?
* CSS links are broken when in a subfolder but not using a relative path - Scrapper issue

## Untested

* Replay route