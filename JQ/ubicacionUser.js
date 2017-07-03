var miapp = angular.module('miapp', []).controller("micontrolador", function($scope, $http) {
    var obj;




    $.ajax({
        type: "POST",
        url: "http://env-1119869.j.facilcloud.com/RestJR/services/SobreRuedas/consultaUbicaciones",
		//"http://localhost:8080/RestJR/services/SobreRuedas/consultaUbicaciones",
        data: JSON.stringify(eval({
            "tipoVehiculo": localStorage.getItem("modoViaje"),
            "horaPartida": localStorage.getItem("horaPartida")
        })),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            $scope.$apply(function() {
                if (data.codigoError !== 0) {
                    alert(data.mensageError);

                } else {

                    obj = data;

					localStorage.setItem("userUbicaciones",data);
                }
                $scope.ubicaciones = [obj];
            })


        }
        //$scope.ubicaciones=[obj];
    });

});

function ocultar(){

	var indica = 0;
  document.getElementById('verFiltros').style.display = 'none';
	var elemento =document.getElementById('ver').style.display;

	switch (elemento){

		case 'none':
			document.getElementById('ver').style.display = 'block';
			break;

		case 'block':
			document.getElementById('ver').style.display = 'none';
			break;
		default:
			document.getElementById('ver').style.display = 'none';
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


  function filtros(){
document.getElementById('ver').style.display = 'none';

var elemento =document.getElementById('verFiltros').style.display;

switch (elemento){

  case 'none':
    document.getElementById('verFiltros').style.display = 'block';
    break;

  case 'block':
    document.getElementById('verFiltros').style.display = 'none';
    break;
  default:
    document.getElementById('verFiltros').style.display = 'none';
    break;
}

  }
