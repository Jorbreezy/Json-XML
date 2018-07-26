$('.submitL').click(function () {
	var json = $('input[type=file]').val()
	var t = $(".t").val();

	if (json === "") {
		alert("URL is required!");
		return;
	} else {
		var i = $('.val').val();
		var text;

		if (!i) {
			alert('please select a file');
		} else {
			if (i == 1) {
				text = 'test.xml';
			} else if (i == 2) {
				text = 'data.xml';
			}

			console.log(json);
			console.log(text);

			$.post('/item/create', { file: json, xmlF: text }, (results) => {
				if (results.status) {
					console.log(results);
				}
			});

		}
	}
});  