$(document).ready(main);

var contador = 1;

function main(){
	$('.menu_bar').click(function(){
		// $('nav').toggle();

		if(contador == 1){
      document.getElementById('menuBack').style.display = 'block';
			$('nav').animate({
				left: '0'
			});
			contador = 0;
		} else {
      document.getElementById('menuBack').style.display = 'none';
			contador = 1;
			$('nav').animate({
				left: '-100%'
			});
		}

	});

};
