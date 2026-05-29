/* =========================================================
   CONFIG
========================================================= */

// Replace with your endpoint.
const API_ENDPOINT =
  'https://presetloop.olk1.com/fetch_images.php';

const config = {
  issueTotalPages: 3,
  lazyLoadPages: 2
}

/* =========================================================
   ELEMENTS
========================================================= */

const el = {
  issueList:
    document.getElementById('issueList'),

  issueLabel:
    document.getElementById('issueLabel'),

  prevBtn:
    document.getElementById('prevBtn'),

  nextBtn:
    document.getElementById('nextBtn'),

  canvasA:
    document.getElementById('canvasA'),

  canvasB:
    document.getElementById('canvasB'),

  loading:
    document.getElementById('loading'),

  thumbnailOverlay:
    document.getElementById('thumbnailOverlay'),

  thumbnailGrid:
    document.getElementById('thumbnailGrid')
};

/* =========================================================
   CANVAS
========================================================= */

const ctxA =
  el.canvasA.getContext('2d');

const ctxB =
  el.canvasB.getContext('2d');

/* =========================================================
   STATE
========================================================= */

const state = {
  issues: [],
  currentIssue: 0,
  currentPage: 0,

  visibleCanvas: 'A',

  imageCache: new Map(),

  loadedBlocks: new Set(),

  showingThumbs: false,

  mode: 'page' // 'page' | 'thumbs'
};




/* =========================================================
   FETCH IMAGES
========================================================= */

async function fetchImages() {

  const res =
    await fetch(API_ENDPOINT);

  const data =
    await res.json();

  // console.table(data);
  buildIssues(data);
}
/* =========================================================
   BUILD ISSUES
========================================================= */

function buildIssues(images) {

  const chunkSize = config.issueTotalPages;

  state.issues = [];

  if (!Array.isArray(images) || images.length === 0) {
    renderIssueList();
    return;
  }

  for (let i = 0; i < images.length; i += chunkSize) {

    const chunk = images.slice(i, i + chunkSize);

    state.issues.push({
      id: state.issues.length,
      title: `&#35;${state.issues.length + 1}`,
      pages: chunk
    });
  }

  renderIssueList();

  // reset navigation state deterministically
  state.currentIssue = 0;
  state.currentPage = 0;
  state.mode = 'page';

  if (state.issues.length > 0) {
    selectIssue(0);
  }
}

/* =========================================================
   ISSUE LIST
========================================================= */

function renderIssueList() {

  el.issueList.innerHTML = '';

  state.issues.forEach((issue, index) => {

    const btn =
      document.createElement('button');

    btn.className =
      `
      w-full
      text-center
      px-2
      pt-2.5
      pb-2
      text-sm
      md:text-lg
      leading-[0.75rem]
      md:leading-[1rem]
      rounded
      bg-[#111]
      hover:bg-zinc-900
      transition
      border
      border-zinc-800
      `;

    btn.innerHTML = `
      <div class="font-medium">
        ${issue.title}
      </div>

      <div class="text-xs text-zinc-500 mt-1">
        x ${issue.pages.length}
      </div>
    `;

    btn.addEventListener('click', () => {
      selectIssue(index);
    });

    el.issueList.appendChild(btn);
  });
}

/* =========================================================
   SELECT ISSUE
========================================================= */
function updateIssueLabel() {

  const issue = getIssue();

  if (!issue) return;

  el.issueLabel.innerHTML = `
    <div class="w-28 flex flex-col text-center leading-[18px]">
      <p>You are viewing:</p>
      <p>Issue ${issue.title} <span>Page ${state.currentPage + 1}</span></p>
    </div>
  `;
}

function selectIssue(index) {

  state.currentIssue = index;
  state.currentPage = 0;

  // force page mode
  state.mode = 'page';

  // close thumbnail overlay if open
  closeThumbs();

  // const issue =
  //   state.issues[index];

  // el.issueLabel.innerHTML =
  //   `You are viewing: <br/> ${issue.title} — Page 1`;

  loadBlockIfNeeded(0);

  renderPage(0);
}

/* =========================================================
   BLOCK LOADING
========================================================= */

async function loadBlockIfNeeded(pageIndex) {

  const lazyLoadPages = config.lazyLoadPages;

  const issue =
    state.issues[state.currentIssue];

  const blockIndex =
    Math.floor(pageIndex / lazyLoadPages);

  if (
    state.loadedBlocks.has(
      `${state.currentIssue}-${blockIndex}`
    )
  ) {
    return;
  }

  state.loadedBlocks.add(
    `${state.currentIssue}-${blockIndex}`
  );

  el.loading.classList.remove('hidden');

  const start =
    blockIndex * lazyLoadPages;

  const end =
    start + lazyLoadPages;

  const pages =
    issue.pages.slice(start, end);

  await Promise.all(
    pages.map(loadImage)
  );

  el.loading.classList.add('hidden');
}

/* =========================================================
   IMAGE LOADER
========================================================= */

function getImageUrl(item) {
  return item?.filename || item?.image_url || item?.url || null;
}


/* =========================================================
   DRAW IMAGE
========================================================= */

function drawCoverImage(ctx, img) {

  ctx.clearRect(0, 0, 1920, 1080);

  const scale =
    Math.max(
      1920 / img.width,
      1080 / img.height
    );

  const w =
    img.width * scale;

  const h =
    img.height * scale;

  const x =
    (1920 - w) / 2;

  const y =
    (1080 - h) / 2;

  ctx.drawImage(img, x, y, w, h);

  /* subtle overlay */

  ctx.fillStyle =
    'rgba(0,0,0,0.2)';

  ctx.fillRect(0, 0, 1920, 1080);
}

const VIEW = {
  PAGE: 'page',
  THUMBS: 'thumbs'
};


/* =========================================================
   HELPERS
========================================================= */

function getIssue() {
  return state.issues[state.currentIssue];
}

function clamp(index) {
  const issue = getIssue();
  if (!issue) return 0;

  return Math.max(0, Math.min(index, issue.pages.length - 1));
}


/* =========================================================
   IMAGE LOADING
========================================================= */

async function loadImage(item) {

  return new Promise((resolve) => {

    if (state.imageCache.has(item.url)) {
      resolve();
      return;
    }

    const img = new Image();
    img.src = item.url;

    img.onload = () => {
      state.imageCache.set(item.url, img);
      resolve();
    };

    img.onerror = () => {
      console.error('Image failed:', item.url);
      resolve();
    };
  });
}


/* =========================================================
   CORE RENDER (ONLY PLACE CANVAS IS UPDATED)
========================================================= */

async function renderPage(index) {

  const issue = getIssue();
  if (!issue) return;

  const safeIndex = clamp(index);
  const item = issue.pages[safeIndex];
  if (!item) return;

  await loadImage(item);

  const img = state.imageCache.get(item.url);
  if (!img) return;

  const ctx = el.canvasA.getContext('2d');

  ctx.clearRect(0, 0, 1920, 1080);
  ctx.drawImage(img, 0, 0, 1920, 1080);

  state.currentPage = safeIndex;

  updateIssueLabel();
}


/* =========================================================
   THUMB RENDER (NO CANVAS SIDE EFFECTS)
========================================================= */

function renderThumbnails() {

  const issue = getIssue();
  if (!issue) return;

  el.thumbnailGrid.innerHTML = '';

  issue.pages.forEach((item, index) => {

    const btn = document.createElement('button');

    btn.className = `
      relative bg-zinc-900 border border-zinc-800 rounded overflow-hidden aspect-[16/9]
    `;

    btn.innerHTML = `
      <img src="${item.url}" class="w-full h-full object-cover" />
      <div class="absolute bottom-0 left-0 right-0 bg-black/60 text-xs px-2 py-1">
        Page ${index + 1}
      </div>
    `;

    btn.addEventListener('click', () => {
      navigate('GOTO', index);
    });

    el.thumbnailGrid.appendChild(btn);
  });
}


/* =========================================================
   VIEW SWITCH
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
   NAVIGATION CONTROLLER (ONLY ENTRY POINT)
========================================================= */

async function navigate(action, value = 1) {

  const issue = getIssue();
  if (!issue) return;

  const max = issue.pages.length;

  /* =======================
     THUMB MODE RULES
  ======================= */

  if (state.mode === 'thumbs') {

    switch (action) {

      case 'NEXT': {
        state.mode = 'page';
        await renderPage(0);
        closeThumbs();
        return;
      }

      case 'PREV': {
        state.mode = 'page';
        await renderPage(max - 1);
        closeThumbs();
        return;
      }

      case 'GOTO': {
        state.mode = 'page';
        closeThumbs();
        await renderPage(value);
        return;
      }

      case 'OPEN_THUMBS': {
        return; // already open
      }
    }
  }

  /* =======================
     PAGE MODE RULES
  ======================= */

  switch (action) {

    case 'NEXT': {

      const next = state.currentPage + value;

      if (next >= max) {
        openThumbs();
        return;
      }

      await renderPage(next);
      return;
    }

    case 'PREV': {

      const prev = state.currentPage - value;

      if (prev < 0) {
        openThumbs();
        return;
      }

      await renderPage(prev);
      return;
    }

    case 'GOTO': {
      await renderPage(value);
      return;
    }

    case 'OPEN_THUMBS': {
      openThumbs();
      return;
    }

    case 'CLOSE_THUMBS': {
      closeThumbs();
      return;
    }
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

/* ======================================================
LINK DATA
====================================================== */

import { tickerLinks }
  from './tickerlinks.js';

/* ======================================================
ELEMENTS
====================================================== */

const ticker =
  document.getElementById('ticker');

/* ======================================================
STATE
====================================================== */

let currentTickerIndex = 0;

/* ======================================================
RENDER
====================================================== */

function renderTicker() {

  ticker.innerHTML =
    tickerLinks.map((item, index) => {

      return `
        <div
          class="
            ticker-item
            ${index === 0 ? 'active' : ''}
          "
        >

          <a
            href="${item.url}"
            target="_blank"
            rel="noopener noreferrer"
            class="ticker-link"
          >
            ${item.title}
          </a>

        </div>
      `;
    }).join('');
}

/* ======================================================
ROTATE
====================================================== */

function rotateTicker() {

  const items =
    ticker.querySelectorAll('.ticker-item');

  items[currentTickerIndex]
    .classList.remove('active');

  currentTickerIndex =
    (currentTickerIndex + 1)
    % items.length;

  items[currentTickerIndex]
    .classList.add('active');
}


/* =========================================================
   START
========================================================= */

renderTicker();
fetchImages();



setInterval(
  rotateTicker,
  10000
);



