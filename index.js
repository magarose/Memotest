//declaro las variables 
var clicks = 0;
var primerClick
var segundoClick
var aciertos = 0;
var intentos
var jugadas = 0;
var nivel



const imagenes = [
    'img/alce.jpg',
    'img/epelante.jpg',
    'img/nena.jpg',
    'img/peces.jpg',
    'img/unichancho.jpg',
    'img/zapas.jpg',
    'img/alce.jpg',
    'img/epelante.jpg',
    'img/nena.jpg',
    'img/peces.jpg',
    'img/unichancho.jpg',
    'img/zapas.jpg',
]

$('#container1').removeClass('hide')
$('#container2').addClass('hide')
// para poner el nombre en el input y que aparezca el juego, sino que aparezca el cartel UPS
$('button').on('click', function () {
    var name = $('#input').val()
        if (name == '') {
            $('#ups').removeClass('hide')
            setTimeout(() => {
                $('#ups').addClass('hide')
            }, 3000);

        } else {
            $('#container1').addClass('hide')
            $("#container2").removeClass('hide')
            $('#holaName').append(`<p> Hola ${name}</p>`)
            console.log (name)
        }

})

///realizo una funcion para establecer los niveles

    $('.level').on('click', function () {
        nivel = $(this).attr('id')
            if (nivel == 'FACIL') {
                intentos = 18;
            } else if (nivel == 'INTERMEDIO') {
                intentos = 12;
            } else if (nivel == 'DIFICIL') {
                intentos = 9;
            }
        $('.int').html(intentos)
        $('.nivel').html(nivel)
        console.log (nivel)
    })



//funcion para que se mezclen las fotos
const desordenado = shuffle(imagenes)
function shuffle(imagenes) {

    for (let i = imagenes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [imagenes[i], imagenes[j]] = [imagenes[j], imagenes[i]];
    }
    return imagenes;
}
var imagenesLength = $('.anana').length ///pusheo todos los .anana del html en una variable
for (var i = 0; i < imagenes.length; i++) {
    $('.anana').eq(i).attr('data-img', imagenes[i])

}///en attr data imagen le pusheo las imagenes del const imagenes

//todo lo que tiene que pasar una vez que hago click en la imagen

$('.anana').on('click', function (e) {
    var visible = $(this).attr('data-img')

        clicks = clicks + 1

        if (clicks == 1) {
            $(this).attr('src', visible)

            $(this).addClass('flip')
            const imgId = e.target.id
            const id = $('#' + imgId).attr('data-id')
            $('#' + imgId).attr('src', desordenado[id - 1])

            primerClick = {
                id: $(this).attr('id'),
                img: $(this).attr('data-img')
            }
            
            
        } else if (clicks == 2) {
            $(this).attr('src', visible)

            $(this).addClass('flip')
            const imgId = e.target.id
            const id = $('#' + imgId).attr('data-id')
            $('#' + imgId).attr('src', desordenado[id - 1])
                    segundoClick = {
                id: $(this).attr('id'),
                img: $(this).attr('data-img')
            }

        jugadas++
        $('.num').html(jugadas) //esto corresponde al contador de intentos
        console.log(jugadas)

        if (primerClick.id != segundoClick.id && primerClick.img == segundoClick.img) {
                $('#' + primerClick.id).addClass("grey")
                $('#' + segundoClick.id).addClass("grey")
                $('.grey').css('cursor', 'default')
                $('.grey').unbind('click')

                 aciertos = aciertos + 1;
                 console.log(aciertos)
                clicks = 0;
        } else {
            setTimeout(function () {
                $('#' + primerClick.id).attr('src', 'img/tapada.jpg').removeClass('flip')
                $('#' + segundoClick.id).attr('src', 'img/tapada.jpg').removeClass('flip')
                clicks = 0;

            }, 1000);

        }

        winLost()
    }
})

//funcion para que aparezca el cartel si ganaste o perdista
function winLost() {
    if (aciertos == 6 && jugadas <= intentos) {
        $('#container2').css('opacity', '0.5')
        $('#container3').removeClass('hide')
        $('#result').append(`GANASTE🎉 con ${jugadas} intentos`)
        $('img').unbind('click')
        console.log ('ganaste')
        guardar_localStorage ();

    } else if (jugadas == intentos && aciertos < 6) {
        $('#container2').css('opacity', '0.5')
        $('#container3').removeClass('hide')
        $('#result').append(`PERDISTE 😢`)
        $('table').addClass('hide')
         $('img').unbind('click')
         console.log ('perdiste')

    }
    $('#reload').on('click', function () {
        location.reload()

    })

}
///localStorage
    
    function guardar_localStorage (){
        let rank = JSON.parse (localStorage.getItem('memotest'))

        let datos = {
            nombre: $('#input').val(),
            nivelrank: nivel,
            intentos: jugadas
        }

        if (rank == null) {
            rank = [];
          };
         
          rank.push(datos);

        let data = 'memotest'
        localStorage.setItem('memotest', JSON.stringify (rank));
        console.log (rank)

        for (let i=0; i < rank.length; i++) {
            $('#nameLS').append(`<p>${rank[i].nombre}</p>`)
            $('#nivelLS').append(`<p>${rank[i].nivelrank}</p>`)
            $('#intentosLS').append(`<p>${rank[i].intentos}</p>`)
          }
    };

