var database = firebase.database();

$(document).ready(function(){
// função click para postar
  $('#btn-post').click(function(){
    checkEmpty();
    neewsfeed();
    $('#post').val('');
    var publicacao = textarea();
    var type = select();
    database.ref('posts/' + userId).set({
        text: publicacao,
        select: type,
    });
  });
  // função para pegar o valor do textarea
  function textarea(){
    var value = $('#post').val();
    return value;
  };
  // função para pegar o select
  function select(){
    var typePost = $('.typePost').val();
    return typePost;
  };
  // função para habilitar o botão
  function checkEmpty(){
    var btnD = $('btn-post').attr('disabled');
    var btnV;
    var txtArea = textarea();
    if (txtArea === '' || txtArea.length > 140){
      btnD = true;
      btnV= $('btn-post').filter().css("background-color", '#969393');
    } else if(txtArea !=''){
      btnD = false;
      btnV= $('btn-post').filter().css( "background-color", "#1DA1F2");
    }
  };
  // função para criar a neewsfeed
  function neewsfeed(){
    var text = textarea();
    var type = select();
    // var postMain = $('.listPosts').append(`<article><p>${text}</p></article>`);

    // var postMain = $('.listPosts').appendChild(.add('article').add('p').text(texT));
    // $(postMain).add('p').text(type);

    var sectionPosts = document.querySelector('.listPosts');
    var publicar = document.createElement('article');
    var paragraph = document.createElement('p');
    paragraph.classList.add('publicar');
    paragraph.innerHTML = text;
    publicar.appendChild(paragraph);
    var paragraphTwo = document.createElement('p');
    paragraphTwo.innerHTML = type;
    sectionPosts.appendChild(publicar);
    document.getElementById('post').value = '';
  }
});
