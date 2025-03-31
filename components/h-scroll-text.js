class ScrollingText extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const text = this.getAttribute("text") || "Scrolling Headline!";
        const highlight = this.getAttribute("highlight") || "";
        const speed = this.getAttribute("speed") || "10s"; // Default speed

        // Function to wrap highlighted words
        const getHighlightedText = (text, highlight) => {
            if (!highlight) return text;
            const regex = new RegExp(`(${highlight})`, "gi"); // Case-insensitive match
            return text.replace(regex, `<span class="highlighted">$1</span>`);
        };

        const processedText = getHighlightedText(text, highlight);

        this.innerHTML = `
            <style>
                .scroll-container {
                    width: 100%;
                    overflow: hidden;
                    white-space: nowrap;
                    position: relative;
                    padding: 10px 0;
                }

                .scroll-text {
                    display: inline-block;
                    font-size: 2rem;
                    font-weight: bold;
                    text-transform: uppercase;
                    padding-right: 2rem;
                    animation: scrollText ${speed} linear infinite;
                }

                .highlighted {
                    color: #FD6A6D; /* Customize highlight color */
                    font-weight: bold;
                    background: yellow; /* Example background color */
                    padding: 0 4px;
                }

                .gold-star {
                    color: gold; /* Gold-colored stars */
                }

                @keyframes scrollText {
                    from {
                        transform: translateX(100%);
                    }
                    to {
                        transform: translateX(-100%);
                    }
                }
            </style>
            <div class="scroll-container">
                <span class="scroll-text">
                    ${processedText} 
                    &nbsp; <span class="gold-star">&starf;&starf;&starf;&starf;&starf;</span> &nbsp; 
                    ${processedText} 
                    &nbsp; <span class="gold-star">&starf;&starf;&starf;&starf;&starf;</span>
                </span>
            </div>
        `;
    }
}

// Define the custom element
customElements.define("scrolling-text", ScrollingText);
