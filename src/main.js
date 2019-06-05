import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Bike } from './Bike';

$().ready(function(){
  $('#cityLocation').click(function(){
    let city = $('#location').val();
    $('#location').val('');

    let bike = new Bike();
    let promise = bike.getStolenBikesByCity(city);

    promise.then((response) => {
      let body = JSON.parse(response);
      // console.log(`outside for ${body.bikes[0]}`);
      body.bikes.forEach(function(bike) {
        $('#listBikes').append(`<li>${bike.title}</li>`);
        console.log(`${bike.title}`);
        }).catch((error) => {
          $('#listBikes').append(`<p>${error}</p>`);
      });
    });
  });
});