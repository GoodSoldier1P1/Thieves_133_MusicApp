// spotify API creds
clientId = '31eb5f9922234d93a5de52a4ab76bd56'
clientSecret = '255fe4794f60444685406c78942aedd6'

// getToken function
const getToken = async () => {
    // create POST request
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret), // btoa encodes to base64
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    const data = await response.json()
    const token = data.access_token
    return token

}


// verify that we get our token
getToken()

// use getToken function, to get a song
// getSong Function
const getSong = async (track, artist) => {
    const token = await getToken()
    const response = await fetch(`https://api.spotify.com/v1/search?q=${track},${artist}&type=track,artist`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    const data = await response.json()
    const song = data.tracks.items[0].preview_url
    return song
}

// getSong('In Jesus Name', 'Katy Nicole')
// verify that we get the song data


// clickedSong function
const clickedSong = async (divId) => {
    const allTracks = document.querySelectorAll('.title-text') // caching titles anytime a song is clicked (only caching once each)
    const track = allTracks[divId.slice(-1)].innerText         // grabbing the number from div (div0, div1, etc...) with slice()
    

    const  allArtists = document.querySelectorAll('.artist-text')
    const artist = allArtists[divId.slice(-1)].innerText

    const songUrl = await getSong(track, artist)
    playSong(songUrl)
}


// handles playing the audio
let audio = ''
const playSong = (song) => {
    if (audio){
        audio.pause()
        audio = ''
    }
    audio = new Audio(song)
    audio.play()
}



// handles pausing the audio
const stopBtn = document.querySelector('#stopBtn')
stopBtn.addEventListener('click', () => {
    if (audio){
        audio.pause()
    }
})