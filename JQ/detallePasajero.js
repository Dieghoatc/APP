
var atributosGrl;
var indicador;

function getGET(){
   var loc = document.location.href;
   var getString = loc.split('?')[1];
   var GET = getString.split('&');
   var get = {};

   for(var i = 0, l = GET.length; i < l; i++){
      var tmp = GET[i].split('=');
      get[tmp[0]] = unescape(decodeURI(tmp[1]));
   }
   return get;
}


function agregarAtributos(){

	var atributos = getGET();
	var formaViaje;
	var solicitaDescrpcion;
	atributosGrl = atributos;
	switch (atributos.tipoVehiculo){
		case "1":
			formaViaje = "PIE";
			break;
		case "2":
			formaViaje = "CICLA";
			break;
		case "3":
			formaViaje = "MOTO";
			break;
		case "4":
			formaViaje = "CARRO";
			break;
		default:
			formaViaje = "INDEFINIDO";
			break;

	}
  localStorage.setItem("atributosObj", "detallePasajero.html?codigo=" + atributos.codigo + "&latitudPartida=" + atributos.latitudPartida + "&longitudPartida=" + atributos.longitudPartida+ "&puestoDisponibles=" + atributos.puestoDisponibles+ "&descripcionRuta=" + atributos.descripcionRuta+ "&horaPartida=" + atributos.horaPartida+ "&latitudDestino=" + atributos.latitudDestino+ "&longitudDestino=" + atributos.longitudDestino+ "&descripcionDestino=" + atributos.descripcionDestino + "&tipoVehiculo=" + atributos.tipoVehiculo + "&nombreUser=" + atributos.nombreUser + "&desUbicacion=" + atributos.desUbicacion +  "&solicitud=" +atributos.solicitud);
	localStorage.setItem("codigoContacto",atributos.codigo);
	localStorage.setItem("imagenContacto",atributos.tipoVehiculo);
	document.getElementById("contacto").href = "DatosContacto.html?decisor=2&codigoContacto="+atributos.codigo;
	document.getElementById("nombre").innerHTML = atributos.nombreUser + "<p>"+ atributos.codigo;
	document.getElementById("imagen").src = "img/"+ atributos.tipoVehiculo + ".png";
	document.getElementById("ruta").innerHTML ="Descripción Ruta"+"<p>"+  atributos.descripcionRuta + "</p>";
	document.getElementById("destino").innerHTML ="Destino"+ "<p>"+ atributos.descripcionDestino+ "</p>";
	document.getElementById("ubicacion").innerHTML ="Ubicación Actual"+ "<p>"+ atributos.desUbicacion+ "</p>";
	document.getElementById("puestos").innerHTML ="Puestos Libres"+ "<p>"+ atributos.puestoDisponibles+ "</p>";
	document.getElementById("viaje").innerHTML ="Tipo De Viaje"+ "<p>"+ formaViaje + "</p>";
	document.getElementById("hora").innerHTML ="Hora Propuesta de Parida"+ "<p>"+ atributos.horaPartida + "</p>";
	if(atributos.solicitud==0 ||atributos.solicitud==1){
		document.getElementById('solicitar').style.display = 'block';
	}else{
		document.getElementById('solicitar').style.display = 'none';
	}
	if(atributos.solicitud==0){
		solicitaDescrpcion = "Solicitar Viaje";
		indicador = 1;
	}else{
		solicitaDescrpcion = "Confirma Viaje";
		indicador = 2;
	}
	document.getElementById("solicitaConfirma").innerHTML = solicitaDescrpcion;

}

window.onload = agregarAtributos();

function enviarSolicitud() {
document.getElementById('load').style.display = 'block';
	$.ajax({
		type: "POST"
		, url: "http://env-1119869.j.facilcloud.com/RestJR/services/SobreRuedas/solitaConfirmaViaje" //"http://localhost:8080/RestJR/services/SobreRuedas/solitaConfirmaViaje"
		, data: JSON.stringify(eval({
			"usuarioPrincipal": atributosGrl.codigo
			, "usuarioSolicitante": localStorage.getItem("CodigoUD")
			, "indicador":indicador
		}))
		, contentType: "application/json; charset=utf-8"
		, dataType: "json"
		, success: function (data, statusText, xhr) {
      document.getElementById('load').style.display = 'none';
			alert(data.mensaje);
		},
timeout: 3000
}).fail( function( jqXHR, textStatus, errorThrown ) {
document.getElementById('load').style.display = 'none';
if (jqXHR.status === 0) {

alert('No hay conexión: por favor valide la Red. Si el Problema persiste por favor contactar el Administrador de UD Sobre Ruedas');

} else if (jqXHR.status == 404) {

alert('Requested page not found [404]');

} else if (jqXHR.status == 500) {

alert('Internal Server Error [500].');

} else if (textStatus === 'parsererror') {

alert('Requested JSON parse failed.');

} else if (textStatus === 'timeout') {

alert('No fue Posible Contestar la Solicitud En El Tiempo Esperado, Si El Problema Persiste Contacte Al Administrador De UD Sobre Ruedas.');

} else if (textStatus === 'abort') {

alert('Ajax request aborted.');

}else if (jqXHR.status === 200){

} else {

alert('Uncaught Error: ' + jqXHR.status + jqXHR.responseText);
alert(jqXHR);

}
	});
}
