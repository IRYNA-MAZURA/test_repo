insertLayout();


function insertLayout() {
    const wrapper = document.createElement('div');
    insertSearchForm();
    insertVideoSection();
    insertDots();

    function insertSearchForm() {
        wrapper.className = 'wrapper';
        wrapper.innerHTML = '<section class="search-field">' +
            '    <form class="search" autocomplete="off" name="search" method="post">' +
            '      <input class="input" type="search" id="searchKey" name="searchKey" placeholder="Search" />' +
            '      <button class="submit" type="submit" name="" value="">' +
            '      </button>' +
            '    </form>' +
            '<button type="submit" id="next">Далее</button>'+
            '<button type="submit" id="prev">Назад</button>'+
            '</section>';
        const wrapperSection = document.querySelector('body');
        wrapperSection.appendChild(wrapper);
    }

    function insertVideoSection() {
        const videoSection = document.createElement('section');
        videoSection.className = 'video-section';
        videoSection.id = 'videoSection';
        wrapper.appendChild(videoSection);
    }

    function insertDots() {
        const buttons = document.createElement('section');
        buttons.className = 'buttons-section';
        buttons.innerHTML = '<div class="button"><span></span></div>\n' +
            '            <div class="button"><span></span></div>\n' +
            '            <div class="button"><span></span></div>';

        wrapper.appendChild(buttons);
    }
}



function insertVideo(generalInfo, countOfView) {
    const videoSection = document.querySelector('.video-section');
    const videoBox = document.createElement('div');
    videoBox.className = 'container';

    const innerContainer = document.createElement('div');
    innerContainer.className = 'inner-container';
    videoBox.appendChild(innerContainer);

    const image = document.createElement('div');
    image.className = 'image-container';
    const videoUrl = generalInfo.snippet.thumbnails.medium.url;
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

    const spanIconView = document.createElement('span');
    spanIconView.className = 'icon';
    thirdElementList.appendChild(spanIconView);

    const iconView = document.createElement('i');
    iconView.className = 'fa fa-eye';
    spanIconView.appendChild(iconView);

    const view = document.createElement('span');
    view.className = 'element';
    view.textContent = countOfView.statistics.viewCount;
    thirdElementList.appendChild(view);

    const descriptionVideo = document.createElement('p');
    descriptionVideo.className = 'cope-text';
    descriptionVideo.textContent = generalInfo.snippet.description;
    innerContainer.appendChild(descriptionVideo);

    videoSection.appendChild(videoBox);
}

function OutputVideo() {
    videoCount = getCurrentVideoCount();
    for(let i = 0; i < videoCount; i++){
        insertVideo(videoDescriptionArray[indexOfLeftVideo + i], videoInfoArray[indexOfLeftVideo + i]);
    }
    let num = Math.floor(indexOfLeftVideo/getCurrentVideoCount());
    if (indexOfLeftVideo !== 0){
        if (indexOfLeftVideo >= videoInfoArray.length - videoCount){
            dots[0].innerHTML = '';
            dots[1].innerHTML = '';
            dots[2].innerHTML = num + 1;
        }else {
            dots[0].innerHTML = '';
            dots[1].innerHTML = num + 1;
            dots[2].innerHTML = '';
        }
    } else{
        dots[0].innerText = num + 1;
        dots[1].innerHTML = '';
        dots[2].innerHTML = '';
    }
}




const nextButton = document.getElementById('next');
const prevButton = document.getElementById('prev');
let dots = document.querySelectorAll('.button');
let nextPageToken;
let videoDescriptionArray = [];
let videoInfoArray = [];
let indexOfLeftVideo = 0;
document.querySelector('.search').onsubmit = () => sendRequest('');
nextButton.onclick = () => showNextPage();
prevButton.onclick = () => showPrevPage();
window.onresize = () => onResizeWindow();



function sendRequest(pageToken) {
    event.preventDefault();
    document.getElementById('videoSection').innerHTML='';

    const inputQuery = document.getElementById('searchKey').value;
    const apiKey = 'AIzaSyBQfk5quGb0LjS5XGTK5XU9dliPF33IjiM';
    let fetchRequest;
    if (pageToken !== ''){
        fetchRequest = `https://www.googleapis.com/youtube/v3/search?pageToken=${pageToken}&type=video&part=snippet&maxResults=15&order=relevance&key=${apiKey}&q=${inputQuery}`;
    }
    else{
        videoDescriptionArray = [];
        videoInfoArray = [];
        indexOfLeftVideo = 0;
        fetchRequest = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&type=video&order=relevance&key=${apiKey}&q=${inputQuery}`
    }

    fetch(fetchRequest)
        .then(response=>{
            if (response.status !== 200) {
                console.log(`Sorry, there was a problem. Status: ${
                    response.status}`);
                return;
            }
            return response.text()})
        .then(text => text.length ? JSON.parse(text) : {})
        .then(data=>{
            nextPageToken = data.nextPageToken;
            let idVideo = '';
            data.items.forEach((item) => {
                videoDescriptionArray.push(item);
                idVideo += `${item.id.videoId},`;
            });
            fetch (`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${idVideo}&key=${apiKey}`)
                .then(response=>{
                    if (response.status !== 200) {
                        console.log(`Sorry, there was a problem. Status: ${
                            response.status}`);
                        return;
                    }
                    return response.text()})
                .then(text => text.length ? JSON.parse(text) : {})
                .then(data=> {
                    data.items.forEach((item) => {
                        videoInfoArray.push(item);
                    });
                    OutputVideo();
                });
        })
        .catch((error)=>console.log(error));
};

function showNextPage() {
    const countOfVideo = getCurrentVideoCount();
    let arrOfElement = document.querySelectorAll('.container');
    for (let i = 0; i < countOfVideo; i++){
        arrOfElement[i].remove();
    }

    indexOfLeftVideo += countOfVideo;
    /*   if((videoDescriptionArray.length - indexOfLeftVideo - countOfVideo) <= countOfVideo) {
           sendRequest(nextPageToken);
       }
       else {
           OutputVideo();
       }*/
    (videoDescriptionArray.length - indexOfLeftVideo <= 2*countOfVideo) ?  sendRequest(nextPageToken) :  OutputVideo();

}

function showPrevPage(){
    const countOfVideo = getCurrentVideoCount();
    let arrOfElement = document.querySelectorAll('.container');
    for (let i = 0; i < countOfVideo; i++){
        arrOfElement[i].remove();
    }
    indexOfLeftVideo -= countOfVideo;
    OutputVideo();
};


let videoCount;
function onResizeWindow(){
    if (window.screen.availWidth < BIG_SCREEN_MIN_WIDTH && videoCount == 4) {
        document.querySelectorAll('.container')[3].remove();
        videoCount = 3;
    }

    if (window.screen.availWidth < MEDIUM_SCREEN_MIN_WIDTH && videoCount == 3) {
        document.querySelectorAll('.container')[2].remove();
        videoCount = 2;
    }

    if (window.screen.availWidth < SMALL_SCREEN_MAX_WIDTH && videoCount == 2) {
        document.querySelectorAll('.container')[1].remove();
        videoCount = 1;
    }

    if (window.screen.availWidth >= SMALL_SCREEN_MAX_WIDTH && videoCount == 1) {
        insertVideo(videoDescriptionArray[indexOfLeftVideo + 1], videoInfoArray[indexOfLeftVideo + 1]);
        videoCount = 2;
    }

    if (window.screen.availWidth >= MEDIUM_SCREEN_MIN_WIDTH && videoCount == 2) {
        insertVideo(videoDescriptionArray[indexOfLeftVideo + 2], videoInfoArray[indexOfLeftVideo + 2]);
        videoCount = 3;
    }

    if (window.screen.availWidth >= BIG_SCREEN_MIN_WIDTH && videoCount == 3) {
        insertVideo(videoDescriptionArray[indexOfLeftVideo + 3], videoInfoArray[indexOfLeftVideo + 3]);
        videoCount = 4;
    }
};

const BIG_SCREEN_MIN_WIDTH = 1200;
const MEDIUM_SCREEN_MIN_WIDTH = 768;
const SMALL_SCREEN_MAX_WIDTH = 481;

function getCurrentVideoCount(){
    if(window.screen.availWidth <= SMALL_SCREEN_MAX_WIDTH)
        return 1;
    else
    if(window.screen.availWidth > SMALL_SCREEN_MAX_WIDTH)
        if(window.screen.availWidth >= MEDIUM_SCREEN_MIN_WIDTH)
            if(window.screen.availWidth >= BIG_SCREEN_MIN_WIDTH)
                return 4;
            else
                return 3;
        else
            return 2;
}




