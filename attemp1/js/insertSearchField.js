const wrapper = document.createElement('div');
insertNavigation();
//insertVideo();
insertDots();

function insertNavigation() {

    wrapper.className = 'wrapper';
    wrapper.innerHTML = '<section class="search-field">' +
        '    <form class="search" autocomplete="off" name="search" method="post">' +
        '      <input class="input" type="search" id="searchKey" name="searchKey" placeholder="Search" />' +
        '      <button class="submit" type="submit" name="" value="">' +
        '      </button>' +
        '    </form>' +
        '<button type="submit" id="next">Далее</button>'+
        '<button type="submit" id="prev">Назад</button>'+
        '  </section>';

    const wrapperSection = document.querySelector('body');
    wrapperSection.appendChild(wrapper);
    const videoSection = document.createElement('section');
    videoSection.className = 'video-section';
    videoSection.id = 'videoSection';
    wrapper.appendChild(videoSection);
}


function insertVideo(generalInfo, countOfView) {

    const videoSection = document.querySelector('.video-section');
 //       document.getElementById(videoSection);
    const videoBox = document.createElement('div');
    videoBox.className = 'container';

    const innerContainer = document.createElement('div');
    innerContainer.className = 'inner-container';
    videoBox.appendChild(innerContainer);

    const image = document.createElement('div');
    image.className = 'image-container';
    let videoUrl = generalInfo.snippet.thumbnails.medium.url;
    image.style.backgroundImage = "url("+videoUrl+")";
    innerContainer.appendChild(image);

    const linkVideo = document.createElement('a');
    linkVideo.className = 'link-text';
    linkVideo.href = `https://www.youtube.com/watch?v=${generalInfo.id.videoId}`;
    linkVideo.target = '_blank';
    image.appendChild(linkVideo);

    const nameVideo = document.createElement('span');
    nameVideo.className = 'name-video';
    nameVideo.textContent = generalInfo.snippet.title;
    linkVideo.appendChild(nameVideo);

    const infoContainer = document.createElement('div');
    infoContainer.className = 'info';
    innerContainer.appendChild(infoContainer);

    const infoList = document.createElement('ul');
    infoList.className = 'info-list';
    infoContainer.appendChild(infoList);

    const firstElementList = document.createElement('li');
    firstElementList.className = 'element-list';
    infoList.appendChild(firstElementList);

    const secondElementList = document.createElement('li');
    secondElementList.className = 'element-list';
    infoList.appendChild(secondElementList);

    const thirdElementList = document.createElement('li');
    thirdElementList.className = 'element-list';
    infoList.appendChild(thirdElementList);

    const spanIconAuthor = document.createElement('span');
    spanIconAuthor.className = 'icon';
    firstElementList.appendChild(spanIconAuthor);

    const iconAuthor = document.createElement('i');
    iconAuthor.className = 'fa fa-user';
    spanIconAuthor.appendChild(iconAuthor);

    const nameAuthor = document.createElement('span');
    nameAuthor.className = 'element';
    nameAuthor.textContent =  generalInfo.snippet.channelTitle;
    firstElementList.appendChild(nameAuthor);

    const spanIconDate = document.createElement('span');
    spanIconDate.className = 'icon';
    secondElementList.appendChild(spanIconDate);

    const iconDate = document.createElement('i');
    iconDate.className = 'fa fa-calendar';
    spanIconDate.appendChild(iconDate);

    const date = document.createElement('span');
    date.className = 'element';
    date.textContent = generalInfo.snippet.publishedAt.substr(0, 10);
    secondElementList.appendChild(date);

    const spanIconEye = document.createElement('span');
    spanIconEye.className = 'icon';
    thirdElementList.appendChild(spanIconEye);

    const iconEye = document.createElement('i');
    iconEye.className = 'fa fa-eye';
    spanIconEye.appendChild(iconEye);

    const eye = document.createElement('span');
    eye.className = 'element';
    eye.textContent = countOfView.statistics.viewCount;
    thirdElementList.appendChild(eye);

    const copeText = document.createElement('p');
    copeText.className = 'cope-text';
    copeText.textContent = generalInfo.snippet.description;
    innerContainer.appendChild(copeText);


    videoSection.appendChild(videoBox);
}

/*
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

}*/





/*
const videoSection = document.createElement('section');
videoSection.className = 'video-section';
videoSection.innerHTML = '<div class="container">\n' +
    '                <div class="inner-container">\n' +
    '                    <div class="image-container">\n' +
    '                        <span class="name-video"></span>\n' +
    '                    </div>\n' +
    '                    <div class="info">\n' +
    '                        <ul class="info-list">\n' +
    '                            <li class="element-list"><span class="icon"><i class="fa fa-user"></i></span><span class="element"></span></li>\n' +
    '                            <li class="element-list"><span class="icon"><i class="fa fa-calendar"></i></span><span class="element"></span></li>\n' +
    '                            <li class="element-list"><span class="icon"><i class="fa fa-eye"></i></span><span class="element"></span></li>\n' +
    '                        </ul>\n' +
    '                        <p class="cope-text"></p>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="container">\n' +
    '                <div class="inner-container">\n' +
    '                    <div class="image-container">\n' +
    '                        <span class="name-video"></span>\n' +
    '                    </div>\n' +
    '                    <div class="info">\n' +
    '                        <ul class="info-list">\n' +
    '                            <li class="element-list"><span class="icon"><i class="fa fa-user"></i></span><span class="element"></span></li>\n' +
    '                            <li class="element-list"><span class="icon"><i class="fa fa-calendar"></i></span><span class="element"></span></li>\n' +
    '                            <li class="element-list"><span class="icon"><i class="fa fa-eye"></i></span><span class="element"></span></li>\n' +
    '                        </ul>\n' +
    '                        <p class="cope-text"></p>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="container">\n' +
    '                <div class="inner-container">\n' +
    '                    <div class="image-container">\n' +
    '                        <span class="name-video"></span>\n' +
    '                    </div>\n' +
    '                    <div class="info">\n' +
    '                        <ul class="info-list">\n' +
    '                            <li class="element-list"><span class="icon"><i class="fa fa-user"></i></span><span class="element"></span></li>\n' +
    '                            <li class="element-list"><span class="icon"><i class="fa fa-calendar"></i></span><span class="element"></span></li>\n' +
    '                            <li class="element-list"><span class="icon"><i class="fa fa-eye"></i></span><span class="element"></span></li>\n' +
    '                        </ul>\n' +
    '                        <p class="cope-text"></p>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '\n' +
    '            <div class="container">\n' +
    '                <div class="inner-container">\n' +
    '                    <div class="image-container">\n' +
    '                        <span class="name-video"></span>\n' +
    '                    </div>\n' +
    '                    <div class="info">\n' +
    '                        <ul class="info-list">\n' +
    '                            <li class="element-list"><span class="icon"><i class="fa fa-user"></i></span><span class="element"></span></li>\n' +
    '                            <li class="element-list"><span class="icon"><i class="fa fa-calendar"></i></span><span class="element"></span></li>\n' +
    '                            <li class="element-list"><span class="icon"><i class="fa fa-eye"></i></span><span class="element"></span></li>\n' +
    '                        </ul>\n' +
    '                        <p class="cope-text"></p>\n' +
    '                    </div>\n' +
    '                </div>\n' +
    '            </div>';
const section = document.querySelector('.wrapper');
section.appendChild(videoSection);*/



function insertDots() {
    const buttons = document.createElement('section');
    buttons.className = 'buttons-section';
    buttons.innerHTML = '<div class="button"><span></span></div>\n' +
        '            <div class="button"><span></span></div>\n' +
        '            <div class="button"><span></span></div>';

    wrapper.appendChild(buttons);
}

const apiKey = 'AIzaSyBQfk5quGb0LjS5XGTK5XU9dliPF33IjiM';

const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
let dots = document.getElementsByClassName('button');
let nextPageToken;
let arr = [];
let arrVideoInfo = [];
let indexOfVideo = 0;
let indexOfLeftVideo = 0;



function sendRequest(pageToken) {


    event.preventDefault();
    console.log("sendRequest");
    document.getElementById('videoSection').innerHTML='';

    const input = document.getElementById('searchKey');
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
        indexOfLeftVideo = 0;
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
            let idVideo = '';
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
                    console.log(arr);
                    console.log(arrVideoInfo);
                    OutputVideo();


                });


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
      //  DrawInfo(arr[indexOfLeftVideo + i]);
        insertVideo(arr[indexOfLeftVideo + i], arrVideoInfo[indexOfLeftVideo + i]);
    }
    //for (let i =0; i<3; i++){
    let num = Math.floor(indexOfLeftVideo/getCurrentVideoCount());
    dots[0].innerText = num + 1;
    dots[1].innerText = num + 2;
    dots[2].innerText = num + 3;
    //  }
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
        insertVideo(arr[indexOfLeftVideo + 1], arrVideoInfo[indexOfLeftVideo + 1]);
        videoCount = 2;
        console.log(videoCount);
    }

    if (window.screen.availWidth > 860 && videoCount == 2) {
        insertVideo(arr[indexOfLeftVideo + 2], arrVideoInfo[indexOfLeftVideo + 2]);
        videoCount = 3;
    }

    if (window.screen.availWidth > 1170 && videoCount == 3) {
        console.log(indexOfLeftVideo + '11111111');
        console.log(arr[indexOfLeftVideo+4]);
        insertVideo(arr[indexOfLeftVideo + 3], arrVideoInfo[indexOfLeftVideo + 3]);
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




