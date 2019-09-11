var gifs=["Hearthstone", "Overwatch", "Starcraft 2", "PlayerUnknown's Battlegrounds","Minecraft", "Diablo III", "World of Warcraft", "Terraria", "The Sims", "StarCraft", "Garry's Mod", "RollerCoaster Tycoon 3", "Half-Life 2", "Civilization V", "The Sims 3", "Guild Wars", "Fortnite"]


function displayGif() {

    var name = $(this).attr("data-name");
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=1";
    $.ajax({ 
        url: queryURL,
        method: "GET"
      }).then(function(response) {
       
       var results= response.data;
       
      
       for (var i = 0; i < results.length; i++) {
      
     console.log(results)
      var ratings = results[i].rating;
        console.log(ratings)
      
      var p = $("<p>").text("Rating: " + ratings);
      var gifDiv = $("<img class = 'name gif data-state'>");
      
      gifDiv.attr("data-state", "still")
      gifDiv.attr("data-still", results[i].images.fixed_width_still.url)
      gifDiv.attr("data-animate", results[i].images.fixed_width.url)
      gifDiv.attr("src", results[i].images.fixed_width_still.url);
     
      var imgCard= $("<div id='img-on-card'>").append(gifDiv)
        imgCard.append(p)
        var card=imgCard
     
      $("#gifs-displayed").prepend(card)
      
     
     
    
}})
}
$(document).on("click", ".gif", function() {
  var state=$(this).attr("data-state")
  console.log("you clicked the gif")
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});


function display(){
  $("#buttons-view").empty();

  for (var i = 0; i < gifs.length; i++) {
    var a = $("<button>");
    $("a").addClass("gif-btn");
    // a.addClass("gif-btn");
    a.attr("class", "gif-btn")
    // a.attr("class", "data-state")
    a.attr("data-name", gifs[i]);
    a.text(gifs[i]);
    $("#buttons-view").append(a)
}
}
$("#add-gif").on("click", function(event) {
  console.log("clicked")
  event.preventDefault();
  var newButtons = $("#gif-input").val();
  gifs.push(newButtons);
  // console.log(gifs)
  display()
})
$(document).on("click", ".gif-btn", displayGif);


display()