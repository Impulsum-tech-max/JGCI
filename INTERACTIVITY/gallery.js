const galleryContainer = document.querySelector('.gallery-grid');

const photos = [
    {
        src: "/IMAGES/GALLERY-ITEMS/img1.jpg",
        alt: "Our G.O"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img2.jpg",
        alt: "Our G.O's Wife"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img3.jpg",
        alt: "Our G.O With The Mass Choir"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img4.jpg",
        alt: "Our Congregation"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img5.jpg",
        alt: "A Prophetic Session"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img6.jpg",
        alt: "A Prayer Session"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img7.jpg",
        alt: "The Instrumentalists"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img8.jpg",
        alt: "Our G.O Full of Joy"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img9.jpg",
        alt: "Our G.O Preaching"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img10.jpg",
        alt: "A Youth Performance"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img11.jpg",
        alt: "Our G.O Listening to the Word"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img12.jpg",
        alt: "Our Choristers"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img13.jpg",
        alt: "The Sermon in Session"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img14.jpg",
        alt: "Members Being Blessed by the Word"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img15.jpg",
        alt: "Members in the Spirit"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img16.jpg",
        alt: "A Youth Preaching"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img17.jpg",
        alt: "A Pastor in Church"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img18.jpg",
        alt: "Pst. Daniel on the Altar"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img19.jpg",
        alt: "Service in Session"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img20.jpg",
        alt: "The G.O Preaching"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img21.jpg",
        alt: "Our G.O in the Spirit"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img22.jpg",
        alt: "A Youth Attentive to the Man of God"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img23.jpg",
        alt: "A Minister of God"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img24.jpg",
        alt: "Our G.O Being Emphatic"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img25.jpg",
        alt: "The Congregation"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img26.jpg",
        alt: "The Power Couple"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img27.jpg",
        alt: "Our G.O on the Altar"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img28.jpg",
        alt: "Pst. Daniel Preaching"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img29.jpg",
        alt: "The Congregation"
    },

    {
        src: "/IMAGES/GALLERY-ITEMS/img30.jpg",
        alt: "Pst. Udeme Daniel"
    }
];

const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxCounter = document.querySelector('.lightbox-counter');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxNext=document.querySelector('.lightbox-next');
const lightboxPrev=document.querySelector('.lightbox-prev');


let lightboxOpen = false;

let currentIndex = 0;

let touchStartX = 0;
let touchStartY = 0;

let lastFocusedElement = null;

function closeLightbox() {
    if (lightboxOpen) {
        history.back();
    }
}

function updateLightbox() {
    const photo = photos[currentIndex];

    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.alt;

    lightboxCounter.textContent = `${currentIndex + 1} / ${photos.length}`;
}

photos.forEach((photo, index) => {
    const figure = document.createElement('figure');
    figure.className = 'gallery-item';

    figure.setAttribute('tabindex', '0');
    figure.setAttribute('role', 'button');  

    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.alt;

    figure.append(img);
    galleryContainer.append(figure);

    figure.addEventListener('click', () => {
    currentIndex = index;

    lastFocusedElement = figure;

    updateLightbox();

    lightbox.hidden = false;
    lightboxOpen = true;
    history.pushState({ lightbox: true }, '');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
});

    figure.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        figure.click();
    }
});

});

lightboxClose.addEventListener('click', () => {
    closeLightbox();
});

lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
        closeLightbox();
    }
});

lightboxNext.addEventListener('click', ()=>{
        currentIndex=(currentIndex+1) % photos.length;
        updateLightbox();
});

lightboxPrev.addEventListener('click', ()=>{
        currentIndex=(currentIndex-1+photos.length)%photos.length;
        updateLightbox();    
});

document.addEventListener('keydown', (event) => {
    if (!lightbox.hidden) {
        if (event.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % photos.length;
            updateLightbox();
        }

        if (event.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + photos.length) % photos.length;
            updateLightbox();
        }

        if (event.key === 'Escape') {
            closeLightbox();
        }

        if (event.key === 'Tab') {
    const focusableElements = lightbox.querySelectorAll('button');
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
    }
}
    }
});

lightbox.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].screenX;
    touchStartY = event.changedTouches[0].screenY;
}, { passive: true });


lightbox.addEventListener('touchend', (event) => {
    const touchEndX = event.changedTouches[0].screenX;
    const touchEndY = event.changedTouches[0].screenY;

    const differenceX = touchStartX - touchEndX;
    const differenceY = touchStartY - touchEndY;

    if (Math.abs(differenceX) > 50 &&
        Math.abs(differenceX) > Math.abs(differenceY)) {

        if (differenceX > 0) {
            currentIndex = (currentIndex + 1) % photos.length;
        } else {
            currentIndex = (currentIndex - 1 + photos.length) % photos.length;
        }

        updateLightbox();
    }
});

window.addEventListener('popstate', () => {
    if (lightboxOpen) {
        lightboxOpen = false;
        lightbox.hidden = true;
        document.body.style.overflow = '';
        lastFocusedElement.focus();
    }
});