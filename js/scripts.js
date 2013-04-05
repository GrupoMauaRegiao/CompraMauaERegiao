"use strict";
$(document).ready(function () {
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
    var botao, fator, nPaginas, documento, alturaPagina;
    botao = $('.botao-controle');
    fator = 0;
    nPaginas = 6;
    documento = $(document);

    function animar() {
      alturaPagina = documento.height() / nPaginas;
      $('html, body').animate({
        scrollTop: alturaPagina * (fator < 5 ? fator += 1 : fator = 0)
      }, 500);

      if (fator === 5) {
        botao.fadeOut(2000);
      }
    }

    botao.on('click', function () {
      animar();
    });

    documento.on('keyup', function (evt) {
      evt.preventDefault();
      evt.stopImmediatePropagation();
      evt.stopPropagation();

      if (evt.keyCode === 40) {
        animar();
      }

      if (fator === 5) {
        $(this).off();
      }
    });
  }

  function esconderPagina() {
    $('#pagina').hide(0);
  }

  function exibirPagina() {
    $('#pagina').show(0);
  }

  function ativarAnimacoes() {
    var documento;
    documento = $(document);

    documento.on('scroll', function () {
      var altura, nPaginas, alturaPagina, marcadorPagina, headers, textos, imagens;
      altura = $(document).height();
      nPaginas = 6;
      alturaPagina = altura / nPaginas;
      marcadorPagina = $('.marca-pagina');
      headers = $('.header');
      textos = $('.texto');
      imagens = $('img');

      // Slide 02
      textos.eq(1).css({
        '-webkit-transform': 'translateX(-150%) translateY(150%)',
        '-webkit-filter': 'opacity(0)',
        '-webkit-transition': '0.1s',
      });
      imagens.eq(0).css({
        '-webkit-transform': 'translateX(150%) translateY(150%)',
        '-webkit-filter': 'opacity(0)',
        '-webkit-transition': '0.1s',
      });

      // Slide 03
      textos.eq(2).css({
        '-webkit-filter': 'opacity(0)',
        '-webkit-transition': '0.1s'
      });

      // Slide 04
      textos.eq(3).css({
        '-webkit-transform': 'translateX(-150%) translateY(150%)',
        '-webkit-filter': 'opacity(0)',
        '-webkit-transition': '0.1s',
      });
      textos.eq(4).css({
        '-webkit-transform': 'translateX(-150%) translateY(150%)',
        '-webkit-filter': 'opacity(0)',
        '-webkit-transition': '0.1s',
      });
      imagens.eq(1).css({
        '-webkit-transform': 'translateX(150%)',
        '-webkit-filter': 'opacity(0)',
        '-webkit-transition': '0.1s',
      });

      // Slide 05
      textos.eq(5).css({
        '-webkit-transform': 'translateX(-150%) translateY(90%)',
        '-webkit-filter': 'opacity(0)',
        '-webkit-transition': '0.1s',
      });
      imagens.eq(2).css({
        '-webkit-transform': 'scale(0)',
        '-webkit-filter': 'opacity(0)',
        '-webkit-transition': '0.1s',
      });

      if (Math.floor(documento.scrollTop()) < Math.floor(alturaPagina)) {
        marcadorPagina.text(1);
        imagens.eq(1).removeClass('animacaoSmartphone');
      } else if (Math.floor(documento.scrollTop()) < Math.floor(alturaPagina * 2)) {
        // Slide 02
        marcadorPagina.text(2);
        imagens.eq(1).removeClass('animacaoSmartphone');
        setTimeout(function () {
          textos.eq(1).css({
            '-webkit-transform': 'translateX(0%)',
            '-webkit-transition': '0.5s',
            '-webkit-filter': 'opacity(100%)'
          });

          imagens.eq(0).css({
            '-webkit-transform': 'translateX(0%)',
            '-webkit-transition': '5s',
            '-webkit-filter': 'opacity(100%)'
          });
        }, 1);
      } else if (Math.floor(documento.scrollTop()) < Math.floor(alturaPagina * 3)) {
        // Slide 03
        marcadorPagina.text(3);
        imagens.eq(1).removeClass('animacaoSmartphone');
        setTimeout(function () {
          textos.eq(2).css({
            '-webkit-filter': 'opacity(100%)',
            '-webkit-transition': '5s'
          });
        }, 1);
      } else if (Math.floor(documento.scrollTop()) < Math.floor(alturaPagina * 4)) {
        // Slide 04
        marcadorPagina.text(4);
        imagens.eq(1).removeClass('animacaoSmartphone');
        setTimeout(function () {
          textos.eq(3).css({
            '-webkit-transform': 'translate(0)',
            '-webkit-filter': 'opacity(100%)',
            '-webkit-transition': '1s',
          });
          textos.eq(4).css({
            '-webkit-transform': 'translate(0)',
            '-webkit-filter': 'opacity(100%)',
            '-webkit-transition': '2s',
          });
          imagens.eq(1).css({
            '-webkit-transform': 'translateX(0)',
            '-webkit-filter': 'opacity(100%)',
            '-webkit-transition': '3s',
          });
        }, 1);

        setTimeout(function () {
          imagens.eq(1).addClass('animacaoSmartphone');
        }, 3000);
      } else if (Math.floor(documento.scrollTop()) < Math.floor(alturaPagina * 5)) {
        marcadorPagina.text(5);
        imagens.eq(1).removeClass('animacaoSmartphone');
        setTimeout(function () {
          textos.eq(5).css({
            '-webkit-transform': 'translate(0)',
            '-webkit-filter': 'opacity(100%)',
            '-webkit-transition': '2s',
          });
        }, 1);

        setTimeout(function () {
          imagens.eq(2).css({
            '-webkit-transform': 'scale(1)',
            '-webkit-filter': 'opacity(100%)',
            '-webkit-transition': '4s',
          });
        }, 2000);
      } else if (Math.floor(documento.scrollTop()) < Math.floor(alturaPagina * 6)) {
        marcadorPagina.text(6);
        imagens.eq(1).removeClass('animacaoSmartphone');
      }
    });
  }

  function enviarEmail() {
    var form;
    form = $('form');

    form.on('submit', function (evt) {
      evt.preventDefault();
      evt.stopImmediatePropagation();
      evt.stopPropagation();

      var nome, email, informacao;
      nome = $('input[type="text"]').val();
      email = $('input[type="email"]').val();
      informacao = 'nome=' + nome +
                   '&email=' + email;
      $.ajax({
        type: "POST",
        url: window.location + '/enviar-inscricao.php',
        cache: false,
        data: informacao
      }).done(function () {
        form.children().hide('slow');
        $('<p>Obrigado <span>' + nome + '</span>. <br />Sua mensagem foi enviada para nós com sucesso!</p>').appendTo(form);
      });
    });
  }

  esconderPagina();
  exibirPagina();
  ajustarSlide();
  posicionarSetaControleScroll();
  controlarAnimacaoSetaScroll();
  controlarScroll();
  ativarAnimacoes();
  enviarEmail();

});