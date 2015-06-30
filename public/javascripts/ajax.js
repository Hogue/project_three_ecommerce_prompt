var App = App || {};

$(document).ready(function() {

  // ==============================================
  // SET UP SCROLL FIRE OPTIONS FOR GENRE CARD DIVS
  // ==============================================
  var options = [{
    selector: '#history',
    offset: 200,
    callback: 'Materialize.fadeInImage("#history")'
  }, {
    selector: '#philosophy',
    offset: 200,
    callback: 'Materialize.fadeInImage("#philosophy")'
  }, {
    selector: '#comp-sci',
    offset: 200,
    callback: 'Materialize.fadeInImage("#comp-sci")'
  }];
  // INITIALIZE SCROLLFIRE
  Materialize.scrollFire(options);

  // ==============================
  // SET UP SLIDE-OUT MENUS
  // ==============================
  $('#menu-left').sideNav({
    menuWidth: 200, // Default is 240
    edge: 'left', // Choose the horizontal origin
    closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
  });

  $('#cart').sideNav({
    menuWidth: 350,
    edge: 'right',
    closeOnClick: true
  });

  // ===========================
  // SET UP WAY TO CLEAR FORM
  // ===========================
  var currentForm;
  var clearForm = function(domEl) {
    $('input').each(function(element) {
      $(this).val('');
    });
  };

  // ========================
  // ADD BOOK FORM
  // ========================
  $('#add-book').on('submit', function(event) {
    event.preventDefault();
    currentForm = $(this);
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
      $('.books tbody').append(res);
      clearForm(currentForm);
    });
  });
  // ========================
  // ADD USER FORM
  // ========================
  $('#add-user').on('submit', function(event) {
    event.preventDefault();
    currentForm = $(this);

    // TODO: PASSWORD VALIDATION THAT DOESN'T SUCK
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
        if (res === 'ValidationError') {
          console.log('ERROR WITH VALIDATION');
          Materialize.toast('Please fill in all the required fields!', 2000);
        } else {
          $('.users tbody').append(res);
          clearForm(currentForm);
        }
      })
      .fail(function(res) {
        console.error(res);
      });
  });
  // ========================
  // ADD ORDER FORM
  // ========================
  $('#add-order').on('submit', function(event) {
    event.preventDefault();
    currentForm = $(this);

    var order = {
      books: $('#order-books-id').val(),
      date: Date.now(),
      purchased: false
    };
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/orders',
      data: JSON.stringify(order),
      contentType: "application/json; charset=utf-8"
    }).done(function(res) {
      $('.orders tbody').append(res);
      clearForm(currentForm);
    });
  });


  // =======================
  // UNIVERSAL DELETE BUTTON
  // =======================
  $('tbody').on('click', 'a.delete', function(event) {
    event.preventDefault();

    // DISABLING DOUBLE-CLICKING DELETE
    var $this = $(this);
    var alreadyClicked = $this.data('clicked');
    if (alreadyClicked) {
      return false;
    }
    $this.data('clicked', true);

    // GATHERING INFORMATION FOR CREATING DELETE URL
    var type = $(this).data('obj-type');
    var classSelector = '.' + type + '-item';
    var oid = $(this).parents(classSelector).data('id');
    var delUrl = 'http://localhost:3000/' + type + 's/' + oid;

    $.ajax({
      url: delUrl,
      method: 'DELETE',
    })
      .fail(function() {
        console.log('FAILED TO DELETE');
      })
      .done(function(res) {
        Materialize.toast('Item Deleted!', 2000);
        $('.' + res.type + 's').find('.' + res.type + '-item[data-id="' + res._id + '"]').fadeOut(1000);
      });
  });
});
