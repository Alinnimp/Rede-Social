 var database = firebase.database();

$(document).ready(function(){
  database.ref('posts').once('value').then(function(snapshot) {
    snapshot.forEach(function(childSnapshot){
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      var typePost = $('.typePost').val();
      posts(childData.text, typePost, childKey);
    });
  });

  $('#btn-post').click(function(event){
    event.preventDefault();
    var value = $('#post').val();
    var typePost = $('.typePost').val();
    var dataNew = database.ref('posts').push({
       text: value,
       select: typePost,
    });
    posts(value, typePost, dataNew.key);
    $('#post').val('');
  });


  function posts(value, typePost, key){
    $('.listPosts').prepend(`
      <article>${value}<p>${typePost}</p></article>
      <button data-edit-id="${key}">Editar</button>
      <button data-delete-id="${key}">Excluir</button>
      `);
    $(`button[data-delete-id=${key}]`).click(function(){
      $(this).parent().remove();
      database.ref('posts/'+ key).remove();
    })
    $(`button[data-edit-id=${key}]`).click(function(){
      var editText= prompt(`Altere o seu texto: ${value}`);
      var palomita = $(`span[data-text-id=${key}]`).html(editText);
      console.log(palomita);
      database.ref('posts/' + key).set({
        text: editText,
        select: typePost
      });
    })
  }
});
