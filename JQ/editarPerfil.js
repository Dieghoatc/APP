
var miapp = angular.module('miapp', []).controller("micontrolador", function($scope, $http) {
    var obj;
    var atributos = getGET();
    var usuario;
    if (atributos.decisor ==1){
      usuario=localStorage.getItem("CodigoUD");
    }else{
      usuario = atributos.codigoContacto;
    }
    $.ajaxSetup({headers:{
    "content-type": "application/json;odata=verbose",
    "accept": "application/json;odata=verbose"
    }});

    $.ajax({
        type: "POST",
        url:"http://env-1119869.j.facilcloud.com/RestJR/services/SobreRuedas/consultaDatosPersonales",
		//"http://localhost:8080/RestJR/services/SobreRuedas/consultaDatosPersonales",
        data: JSON.stringify(eval({
            "codigoUD": usuario

        })),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data, statusText, xhr) {
            $scope.$apply(function() {
                if (data.codigoError !== 0) {
                    alert(data.comentarios);

                } else {

                    obj = data;


                }
                $scope.datos = [obj];
            })


        },
        timeout: 3000
        }).fail( function( jqXHR, textStatus, errorThrown ) {

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

      }else if (jqXHR.status == 200){

      } else {

        alert('Uncaught Error: ' + jqXHR.status + jqXHR.responseText);
    	alert(jqXHR);

      }

        //$scope.ubicaciones=[obj];
    });

});

function ocultar() {

    var indica = 0;
    var elemento = document.getElementById('inferior').style.display;

    switch (elemento) {

        case 'none':
            document.getElementById('inferior').style.display = 'block';
            break;

        case 'block':
            document.getElementById('inferior').style.display = 'none';
            break;
        default:
            document.getElementById('inferior').style.display = 'none';
            break;
    }
    /*
	if ((document.getElementById('ver').style.display = "none") ){
document.getElementById('ver').style.display = 'block';
		indica =0;

	};
	if (document.getElementById('ver').style.display = "block" && indica===0){
		document.getElementById('ver').style.display = 'none';
		indica =1;
	}*/
}

function cambiarContra() {

    var valida = 0;
    var contra = localStorage.getItem("Contrasena");
    var actual = document.getElementById('contraActual').value;
    var nueva1 = document.getElementById('contraNueva1').value;
    var nueva2 = document.getElementById('contraNueva2').value;
    if (actual == contra && actual != nueva1) {
        if (nueva1 === nueva2) {
            valida = 1;
        } else {
            valida = 0;
        }
    } else {
        valida = 0;

        document.getElementById('contraActual').value = "";
        document.getElementById('contraNueva1').value = "";
        document.getElementById('contraNueva2').value = "";
    }
    $.ajaxSetup({headers:{
    "content-type": "application/json;odata=verbose",
    "accept": "application/json;odata=verbose"
    }});
    if (valida === 1) {
      document.getElementById('load').style.display = 'block';
        $.ajax({
            type: "POST",
            url: "http://env-1119869.j.facilcloud.com/RestJR/services/SobreRuedas/actualizaDatosPersonales",
			//"http://localhost:8080/RestJR/services/SobreRuedas/solicitudesPendientes"
            data: JSON.stringify(eval({
                "codigoUD": localStorage.getItem("CodigoUD"),
                "codigoError": 1,
                "contrasena": nueva1

            })),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data, statusText, xhr) {
				if (data.codigoError == 0){
					localStorage.setItem("Contrasena",nueva1)
				}
                alert(data.mensaje);
				document.getElementById('contraActual').value = "";
        		document.getElementById('contraNueva1').value = "";
				document.getElementById('contraNueva2').value = "";

      },timeout: 3000
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

    }else if (jqXHR.status == 200){

    } else {

      alert('Uncaught Error: ' + jqXHR.status + jqXHR.responseText);
  	alert(jqXHR);

    }


        });

    }else{
		alert("Por favor verifique los datos ingresados");
        document.getElementById('contraActual').value = "";
        document.getElementById('contraNueva1').value = "";
        document.getElementById('contraNueva2').value = "";
	}


}

function actualizaDatos() {

    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var telefono = document.getElementById('telefono').value;
    var correo = document.getElementById('mail').value;
    var facebook = document.getElementById('facebook').value;
    var twitter = document.getElementById('twitter').value;
    $.ajaxSetup({headers:{
  "content-type": "application/json;odata=verbose",
  "accept": "application/json;odata=verbose"
  }});
    $.ajax({
        type: "POST",
        url: "http://env-1119869.j.facilcloud.com/RestJR/services/SobreRuedas/actualizaDatosPersonales",
        data: JSON.stringify(eval({
            "codigoUD": localStorage.getItem("CodigoUD"),
            "codigoError": 2,
            "nombre": nombre,
            "apellido": apellido,
            "telefono": telefono,
            "correo": correo,
            "facebook": facebook,
            "twiter": twitter


        })),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data, statusText, xhr) {

            alert(data.mensaje);
            if(data.codigoError == 0){
                localStorage.setItem("Nombre",nombre);
                localStorage.setItem("Apellido", apellido);
            }

        },

        timeout: 3000
        }).fail( function( jqXHR, textStatus, errorThrown ) {

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

      }else if (jqXHR.status == 200){
      } else {

        alert('Uncaught Error: ' + jqXHR.status + jqXHR.responseText);
      alert(jqXHR);

      }

      });

}

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
function atras(){
  objDatosContacto = localStorage.getItem("atributosObj");
  location.href = objDatosContacto;
  //location.href = "detallePasajero.html?codigo=" + objDatosContacto.usuario + "&latitudPartida=" + objDatosContacto.latitudPartida + "&longitudPartida=" + objDatosContacto.longitudPartida+ "&puestoDisponibles=" + objDatosContacto.puestoDisponibles+ "&descripcionRuta=" + objDatosContacto.descripcionRuta+ "&horaPartida=" + objDatosContacto.horaPartida+ "&latitudDestino=" + objDatosContacto.latitudDestino+ "&longitudDestino=" + objDatosContacto.longitudDestino+ "&descripcionDestino=" + objDatosContacto.descripcionDestino + "&tipoVehiculo=" + objDatosContacto.tipoVehiculo + "&nombreUser=" + objDatosContacto.nombreUser + "&desUbicacion=" + objDatosContacto.desUbicacion +  "&solicitud=0";

}
