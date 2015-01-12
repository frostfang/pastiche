# pastiche (WIP)
A nodejs site that grabs instagram pictures for a given hashtag and plays through them.

To get the site up and running you need to create the following environment variables
<ul>
    <li>IG_CLIENT_ID</li>
    <li>IG_CLIENT_SECRET</li>
    <li>IG_TOKEN - see below</li>
    <li>IG_ENDPOINT_URI (url) - This is part of the instagram endpoint subscription api (see below)</li>
    <li>IG_ENDPOINT_VERIFY_TKN (anything) - This is part of the instagram endpoint subscription api (see below)</li>
</ul>

<h3>Instagram enpoint API<h3>
The _ENDPOINT_ environment variables are needed for enpoint subscriptions within the instagram api. More details here
<li>https://www.npmjs.com/package/instagram-node</li>
<li>http://instagram.com/developer/realtime/</li>

<h3>Instagram Token<h3>
Also note i went with the token creation as per the details <a href="http://jelled.com/instagram/access-token">here</a>.
This isn't ideal and should be refactored to use the oauth2 flow as per 
the instagram api docs.

TODO:
<ul>
<li>Implement OAuth2 flow - there is an example on the instagram-node npm module.</li>
<li>Replace IG_ENDPOINT_URI with something based on your  OAuth2 flow - there is an example on the instagram-node npm module.</li>
</ul>