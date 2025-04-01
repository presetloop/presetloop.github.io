const RecordLabel = `<img src="https://cdn.presetloops.com/uploads/trans.png" alt="Preset Loop" class="h-8 w-auto sm:-mt-1">`;

const timeoutDelay = 1000;

class RecordLabelHeader extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.highlightCurrentPage();
        this.catApiSubNav();
        this.mobileNav();
    }

    render() {
        this.innerHTML = `<div class="z-50 md:fixed top-0 w-full">
      <header class="relative flex items-center justify-between px-2 pt-0 mt-0 -mb-1 border-b-2 border-black md:border-0 lg:mt-0 lg:mb-0 md:bg-white md:text-black lg:px-4 lg:py-2">
        <div class="mt-2 mb-1.5 lg:mt-0 lg:mb-0.5">
            <a href="/"><h1>${RecordLabel}</h1></a>
            <p class="hidden xl:block">Original music, independently made.</p>
        </div>

      <nav class="-mt-4">
        <ul class="hidden md:flex space-x-7">
          <li><a href="/" class="nav-link hover:text-[#FD6A6D]">Home</a></li>

          <li><a href="/about.html" class="nav-link hover:text-[#FD6A6D]">About</a></li>

          <li><a href="https://samplepacks.presetloops.com/" class="wordspacing nav-link hover:text-[#FD6A6D]" target="_blank">Sample Packs</a></li>

          <a href="/gallery.html" class="nav-link hover:text-[#FD6A6D]">Gallery</a>
          <a href="/styleguide.html" class="nav-link hover:text-[#FD6A6D]">Style Guide</a>
              
            <!-- 
              <li><a href="/artists.html" class="nav-link hover:text-[#FD6A6D]">Artists</a></li>
              <li><a href="/news.html" class="nav-link hover:text-[#FD6A6D]">News</a></li>
              <li><a href="/store.html" class="nav-link hover:text-[#FD6A6D]">Store</a></li> 
            -->
              
              <!-- Catalogue API with Dropdown -->
              <li class="relative">
                  <button id="apiDropdownBtn" class="nav-link hover:text-[#FD6A6D] focus:outline-none">
                      Catalogue API ▼
                  </button>
                  <ul id="apiDropdownMenu" class="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg hidden">
                    <li><a href="/api/" class="nav-link block px-4 py-2 hover:bg-gray-100">Track Search</a></li>
                    <li><a href="/api/visuals" class="nav-link block px-4 py-2 hover:bg-gray-100">Visuals</a></li>
                    <li><a href="/api/charts" class="nav-link block px-4 py-2 hover:bg-gray-100">Charts</a></li>
                    <li><a href="/api/docs" class="nav-link block px-4 py-2 hover:bg-gray-100">API Docs</a></li>
                  </ul>
              </li>
          </ul>

          <button id="burger" class="md:hidden text-3xl mt-2.5 text-black">&#9776;</button>
    
 </nav>
</header></div>






    <!-- Mobile Modal Overlay Nav -->
    <div id="mobileMenu">
  
      <div id="nav-content">

        <div class="text-xl relative -mt-32">
          <button id="close-nav-btn" class="absolute right-0 -top-2 text-7xl">&#10006;</button>
          
          <div id="nav-links" class="leading-8">
          <a href="/" class="block">Home</a>
          <a href="/about.html" class="block">About</a>
          <li><a href="https://samplepacks.presetloops.com/" class="block" target="_blank">Sample Packs</a></li>

          <a href="/gallery.html" class="block">Gallery</a>
          <a href="/styleguide.html" class="block">Style Guide</a>

        <!-- 
          <a href="/artists.html" class="block">Artists</a>
          <a href="/news.html" class="block">News</a>
          <a href="/store.html" class="block">Store</a> 
        -->
          
          <p class="pt-8 -pb-4 flex justify-center"><span class="w-fit block bg-white text-black ">Catalogue API</span></p>

            <a href="/api/" class="block">Track Search</a>
            <a href="/api/visuals" class="block">Visuals</a>
            <a href="/api/charts" class="block">Charts</a>
            <a href="/api/docs" class="block">API Docs</a>
          </div>
        </div>

      </div>

    </div>
    `;
    }






    catApiSubNav() {
        document.addEventListener("DOMContentLoaded", () => {
            const apiDropdownBtn = document.getElementById("apiDropdownBtn");
            const apiDropdownMenu = document.getElementById("apiDropdownMenu");

            if (apiDropdownBtn) {
                apiDropdownBtn.addEventListener("click", (event) => {
                    event.stopPropagation();
                    apiDropdownMenu.classList.toggle("hidden");
                });

                // Close dropdown when clicking outside
                document.addEventListener("click", (event) => {
                    if (!apiDropdownBtn.contains(event.target) && !apiDropdownMenu.contains(event.target)) {
                        apiDropdownMenu.classList.add("hidden");
                    }
                });
            }
        });
    }

     highlightCurrentPage() {
        const links = this.querySelectorAll(".nav-link");
        let currentPath = window.location.pathname.replace(/\/$/, ""); // Normalize path

        // Select the API dropdown button
        const apiDropdownBtn = document.querySelector("#apiDropdownBtn");

        // Check if the current path is under /api/
        if (currentPath.startsWith("/api")) {
            apiDropdownBtn?.classList.add("text-[#FD6A6D]");
        }

        links.forEach(link => {
            let linkPath = link.getAttribute("href");

            if (linkPath) {
                linkPath = linkPath.replace(/\/$/, "").split("/").pop(); // Normalize link path

                // Apply active class if paths match
                if (linkPath === currentPath.split("/").pop()) {
                    link.classList.add("border-b-2", "border-[#FD6A6D]", "pb-1", "text-[#FD6A6D]");
                }
            }
      });
    }








// NAVIGATION
    mobileNav(){
      document.addEventListener("DOMContentLoaded", function () {

      const burger = document.getElementById('burger');
      const mobileMenu = document.getElementById("mobileMenu");
      const navContent = document.getElementById("nav-content");
      const navLinks = document.querySelectorAll("#nav-links a");
      const closeNavBtn = document.getElementById("close-nav-btn");;
      let isOpening = false;


      burger.addEventListener("click", openNav);
      closeNavBtn.addEventListener("click", closeNav);
      // closeNavBtn.classList.add('hidden');
      // comment out for testing (same with css #mobileMenu style)

      function openNav() {
        if (!isOpening) {
          isOpening = true;
          
          closeNavBtn.classList.remove("hidden");
          burger.classList.add("hidden");
          
          navContent.classList.add('fade-in');

          mobileMenu.style.display = "flex";
          mobileMenu.classList.add("open");
          
          document.addEventListener("keydown", handleEscKeyPress);
          // mobileMenu.addEventListener("click", handleOutsideNavClick);

          document.documentElement.style.overflow = "hidden";
          
          setTimeout(() => {
            document.documentElement.style.position = "fixed";
          }, 500); // ios safari fix
          
          document.body.style.paddingRight = getScrollbarWidth() + "px";

          setTimeout(() => {
            isOpening = false;
          }, timeoutDelay);
        }
      }

      function closeNav(callback) {
        mobileMenu.classList.add("close");

        // Prevent icon flicker
        setTimeout(() => {
          closeNavBtn.classList.add('hidden');
          burger.classList.remove("hidden");
        }, 500); // Match CSS animation duration

        document.documentElement.style.position = "relative"; // ios safari fix (see above also)

        setTimeout(() => {
          document.documentElement.style.overflow = "auto";
          document.body.style.paddingRight = "0";
        }, timeoutDelay);

        setTimeout(() => {
          mobileMenu.style.display = "none";
          mobileMenu.classList.remove("open", "close");

          document.removeEventListener("keydown", handleEscKeyPress);
          // mobileMenu.removeEventListener("click", handleOutsideNavClick);

          if (typeof callback === "function") {
            callback();
          }
        }, timeoutDelay);
      }

      // // Intercept link clicks to prevent instant page load
      navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent default navigation
            const href = this.href; // Store the destination URL

            closeNav(() => {
                window.location.href = href; // Navigate after animation
            });
        });
      });


      function handleEscKeyPress(event) {
        if (event.key === "Escape") {
          closeNav();
        }
      }

      // function handleOutsideNavClick(event) {
      // if (event.target === mobileMenu || event.target === navContent) {
      //     closeNav();
      //   }
      // }
    });



    function getScrollbarWidth() {
      const outer = document.createElement("div");
      outer.style.visibility = "hidden";
      outer.style.width = "100px";
      outer.style.msOverflowStyle = "scrollbar"; // For Microsoft Edge
      document.body.appendChild(outer);
      
      const widthNoScroll = outer.offsetWidth;
      outer.style.overflow = "scroll";
      
      const inner = document.createElement("div");
      inner.style.width = "100%";
      outer.appendChild(inner);    
      const widthWithScroll = inner.offsetWidth;
      
      outer.remove();
      
      return widthNoScroll - widthWithScroll;
    }
  }
    
}

customElements.define("record-label-header", RecordLabelHeader);
