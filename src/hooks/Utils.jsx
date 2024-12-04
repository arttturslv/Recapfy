
function loadImage (imageURL) {
    return new Promise((res, rej) => {
        const image = new Image();
        image.crossOrigin="anonymous";
        image.width=60;
        image.height=60;
        image.src=imageURL;

        image.onload = () => {
            res(image);
        }

        image.onerror = (error) => {
            rej(new Error("Erro ao carregar a imagem", error));  // Se der erro, rejeita a Promise
        }
    })
}

export async function getImageColor(imageURL) {
    if(!imageURL) {
        throw new Error("Imagem URL é indefinida ou nula")
    }
    try {
        const image = await loadImage(imageURL);
        let r,g,b,a; 

        const canvas =  document.createElement('canvas');
        const ctx = canvas.getContext("2d");

        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

        r = imageData.data[0]; 
        g = imageData.data[1]; 
        b = imageData.data[2]; 
        a = imageData.data[3]; 
        
        return [r,g,b,a];
    } catch (error) {
        console.error(error); 
    }


}


export function countArtistMentionInTrack(artists, tracks, qnt) {
    let artistAppearanceInTrack = new Map();

    for(const artist of artists) {
        artistAppearanceInTrack.set(artist.name, 0);

        for(const track of tracks) {
            if(track.artists.some(e => e.name == artist.name)) {
                let val = artistAppearanceInTrack.get(artist.name);
                val++;
                artistAppearanceInTrack.set(artist.name, val);
            }
        }
    }


    let artistCounts  = [...artistAppearanceInTrack];
    let sortedArtistCounts  = quickSort(artistCounts , (item)=> item[1]);
    let sortedArtistCountsSlice = sortedArtistCounts.reverse().slice(0, qnt);
    return sortedArtistCountsSlice;
}

export function quickSort(array, fn=(num) => num) {
    if(array.length < 2) {
        return array;
    }

    let pivo = fn(array[array.length - 1]);
    let esq=[], dir=[];

    for(let i=0; i<array.length-1; i++) {
        let item = fn(array[i]);
        if(item<pivo) {
            esq.push(array[i]);
        } else {
            dir.push(array[i]);
        }
    }
    return [...quickSort(esq, fn), array[array.length - 1], ...quickSort(dir, fn)];
}

export function binarySearch(array, fn=(num) => num, target, start, end) {
    if(start > end) {
        return false;
    }

    const middle = Math.floor((start+end)/2);
    if(fn(array[middle]) === target) {
        return true;
    }    

    if(fn(array[middle]) > target) {
        return binarySearch(array, fn, target, start, middle-1);
    }
    if(fn(array[middle]) < target) {
        return binarySearch(array, fn, target, middle+1, end);
    }


}



export function countGenres(artists) {
    const genres = new Map()
    for (const artist of artists) {
        for (const genre of artist.genres) {
            if (genres.has(genre)) {
                let val = genres.get(genre)
                val++
                genres.set(genre, val)
            } else {
                genres.set(genre, 1)
            }
        }
    }

    let genresArray = Array.from(genres)
    let genresArraySorted = genresArray.sort((a, b) => b[1] - a[1])

    return genresArraySorted;
}