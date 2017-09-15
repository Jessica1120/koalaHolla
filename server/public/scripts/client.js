console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
  $('#viewKoalas').on('click', '.deleteMe', deleteKoala);
   
    var objectToSend = {
      koala_name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      transferable: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    }; 
    // call saveKoala with the new obejct
    saveKoala( objectToSend );
  }); //end addButton on click
}); // end doc ready

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'GET',
    success: function( data ){
      console.log( 'got some koalas: ', data );
      showKoalas(data);
    } // end success
  }); //end ajax
    // display on DOM with buttons that allow edit of each
} // end getKoalas

function showKoalas(koalas){ //appends GET data onto DOM - called in GET function
  $('#viewKoalas').empty();
  for (var i = 0; i < koalas.length; i++){
    $newRow = $('<tr>').data('id', koalas[i].id);
    $delBtn = $('<input>', {type: 'button', class: 'deleteMe', value:'Delete'});
    $newRow.append('<td>'+koalas[i].koala_name+'</td>');
    $newRow.append('<td>'+koalas[i].age+'</td>');
    $newRow.append('<td>'+koalas[i].gender+'</td>');
    $newRow.append('<td>'+koalas[i].transferable+'</td>');
    $newRow.append('<td>'+koalas[i].notes+'</td>');
    //$newRow.append($delBtn);
    $('#viewKoalas').append($newRow);
  }
}

function saveKoala( newKoala ){ //POST function - adds new Koala to DB by passing the values of Object to Send declared above.
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'POST',
    data: newKoala,
    success: function( data ){
      console.log( 'got some koalas: ', data );
      getKoalas();
    } // end success   
  }); //end ajax
}

function deleteKoala() {
  console.log('delete button pushed');
}