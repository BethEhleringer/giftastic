var topics = ["charlie brown christmas", "puppies", "chickens", "rabbits"]
console.log(topics)

function displayTopicGifs () {
//Get rid of existing Gifs, if any
$("#topic-view").html(" ");

// Grabbing and storing the data-name property value from the button
var topic = $(this).attr("data-name");

// Constructing a queryURL using the topic name
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
topic + "&api_key=dc6zaTOxFJmzC&limit=10";

// Performing an AJAX request with the queryURL
$.ajax({
url: queryURL,
method: "GET"
})
// After data comes back from the request
.then(function(response) {
  console.log(queryURL);

  console.log(response);
  console.log(response.data[0].images.fixed_height.url)
  // storing the data from the AJAX request in the results variable
  var results = response.data;
  console.log(results[0].images.fixed_height.url)

  // Looping through each result item
  for (var i = 0; i < results.length; i++) {

    // Creating and storing a div tag
    var topicDiv = $("<div>");
    topicDiv.attr("class", "gifDisplay")
    var rating = results[i].rating;

    // Creating a paragraph tag with the result item's rating
    var p = $("<p>").text("Rating: " + rating);

    // Creating and storing an image tag
    var topicImage = $("<img>");
    // Setting the src attribute of the image to a property pulled off the result item
    topicImage.attr("src", results[i].images.fixed_height_still.url);
    topicImage.attr("data-still", results[i].images.fixed_height_still.url);
    topicImage.attr("data-animate", results[i].images.fixed_height.url);
    topicImage.attr("data-state", "still");
    topicImage.attr("class", "gif");
    
                // Appending the paragraph and image tag to the topicDiv
    topicDiv.prepend(p);
    topicDiv.prepend(topicImage);

    // Prependng the topicDiv to the HTML page in the "#gifs-appear-here" div
    $("#topic-view").prepend(topicDiv);
//Function for changing state of topicImage on click
$(".gif").on("click", function() {
console.log(this)
// The attr jQuery method allows us to get or set the value of any attribute on our HTML element
var state = $(this).attr("data-state");
// If the clicked image's state is still, update its src attribute to what its data-animate value is.
// Then, set the image's data-state to animate
// Else set src to the data-still value
if (state === "still") {
$(this).attr("src", $(this).attr("data-animate"));
$(this).attr("data-state", "animate");
} else {
$(this).attr("src", $(this).attr("data-still"));
$(this).attr("data-state", "still");
}
});
    //
  }
});
};

//Take the topics in this array and create buttons in your HTML
// Function for creating buttons
function renderButtons() {
    // $("#buttons-view").html(" ");
    $("#buttons-view").empty();
    // or $("#buttons-view")

    // Delete the content inside the movies-view div prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    for (var i = 0; i < topics.length; i++) {
        // Then dynamicaly generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of movie-btn to our button
        a.addClass("topic-btn");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);

        //append buttons
        //$("#buttons-view").append("<button>" + topics[i] + "</button>");
    }
}

      // This function handles events where a topic button is clicked
$("#add-topic").on("click", function(event) {
event.preventDefault();
// This line grabs the input from the textbox
var topic = $("#topic-input").val().trim();

// Adding topic from the textbox to the topics array
topics.push(topic);

// Calling renderButtons which handles the processing of the topics array
renderButtons();
});



  // Adding a click event listener to all elements with a class of "movie-btn"
  $(document).on("click", ".topic-btn", displayTopicGifs);

  renderButtons();