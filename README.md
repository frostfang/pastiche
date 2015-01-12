# pastiche (WIP)
A nodejs site that grabs instagram pictures for a given hashtag and plays through them.

To get the site up and running you need to create the following environment variables
- IG_CLIENT_ID
- IG_CLIENT_SECRET
- IG_TOKEN- see below
- IG_ENDPOINT_URI (url)- This is part of the instagram endpoint subscription api (see below)
- IG_ENDPOINT_VERIFY_TKN (anything)- This is part of the instagram endpoint subscription api (see below)


### Instagram enpoint API
The _ENDPOINT_ environment variables are needed for enpoint subscriptions within the instagram api. More details here
- https://www.npmjs.com/package/instagram-node
- http://instagram.com/developer/realtime/

### Instagram Token
Also note i went with the token creation as per the details <a href="http://jelled.com/instagram/access-token">here</a>.
This isn't ideal and should be refactored to use the oauth2 flow as per the instagram api docs.

TODO:
- Implement OAuth2 flow - there is an example on the instagram-node npm module.
- Replace IG_ENDPOINT_URI with something based on your  OAuth2 flow - there is an example on the instagram-node npm module.
