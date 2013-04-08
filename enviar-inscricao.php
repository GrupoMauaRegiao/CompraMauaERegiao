<?php
  function criarListaEmails($enderecoEmail, $arquivo) {
    if ($enderecoEmail) {
      if (file_exists($arquivo)) {
        $hdlr = fopen($arquivo, "a+r") or print("O arquivo não pode ser aberto.");
        $conteudo = fread($hdlr, filesize($arquivo));

        if (!preg_match("/$enderecoEmail/i", $conteudo)) {
          
          if (PATH_SEPARATOR == ";") {
            $quebraLinha = "\r\n";
          } else {
            $quebraLinha = "\n";
          }

          $destinatario = "news@compramaua.com.br";
          $assunto = "COMPRA MAUÁ E REGIÃO - QUERO RECEBER AS NOVIDADES";
          $nome = ucwords($_POST["nome"]);
          $conteudo = 
            '<p><b>Nome:</b> ' . $nome . '</p>
             <p><b>E-mail:</b> ' . $enderecoEmail . '</p>
             <p><b>Assunto:</b> ' . $assunto . '</p>';
             
          $headers .= "MIME-Version: 1.1" . $quebraLinha;
          $headers .= "Content-type: text/html; charset=utf-8" . $quebraLinha;
          $headers .= "From: " . $enderecoEmail . $quebraLinha;
          
          if (!mail($destinatario, $assunto, $conteudo, $headers , "-r" . $destinatario)) {
            mail($destinatario, $assunto, $conteudo, $headers);
          }

          fwrite($hdlr, $enderecoEmail . "; ");
          fclose($hdlr);
        }
      }
    }
  }

  $email = strtolower($_POST["email"]);
  criarListaEmails($email, '/home/comprama/public_html/lista-de-inscricoes.txt');

?>