var app_name = "prueba_spotify";
var client_id = "16508d14131945baa188c4ec40dd5901";
var client_secret = "1a41a74419d343ccb72b51302d531980";
var base64encode = "MTY1MDhkMTQxMzE5NDViYWExODhjNGVjNDBkZDU5MDE6MWE0MWE3NDQxOWQzNDNjY2I3MmI1MTMwMmQ1MzE5ODA="

$('#form').submit(function (e) {
	e.preventDefault();
	var valor = $(this).find('input').val();

	if (valor.length < 3) {
		alert('debes ingresar mas de 3 caracteres');
		return;
	}

	$.ajax({
		url: "https://accounts.spotify.com/api/token",
		type: "POST",
		headers: {
			Authorization: "Basic " + base64encode
		},
		data: {
			grant_type: "client_credentials",
		}
	}).done(function(data){
		debugger;
	}).fail(function(){
		console.log('fail');
		debugger;
	});
});	
