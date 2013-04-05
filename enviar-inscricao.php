<?php
  if (PATH_SEPARATOR == ";") {
    $quebraLinha = "\r\n";
  } else {
    $quebraLinha = "\n";
  }

  $destinatario = "arte@revistamaua.com.br";
  $remetente = "arte@revistamaua.com.br";
  $assunto = "COMPRA MAUÁ E REGIÃO - Inscrição";
  $nome = $_POST["nome"];
  $email = $_POST["email"];
  $conteudo = 
    '<p><b>Nome:</b> ' . $nome . '</p>
     <p><b>E-mail:</b> ' . $email . '</p>
     <p><b>Assunto:</b> ' . $assunto . '</p>';
     
  $headers .= "MIME-Version: 1.1" . $quebraLinha;
  $headers .= "Content-type: text/html; charset=utf-8" . $quebraLinha;
  $headers .= "From: " . $remetente . $quebraLinha;

  if(!mail($destinatario, $assunto, $conteudo, $headers , "-r" . $destinatario)) {
    mail($destinatario, $assunto, $conteudo, $headers);
  }
?>