var $news = $('#news');

var newsTemplate = "" +
	"<li>" +
	"<a href={{url}} class='this-url'><img src='{{urlToImage}}' class='img-responsive'/></a>" +
	"<a href={{url}} class='this-url'><h3><strong>{{title}}</strong></h3></a>" +
	"<h4>{{author}}</h4>" +
	"<p>{{description}}</p>" +
	"</li>";

function addStory(newsStory){
	$news.append(Mustache.render(newsTemplate, newsStory));
};

$(document).ready(function(){
	var API_KEY = 'bbeae225fdad43e195f6de3f012ea65a'
	$.ajax({
		type:'GET',
		url:'https://newsapi.org/v1/articles?source=cnn&sortBy=top&apiKey=' + API_KEY,
	})
		.done(function(newsStories){
			console.log(newsStories);
			$.each(newsStories.articles, function(i,newsStory){
				addStory(newsStory);
				console.log(newsStory.title);

		})
			
	})
		.fail(function(){
			alert("Hey man the server messed up...");
		})
});