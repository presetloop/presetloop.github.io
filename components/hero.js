class HeroSection extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['link', 'image-src', 'section-subtitle', 'section-title', 'section-paragraph', 'button-text', 'class'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const imageSrc = this.getAttribute('image-src') || 'https://cdn.presetloops.com/uploads/trans.png';
    const sectionSubtitle = this.getAttribute('section-subtitle') || 'Preset loop';
    const sectionTitle = this.getAttribute('section-title') || 'Preset Loop';
    const sectionParagraph = this.getAttribute('section-paragraph') || 'Preset Loop';
    const buttonText = this.getAttribute('button-text') || '';
    const customClass = this.getAttribute('class') || '';
    const linkUrl = this.getAttribute('link') || '#';
    const isExternal = linkUrl.startsWith('https');

    const buttonHTML = `
      <a href="${linkUrl}" ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ''}>
        <button class="mt-6 bg-red-500 text-white px-6 py-2 rounded-md">
          ${buttonText}
        </button>
      </a>
    `;

    // if button-text prop used render button 
    const renderBtn = buttonText && buttonHTML

    // Directly add the content to the element
    this.innerHTML = `
      <section class="${customClass} p-12">
        <div class="flex flex-col md:flex-row items-center gap-0">
          <img src="${imageSrc}" alt="${sectionTitle}" class="lg:min-w-[500px] rounded-lg md:mr-8" />
          <div class="text-center md:text-left w-full">
            <h3 class="text-lg uppercase text-gray-400">${sectionSubtitle}</h3>
            <h1 class="text-4xl font-bold">${sectionTitle}</h1>
            <p class="mt-2 text-gray-300 max-w-96">${sectionParagraph}</p>
            ${renderBtn}
          </div>
        </div>
      </section>
    `;
  }
}

// Define the new custom element
customElements.define('hero-section', HeroSection);
