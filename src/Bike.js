export class Bike {
  getStolenBikesByCity(city) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      let url = `https://cors-anywhere.herokuapp.com/http://bikeindex.org/api/v3/search/?stolenness=proximity&page=1&per_page=25&location=${city}&appid=${process.env.API_KEY}`;
      // let url = `http://bikeindex.org/api/v3/search/?stolenness=proximity&location=${city}&page=1&per_page=25&appid=${process.env.API_KEY}`;
      
      request.open("GET", url, true);
      request.send();

      request.onload = function() {
        if (this.status === 200){
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
    });
  }
}