
const API_ENDPOINT = 'https://presetloop.olk1.com/fetch_issues.php';

const config = {
  lazyLoadPages: 7
};



const el = {

  canvas: document.getElementById('canvas'),

  loading: document.getElementById('loading'),

  thumbnailOverlay: document.getElementById('thumbnailOverlay'),
  thumbnailGrid: document.getElementById('thumbnailGrid'),

  pagesContainer: document.getElementById('pagesContainer'),

  closeFullViewBtn: document.getElementById('closeFullViewBtn')
  
};

const state = {
  issues: [],
  currentIssue: 0,


  currentView: 0,

  imageCache: new Map(),
  loadedBlocks: new Set(),

  // for canvas border draw and position shift
  hasRendered: false, 

  mode: 'page' // page | thumbs
};


const canvas = document.getElementById('canvas');
const thumbnailOverlay = document.getElementById('thumbnailOverlay');

let hiddenElements = [];
let canvasOnlyMode = false;

function enableCanvasOnlyMode() {
  if (canvasOnlyMode) return;

  hiddenElements = [];

document.querySelectorAll('body *').forEach(node => {

  const keepVisible =
    node === canvas ||
    node.contains(canvas) ||
    node === el.closeFullViewBtn ||
    node.contains(el.closeFullViewBtn) ||
    node === el.thumbnailOverlay ||
    node.contains(el.thumbnailOverlay);

  if (!keepVisible) {
    hiddenElements.push(node);
    node.style.display = 'none';
  }

});

  canvas.style.boxSizing = 'border-box';
  canvas.style.border = '50px solid #f7f7f7';

  canvasOnlyMode = true;

}

function disableCanvasOnlyMode() {
  if (!canvasOnlyMode) return;

  hiddenElements.forEach(el => {
    el.style.display = '';
  });

  canvas.style.zIndex = '';
  canvas.style.position = '';
  canvas.style.top = '';
  canvas.style.left = '';
   canvas.style.transform = '';
  canvas.style.width = '';
  canvas.style.height = '';
  canvas.style.border = '';

  hiddenElements = [];
  canvasOnlyMode = false;
}

function enterCanvasOnlyMode() {
  enableCanvasOnlyMode();
}

function isSplitMode() {
  return window.innerWidth < 640 && window.innerHeight > window.innerWidth;
}

function getIssue() {
  return state.issues[state.currentIssue];
}

function getTotalViews() {
  const issue = getIssue();
  if (!issue) return 0;
  return isSplitMode()
    ? issue.pages.length * 2
    : issue.pages.length;
}

function getImageIndex(viewIndex) {
  return isSplitMode()
    ? Math.floor(viewIndex / 2)
    : viewIndex;
}

function getViewSide(viewIndex) {
  if (!isSplitMode()) return 'full';
  return viewIndex % 2 === 0 ? 'left' : 'right';
}

function clampView(index) {
  const max = getTotalViews();
  return Math.max(0, Math.min(index, max - 1));
}



async function fetchImages() {
  const res = await fetch(API_ENDPOINT);
  const fetchedIssues = await res.json();

  // newest issue first
  state.issues = [...fetchedIssues].reverse();

  renderIssueList();

  if (state.issues.length) {
    selectIssue(0);
  }
}


function renderIssueList() {
  const BASE_CLASS = `text-center mt-0 mb-0.5 pl-1.5 pr-1.5 pt-2 pb-1 text-sm md:text-md leading-[0.75rem] md:leading-[0.90rem] bg-[#000] transform transition hover:bg-[#f33] hover:text-white leading-[12px] tracking-tight`;
  
  
  const list = document.getElementById('issueList');
  if (!list) return;

  list.innerHTML = '';

  state.issues.forEach((issue, index) => {
    const btn = document.createElement('button');

    const isActive = index === state.currentIssue;

    btn.className = BASE_CLASS;

    if (isActive) {
      btn.classList.add(
        'bg-[#f33]',
        'text-white'
      );
    }


    btn.innerHTML = `
      <div class="tracking-widest">#${issue.title}</div>
      <div class="text-xs">x ${issue.pages.length}</div>
    `;

    btn.addEventListener('click', () => selectIssue(index));

    list.appendChild(btn);
  });
}

function selectIssue(index) {
  state.currentIssue = index;
  state.currentView = 0;
  state.hasRendered = false;

  clearCanvas();

  renderIssueList();
  loadBlockIfNeeded(0);

  openThumbs();
}

async function loadBlockIfNeeded(pageIndex) {
  const issue = getIssue();
  if (!issue) return;

  const lazyLoadPages = config.lazyLoadPages;
  const blockIndex = Math.floor(pageIndex / lazyLoadPages);

  const key = `${state.currentIssue}-${blockIndex}`;

  if (state.loadedBlocks.has(key)) return;
  state.loadedBlocks.add(key);

  el.loading.classList.remove('hidden');

  const start = blockIndex * lazyLoadPages;
  const end = start + lazyLoadPages;

  const pages = issue.pages.slice(start, end);
  await Promise.all(pages.map(loadImage));

  el.loading.classList.add('hidden');
}



function loadImage(item) {
  return new Promise((resolve) => {
    const url = item?.url;
    if (!url) return resolve();

    if (state.imageCache.has(url)) return resolve();

    const img = new Image();
    img.src = url;

    img.onload = () => {
      state.imageCache.set(url, img);
      resolve();
    };

    img.onerror = () => resolve();
  });
}


async function renderView(viewIndex) {
  const issue = getIssue();
  if (!issue) return;

  const safeView = clampView(viewIndex);

  const imageIndex = getImageIndex(safeView);
  const side = getViewSide(safeView);

  const item = issue.pages[imageIndex];
  if (!item) return;

  const canvas = el.canvas;
  const ctx = canvas.getContext('2d');

  /* =====================================================
     CANVAS SETUP
  ===================================================== */

  if (isSplitMode()) {
    const dpr = window.devicePixelRatio || 1;

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    
    canvas.style.border = '';

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  } else {
    canvas.width = 1920;
    canvas.height = 1080;

    canvas.style.width = '';
    canvas.style.height = '';

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }

  /* =====================================================
     IMAGE LOAD
  ===================================================== */

  await loadImage(item);

  const img = state.imageCache.get(item.url);
  if (!img) return;

  canvas.classList.add('is-wiping');
  await new Promise(resolve => setTimeout(resolve, 120));

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  /* =====================================================
     FULL PAGE MODE
  ===================================================== */

  if (side === 'full') {
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  /* =====================================================
     SPLIT MODE
  ===================================================== */

  else {
    const cropWidth = img.width / 2;
    const cropHeight = img.height;

    const sx =
      side === 'left'
        ? 0
        : cropWidth;

    const viewWidth = window.innerWidth;
    const viewHeight = window.innerHeight;

    const imageRatio = cropWidth / cropHeight;
    const viewportRatio = viewWidth / viewHeight;

    let drawWidth;
    let drawHeight;
    let dx;
    let dy;

    // Cover viewport without distortion
    if (imageRatio > viewportRatio) {
      drawHeight = viewHeight;
      drawWidth = drawHeight * imageRatio;

      dx = (viewWidth - drawWidth) / 2;
      dy = 0;
    } else {
      drawWidth = viewWidth;
      drawHeight = drawWidth / imageRatio;

      dx = 0;
      dy = (viewHeight - drawHeight) / 2;
    }

    ctx.drawImage(
      img,
      sx,
      0,
      cropWidth,
      cropHeight,
      dx,
      dy,
      drawWidth,
      drawHeight
    );
  }

  /* =====================================================
     FIRST RENDER
  ===================================================== */

  if (!state.hasRendered) {
    state.hasRendered = true;
    el.pagesContainer.classList.remove('opacity-0');
  }

  state.currentView = safeView;

  requestAnimationFrame(() => {
    canvas.classList.remove('is-wiping');
  });
}



function renderThumbnails() {
  const issue = getIssue();
  if (!issue) return;

  el.thumbnailGrid.innerHTML = '';

  issue.pages.forEach((item, index) => {
    const btn = document.createElement('button');

    btn.className =
      'relative bg-zinc-900 border border-zinc-800 rounded overflow-hidden aspect-[16/9]';

    btn.innerHTML = `
      <img src="${item.url}" class="w-full h-full object-cover" />
      <!-- <div class="absolute bottom-0 left-0 right-0 bg-black/60 text-xs px-2 py-1">
        Page ${index + 1}
      </div> -->
    `;

    btn.addEventListener('click', () => {
      if (!canvasOnlyMode) enableCanvasOnlyMode();

      navigate('GOTO', isSplitMode() ? index * 2 : index);

      requestAnimationFrame(() => {
        if (canvasOnlyMode) enableCanvasOnlyMode();
      });
});

    el.thumbnailGrid.appendChild(btn);
  });
}




function openThumbs() {
  disableCanvasOnlyMode();

  state.mode = 'thumbs';

  clearCanvas();

  el.thumbnailOverlay.classList.remove('hidden');
  renderThumbnails();

  el.closeFullViewBtn?.classList.add('hidden');

}

function closeThumbs() {
  state.mode = 'page';

  el.thumbnailOverlay.classList.add('hidden');

  // if (window.innerWidth < 768) {
    el.closeFullViewBtn?.classList.remove('hidden');
  // }

  enableCanvasOnlyMode();

  clearCanvas();
}

async function navigate(action, value = 1) {
  const issue = getIssue();
  if (!issue) return;

  const max = getTotalViews();

  if (state.mode === 'thumbs') {
    switch (action) {
      case 'NEXT':
        closeThumbs();
        return renderView(0);

      case 'PREV':
        closeThumbs();
        return renderView(max - 1);

      case 'GOTO':
        closeThumbs();
        return renderView(value);
    }
    return;
  }

  switch (action) {
    case 'NEXT': {
      const next = state.currentView + value;
      if (next >= max) return openThumbs();
      return renderView(next);
    }

    case 'PREV': {
      const prev = state.currentView - value;
      if (prev < 0) return openThumbs();
      return renderView(prev);
    }

    case 'GOTO':
      return renderView(value);

    case 'OPEN_THUMBS':
      return openThumbs();

    case 'CLOSE_THUMBS':
      return closeThumbs();
  }
}

el.closeFullViewBtn?.addEventListener('click', () => {
  navigate('OPEN_THUMBS');
});


document.addEventListener('keydown', e => {
  const tag = document.activeElement.tagName;
  const ignoreTyping = tag === 'INPUT' || tag === 'TEXTAREA';

  // Escape exits only
  if (e.key === 'Escape') {
    disableCanvasOnlyMode();
    return;
  }

  // Arrow keys only ENTER mode (never exit)
  if ((e.key === 'ArrowLeft' || e.key === 'ArrowRight') && !ignoreTyping) {
    e.preventDefault();
    enableCanvasOnlyMode();
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') navigate('NEXT');
  if (e.key === 'ArrowLeft') navigate('PREV');
  if (e.key === 'Escape') navigate('OPEN_THUMBS');
});






function attachSwipeNavigation(target = el.pagesContainer || document) {
  let startX = 0;
  let startY = 0;

  const MIN_DISTANCE = 50;
  const MAX_VERTICAL_DRIFT = 75;

  target.addEventListener('touchstart', (e) => {
    const touch = e.changedTouches[0];
    startX = touch.clientX;
    startY = touch.clientY;
  }, { passive: true });

  target.addEventListener('touchend', (e) => {
    const touch = e.changedTouches[0];

    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;

    if (Math.abs(dy) > MAX_VERTICAL_DRIFT) return;
    if (Math.abs(dx) < MIN_DISTANCE) return;

    if (dx < 0) navigate('NEXT');
    else navigate('PREV');

  }, { passive: true });
}

attachSwipeNavigation();




function applyCanvasAspect() {
  const wrapper = document.getElementById('pagesContainer');

  if (!wrapper) return;

  wrapper.style.aspectRatio =
  isSplitMode()
    ? '9 / 16'
    : '16 / 9';
}



function debounce(fn, delay = 150) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), delay);
  };
}


fetchImages();
applyCanvasAspect();



window.addEventListener('resize', debounce(() => {
  applyCanvasAspect();
  renderIssueList();
}));

window.addEventListener('orientationchange', applyCanvasAspect);



function clearCanvas() {
  const ctx = el.canvas.getContext('2d');

  ctx.clearRect(0, 0, el.canvas.width, el.canvas.height);

  // force blank frame
  el.canvas.width = el.canvas.width;
}