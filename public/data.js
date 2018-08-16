var database = firebase.database();
var USER_ID = window.location.search.match(/\?userId=(.*)/)[1];
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
      <article>${value}<p>${typePost}</p>
      <button data-edit-id="${key}">Editar</button>
      <button data-delete-id="${key}">Excluir</button></article>
      `);
    $(`button[data-delete-id=${key}]`).click(function(){
      $(this).parent().remove();
      database.ref('posts/'+ key).remove();
    })
    $(`button[data-edit-id=${key}]`).click(function(){
      var editText= prompt(`Altere o seu texto: ${value}`);
      $(`span[data-text-id=${key}]`).text(editText);
      database.ref(`posts/${USER_ID}/${key}`).update({
        text: editText,
        select: typePost
      });
    })
  }
});
