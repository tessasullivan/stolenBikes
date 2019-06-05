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
    let count = bike.getStolenBikeCountByLocation(city);

    count.then(function(response) {
      let body = JSON.parse(response);
      console.log(body.proximity);
      $('.hide').show();
      $('#bikeCount').text(body.proximity);
    },function(error) {
      console.error(error);
    });

    promise.then(function(response) {
      let body = JSON.parse(response);
      body.bikes.forEach(function(bike) {
        $('#listBikes').append(`<li>${bike.title}</li>`);
        // console.log(`${bike.title}`);
        },function(error) {
          $('#listBikesError').append(`${error}`);
        });    
      // promise.then((response) => {
      //   let body = JSON.parse(response);
      //   body.bikes.forEach(function(bike) {
      //     $('#listBikes').append(`<li>${bike.title}</li>`);
      //     // console.log(`${bike.title}`);
      //     }).catch((error) => {
      //       $('#listBikesError').append(`${error}`);
      //   });
    });
  });
});