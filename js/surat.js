function getURL(e){
    const pageURL = window.location.search.substring(1);
    const urlVariable = pageURL.split('&');

    for(let i = 0; i< urlVariable.length; i++){
        const parameterName = urlVariable[i].split('=');
        if(parameterName[0] == e){
            return parameterName[1];
        }
    }
}
const nomorsurat = getURL('nomorsurat');
console.log(nomorsurat);

function getSurat(){
    fetch(`https://equran.id/api/surat/${nomorsurat}`)
    .then(response => response.json())
    .then(response => {
        //title surat

        const titleSurat = document.querySelector('#title-surat');
        titleSurat.textContent=`surat ${response.nama}`

    // judul surat start
        const judulSurat = document.querySelector('.judul-surat');
        const cardJudulSurat = `
        <strong> ${response.nama_latin} - ${response.nama}</strong>
                      <p>Jumlah Ayat : ${response.jumlah_ayat},arti [${response.arti}]</p>
                      <button class="btn btn-primary audio-button-play">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                          </svg>
                        Play
                    </button>
                    <button class="btn btn-danger audio-button-pause hidden-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.5 5A1.5 1.5 0 0 0 5 6.5v3A1.5 1.5 0 0 0 6.5 11h3A1.5 1.5 0 0 0 11 9.5v-3A1.5 1.5 0 0 0 9.5 5h-3z"/>
                  </svg>
                        Stop
                    </button>
                    <audio id='audio-tag' src="${response.audio}"></audio>
        `;
        judulSurat.innerHTML= cardJudulSurat;
       
      



     // judul surat end
        const surat =response.ayat;
        let isiSurat ='';
        surat.forEach(s => {
            isiSurat+=`
            <div class="card mb-3">
        <div class="card-body ">
            <p>${s.nomor}</p>
            <h3 class="text-end mb-1">${s.ar}</h3>
            <br>
            <h6><b>${s.tr}</b></h6>
            <p>${s.idn}</p>  
        </div>
      </div>
            `;
        });
        const cardIsiSurat= document.querySelector('.card-isi-surat');
        cardIsiSurat.innerHTML=isiSurat;

        
        // play dan pause
        const buttonPlay = document.querySelector('.audio-button-play');
        const buttonPause = document.querySelector('.audio-button-pause');
        const audioSurat = document.querySelector('#audio-tag');

        // play
        buttonPlay.addEventListener('click',function(){
            audioSurat.play();
        });

        //pause
        buttonPause.addEventListener('click',function(){

        audioSurat.pause();
        })

    });
}
getSurat();