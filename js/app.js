import { API } from './api.js';
import * as  UI from './ui.js';

UI.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // read form data
    const artistName = UI.artistInput.value,
          songName = UI.songInput.value;

    // console.log(`Artist: ${artistName} | Song: ${songName}`);

    // Validate the form
    if(artistName === '' || songName === '') {
        UI.messageDiv.innerHTML = 'Error...All fields are mandatory';
        UI.messageDiv.classList.add('error');
        setTimeout(() => {
            UI.messageDiv.innerHTML = '';
            UI.messageDiv.classList.remove('error');
        }, 3000);
    } else {
        // Query the REST API
        const lyric = new API(artistName, songName);
        lyric.queryAPI()
            .then(data => {
                if(data.lyric.lyrics) {
                    let result = data.lyric.lyrics;
                    UI.resultDiv.innerHTML = `<h5><strong>${artistName} - ${songName}</strong></h5>
                    <p>${result}<p>
                    `;
                } else {
                    // No results found
                    UI.messageDiv.innerHTML = 'No Lyrics Found';
                    UI.messageDiv.classList.add('error');
                    setTimeout(() => {
                        UI.messageDiv.innerHTML = '';
                        UI.messageDiv.classList.remove('error');
                        UI.searchForm.reset();
                        UI.resultDiv.innerHTML = '';
                    }, 3000);
                }
            })
    }
});