import { getCurrentUsersProfile, getUsersTopItems } from "./UsersMethods";
var client_id = import.meta.env.VITE_CLIENT_ID;
var redirect_uri = import.meta.env.VITE_STATUS === "DEV"? 'http://localhost:5173/': "http://recapfy.artttur.com/";
var scope = 'user-read-private user-read-email user-top-read';
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

export async function getAccessToken(hash) {
    if(hash) {
        const params = new URLSearchParams(hash.substring(1)); // Remove o '#'
        const accessToken = params.get('access_token');

        console.log(accessToken)

        if(accessToken) {
            await getCurrentUsersProfile(accessToken);
            const artistsLong = await getUsersTopItems("artists", accessToken, 2, 'long_term');
            const tracksLong = await getUsersTopItems("tracks", accessToken, 2, 'long_term');

            const artistsMedium = await getUsersTopItems("artists", accessToken, 2, 'medium_term');
            const tracksMedium = await getUsersTopItems("tracks", accessToken, 2, 'medium_term');

            window.location.href = "/home"
        } else {
            console.error("Sei não")
        }
    }
    return null;
}