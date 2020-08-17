
        const form = document.getElementById('form');
        const search = document.getElementById('search-box');
        const result = document.getElementById('result');

        const apiUrl = 'https://api.lyrics.ovh';

        //add Listener
        form.addEventListener('submit', e => {
            e.preventDefault();

            searchValue = search.value;

            if (!searchValue) {
                alert('Nothing Entered')
            }
            else {
                result.innerHTML = '';
                searchSong(searchValue);
            }
        })

        //get data from API
        function searchSong(searchValue) {
            fetch(`${apiUrl}/suggest/${searchValue}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);

                    for (let i = 0; i<10; i++) {
                        let title = data.data[i].title;
                        let name = data.data[i].artist.name;
                        result.innerHTML +=
                            `<div class="single-result row align-items-center p-2 m-3">
                            <div class="col-md-9">
                                <h3 class="lyrics-name" id="song-title">${title}</h3>
                                <p class="author-lead">Album by <span id="artist-name">${name}</span></p>
                            </div>
                            <div class="col-md-3">
                                <button class="btn btn-success lyric-btn" data-artist="${name}" data-title="${title}">Get Lyrics</button>
                            </div>
                    </div>
                    `;

                    }
                })

        }

        //Lyrics Display
        async function getLyrics(artist, songTitle) {
            const res = await fetch(`https://api.lyrics.ovh/v1/${artist}/${songTitle}`);
            const data = await res.json();
            const lyrics = data.lyrics;


            if (lyrics == undefined) {
                result.innerHTML = `
            <div class="single-lyrics text-center">
            <h2 class="text-success mb-4">${artist} - ${songTitle}</h2>
            <pre class="lyric"> SORRY, GO PREMIUM VIRSION, </br>WE ARE USE A FREE API :) ;
            </pre>
                <h4 class="text-info"></h4>
            
            </div>
            `;
            } else {
                result.innerHTML = `
            <div class="single-lyrics text-center">
            
            <h2 class="text-success mb-4">${artist} - ${songTitle}</h2>
            <pre class="lyric">${lyrics}</pre>
                <h4 class="text-info"></h4>
            
            </div>
            `;
            }

        }

        result.addEventListener('click', e => {
            const clickedItem = e.target;
            if (clickedItem.tagName === "BUTTON") {
                const artist = clickedItem.getAttribute('data-artist');
                const songTitle = clickedItem.getAttribute('data-title');
                console.log(artist, songTitle);
                getLyrics(artist, songTitle);
            }
        })
