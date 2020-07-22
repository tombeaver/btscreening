
// loop through json object
// get the farm[i]
// get the server[i]
// get the id[i]
// get the secret[i]
// for every item for length of object create and variable
    // var photoURL = 'https://farm' + item.farm + '.static.flickr.com/' + item.server + '/' + item.id + '_' + item.secret + '_m.jpg';
// put this variable into htmlString
    // htmlString = '<img src="' + photoURL + '">';


    var addTop =  document.querySelector("nav");
    var input =  document.querySelector("#search");
    
    
    var results = document.querySelector(".output");
    var arr = document.querySelector("#search").value;
    // create variables to out in url and change easily
    var api = 'api_key=331fdea09aa6e34a81d2688f25a43342';
    var page = 'per_page=25';
    var safe = 'safe_search=3';
    var tags ='tags=';

    var url = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&' + api + '&' + page + '&' + safe + '&format=json&nojsoncallback=1& ' + tags +'';
    var obj = null;
    

    // Html mark up to build slideshow
    var remove =  document.querySelectorAll(".remove");
    
    function search() {
        // Validation if the input field is empty or null return an error, otherwise run function
        if(document.querySelector("#search").value == "" || document.querySelector("#search").value == null) {
    
            input.classList.add("error");
            console.log('nope');
            
        } else {
            // adds .top to the navigation to move the search bar to the top of page
            addTop.classList.add("top");
            input.classList.remove("error");
            for (i=0;i<remove.length;i++) {
                remove[i].style.cssText = "";
            }
  
            load(document.querySelector("#search").value);
        }
    }
    
    // create function to run search function when the search button is clicked
    function clicked() {
        search()
;    }

    // create function to run search function when the enter key is press
    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            search();
        }
    });
    
    
    async function load(search) {
        // clear results
        results.innerHTML = '<div class="loading">loading ...</div>';
    
        // test url for errors
               try {
                   obj = await (await fetch(url+search)).json();
        // console.log an error message if there are errors
               } catch(e) {
                   console.log('error');
               }
        // create variable to specify the array within the object that I want to loop through
               var thisObj = obj.photos.photo;
               results.innerHTML = '';

               console.log(thisObj);
        // create loop
               for (i = 0; i < thisObj.length; i++) {
        // enter data from json object with object keys
                   var photoUrl = 'https://farm'+thisObj[i]['farm']+'.staticflickr.com/'+thisObj[i]['server']+'/'+thisObj[i]['id']+'_'+thisObj[i]['secret']+'_n.jpg'
        // Using the results variable created earlier, output url into img tags and send to html
                   results.innerHTML += '<li class="slide" style="background: url(' + photoUrl + ') no-repeat center center; background-size: contain;"><div class="counter">' + [i+1] + ' / 25</div></li>';
               }
        
    }


// jQuery Slideshow
$(document).ready(function(){
    // get width of slide (image)
          var slideWidth = $('._slider ul li').width();
    // create functions to move slide from right and to left
          function moveLeft() {
              $('._slider ul').animate({
                  left: + slideWidth
              }, 200, function () {
                  $('._slider ul li:last-child').prependTo('._slider ul');
                  $('._slider ul').css('left', '');
              });
          };
    // function
          function moveRight() {
              $('._slider ul').animate({
                  left: - slideWidth
              }, 200, function () {
                  $('._slider ul li:first-child').appendTo('._slider ul');
                  $('._slider ul').css('left', '');
              });
          };
    // on click functions to move slide when arrows are clicked on
          $('._slider_prev').click(function () {
              moveLeft();
              return false;
          });
      
          $('._slider_next').click(function () {
              moveRight();
              return false;
          });
      
})
    