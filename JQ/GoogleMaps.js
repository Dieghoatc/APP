
var posicionOrigen;
var posicionDestino;
var address;

function initMap() {
	document.getElementById('menuBack').style.display = 'none';
document.getElementById("usuario").innerHTML = localStorage.getItem("Nombre") + " " + localStorage.getItem("Apellido")+ "<p>"+ localStorage.getItem("CodigoUD")+"</p>";
	var defaultPos = new google.maps.LatLng(4.632267, -74.178155);
	if (navigator.geolocation) {
		function exito(pos) {
			MuestraMapa(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
			searchPlace();
		}

		function falla(error) {

			alert("Ud Sobre Ruedas, Desea Conocer Su Ubicación, Por Favor Valide La Configuración del GPS De Su Móvil");
			initMap();

		}

		var options = {
			maximumAge: 500000
			, enableHighAccuracy: true
			, timeout: 5000
		};
		navigator.geolocation.getCurrentPosition(exito, falla, options);
	}
	else {
		alert("Ud Sobre Ruedas, Desea Conocer Su Ubicación, Por Favor Valide La Configuración del GPS De Su Móvil");
		initMap();
	}

	function MuestraMapa(latlng) {
		var myOptions = {
			zoom: 16
			, center: latlng
			, zoomControl: false
			, scaleControl: false
			, mapTypeControl: true
			, mapTypeControlOptions: {
				style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
				, position: google.maps.ControlPosition.LEFT_BOTTOM
			}
			, rotateControl: true
		};
		posicionOrigen = latlng;
		var map = new google.maps.Map(document.getElementById("map"), myOptions);

		var marker = new google.maps.Marker({
			position: latlng
			, map: map
			, title: "Posción"
			, draggable: false
			, animation: google.maps.Animation.BOUNCE
		});
	
		addMarker = function (ubicacion) {
			var marker2 = new google.maps.Marker({
				map: map
				, position: ubicacion
			})
		}
		var options = {

  Country: 'Colombia'
};

		searchPlace = function () {
			var search = document.getElementById('search') ;
			var searchBox = new google.maps.places.SearchBox(search);
			searchBox.addListener('places_changed', function () {
				var places = searchBox.getPlaces();
				places.forEach(function (place) {
					var ubicacion = place.geometry.location;
					addMarker(ubicacion);
					map.setCenter(ubicacion);
					//nuevo
					var objConfigDR = {
						map: map
					}
					var objConfigDS = {
						origin: latlng
						, destination: ubicacion
						, travelMode: google.maps.TravelMode.DRIVING

					}
					posicionDestino = ubicacion;
					var ds = new google.maps.DirectionsService();
					var dr = new google.maps.DirectionsRenderer(objConfigDR);
					ds.route(objConfigDS, fnRutear);

					function fnRutear(result, estado) {
						if (estado == "OK") {
							dr.setDirections(result);
							document.getElementById('inferior').style.visibility = "visible";
						}
						else {
							alert('error');
						}
					}
				})
			})
		}
		var infowindow;
		var geocoder = new google.maps.Geocoder();
		geocoder.geocode({
			'latLng': marker.getPosition()
		}, function (results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				address = results[0]['formatted_address'];
				localStorage.setItem("DesUbicacion",address);
				infowindow = new google.maps.InfoWindow({
					position: latlng
					, content: 'Su Posición Actual, Aprox.</br><p>' + address + '</p>Sus Coordenadas Actules</br><p>' + latlng + '</p>'
				});
			}
		});
		google.maps.event.addListener(marker, 'click', function () {
			infowindow.open(map, marker);
		});
	}
}

function enviarPosicion() {

	var descripcionRuta = document.getElementById('ruta');
	var horaPartida = document.getElementById('hora');
	var modoViaje = document.getElementById('modoviaje');
	var puesto = document.getElementById('puestos');
	var destino = document.getElementById("search");
	var longitudPartida = posicionOrigen.lng();
	var latitudPartida = posicionOrigen.lat();
	var longitudDestino = posicionDestino.lng();
	var latitudDestino = posicionDestino.lat();
	var valida =0;
	/*if (usuario.value === "Miguel" && contra.value === "123" ) {
		location.href = "mapa.html";
	}
	else {
		alert("Error")

	}*/
	if(horaPartida.value == ""){
		valida = 0;
		alert("Por favor registre una hora de Partida");
	}else{
		valida =1;
	}

	if(valida === 1){
		document.getElementById('load').style.display = 'block';
	$.ajax({
		type: "POST"
		, url: "http://env-1119869.j.facilcloud.com/RestJR/services/SobreRuedas/creaUbicacion" //"http://localhost:8080/RestJR/services/SobreRuedas/creaUbicacion"

		, data: JSON.stringify(eval({
			"usuario": localStorage.getItem("CodigoUD")
			, "latitudPartida": latitudPartida
			, "longitudPartida": longitudPartida
			, "puestoDisponibles": puesto.value
			, "descripcionRuta": descripcionRuta.value
			, "horaPartida": horaPartida.value
			, "latitudDestino": latitudDestino
			, "longitudDestino": longitudDestino
			, "descripcionDestino": destino.value
			, "nombreUser": localStorage.getItem("Nombre") + " " + localStorage.getItem("Apellido")
			, "tipoVehiculo": modoViaje.value
			, "desUbicacion": address
		}))
		, contentType: "application/json; charset=utf-8"
		, dataType: "json"
		, success: function (data, statusText, xhr) {
			if (data.codigoError !== 0) {
				alert(data.mensaje);
			}
			else {
				localStorage.setItem("modoViaje", modoViaje.value);
				localStorage.setItem("horaPartida", horaPartida.value);
				location.href = "pasajero.html";
			}
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
}


function verMenuBack(){


	var elemento =document.getElementById('menuBack').style.display;

	switch (elemento){

	  case 'none':
	    document.getElementById('menuBack').style.display = 'block';
	    break;

	  case 'block':
	    document.getElementById('menuBack').style.display = 'none';
	    break;
	  default:
	    document.getElementById('menuBack').style.display = 'none';
	    break;
	}

}
