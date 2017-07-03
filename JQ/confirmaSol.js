var miapp = angular.module('miapp', []).controller("micontrolador", function($scope, $http) {
    var obj;




    $.ajax({
        type: "POST",
        url: "http://env-1119869.j.facilcloud.com/RestJR/services/SobreRuedas/solicitudesPendientes", //"http://localhost:8080/RestJR/services/SobreRuedas/solicitudesPendientes",
        data: JSON.stringify(eval({
            "usuarioID": localStorage.getItem("CodigoUD"),
            "indicadorConsulta": "2"
        })),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) {
            $scope.$apply(function() {
                if (data.codigoError !== 0) {
                    alert(data.mensageError);

                } else {

                    obj = data;

                }
                $scope.ubicaciones = [obj];
            })


        }
        //$scope.ubicaciones=[obj];
    });

});

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

function decideURL(){
var atributos = getGET();
switch (atributos.url){
  case "1":
    location.href = "mapa.html";
    break;
  case "2":
    location.href = "pasajero.html";
    break;

  default:
    aler("Ha Ocurrido Un Error Inesperado, Navegue Con Los Comandos Del Móvil");
    break;

}

}
