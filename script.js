/* =========================================================
   CONFIG
========================================================= */

// Replace with your endpoint.
const API_ENDPOINT =
  'https://presetloop.olk1.com/fetch_images.php';

const config = {
  lazyLoadPages: 6
};

/* =========================================================
   ELEMENTS
========================================================= */

const el = {
  issueList: document.getElementById('issueList'),
  issueLabel: document.getElementById('issueLabel'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),

  canvas: document.getElementById('canvas'),

  loading: document.getElementById('loading'),

  thumbnailOverlay: document.getElementById('thumbnailOverlay'),
  thumbnailGrid: document.getElementById('thumbnailGrid')
};


/* =========================================================
   STATE
========================================================= */

const state = {
  issues: [],
  currentIssue: 0,
  currentPage: 0,

  imageCache: new Map(),
  loadedBlocks: new Set(),

  mode: 'page' // page | thumbs
};


/* =========================================================
   FETCH IMAGES
========================================================= */

async function fetchImages() {

  const res = await fetch(
    'https://presetloop.olk1.com/fetch_issues.php'
  );

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
  el.issueList.innerHTML = '';

  state.issues.forEach((issue, index) => {
    const btn = document.createElement('button');

    btn.className = `w-full text-center mt-2 p-2 pb-1.5 text-sm md:text-lg leading-[0.75rem] md:leading-[1.3rem] rounded bg-[#000] transition border border-zinc-800 hover:bg-white hover:text-black`;

    btn.innerHTML = `
      <div class="tracking-widest">&#35;${issue.title}</div>
      <div class="text-xs">
        x ${issue.pages.length}
      </div>
    `;

    btn.addEventListener('click', () => selectIssue(index));
    el.issueList.appendChild(btn);
  });
}


/* =========================================================
   ISSUE SELECT
========================================================= */

function getIssue() {
  return state.issues[state.currentIssue];
}

function clamp(index) {
  const issue = getIssue();
  if (!issue) return 0;
  return Math.max(0, Math.min(index, issue.pages.length - 1));
}

function updateIssueLabel() {
  const issue = getIssue();
  if (!issue) return;

  el.issueLabel.innerHTML = `
      <p>You are viewing</p>
      <p>Issue: ${issue.title} Page: ${state.currentPage + 1}</p>
  `;
}

function selectIssue(index) {
  state.currentIssue = index;
  state.currentPage = 0;
  state.mode = 'page';

  closeThumbs();
  loadBlockIfNeeded(0);
  renderPage(0);
}


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
   RENDER PAGE
========================================================= */

async function renderPage(index) {
  const issue = getIssue();
  if (!issue) return;

  const safeIndex = clamp(index);
  const item = issue.pages[safeIndex];
  if (!item) return;

  const canvas = el.canvas;

  // page wipe animation
  canvas.classList.add('is-wiping');

  // wait for wipe animation
  await new Promise(r => setTimeout(r, 250));

  await loadImage(item);

  const img = state.imageCache.get(item.url);
  if (!img) return;

  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, 1920, 1080);
  ctx.drawImage(img, 0, 0, 1920, 1080);

  state.currentPage = safeIndex;
  updateIssueLabel();

  // fade in
  requestAnimationFrame(() => {
    canvas.classList.remove('is-wiping');
  });
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

    btn.addEventListener('click', () => navigate('GOTO', index));

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
   NAVIGATION
========================================================= */

async function navigate(action, value = 1) {
  const issue = getIssue();
  if (!issue) return;

  const max = issue.pages.length;

  if (state.mode === 'thumbs') {
    switch (action) {
      case 'NEXT':
        closeThumbs();
        return renderPage(0);

      case 'PREV':
        closeThumbs();
        return renderPage(max - 1);

      case 'GOTO':
        closeThumbs();
        return renderPage(value);
    }
    return;
  }

  switch (action) {
    case 'NEXT': {
      const next = state.currentPage + value;
      if (next >= max) return openThumbs();
      return renderPage(next);
    }

    case 'PREV': {
      const prev = state.currentPage - value;
      if (prev < 0) return openThumbs();
      return renderPage(prev);
    }

    case 'GOTO':
      return renderPage(value);

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


/* ======================================================
   TICKER
====================================================== */

import { tickerLinks } from './tickerlinks.js';

const ticker = document.getElementById('ticker');
let currentTickerIndex = 0;


/* ======================================================
   TICKER RENDER
====================================================== */

function renderTicker() {
  ticker.innerHTML = tickerLinks
    .map((item, i) => `
      <div class="ticker-item ${i === 0 ? 'active' : ''}">
        <a href="${item.url}" target="_blank" rel="noopener noreferrer">
          ${item.title}
        </a>
      </div>
    `)
    .join('');
}


/* ======================================================
   TICKER ROTATION
====================================================== */

function rotateTicker() {
  const items = ticker.querySelectorAll('.ticker-item');
  if (!items.length) return;

  items[currentTickerIndex].classList.remove('active');

  currentTickerIndex =
    (currentTickerIndex + 1) % items.length;

  items[currentTickerIndex].classList.add('active');
}


/* =========================================================
   INIT
========================================================= */

renderTicker();
fetchImages();

setInterval(rotateTicker, 10000);