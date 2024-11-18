var client_id = '-------------------';
var redirect_uri = 'http://localhost:5173/';
var scope = 'user-read-private user-read-email';
var state = generateRandomString(16);

localStorage.setItem("stateKey", state);

function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

export function SpotifyAuth() {
    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    window.location.href = url;
}

export function getAccessToken(hash) {
    if(hash) {
        const params = new URLSearchParams(hash.substring(1)); // Remove o '#'
        const accessToken = params.get('access_token');

        if(accessToken) {
            console.log("yes")
            return accessToken;
        } 
    }

    return null;
}