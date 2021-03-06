var app_name = "prueba_spotify";
var client_id = "16508d14131945baa188c4ec40dd5901";
var client_secret = "1a41a74419d343ccb72b51302d531980";
var base64encode = "MTY1MDhkMTQxMzE5NDViYWExODhjNGVjNDBkZDU5MDE6MWE0MWE3NDQxOWQzNDNjY2I3MmI1MTMwMmQ1MzE5ODA="

// variables GLOBALES (todos las pueden ver)
var access_token = "";
var token_type = "";
var expires_in = "";

var canciones = [];


function login() {		
	$.ajax({
		url: "https://accounts.spotify.com/api/token",
		type: "POST",
		headers: {
			Authorization: "Basic " + base64encode
		},
		data: {
			grant_type: "client_credentials",
		},
		async: false
	}).done(function(data){

		access_token = data.access_token;
		token_type = data.token_type;
		expires_in = data.expires_in;

	}).fail(function(){

		alert('Error en comunicacion con servidor');
		return;

	});
};


$('#form').submit(function (e) {
	// para evitar que el formulario se mande
	e.preventDefault();
	var valor = $(this).find('input').val();

	if (valor.length < 3) {
		alert('debes ingresar mas de 3 caracteres');
		return;
	}

	if (access_token == "") {
		login();
	}

	$.ajax({
		url: "https://api.spotify.com/v1/search",
		type: "GET",
		headers: {
			Authorization: "Bearer " + access_token
		},
		data: {
			q: valor,
			type: "track",
			market: "CL"
		}
	}).done(function(data){

		canciones = data.tracks.items;
		var lista = $('#lista_canciones');
		lista.html("");

		for (var i=0; i<canciones.length; ++i) {
			var nombre = canciones[i].name;
			var id = canciones[i].id; 
			var artista = canciones[i].artists[0].name;

			lista.append('<li><a href="#modal-descripcion" data-toggle="modal" class="cancion" data-song-id="' + id + '">' + nombre + " - " + artista +'</a></li>');
		}
		/*
		$("li").click(function(){
			var info = $(this).attr('data-song-id');
			$(".song").html('<h2 class ="titlemodal song">' + info +'</h2>');
		});*/
	}).fail(function(){

		alert('Error en comunicacion con servidor');
		return;

	});
});	