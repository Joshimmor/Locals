var geo = navigator.geolocation;


function success(pos) {
  var crd = pos.coords;
  var long = pos.coords.longitude;
  var lat = pos.coords.lat;

  console.log('Your current position is:');
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);
  console.log(`More or less ${crd.accuracy} meters.`);
  const loc = `locations=${lat},${long}`
  return loc
}
function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
function locateMe(){
 geo.getCurrentPosition(success,error);
 
};

//fetch
var maps = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?"
var key = "key=AIzaSyBZCW5ZIHQlvTWm3bdAimQvw7IOO0QpkQw";

function placesRequests (location, catergories,pricePoint){
  let radius = "radius=1500";
  let type = `type=${catergories}`;
  let price = `maxprice=${pricePoint}`;
  if(location == ""){
     geo.getCurrentPosition(function(pos){
         var crd = pos.coords;
         let long = crd.longitude;
        let lat = crd.latitude;
         const loc = `locations=${lat},${long}`;
         //fetch
         fetch(maps + loc + "&" + radius + "&" + type + "&" + price + "&" + key)
         .then((response) =>{
           return response.json();
         }).then((myJson)=>{
           console.log(myJson.stringify())
         }).catch(function(error) {
          console.log('Request failed',error(err))
      })

     },error);
  };
  /*fetch(maps + located + "&" + radius + "&" + type + "&" + price + "&" + key)
  .then((response) => {
    console.log(response);
  })*/
 
}

// form submit

const myForm = document.getElementById("localsForm");

myForm.addEventListener("submit",function(){
  event.preventDefault();
  console.log("form Submited")
  let pricePoint = document.getElementById("pricePoint").value;
  let catergories = document.getElementById("catergories").value;
  let location = document.getElementById("location").value;
    console.log(placesRequests(location,catergories,pricePoint));
    
});