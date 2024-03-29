//This is my arracy of initial characters
var gifs = ["Homer Simpson", "Marge Simpson", "Maggie Simpson", "Bart Simpson", "Lisa Simpson", "Abraham Simpson", "Apu", "Barney Gumble", "Chief Clancy Wiggum", "Kent Brockman", "Krusty The Clown", "Martin Prince", "Milhouse Van Houten", "Moe Szyslak", "Mr. Burns", "Ned Flanders", "Ralph Wiggum", "Seymour Skinner", "Seymour Skinner"]


function displayGif() {
  var name = $(this).attr("data-name");

  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
  //link to the queryUrl of GIPHY
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    //out of the response this pulls the data
    var results = response.data;
    //this goes through the data and assigns classes and appends the title and rating to the div
    for (var i = 0; i < results.length; i++) {
      var ratings = results[i].rating;
      var title = results[i].title;
      var p = $("<p class='card-text'>").text("Rating: " + ratings);
      var gifDiv = $("<img class = 'name gif data-state'>");
      var titleOfCard = $("<p class='card-text'>").text(title)
      gifDiv.attr("data-state", "still")
      gifDiv.attr("data-still", results[i].images.fixed_width_still.url)
      gifDiv.attr("data-animate", results[i].images.fixed_width.url)
      gifDiv.attr("src", results[i].images.fixed_width_still.url);
      var imgCard = $("<div id='img-on-card'>").append(gifDiv)
      imgCard.append(p)
      imgCard.prepend(titleOfCard)
      var card = imgCard
      $("#gifs-displayed").prepend(card)
    }
  })
}
//this checks what state the gif is in, if it is still it changes it to animate from the source, or if animate it makes still
$(document).on("click", ".gif", function () {
  var state = $(this).attr("data-state")
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
//this adds a new button when someone enters it into the add gif here field
function display() {
  $("#buttons-view").empty();
  for (var j = 0; j < gifs.length; j++) {
    var a = $("<button>");
    $("a").addClass("gif-btn");
    a.attr("class", "gif-btn")
    a.attr("data-name", gifs[j]);
    a.text(gifs[j]);
    $("#buttons-view").append(a)
  }
}
//this gets the value of what they entered in the add a Gif here field
$("#add-gif").on("click", function (event) {

})
//this checks if a button has been clicked and if so runs the displayGif function
$(document).on("click", ".gif-btn", displayGif);
display()