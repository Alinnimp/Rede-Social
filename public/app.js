$(document).ready(function(){
  $('.login-button').click(function(event){
    event.preventDefault();
    // para não dar o refresh
    var email = $(".login-input").val();
    var password = $(".login-password").val();
    // função para usuários entrar
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      window.location = "main.html";
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
    *  alert(errorCode,errorMessage);
    });
    $('.login-input').val('');
    $(".login-password").val('');
    var error = $( "#cads-p" ).text('');
  });

  $(".cads-button").click(function(event){
    event.preventDefault();
    *var name = $(".cads-name").val();
    var email = $(".cads-input").val();
    var password = $(".cads-password").val();

    // autenticar cadastro de usuário via firebase
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(response){
      window.location = "main.html";
      // var userid = response.user.uid;
  *    database.ref("users/" + userId).set({
        name: name,
        email: email
      })
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
  *    alert(errorCode,errorMessage);
    });
    $('.cads-input').val('');
    $(".cads-password").val('');
    var success = $( "#cads-p" ).text('E-mail cadastrado com sucesso!');
  });

});
