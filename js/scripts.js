$(document).ready(function() {
  function getWidth() {
    return $(window).width();
  }

  function getHeight() {
    return $(window).height();
  }

  function ajustarSlide() {
    var slides, janela;
    slides = $('.slide');
    janela = $(window);

    slides.css('height', getHeight());

    janela.on('resize', function () {
      slides.css('height', getWidth());
    });
  }

  function posicionarSetaControleScroll() {
    var controleScroll, janela;
    controleScroll = $('.botao-controle');
    janela = $(window);

    controleScroll.css({
      'top': getHeight() - 100,
      'left': getWidth() - 150
    });

    janela.on('resize', function () {
      controleScroll.css({
        'top': getHeight() - 100,
        'left': getWidth() - 150
      });
    });
  }

  function controlarAnimacaoSetaScroll() {
    var controleScroll;
    controleScroll = $('.botao-controle');

    controleScroll.on('mouseover', function () {
      controleScroll.css({
        '-webkit-animation-play-state': 'paused',
        '-moz-animation-play-state': 'paused',
        '-o-animation-play-state': 'paused',
        'animation-play-state': 'paused'
      });
    });

    controleScroll.on('mouseleave', function () {
      controleScroll.css({
        '-webkit-animation-play-state': 'running',
        '-moz-animation-play-state': 'running',
        '-o-animation-play-state': 'running',
        'animation-play-state': 'running'
      });
    });
  }

  function controlarScroll() {
    var botao, fator, nPaginas, alturaDocumento, alturaPagina;
    botao = $('.botao-controle');
    fator = 0;
    nPaginas = 6;

    botao.on('click', function () {
    alturaDocumento = $(document).height();
    alturaPagina = alturaDocumento / nPaginas;
      $('html, body').animate({
        scrollTop: alturaPagina * (fator < 5 ? fator += 1 : fator = 0)
      }, 1000);
    console.log('Yeahh', fator);
    });
  }

  ajustarSlide();
  posicionarSetaControleScroll();
  controlarAnimacaoSetaScroll();
  controlarScroll();

});