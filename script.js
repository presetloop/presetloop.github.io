/* =========================================================
   CONFIG
========================================================= */


const API_ENDPOINT = 'https://presetloop.olk1.com/fetch_issues.php';

const config = {
  lazyLoadPages: 6
};




/* =========================================================
   ELEMENTS
========================================================= */

const el = {
  // issueList: document.getElementById('issueList'),
  issueLabel: document.getElementById('issueLabel'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),

  canvas: document.getElementById('canvas'),

  loading: document.getElementById('loading'),

  thumbnailOverlay: document.getElementById('thumbnailOverlay'),
  thumbnailGrid: document.getElementById('thumbnailGrid'),

  pagesContainer: document.getElementById('pagesContainer')
};


const ISSUE_LIST_TARGETS = {
  mobile: () => document.getElementById('issueListMobile'),
  desktop: () => document.getElementById('issueListDesktop')
};

function getIssueListEl() {
  return window.innerWidth < 768
    ? ISSUE_LIST_TARGETS.mobile()
    : ISSUE_LIST_TARGETS.desktop();
}
/* =========================================================
   STATE
========================================================= */

const state = {
  issues: [],
  currentIssue: 0,

  // CHANGED: page -> view (virtual index)
  currentView: 0,

  imageCache: new Map(),
  loadedBlocks: new Set(),

  // for canvas border draw and position shift
  hasRendered: false, 

  mode: 'page' // page | thumbs
};


/* =========================================================
   RESPONSIVE SPLIT MODE
========================================================= */

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


/* =========================================================
   FETCH IMAGES
========================================================= */

async function fetchImages() {
  const res = await fetch(API_ENDPOINT);

  state.issues = await res.json();

  renderIssueList();

  if (state.issues.length) {
    selectIssue(0);
  }
}


/* =========================================================
   ISSUE LIST
========================================================= */


function renderIssueList() {
  const BASE_CLASS = `text-center mt-0 mb-0.5 pl-3 md:pl-2 pr-2 pt-2 pb-1 text-sm md:text-md leading-[0.75rem] md:leading-[0.90rem] bg-[#000] transition hover:bg-white hover:text-black leading-[12px] tracking-tight`;
  
  const list = getIssueListEl();
  if (!list) return;

  list.innerHTML = '';

  state.issues.forEach((issue, index) => {
    const btn = document.createElement('button');

    const isActive = index === state.currentIssue;

    btn.className = BASE_CLASS;

    btn.className = BASE_CLASS;

    if (isActive) {
      btn.classList.add(
        'bg-gray-50',
        'text-black'
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

/* =========================================================
   ISSUE SELECT
========================================================= */

// 
// 
// choose from:

  // load as page 1 image 1
  // same when issue button clicked

  // function selectIssue(index) {
  //   state.currentIssue = index;
  //   state.currentView = 0;
  //   state.mode = 'page';

  //   closeThumbs();

  //   loadBlockIfNeeded(0);
  //   renderView(0);

  //   renderIssueList();
  // }

// OR

  // load as thumbnails for issue
  // same when issue button is clicked 
  function selectIssue(index) {
    state.currentIssue = index;
    // state.currentView = 0;

    renderIssueList();

    loadBlockIfNeeded(0);

    openThumbs();
  }

// 
// 
// 
/* =========================================================
   BLOCK LOADING
========================================================= */

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


/* =========================================================
   IMAGE LOADER
========================================================= */

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


/* =========================================================
   RENDER VIEW
========================================================= */

async function renderView(viewIndex) {
  const issue = getIssue();
  if (!issue) return;

  const safeView = clampView(viewIndex);

  const imageIndex = getImageIndex(safeView);
  const side = getViewSide(safeView);

  const item = issue.pages[imageIndex];
  if (!item) return;

  const canvas = el.canvas;

  // -----------------------------
  // Set canvas resolution first
  // -----------------------------
  if (isSplitMode()) {
    canvas.width = 1080;
    canvas.height = 1920;
  } else {
    canvas.width = 1920;
    canvas.height = 1080;
  }

  const ctx = canvas.getContext('2d');

  // -----------------------------
  // Ensure image is ready FIRST
  // -----------------------------
  await loadImage(item);

  const img = state.imageCache.get(item.url);
  if (!img) return;

  // -----------------------------
  // Start transition only when ready
  // -----------------------------
  canvas.classList.add('is-wiping');
  await new Promise(r => setTimeout(r, 120));

  // -----------------------------
  // Clear ONLY right before draw
  // -----------------------------
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // -----------------------------
  // Render
  // -----------------------------
  if (side === 'full') {

    ctx.drawImage(
      img,
      0, 0, img.width, img.height,
      0, 0, canvas.width, canvas.height
    );

    // avoids canvas border draw and position shift
    if (!state.hasRendered) {
      state.hasRendered = true;
      el.pagesContainer.classList.remove('opacity-0');
    }
  } else {

    const cropWidth = img.width / 2;
    const cropHeight = img.height;

    const sx = side === 'left' ? 0 : cropWidth;

    const scale = Math.min(
      canvas.width / cropWidth,
      canvas.height / cropHeight
    );

    const drawWidth = cropWidth * scale;
    const drawHeight = cropHeight * scale;

    const dx = (canvas.width - drawWidth) / 2;
    const dy = 0;

    ctx.drawImage(
      img,
      sx, 0, cropWidth, cropHeight,
      dx, dy, drawWidth, drawHeight
    );

    // avoids canvas border draw and position shift
    if (!state.hasRendered) {
      state.hasRendered = true;
      el.pagesContainer.classList.remove('opacity-0');
    }
  }

  // -----------------------------
  // Commit state + UI
  // -----------------------------
  state.currentView = safeView;

  updateIssueLabel();

  requestAnimationFrame(() => {
    canvas.classList.remove('is-wiping');
  });
}
/* =========================================================
   ISSUE LABEL
========================================================= */

function updateIssueLabel() {
  const issue = getIssue();
  if (!issue) return;

  const imageIndex = getImageIndex(state.currentView);
  const side = getViewSide(state.currentView);

  const suffix =
    side === 'left' ? ' (L)' :
    side === 'right' ? ' (R)' : '';

  el.issueLabel.innerHTML = `
      <p>You are viewing</p>
      <p>Issue: ${issue.title} Page: ${imageIndex + 1}${suffix}</p>
  `;
}


/* =========================================================
   THUMBNAILS
========================================================= */

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
      <div class="absolute bottom-0 left-0 right-0 bg-black/60 text-xs px-2 py-1">
        Page ${index + 1}
      </div>
    `;

    btn.addEventListener('click', () => {
      navigate('GOTO', isSplitMode() ? index * 2 : index);
    });

    el.thumbnailGrid.appendChild(btn);
  });
}


/* =========================================================
   VIEW MODES
========================================================= */

function openThumbs() {
  state.mode = 'thumbs';
  el.thumbnailOverlay.classList.remove('hidden');
  renderThumbnails();
}

function closeThumbs() {
  state.mode = 'page';
  el.thumbnailOverlay.classList.add('hidden');
}


/* =========================================================
   NAVIGATION (UPDATED FOR VIEWS)
========================================================= */

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


/* =========================================================
   EVENTS
========================================================= */

el.nextBtn.addEventListener('click', () => navigate('NEXT'));
el.prevBtn.addEventListener('click', () => navigate('PREV'));

window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') navigate('NEXT');
  if (e.key === 'ArrowLeft') navigate('PREV');
  if (e.key === 'Escape') navigate('OPEN_THUMBS');
});





/* =========================================================
   SWIPE NAVIGATION 
========================================================= */

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


/* ======================================================
   TICKER
====================================================== */

import { tickerLinks } from './tickerlinks.js';

const ticker = document.getElementById('ticker');
let currentTickerIndex = 0;

function renderTicker() {
  ticker.innerHTML = tickerLinks
    .map((item, i) => `
      <div class="ticker-item ${i === 0 ? 'active' : ''}">
        <a href="${item.url}" class="md:pt-1 text-blue-500" target="_blank" rel="noopener noreferrer">** ${item.title} **</a>
      </div>
    `)
    .join('');
}

function rotateTicker() {
  const items = ticker.querySelectorAll('.ticker-item');
  if (!items.length) return;

  items[currentTickerIndex].classList.remove('active');

  currentTickerIndex =
    (currentTickerIndex + 1) % items.length;

  items[currentTickerIndex].classList.add('active');
}





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
/* =========================================================
   INIT
========================================================= */

renderTicker();
fetchImages();
applyCanvasAspect();

setInterval(rotateTicker, 10000);

window.addEventListener('resize', debounce(() => {
  applyCanvasAspect();
  renderIssueList();
}));

window.addEventListener('orientationchange', applyCanvasAspect);


// canvas.style.aspectRatio = isSplitMode() ? "9 / 16" : "16 / 9";