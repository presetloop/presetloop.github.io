const API_ENDPOINT = 'https://presetloop.olk1.com/fetch_issues.php';

const API = API_ENDPOINT;

let images = [];

let currentImage = 0;

let scale = 1;
let offsetX = 0;
let offsetY = 0;

let isPanning = false;

let startPanX = 0;
let startPanY = 0;

let touchMode = null;

let swipeStartX = 0;
let swipeStartY = 0;

let swipeCloseStartY = 0;
let swipeCloseStartX = 0;
let swipeCloseActive = false;

let pinchStartDistance = 0;
let pinchStartScale = 1;

const thumbGrid = document.getElementById('thumbGrid');

const thumbView = document.getElementById('thumbView');

const viewer = document.getElementById('viewer');

const viewerImage =
    document.getElementById('viewerImage');

const counter =
    document.getElementById('counter');

const closeBtn =
    document.getElementById('closeBtn');

async function init(){

    const res = await fetch(API);

    const issues = await res.json();

    images = [];

    issues.forEach(issue => {

        if(Array.isArray(issue.pages)){

            images.push(...issue.pages);
        }

    });

    images;

    renderThumbs();
}

function renderThumbs(){

    thumbGrid.innerHTML = '';

    images.forEach((img,index)=>{

        const thumb =
            document.createElement('img');

        thumb.src = img.url;

        thumb.className = 'thumb';

        thumb.loading = 'lazy';

        thumb.onclick = () => {

            openViewer(index);

        };

        thumbGrid.appendChild(thumb);

    });
}

function openViewer(index){

    currentImage = index;

    viewer.classList.remove('hidden');

    thumbView.classList.add('hidden');

    document.body.style.overflow = 'hidden';

    resetTransform();

    updateViewer();
}

function closeViewer(){

    viewer.classList.add('hidden');

    thumbView.classList.remove('hidden');

    document.body.style.overflow = '';

    resetTransform();
}

function updateViewer(){

    if(!images.length) return;

    viewerImage.src =
        images[currentImage].url;

    counter.textContent =
        `${currentImage + 1} / ${images.length}`;
}

function nextImage(){

    if(currentImage >= images.length - 1){

        closeViewer();
        return;
    }

    currentImage++;

    resetTransform();

    updateViewer();
}

function prevImage(){

    if(currentImage <= 0){

        closeViewer();
        return;
    }

    currentImage--;

    resetTransform();

    updateViewer();
}

function resetTransform(){

    scale = 1;

    offsetX = 0;
    offsetY = 0;

    applyTransform();
}

function applyTransform(){

    viewerImage.style.transform =
        `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
}

function clampScale(v){

    return Math.min(
        8,
        Math.max(
            1,
            v
        )
    );
}

function getDistance(a,b){

    const dx =
        a.clientX - b.clientX;

    const dy =
        a.clientY - b.clientY;

    return Math.sqrt(
        dx*dx + dy*dy
    );
}

function getMidpoint(a,b){

    return {
        x:(a.clientX + b.clientX)/2,
        y:(a.clientY + b.clientY)/2
    };
}

closeBtn.addEventListener(
    'click',
    closeViewer
);

document.addEventListener(
    'keydown',
    e => {

        if(viewer.classList.contains('hidden')){

            if(
                e.key === 'ArrowRight' ||
                e.key === 'ArrowLeft'
            ){

                if(images.length){

                    openViewer(0);
                }
            }

            return;
        }

        switch(e.key){

            case 'Escape':
                closeViewer();
                break;

            case 'ArrowRight':
                nextImage();
                break;

            case 'ArrowLeft':
                prevImage();
                break;
        }

    }
);

viewer.addEventListener(
    'wheel',
    e => {

        e.preventDefault();

        const rect =
            viewer.getBoundingClientRect();

        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;

        const worldX =
            (x - offsetX) / scale;

        const worldY =
            (y - offsetY) / scale;

        let newScale =
            scale + (-e.deltaY * 0.002);

        newScale =
            clampScale(newScale);

        offsetX =
            x - (worldX * newScale);

        offsetY =
            y - (worldY * newScale);

        scale = newScale;

        applyTransform();

    },
    { passive:false }
);

viewer.addEventListener(
    'mousedown',
    e => {

        if(scale <= 1) return;

        isPanning = true;

        startPanX =
            e.clientX - offsetX;

        startPanY =
            e.clientY - offsetY;

    }
);

window.addEventListener(
    'mouseup',
    () => {

        isPanning = false;

    }
);

window.addEventListener(
    'mousemove',
    e => {

        if(!isPanning) return;

        offsetX =
            e.clientX - startPanX;

        offsetY =
            e.clientY - startPanY;

        applyTransform();

    }
);



viewer.addEventListener(
    'touchstart',
    e => {

        if(e.touches.length === 2){

            touchMode = 'pinch';

            pinchStartDistance =
                getDistance(
                    e.touches[0],
                    e.touches[1]
                );

            pinchStartScale =
                scale;

            swipeCloseActive = false;

            return;
        }

        if(e.touches.length !== 1){
            return;
        }

        const touch = e.touches[0];

        if(scale > 1){

            touchMode = 'pan';

            swipeCloseActive = false;

            startPanX =
                touch.clientX - offsetX;

            startPanY =
                touch.clientY - offsetY;

        }else{

            touchMode = 'swipe';

            swipeStartX =
                touch.clientX;

            swipeStartY =
                touch.clientY;

            swipeCloseStartX =
                touch.clientX;

            swipeCloseStartY =
                touch.clientY;

            swipeCloseActive = true;
        }

    },
    { passive:false }
);

viewer.addEventListener(
    'touchmove',
    e => {

        if(
            touchMode === 'pinch' &&
            e.touches.length === 2
        ){

            e.preventDefault();

            const t1 =
                e.touches[0];

            const t2 =
                e.touches[1];

            const midpoint =
                getMidpoint(t1,t2);

            const dist =
                getDistance(t1,t2);

            let newScale =
                pinchStartScale *
                (dist / pinchStartDistance);

            newScale =
                clampScale(newScale);

            const worldX =
                (midpoint.x - offsetX)
                / scale;

            const worldY =
                (midpoint.y - offsetY)
                / scale;

            offsetX =
                midpoint.x -
                (worldX * newScale);

            offsetY =
                midpoint.y -
                (worldY * newScale);

            scale = newScale;

            applyTransform();

            return;
        }

        if(
            swipeCloseActive &&
            touchMode === 'swipe' &&
            e.touches.length === 1
        ){

            const touch =
                e.touches[0];

            const dx =
                touch.clientX -
                swipeCloseStartX;

            const dy =
                touch.clientY -
                swipeCloseStartY;

            if(
                dy > 0 &&
                Math.abs(dy) > Math.abs(dx)
            ){

                e.preventDefault();

                viewerImage.style.transform =
                    `translate(${offsetX}px, ${offsetY + dy}px) scale(${scale})`;

                return;
            }
        }

        if(
            touchMode === 'pan' &&
            e.touches.length === 1
        ){

            e.preventDefault();

            const touch =
                e.touches[0];

            offsetX =
                touch.clientX -
                startPanX;

            offsetY =
                touch.clientY -
                startPanY;

            applyTransform();
        }

    },
    { passive:false }
);

viewer.addEventListener(
    'touchend',
    e => {

        if(
            swipeCloseActive &&
            e.changedTouches.length
        ){

            const touch =
                e.changedTouches[0];

            const dx =
                touch.clientX -
                swipeCloseStartX;

            const dy =
                touch.clientY -
                swipeCloseStartY;

            swipeCloseActive = false;

            applyTransform();

            if(
                dy > 20 &&
                Math.abs(dy) > Math.abs(dx)
            ){

                closeViewer();
                return;
            }
        }

        if(touchMode === 'swipe'){

            if(scale > 1.05){

                touchMode = null;
                return;
            }

            const touch =
                e.changedTouches[0];

            const dx =
                touch.clientX -
                swipeStartX;

            const dy =
                touch.clientY -
                swipeStartY;

            if(
                Math.abs(dx) > 60 &&
                Math.abs(dx) > Math.abs(dy)
            ){

                if(dx < 0){

                    nextImage();

                }else{

                    prevImage();
                }
            }
        }

        touchMode = null;

    }
);

let lastTap = 0;

viewer.addEventListener(
    'touchend',
    e => {

        if(
            e.changedTouches.length !== 1
        ) return;

        const now = Date.now();

        if(now - lastTap < 300){

            const touch =
                e.changedTouches[0];

            const x = touch.clientX;
            const y = touch.clientY;

            if(scale === 1){

                scale = 2.5;

                offsetX =
                    -(x * (scale - 1));

                offsetY =
                    -(y * (scale - 1));

            }else{

                resetTransform();
            }

            applyTransform();
        }

        lastTap = now;

    }
);



const overlay = document.getElementById('touchInfoOverlay');

function showInfoOverlay(){

    overlay.style.display = 'flex';

    let dismissed = false;

    const dismiss = (e) => {

        if(dismissed) return;

        dismissed = true;

        // CRITICAL: stop full event chain
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation?.();

        overlay.style.display = 'none';

        // prevent ghost click on mobile (important)
        window.addEventListener('click', blockGhostClick, true);
        setTimeout(() => {
            window.removeEventListener('click', blockGhostClick, true);
        }, 500);
    };

    const blockGhostClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    // IMPORTANT: listen directly on overlay, not window
    overlay.addEventListener('pointerdown', dismiss, {
        once: true,
        capture: true
    });
}

window.addEventListener('load', showInfoOverlay);

init();
