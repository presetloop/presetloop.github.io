class NewsCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Get attributes (props)
        const title = this.getAttribute("title") || "";
        const subtitle = this.getAttribute("subtitle") || "";
        const mainContent = this.getAttribute("main-content") || "";
        const externalLink = this.getAttribute("external-link") || "";
        const customClass = this.getAttribute("custom-class") || "";
        const cta = this.getAttribute("cta") || "";

        // Conditionally remove 'bg-white' if mainContent is empty
        const containerClasses = `max-w-[544px] mx-auto p-0 m-0 ${mainContent ? "bg-white" : ""}`;

        this.innerHTML = `
          <div class="${customClass} p-2 md:p-8 min-h-full">
            <div class="${containerClasses}">
              <h2 class="text-2xl text-center font-bold mt-3 md:mt-0 mb-2 pt-2">${title}</h2>
              <h3 class="text-lg bg-black text-white text-center mb-4">${subtitle}</h3>
              ${mainContent ? `<p class="leading-relaxed pb-2 px-4">${mainContent}</p>` : ""}
              <p class="text-right mr-2"><a href="${externalLink}" target="_blank" class="text-black font-semibold hover:text-red-400 hover:underline">${cta}</a></p>
            </div>
          </div>
        `;
    }
}

customElements.define("news-card", NewsCard);
