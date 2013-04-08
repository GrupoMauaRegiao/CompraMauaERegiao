<?php
  if (PATH_SEPARATOR == ";") {
    $quebraLinha = "\r\n";
  } else {
    $quebraLinha = "\n";
  }

  $destinatario = "news@compramaua.com.br";
  $assunto = "COMPRA MAUÁ E REGIÃO - Inscrição";
  $nome = ucwords(($_POST["nome"]);
  $email = strtolower($_POST["email"]);
  $conteudo = 
    '<p><b>Nome:</b> ' . $nome . '</p>
     <p><b>E-mail:</b> ' . $email . '</p>
     <p><b>Assunto:</b> ' . $assunto . '</p>';
     
  $headers .= "MIME-Version: 1.1" . $quebraLinha;
  $headers .= "Content-type: text/html; charset=utf-8" . $quebraLinha;
  $headers .= "From: " . $email . $quebraLinha;

  if(!mail($destinatario, $assunto, $conteudo, $headers , "-r" . $destinatario)) {
    mail($destinatario, $assunto, $conteudo, $headers);
  }
?>