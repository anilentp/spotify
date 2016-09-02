
$('#form').submit(function (e) {
	e.preventDefault();
	var valor = $(this).find('input').val();


	if (valor.length < 3) {
		alert('debes ingresar mas de 3 caracteres');
	}
});	