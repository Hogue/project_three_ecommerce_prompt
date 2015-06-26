$(document).ready(function() {

  // ========================
  // ADD BOOK FORM
  // ========================
  $('#add-book').on('click', function(event) {
    event.preventDefault();
    debugger;
    var book = {
      title: $('input #book-title').val(),
      author: $('input #book-author').val(),
      price: $('input #book-price').val(),
      genre: $('input #book-genre').val(),
      isbn: $('input #book-isbn').val()
    };
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/books',
      data: JSON.stringify(book),
      contentType: "application/json; charset=utf-8"
    }).done(function(res) {
      $('.books').append(res);
    });
  });
  // ========================
  // ADD USER FORM
  // ========================
  $('#add-user').on('click', function(event) {
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
        $('.users').append(res);
      });
    }
  });
  // ========================
  // ADD ORDER FORM
  // ========================
  $('#add-order').on('click', function(event) {
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
      $('.users').append(res);
    });
  });
});
