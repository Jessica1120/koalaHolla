console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
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

function showKoalas(koalas){
  $('#viewKoalas').empty();
  for (var i = 0; i < koalas.length; i++){
    $newRow = $('<tr>');
    $newRow.append('<td>'+koalas[i].koala_name+'</td>');
    $newRow.append('<td>'+koalas[i].age+'</td>');
    $newRow.append('<td>'+koalas[i].gender+'</td>');
    $newRow.append('<td>'+koalas[i].transferable+'</td>');
    $newRow.append('<td>'+koalas[i].notes+'</td>');
    $('#viewKoalas').append($newRow);
  }
}

function saveKoala( newKoala ){
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
