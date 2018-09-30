/*1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
   * We chose animals for our theme, but you can make a list to your own liking.

2. Your app should take the topics in this array and create buttons in your HTML.
   * Try using a loop that appends a button for each string in the array.

3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

5. Under every gif, display its rating (PG, G, so on).
   * This data is provided by the GIPHY API.
   * Only once you get images displaying with button presses should you move on to the next step.

6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

7. Deploy your assignment to Github Pages.

8. **Rejoice**! You just made something really cool.*/

//Create array of strings

var topics = ["puppies", "kittens", "rabbits", "elephants"]

//Take the topics in this array and create buttons in your HTML
 // Function for creating buttons
 function renderButtons() {
    // $("#buttons-view").html(" ");
     $("#buttons-view").empty();
     // or $("#buttons-view")

   // Delete the content inside the movies-view div prior to adding new movies
   // (this is necessary otherwise you will have repeat buttons)
   for (var i = 0; i < topics.length; i++){
  //append buttons
     $("#buttons-view").append("<button>" + topics[i] + "</button>");
   }
   // Loop through the array of movies, then generate buttons for each movie in the array
 }
 renderButtons()

 //Create the function to grab 10 static, non-animated gif images from the GIPHY API and place them on the page when the user clicks on a button.

 //Set up query URL
//Put variable in between the first part of the url and the api key
 var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + "cats" + "&api_key=dc6zaTOxFJmzC&limit=10"

// Create an AJAX call for the specific topic button being clicked
//"Promise"
 $.ajax({
    url: queryURL,
    method: "GET"   //response from "promise"
  }).then(function(response) {
    //test to make sure you get a response
    console.log(response);

 

  //assign the image url
  var imageUrl = response.data.image_original_url
  var topicImage = $("<img>");
  //assign data attributes to image
  topicImage.attr("src", imageUrl);
  $("#topic-view").append(topicImage) 
})
   


  //create event listener
    //when user clicks on a topic button, the ajax call for that button will be executed.

