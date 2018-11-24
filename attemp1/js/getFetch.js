const apiKey = 'AIzaSyBQfk5quGb0LjS5XGTK5XU9dliPF33IjiM';

const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
let dots = document.querySelectorAll('.button');
let nextPageToken;
let arr = [];
let arrVideoInfo = [];
let indexOfVideo = 0;
let indexOfLeftVideo = 0;



function sendRequest(pageToken) {


    event.preventDefault();
    console.log("sendRequest");
    document.getElementById('videoSection').innerHTML='';

    const input = document.getElementById('search');
    let query = input.value;
    console.log(query);
    let fetchRequest;
    if (pageToken !== ''){

        fetchRequest = `https://www.googleapis.com/youtube/v3/search?pageToken=${pageToken}&type=video&part=snippet&maxResults=15&order=relevance&key=${apiKey}&q=${query}`;
    }
    else{
        console.log('qwerty');
        arr = [];
        arrVideoInfo = [];
        fetchRequest = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&type=video&order=relevance&key=${apiKey}&q=${query}`
    }
    let response = fetch(fetchRequest)
        .then(response=>{
            console.log(1);
            return response.text()})
        .then(text=>{
            console.log(2);
            return text.length ? JSON.parse(text) : {}})
        .then(data=>{
            nextPageToken = data.nextPageToken;
            console.log(nextPageToken);
            console.log(3);
            let idVideo = ''
            data.items.forEach((item) => {
                arr.push(item);
                    console.log(item);
                   // DrawInfo(item);
                idVideo += `${item.id.videoId},`;
            });
            fetch (`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${idVideo}&key=${apiKey}`)
                .then(response =>{
                    return response.text()})
                .then(text=>{
                    console.log(2);
                    return text.length ? JSON.parse(text) : {}})
                .then(data=> {
                    data.items.forEach((item) => {
                        arrVideoInfo.push(item);
                        console.log(item);
                        // DrawInfo(item);
                    });


                });
            console.log(arr);
            console.log(arrVideoInfo);
            OutputVideo();

        })
        .catch((error)=>console.log(error));

    /*<iframe id="ytplayer" type="text/html" width="720" height="405"


<a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
<img src="http://i.ytimg.com/vi/${item.id.videoId}/mqdefault.jpg"></a>

    src="https://www.youtube.com/embed/${item.id.videoId}"
    frameborder="0" allowfullscreen>

    `<class="container">
<div class="inner-container">
<div class="image-container" style="background: url("http://i.ytimg.com/vi/${item.id.videoId}/mqdefault.jpg");">
<a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
<span class="name-video">${item.snippet.title}</span></a>
</div>
<div class="info">
<p class="cope-text">${item.snippet.description}</p>
</div>
</div>
</div>`


    */
};

function OutputVideo() {
    console.log('OutputVideo');
    videoCount = getCurrentVideoCount();
    console.log('OutputVideo'+videoCount);
    for(let i = 0; i < videoCount; i++){
        DrawInfo(arr[indexOfLeftVideo + i]);
    }
    //for (let i =0; i<3; i++){
    let num = Math.floor(indexOfLeftVideo/getCurrentVideoCount());
        dots[0].innerText = num + 1;
        dots[1].innerText = num + 2;
    dots[2].innerText = num + 3;
  //  }
}

function DrawInfo(item) {
    document.getElementById('videoSection').insertAdjacentHTML('beforeend',
        `<div class="container">
<div class="inner-container">
<div class="image-container" >
<a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
<span class="name-video">${item.snippet.title}</span></a>
</div>
<div class="info">
<p class="cope-text">${item.snippet.description}</p>
</div>
</div>
</div>`);

}

document.querySelector('.search').onsubmit = ()=> sendRequest('');
/*button.onclick = () => sendRequest('');*/
nextButton.onclick = () =>{
   // sendRequest(nextPageToken);
    console.log('onClick');
    let arrOfElement = document.getElementsByClassName('container');
    console.log(arrOfElement);
    for (let i=0; i< getCurrentVideoCount(); i++){
        console.log('remove '+i+' qwwe');
        arrOfElement[0].remove();
    }

    indexOfLeftVideo+=getCurrentVideoCount();
    console.log('zzz'+indexOfLeftVideo);
    //console.log(indexOfLeftVideo);
    //условие додумать, когда добавлять видосики
    if((arr.length - indexOfLeftVideo -getCurrentVideoCount()) <= getCurrentVideoCount()) {
        console.log('qw' + (arr.length - indexOfLeftVideo -getCurrentVideoCount()));
        sendRequest(nextPageToken);

    }
    else {
        OutputVideo();
    }
};

prevButton.onclick = () => {
    let arrOfElement = document.getElementsByClassName('container');
    for (let i=0; i< getCurrentVideoCount(); i++){
        console.log('remove '+i+' qwwe');
        arrOfElement[0].remove();
    }
    indexOfLeftVideo-=getCurrentVideoCount();
    OutputVideo();
};


let videoCount;
window.onresize = function () {
    console.log('onResize');
    console.log('qwerty'+videoCount);
    if (window.screen.availWidth <= 1170 && videoCount == 4) {
        document.getElementsByClassName('container')[3].remove();
        videoCount = 3;
        console.log('ss1'+videoCount);
    }

    if (window.screen.availWidth <= 860 && videoCount == 3) {
        document.getElementsByClassName('container')[2].remove();
        videoCount = 2;
        console.log('ss2'+videoCount);
    }

    if (window.screen.availWidth <= 595 && videoCount == 2) {
        document.getElementsByClassName('container')[1].remove();
        videoCount = 1;
        console.log('ss3'+videoCount);
    }


    if (window.screen.availWidth > 595 && videoCount == 1) {
        DrawInfo(arr[indexOfLeftVideo+1]);
        videoCount = 2;
        console.log(videoCount);
    }

    if (window.screen.availWidth > 860 && videoCount == 2) {
        DrawInfo(arr[indexOfLeftVideo+2]);
        videoCount = 3;
    }

    if (window.screen.availWidth > 1170 && videoCount == 3) {
        console.log(indexOfLeftVideo + '11111111');
        console.log(arr[indexOfLeftVideo+4]);
        DrawInfo(arr[indexOfLeftVideo+3]);
        videoCount = 4;

    }

};

function getCurrentVideoCount(){
    console.log(window.screen.availWidth);
    if(window.screen.availWidth <= 595)
        return 1;
    else
        if(window.screen.availWidth >= 595)
            if(window.screen.availWidth >= 861)
                if(window.screen.availWidth >= 1170)
                    return 4;
                else
                    return 3;
        else
            return 2;
}

