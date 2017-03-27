
      var giphys = ["MegaMan", "SNES", "Overwatch", "Sonic"];
      function displayGiphy() {
        $("#giphy-view").empty();
        var giphy = $(this).attr("data-name");
        var getID = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&rating=pg&tag=" + giphy;
        for (var u = 1; u  <11; u++) {
 $.ajax({
          url: getID,
          method: "GET"
    }).done(function(ID) {
    var giphyID = ID.data.id;
    var queryURL = "http://api.giphy.com/v1/gifs/" + giphyID +"?api_key=dc6zaTOxFJmzC"
         $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
            console.log(queryURL);
          var data = response.data;  
          var giphyDiv = $("<div id='giph'>");
          var pOne = $("<p>").text("Rating: " + data.rating);
          giphyDiv.append(pOne);
          var image = $("<img id='giphy'>").attr({src:data.images.fixed_height_still.url,
              still:data.images.fixed_height_still.url,
              animated:data.images.fixed_height.url,
              dataState:'still'});
          giphyDiv.append(image);
          $("#giphy-view").prepend(giphyDiv);
        })
    })
        }
 };
      function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < giphys.length; i++) {
          var a = $("<button>");
          a.addClass("giphy");
          a.attr("data-name", giphys[i]);
          a.text(giphys[i]);
          $("#buttons-view").append(a);
        }
      }
      $("#add-giphy").on("click", function(event) {
        event.preventDefault();
        var giph = $("#giphy-input").val().trim();
        giphys.push(giph);
        renderButtons();
      });
      $('#giphy-view').on("click",'#giphy', function(){
          var state = $(this).attr("dataState");
          if (state === "still"){
              $(this).attr({src:$(this).attr('animated'),dataState:'animate'})
          }else{
              $(this).attr({src:$(this).attr('still'),dataState:'still'})
          }
      });
      renderButtons();
      $(document).on("click", ".giphy", displayGiphy);

