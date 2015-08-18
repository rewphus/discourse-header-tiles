var createdTiles = false;
var hide = false;

Discourse.PageTracker.current().on('change', function(url) {

// if(this.siteSettings.tiles_enabled){
    var c = document.getElementById("list-area");
    // var quoteURL = this.siteSettings.tiles_quote_url;
    if(c){
        if(!createdTiles){
          createTiles('/t/quote-1-testing/29.json');
          // console.log(quoteURL);
          // createTiles(quoteURL);
        }
    }else{
      createdTiles = false;
    }
  // }
  });

    function createTiles(url){

      var d = document.getElementById("TilesContainer");

      if(createdTiles){
          console.log('return');
          return;
        }
        console.log('Im in!');
        createdTiles = true;

        var $listControls = $(".list-controls");
        var html = "<div id='TilesContainer' class='container'><div class='main-slider'><div id='variation' class='owl-carousel'></div></div></div>";

        $listControls.before(html);

        var owl = $("#variation");
  		  owl.owlCarousel({
			  jsonPath : url,
			  items : 4, //4 items above 1000px browser width
			  itemsDesktop : [1000,4], //4 items between 1000px and 901px
			  itemsDesktopSmall : [900,3], // 3 betweem 900px and 601px
			  itemsTablet: [600,2], //2 items between 600 and 0
			  itemsMobile : false, // itemsMobile disabled - inherit from itemsTablet option
   			navigation : true,
			  pagination: false,
			  autoPlay : false,
    		stopOnHover : true,
			  jsonSuccess : customDataSuccess
		  });
		 function customDataSuccess(resp, status, ele){
			var tiles = "";
			if (resp.posts_count >8)
				var arraylength = 8;
			else
				var arraylength = resp.posts_count;
			for (var i = 0; i < arraylength; i++) {
				var post = resp.post_stream.posts[i];

        var quote = $(post.cooked).find("blockquote").text();
        var quser = $(post.cooked).find(".title").text();
        quser = quser.slice(0,-1);
        var avatarURL = $(post.cooked).find(".title").find("img").attr("src");
        var imageURL = $(post.cooked).find("img").attr("src");

				tiles += "<div class='item'>";
				 if(post.image_url !== null){
                tiles += "<div class='icw-img' style='background-image: url(" + imageURL + ")'></div>";
				} else {
					tiles += "<div class='icw-img' style='background-image: url(//polygonalweave.com/Images/Generic/POLY08s.jpg)'></div>";
				}
					tiles += "<a class='tile-hover' href=" + post.link_counts[0].url + ">";
						tiles += "<h2 class='tile-title'>" + post.link_counts[0].title + "</h2>";
            tiles += "<div class='tile-quote'>\"" + quote + "\"</div>";
						tiles += "<div class='tile-info'>By <strong>" + quser + "</strong><br><div class='comment-btn'><img alt='' width='40' height='40' src='" + avatarURL + "' class='avatar'></div></div>"; //tile

					tiles += "</a>"; //tile-hover
				tiles += "</div>"; //tile
			}

			$("#variation").html(tiles);
		}
    }
