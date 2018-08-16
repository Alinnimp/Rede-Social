$(document).ready(function(){
  $('.login-button').click(function(event){
    event.preventDefault();
    // para não dar o refresh
    var email = $(".login-input").val();
    var password = $(".login-password").val();
    // função para usuários entrar
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      window.location = "main.html";
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errossaasmdrMessage);
      var error = $( "#cads-p" ).text(errorCode + ', '+ errorMessage);
    });
    $('.login-input').val('');
    $(".login-password").val('');
    var error = $( "#cads-p" ).text('');
  });

  $(".cads-button").click(function(event){
    event.preventDefault();
    var email = $(".cads-input").val();
    var password = $(".cads-password").val();

    // autenticar cadastro de usuário via firebase
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(response){
      window.location = "main.html";
      var userid = response.user.uid;

    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage);
      var error = $( "#cads-p" ).text(errorCode + ', '+ errorMessage);
    });
    $('.cads-input').val('');
    $(".cads-password").val('');
    var success = $( "#cads-p" ).text('E-mail cadastrado com sucesso!');
  });

});
