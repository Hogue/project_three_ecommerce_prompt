Stripe.setPublishableKey('pk_test_T3boZgfJSj7teQTxRORNlSAy');

function stripeResponseHandler(status, response) {
  var form = $('#payment-form');

  if (response.error) {
    // Show the errors on the form
    form.find('.payment-errors').text(response.error.message);
    //$('form').find('button').prop('disabled', false);
  } else {
    // response contains id and card, which contains additional card details
    var token = response.id;
    // Insert the token into the form so it gets submitted to the server
    form.append($('<input type="hidden" name="stripeToken" />').val(token));
    // and submit
    form.get(0).submit();
  };
};

$(function($) {
  $('#payment-form').submit(function(event) {
    //event.preventDefault();
    var form = $(this);
    debugger;
    // Disable the submit button to prevent repeated clicks
    //$('form').find('button').prop('disabled', true);

    Stripe.card.createToken(form, stripeResponseHandler);

    // Prevent the form from submitting with the default action
    return false;
  });
});



//----------------CHAAAAANGE ACCORDING TO PAGE-------------
// $(document).ready(function() {

//   $(".payment-errors").hide();
//   $('#payment-form').submit(function(event) {
//     $(".payment-errors").hide();
//     var $form = $(this);
//     // Disable the submit button to prevent repeated clicks
//     $form.find('button').prop('disabled', true);
//     Stripe.card.createToken($form, stripeResponseHandler);
//     // Prevent the form from submitting with the default action
//     return false;
//   });

//   function stripeResponseHandler(status, response) {
//     if (response.error) {
//       // show the errors on the form
//       alert("Something went wrong when sending the charge");
//       console.error(error);
//       $("#payment-error").show();
//       $(".submit-button").removeAttr("disabled");
//     } else {
//       var form$ = $("#payment-form");
//       // token contains id, last4 digits, and card type
//       var token = response.id;
//       // insert the token into the form so it gets submitted to the server
//       form$.append("<input type='hidden' name='stripeToken' value='" + token + "'/>");
//       // and submit
//       form$.get(0).submit();
//     }
//   }

//   $('#add-product-form').submit(function(event) {
//     event.preventDefault();
//     // empty response message
//     $('#product-response').text("");
//     // grab values from form and create the payload
//     var payload = {
//       name: $('#product-name').val(),
//       amount: $('#product-price').val()
//     };
//     // handle ajax, submit appropriate message - POSSIBLY REFACTOR TO FIRE FLASH MESSSAGE
//     $.ajax({
//       type: 'POST',
//       url: '/api/v1/products',
//       data: payload
//     })
//       .done(function(data) {
//         $('#product-response').text('Yay! Product Added!');
//       })
//       .fail(function() {
//         $('#product-response').text('Yikes! Something went wrong.');
//       });
//     // clear form input fields
//     $('#product-name').val('');
//     $('#product-price').val('');
//   });

// });
