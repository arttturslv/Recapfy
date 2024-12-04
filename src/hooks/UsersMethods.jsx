import axios, { all } from "axios";
import { getFromLocal, setToLocal} from './LocalStorage'
import { quickSort } from "./Utils";

const API = "https://api.spotify.com/v1"

export async function getCurrentUsersProfile(authBearer) {
    let userProfile = getFromLocal('USER_PROFILE');

    if (userProfile == null) {
        console.log("User profile state is null. Getting api data.");
        
        try {
            const res = await axios.get(`${API}/me`, {
                headers: {
                    'Authorization': `Bearer ${authBearer}`
                }
            });
            console.log("Recebendo /me");

            let filteredProfileData = filterProfileData(res.data);
            console.log("chegando apos filter", filteredProfileData);

            setToLocal('USER_PROFILE', filteredProfileData);

            return filteredProfileData; // Agora retorna corretamente os dados filtrados
        } catch (err) {
            console.error("Erro encontrado: ", err);
            return null; // Retorna null ou algum valor padrão em caso de erro
        }
    } else {
        console.log("Já tenho dados, mostrando do local: ", userProfile);
        return userProfile; // Retorna os dados do local caso não precise fazer a requisição
    }
}

/**
 * The function receives the data returned by the API and extract the essential data to be stored.
 * @param {string} data All user profile information;
 * @returns {JSON} User Profile information filtered;
 */
function filterProfileData(data) {
    let filteredProfileData = {
        name: data.display_name,
        profile_link: data.external_urls.spotify,
        followers: data.followers.total,
        profile_image: data.images[0].url,
    }
    return filteredProfileData;
}



export async function getUsersTopItems(type, authBearer, maxRequestValue=2, timeRange="long_term") {
    if (type != "artists" && type != "tracks")
        throw new Error(`O tipo de top item é desconhecido (artists||tracks): ${type}`);

    let userTopItems = getFromLocal(`USER_${type.toUpperCase()}_${timeRange}`);

    if (userTopItems == null) { //
        console.log("User top items state is null. Getting api data.");

        var allTopItems= { items: [], total: 0 };
        let offset = 0;
        let limit = 50;
        let fetchedItems = 0;

        try {

            while(fetchedItems<maxRequestValue) {

                const res = await axios.get(`${API}/me/top/${type}?time_range=${timeRange}&limit=${limit}&offset=${offset}`, {
                    headers: {
                        'Authorization': `Bearer ${authBearer}`,
                        'Content-Type': 'application/json'
                    }
                });
                console.log(`Recebendo /me/top/ ${type}, offset: ${offset}`);

                let topItems = res.data.items;
                let total = res.data.total;
                console.log(topItems);

                allTopItems = {
                    items: [...allTopItems.items, ...topItems],
                    total: total,
                }

                fetchedItems+=1;

                if (fetchedItems >= maxRequestValue) {
                    break;
                }

                offset += limit;
            }
            console.log("Itens recebidos:", allTopItems);

            allTopItems = {
                items: [...allTopItems.items],
                total: allTopItems.total,
            }

            setToLocal(`USER_${type.toUpperCase()}_${timeRange}`, allTopItems);
            return allTopItems; // Agora retorna corretamente os itens recebidos
        } catch (err) {
            console.error("Erro encontrado: ", err);
            return null; // Retorna null ou algum valor padrão em caso de erro
        }
    } else {
        console.log("Já tenho dados, mostrando do local: ", userTopItems);
        return userTopItems; // Retorna os dados do local caso não precise fazer a requisição
    }
}


