import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.querySelector('.search-form');
// const searchInput = document.querySelector('.input');
// const btn = document.querySelector('.button');
const photo = document.querySelector(".gallery")
// const url = "https://pixabay.com/api/"

searchForm.addEventListener('submit', searchImg);

async function searchImg(event) {
    event.preventDefault();

    const searchQuery = event.target.elements.searchQuery.value.trim();

    if (!searchQuery) {
      return;
    }
  


    try {
        const response = await axios.get('https://pixabay.com/api/', {
            params: {
                key: '35867902-bd768db4cb6d1ffc0364d5f36',
                q: searchQuery,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
            },
        });
    
        // const images = response.data.hits.map(image => ({
        //     webformatURL: image.webformatURL,
        //     largeImageURL: image.largeImageURL,
        //     tags: image.tags,
        //     likes: image.likes,
        //     views: image.views,
        //     comments: image.comments,
        //     downloads: image.downloads,
        // }));


        const images = response.data.hits;

        if (images.length === 0) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.'); 
            return;
        }




    photo.innerHTML = images.map((image) => {
      const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = image;
    

// function photoList(image) {
//   return `<div class="photo-card">
//   <a href="${image.largeImageURL}">
//     <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
//   </a>
//   </div>`
// }

const photoInfo = 
     `<div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
            data-source="${largeImageURL}" />

            <div class="info">
                <p class="info-item">
                    <b>Likes:${likes}</b>
                </p>
                <p class="info-item">
                    <b>Views:${views}</b>
                </p>
                <p class="info-item">
                    <b>Comments:${comments}</b>
                </p>
                <p class="info-item">
                    <b>Downloads:${downloads}</b>
                </p>
            </div>
        </div>`;

        photo.insertAdjacentHTML('beforeend', photoInfo);
});
} catch (error) {
    console.log(error);
  }
}
   
photo.addEventListener('click', onImageClick);

function onImageClick(event) {
    if (event.target.nodeName !== 'IMG') {
        return;
    }

    const largeImageUrl = event.target.dataset.source;

    Notiflix.Modal.image(largeImageUrl);
}


// async function fetchHedler() {
//  try{
//     const response = await fetch(url);
//     const data = await response.json()
//     consol.log(data)
//  }  
//  catch (error){
//     console.log(error)
//  } 
// }
// fetchHedler()




