/*
https://flynn.boolean.careers/exercises/api/array/music
{
    "success": true,
    "response": [
        {
            "poster": "https://www.onstageweb.com/wp-content/uploads/2018/09/bon-jovi-new-jersey.jpg",
            "title": "New Jersey",
            "author": "Bon Jovi",
            "genre": "Rock",
            "year": "1988"
        },
        {
            "poster": "https://images.pyramidshop.com/images/_popup/ACPPR48056.jpg",
            "title": "Live at Wembley 86",
            "author": "Queen",
            "genre": "Pop",
            "year": "1992"
        },
*/

$(document).ready(function () {
	//Code

	$.ajax({
		url: "https://flynn.boolean.careers/exercises/api/array/music",
		method: "GET",
		success: function (resp) {
			insertCd(resp);
			insertSelect(resp);
			$('#filter-genre option').click(function () {
				var genere = $(this).html();
				if (genere == "All") {
					$('.cd').show();

				} else {

					$('.cd').hide();
					$('.cd.' + genere).show();
				}

			})
		},
		error: function () {
			alert('errore');
		},
	});
});

function insertCd(data) {
	var source = $("#entry-template").html();
	var template = Handlebars.compile(source);
	for (i = 0; i < data.response.length; i++) {
		var context = data.response[i];
		var html = template(context);
		$('.cds-container').append(html)
	}
};

function insertSelect(data) {
	var source = $("#template-select").html();
	var template = Handlebars.compile(source);
	var arrayGenere = [];
	for (var i = 0; i < data.response.length; i++) {
		if (!arrayGenere.includes(data.response[i].genre)) {
			arrayGenere.push(data.response[i].genre);
			var context = data.response[i];
			var html = template(context);
			$('#filter-genre').append(html)
		}
	}
};