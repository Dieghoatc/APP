$( document ).ready(function() {
    document.getElementById("user").value = localStorage.getItem("CodigoUD");
});


function res() {

    var usuario = document.getElementById('user');
    var contra = document.getElementById('pass');
    var pagina = "mapa.html";

    /*if (usuario.value === "Miguel" && contra.value === "123" ) {
		location.href = "mapa.html";
	}
	else {
		alert("Error")
	}*/
	//alert("Invoca ajax");

	$.ajaxSetup({headers:{
"content-type": "application/json;odata=verbose",
"accept": "application/json;odata=verbose"
}});
document.getElementById('load').style.display = 'block';
	$.ajax({

        type: "POST",
        url: "http://env-1119869.j.facilcloud.com/RestJR/services/SobreRuedas/validaUser",
		//"http://localhost:8080/RestJR/services/SobreRuedas/validaUser",
        data: JSON.stringify(eval({
            "usuario": usuario.value,
            "contrasena": contra.value
        })),
        contentType: "application/json; charset=utf-8",
        dataType: "json",

        success: function(data, statusText, xhr) {
document.getElementById('load').style.display = 'none';

            switch (data.codigoError) {

                case 0:
                    localStorage.setItem("usuarioID", data.codigoUD);
                    localStorage.setItem("CodigoUD", data.codigoUD);
                    localStorage.setItem("Nombre", data.nombre);
                    localStorage.setItem("Apellido", data.apellido);
					          localStorage.setItem("Contrasena",contra.value);
                    location.href = "mapa.html";
                    break;
                case 1:

                    localStorage.setItem("usuarioID", data.codigoUD);
                    localStorage.setItem("CodigoUD", data.codigoUD);
                    localStorage.setItem("Nombre", data.nombre);
                    localStorage.setItem("Apellido", data.apellido);
					          localStorage.setItem("Contrasena",contra.value);
                    location.href = "EditarPerfil.html?decisor=1";
                    break;
                default:
                    alert(data.comentarios);
                    break;

            }

        },
		timeout: 3000
    }).fail( function( jqXHR, textStatus, errorThrown ) {
document.getElementById('load').style.display = 'none';
  if (jqXHR.status === 0) {

    alert('No hay conexión: por favor valide la Red. Si el Problema persiste por favor contactar el Administrador de UD Sobre Ruedas');

  } else if (jqXHR.status == 404) {

    alert('Requested page not found [404]');
document.getElementById('load').style.display = 'none';
  } else if (jqXHR.status == 500) {

    alert('Internal Server Error [500].');
    document.getElementById('load').style.display = 'none';

  } else if (textStatus === 'parsererror') {

    alert('Requested JSON parse failed.');
document.getElementById('load').style.display = 'none';
  } else if (textStatus === 'timeout') {

    alert('No fue Posible Contestar la Solicitud En El Tiempo Esperado, Si El Problema Persiste Contacte Al Administrador De UD Sobre Ruedas.');
document.getElementById('load').style.display = 'none';
  } else if (textStatus === 'abort') {
document.getElementById('load').style.display = 'none';
    alert('Ajax request aborted.');

  }else if (jqXHR.status === 200){
document.getElementById('load').style.display = 'none';
  } else {

    alert('Uncaught Error: ' + jqXHR.status + jqXHR.responseText);
    document.getElementById('load').style.display = 'none';
	alert(jqXHR);

  }

});




}
