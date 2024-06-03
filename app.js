 var modal = document.getElementById("myModal");
        var modalImg = document.getElementById("modalImage");
        var span = document.getElementsByClassName("close")[0];
        var gallery = document.querySelector('.gallery');
        var images = document.querySelectorAll('.gallery img');
        
        // displaying modal on large screens
        if(window.innerWidth > 1024){
          images.forEach((image, index) => {
              image.addEventListener('click', function(){
                  currentIndex = index;
                  modal.style.display = "flex";
                  modalImg.src = this.src;
                  gallery.style.position = "fixed";
              });
          });
        }

        span.onclick = function() { 
            modal.style.display = "none";
            gallery.style.position = "relative";
     
        }

        // displaying modal on large screens
        if(window.innerWidth > 1024){
          modalImg.onclick = function() { 
            modal.style.display = "none";
            gallery.style.position = "relative";
     
          }
        }

        window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
              gallery.style.position = "relative";
     
            }
        }

        function showImage(index) {
            currentIndex = (index + images.length) % images.length;
            modalImg.src = images[currentIndex].src;
     
        }

        document.querySelector('.arrow.left').onclick = function() {
            showImage(currentIndex - 1);
        }

        document.querySelector('.arrow.right').onclick = function() {
            showImage(currentIndex + 1);
        }


        // keyboard left right arrow navigation
        document.addEventListener('keydown', function(event) {
            if (modal.style.display === "flex") {
                if (event.key === "ArrowLeft") {
                    showImage(currentIndex - 1);
                } else if (event.key === "ArrowRight") {
                    showImage(currentIndex + 1);
                }
            }
        });
        
        document.addEventListener('keydown', function(event) {
            if (modal.style.display === "flex") {
                if (event.key === "Escape") {
                    modal.style.display = "none";
                    gallery.style.position = "relative";
                } 
            }
        });



