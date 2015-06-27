$(document).ready(function() {

  // ========================
  // ADD BOOK FORM
  // ========================
  $('#add-book').on('submit', function(event) {
    event.preventDefault();
    var book = {
      title: $('input#book-title').val(),
      author: $('input#book-author').val(),
      price: $('input#book-price').val(),
      genre: $('input#book-genre').val(),
      isbn: $('input#book-isbn').val()
    };
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/books',
      data: JSON.stringify(book),
      contentType: "application/json; charset=utf-8"
    }).done(function(res) {
      console.log(res);
      $('.books').append(res);
    });
  });
  // ========================
  // ADD USER FORM
  // ========================
  $('#add-user').on('submit', function(event) {
    event.preventDefault();
    if ($('input #user-password').val() === $('input #user-password-conf').val()) {
      var user = {
        nameFirst: $('input#user-first-name').val(),
        nameLast: $('input#user-last-name').val(),
        email: $('input#user-email').val(),
        password: $('input#user-password').val()
      };
      $.ajax({
        method: 'POST',
        url: 'http://localhost:3000/users',
        data: JSON.stringify(user),
        contentType: "application/json; charset=utf-8"
      }).done(function(res) {
        console.log('Response from router: ' + res);
        $('.users tbody').append(res);
      });
    }
  });
  // ========================
  // ADD ORDER FORM
  // ========================
  $('#add-order').on('submit', function(event) {
    event.preventDefault();
    var order = {
      date: Date.now(),
      purchased: false
    };
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/orders',
      data: JSON.stringify(order),
      contentType: "application/json; charset=utf-8"
    }).done(function(res) {
      $('.striped tbody').append(res);
    });
  });

  $('tbody').on('click', 'a.delete', function(event) {
    event.preventDefault();

    var type = $(this).data('obj-type');
    var classSelector = '.' + type + '-item';
    var oid = $(this).parents(classSelector).data('id');
    var delUrl = 'http://localhost:3000/' + type + 's/' + oid;

    function setVars(res) {
      $('.' + type + '-item').find(classSelector).data('id').remove();
    }
    $.ajax({
        url: delUrl,
        method: 'DELETE',
      })
      .fail(function() {
        console.log('FAILED TO DELETE');
      })
      .done(function(res){
        $('.'+res.type+'s').find('.'+res.type+'-item[data-id="'+res._id+'"]').remove();
      });
  });
});
