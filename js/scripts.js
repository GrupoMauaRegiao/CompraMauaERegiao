"use strict";
$(document).ready(function () {
  function larguraJanela() {
    return $(window).width();
  }

  function alturaJanela() {
    return $(window).height();
  }

  function alturaSubtraindoPorcentagem(porcentagem) {
    return alturaJanela() - ((alturaJanela() / 100) * porcentagem);
  }

  function ajustarSlide() {
    var slide, janela;
    slide = $('.slide');
    janela = $(window);

    slide.css('height', alturaSubtraindoPorcentagem(30));

    janela.on('resize', function () {
      slide.css('height', alturaSubtraindoPorcentagem(30));
    });
  }

  function posicionarSetaControleScroll() {
    var controleScroll, janela;
    controleScroll = $('.botao-controle');
    janela = $(window);

    controleScroll.css({
      'top': alturaJanela() - 100,
      'left': larguraJanela() - 150
    });

    janela.on('resize', function () {
      controleScroll.css({
        'top': alturaJanela() - 100,
        'left': larguraJanela() - 150
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
        botao.fadeOut(500);
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
        $(this).off('keyup');
      }
    });
  }

  function ativarAnimacoes() {
    var controller, documento;
    documento = $(document);
    controller = $.superscrollorama({
      triggerAtCenter: true,
      playoutAnimations: true
    });

    documento.on('scroll', function () {
      var nPaginas, posicaoScroll, alturaPagina, marcadorPagina, slide, headers, texto, imagem;
      nPaginas = 6;
      posicaoScroll = Math.floor(documento.scrollTop());
      alturaPagina = Math.floor($(this).height() / nPaginas);
      marcadorPagina = $('.marca-pagina');
      slide = $('.slide');
      headers = $('.header');
      texto = $('.texto');
      imagem = $('img');

      // Slide 02
      controller.addTween(slide.eq(1),
        (new TimelineLite()).append([
          TweenMax.fromTo(texto.eq(1), 1,
            { css: { marginLeft: '-50%' }, immediateRender: true },
            { css: { marginLeft: '0' } })
        ]), 500);

      controller.addTween(slide.eq(1),
        (new TimelineLite()).append([
          TweenMax.fromTo(imagem.eq(0), 1,
            { css: { marginLeft: '50%' }, immediateRender: true },
            { css: { marginLeft: '0' } })
        ]), 500);

      // Slide 03
      controller.addTween(slide.eq(2),
        (new TimelineLite()).append([
          TweenMax.fromTo(texto.eq(2), 1,
            { css: { marginLeft: '50%'}, immediateRender: true },
            { css: { marginLeft: '-50%' } })
        ]), 1000);

      // Slide 04
      controller.addTween(slide.eq(3),
        (new TimelineLite()).append([
          TweenMax.fromTo(texto.eq(3), 1,
            { css: {marginLeft: '50%' }, immediateRender: true },
            { css: {marginLeft: '-30%' } })
        ]), 1000);

      controller.addTween(slide.eq(3),
        (new TimelineLite()).append([
          TweenMax.fromTo(texto.eq(4), 1,
            { css: { marginLeft: '-50%' }, immediateRender: true },
            { css: { marginLeft: '30%' } })
        ]), 1000);

      // Slide 05
      texto.eq(4).css('width', 'auto');
      controller.addTween(slide.eq(4),
        (new TimelineLite()).append([
          TweenMax.fromTo(texto.eq(5), 1,
            { css: { marginLeft: '-50%' }, immediateRender: true },
            { css: { marginLeft: '50%' } })
        ]), 1000);

      if (posicaoScroll < alturaPagina) {
        marcadorPagina.text(1);
      } else if (posicaoScroll < alturaPagina * 2) {
        marcadorPagina.text(2);
      } else if (posicaoScroll < alturaPagina * 3) {
        marcadorPagina.text(3);
      } else if (posicaoScroll < alturaPagina * 4) {
        marcadorPagina.text(4);
        imagem.eq(1).removeClass('animacaoSmartphone');
        setTimeout(function () {
          imagem.eq(1).addClass('animacaoSmartphone');
        }, 1000);
      } else if (posicaoScroll < alturaPagina * 5) {
        marcadorPagina.text(5);
      } else if (posicaoScroll < alturaPagina * 6) {
        marcadorPagina.text(6);
      }

    });
  }

  function enviarEmail() {
    var form;
    form = $('form');
    form.on('submit', function (e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();

      var nome, email, informacao;
      nome = $('input[type="text"]').val();
      email = $('input[type="email"]').val();
      informacao = 'nome=' + nome +
                   '&email=' + email;

      if ((nome === '') || (email === '')) {
        window.alert('Todos os campos são obrigatórios.');
        $('input[type="text"]').focus();
      } else {
        $.ajax({
          type: "POST",
          url: window.location + '/enviar-inscricao.php',
          cache: false,
          data: informacao
        }).done(function () {
          form.children().hide('fast');
          $('<p>Obrigado, <span>' + nome + '</span>. <br />Sua inscrição foi enviada para nós com sucesso!</p>').appendTo(form);
        });
      }
    });
  }

  ajustarSlide();
  posicionarSetaControleScroll();
  controlarAnimacaoSetaScroll();
  controlarScroll();
  ativarAnimacoes();
  enviarEmail();

});