import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Bike } from './Bike';



function displayLocationPage(city, page) {
  let bike = new Bike();
  let promise = bike.getStolenBikesByCity(city, page);

  promise.then(function(response) {
    let body = JSON.parse(response);
    $('#listBikes').removeClass('hide');
    
    $('tr:not(#tableHeader)').empty();
    body.bikes.forEach(function(bike) {
      let date = new Date(bike.date_stolen*1000);

      let stolen_date = `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`;
      
      $('#listBikes').append(`<tr><td>${stolen_date}</td><td>${bike.stolen_location}</td><td>${bike.title}</td><td>${bike.serial}</td><td>${bike.frame_colors}</td></tr>`);
      },function(error) {
        $('#listBikesError').append(`${error}`);
      });
  });
}

function countStolenBikes(city) {
  let bike = new Bike();

  let count = bike.getStolenBikeCountByLocation(city);

  count.then(function(response) {
    let body = JSON.parse(response);
    $('.hide').show();
    $('#bikeCount').text(body.proximity);
  },function(error) {
    console.error(error);
  });
}

$().ready(function(){
  $('#cityLocation').click(function(){
    let page = 1;
    let city = $('#location').val();
    $('#location').val('');

    countStolenBikes(city);
    displayLocationPage(city,page);




  });
});