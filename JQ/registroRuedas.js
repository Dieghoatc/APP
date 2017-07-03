function crearVheiculo() {
	var descrip = document.getElementById("descripcion").value;
	var marca = document.getElementById("marca").value;
	var color = document.getElementById("color").value;
	var placa = document.getElementById("placa").value;
	var tipo = document.getElementById("tipo").value;
	$.ajax({
		type: "POST"
		,url: "http://env-1119869.j.facilcloud.com/RestJR/services/SobreRuedas/creaActualizaRegistroRuedas", 
		//"http://localhost:8080/RestJR/services/SobreRuedas/solicitudesPendientes"
		//"http://env-1119869.j.facilcloud.com/RestJR/services/SobreRuedas/creaActualizaRegistroRuedas",
		data: JSON.stringify(eval({
			"usuarioID": localStorage.getItem("CodigoUD")
			, "tipoVehiculo": tipo
			, "placaVehiculo": placa
			, "marcaVehiculo": marca
			, "colorVehiculo": color
			, "descripcion": descrip
			, "activo": 1
			, "codigoUD": localStorage.getItem("CodigoUD")
			, "indicador": 1
		}))
		, contentType: "application/json; charset=utf-8"
		, dataType: "json"
		, success: function (data) {
			alert(data.mensaje);
		}
	});
}