class RecordLabelFooter extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <footer class="fixed bottom-0 left-0 right-0 bg-[#f3f4f6] p-0 text-center z-10">
        
        <!-- Curved Divider above the footer -->
        <div class="w-full overflow-hidden leading-[0] absolute top-[-3.99rem]">
          <svg class="relative block w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C800,40 900,100 1200,120 L1200,120 L0,120 Z" fill="#f3f4f6"></path>
          </svg>
        </div>
        
        <div class="container mx-auto flex flex-col lg:flex-row lg:justify-between items-center lg:p-16">
        


          <img src="https://cdn.presetloops.com/uploads/logo.png" alt="Preset Loop" class="hidden lg:block mb-2.5 lg:mb-0 w-48">
          

          <!-- MAILING LIST TBD -->
          <!-- <div class="mt-0 lg:mt-0">
            <p class="mb-2.5 lg:-mt-8 lg:mb-6 lg:pb-4 text-sm text-center md:text-right">Join The Community</p>
            
            <div class="flex justify-center lg:-mt-8">
              <input type="email" placeholder="Enter your email" class="p-1 rounded-l lg:p-2 md:w-96 bg-red-400 text-white placeholder:text-white text-sm h-9 md:h-auto outline-none">
            
              <button class="-ml-1 bg-red-500 text-white text-sm pb-7 md:pb-2 py-2 px-4 rounded-r h-8 md:h-auto hover:bg-red-600">GO!</button>
            </div>
          </div> -->
        
        
        <!-- COPYRIGHT / YEAR (hidden on mobile (see alt below)) -->
        <div class="space-mono-regular hidden lg:flex lg:items-center lg:gap-2.5 mt-2.5 mb-[6px] lg:mb-[20px]">
          <p class="text-[15px] text-gray-800">&copy;<span class="year"></span></p>
          <div class="flex items-center">Preset<span class="ml-1.5 -mr-2 pt-0">Loop</span></div>
        </div>


          <!-- SOCIAL ICONS -->
        <div class="pb-0.5 mt-4 lg:mb-6 lg:pb-4">
          <!-- <p class="mb-2.5 text-sm text-center md:text-right">Join The Community</p> -->
          <p class="mb-2.5 text-sm text-center md:text-right font-sans"><a href="mailto:presetloop@gmail.com">presetloop@gmail.com</a></p>
          
          <div class="flex justify-center space-x-4 mt-4 lg:mt-0">
            <a href="https://youtube.com/@presetloop" target="_blank" class="text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.652 0h1.44l.988 3.702.916-3.702h1.454l-1.665 5.505v3.757h-1.431v-3.757l-1.702-5.505zm6.594 2.373c-1.119 0-1.861.74-1.861 1.835v3.349c0 1.204.629 1.831 1.861 1.831 1.022 0 1.826-.683 1.826-1.831v-3.349c0-1.069-.797-1.835-1.826-1.835zm.531 5.127c0 .372-.19.646-.532.646-.351 0-.554-.287-.554-.646v-3.179c0-.374.172-.651.529-.651.39 0 .557.269.557.651v3.179zm4.729-5.07v5.186c-.155.194-.5.512-.747.512-.271 0-.338-.186-.338-.46v-5.238h-1.27v5.71c0 .675.206 1.22.887 1.22.384 0 .918-.2 1.468-.853v.754h1.27v-6.831h-1.27zm2.203 13.858c-.448 0-.541.315-.541.763v.659h1.069v-.66c.001-.44-.092-.762-.528-.762zm-4.703.04c-.084.043-.167.109-.25.198v4.055c.099.106.194.182.287.229.197.1.485.107.619-.067.07-.092.105-.241.105-.449v-3.359c0-.22-.043-.386-.129-.5-.147-.193-.42-.214-.632-.107zm4.827-5.195c-2.604-.177-11.066-.177-13.666 0-2.814.192-3.146 1.892-3.167 6.367.021 4.467.35 6.175 3.167 6.367 2.6.177 11.062.177 13.666 0 2.814-.192 3.146-1.893 3.167-6.367-.021-4.467-.35-6.175-3.167-6.367zm-12.324 10.686h-1.363v-7.54h-1.41v-1.28h4.182v1.28h-1.41v7.54zm4.846 0h-1.21v-.718c-.223.265-.455.467-.696.605-.652.374-1.547.365-1.547-.955v-5.438h1.209v4.988c0 .262.063.438.322.438.236 0 .564-.303.711-.487v-4.939h1.21v6.506zm4.657-1.348c0 .805-.301 1.431-1.106 1.431-.443 0-.812-.162-1.149-.583v.5h-1.221v-8.82h1.221v2.84c.273-.333.644-.608 1.076-.608.886 0 1.18.749 1.18 1.631v3.609zm4.471-1.752h-2.314v1.228c0 .488.042.91.528.91.511 0 .541-.344.541-.91v-.452h1.245v.489c0 1.253-.538 2.013-1.813 2.013-1.155 0-1.746-.842-1.746-2.013v-2.921c0-1.129.746-1.914 1.837-1.914 1.161 0 1.721.738 1.721 1.914v1.656z"/></svg>
            </a>


            <a href="https://x.com/presetloop" target="_blank" class="text-gray-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg></a>


            <a href="https://instagram.com/presetloop" target="_blank" class="text-gray-800"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg></a>

            <a href="https://www.tiktok.com/@presetloop" target="_blank">
              <svg className="text-gray-800" role="img" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>TikTok</title><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
           </a>
            
            <!-- <a href="mailto:presetloop@gmail.com"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z"/></svg></a> -->
          </div>
        </div>
        
        <!-- copyright date on mobile -->
        
        <div class="space-mono-regular lg:hidden mt-3 mb-[10px] flex items-center gap-0">
          <p class="flex text-[12px] text-gray-800">&copy;<span class="year"></span></p>
          
          <!-- <p class="text-[15px] text-gray-800">&copy;</p> -->
          <!-- <div class="flex items-center">Preset<span class="ml-1.5 mr-0.5">Loop</span></div> -->
        </div>
        <!--  -->
        <!--  -->
        <!-- \container -->
      </div>

      </footer>
    `;
  }

  connectedCallback() {
    this.setYear();
}

  setYear() {
      document.querySelectorAll('.year').forEach(el => {
          el.textContent = new Date().getFullYear();
      });
  }

};

customElements.define('record-label-footer', RecordLabelFooter);
