function initMap(){

  var europe = {lat:51,lng:18}
  var map = new google.maps.Map(document.getElementById('map'),{center:europe,zoom:5,mapTypeId:"hybrid"})

  map.addListener('click',({latLng}) => {
    let cords = {
      lat:latLng.lat(),
      lng:latLng.lng()
    }
    addMarker(cords)
  })

  const addMarker = (cords) => {
    let addDescription = `<h3>${prompt('Write something about this place')}</h3>` ;
    let marker = new google.maps.Marker({position:cords,map});
    let info = new google.maps.InfoWindow({content:addDescription});
    marker.addListener('click',() => {
      info.open(map,marker)
    })
    marker.addListener('dblclick',() => {
      marker.setMap(null)
    })
  }
/////////////////////////////////
  var service = new google.maps.places.PlacesService(map)

  var searchBtn = document.getElementById('searchBtn')
  
  searchBtn.addEventListener('click',() => {
    var searchBoxVal = document.getElementById('searchBox').value;
    var request = {
         query:searchBoxVal,
      }
    service.textSearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          console.log(results[i])
        }
      }
    });
  }
)
  

  // const searchForPlace = () => {

  // }

  // var request = {
  //   query:"Centrum Nauki Kopernik",
  //   fields:['name','geometry']
  // }

  // var servicePLC = new google.maps.places.PlacesService(map);
  // servicePLC.findPlaceFromQuery(request,(results,status) => {
  //   if (status === google.maps.places.PlacesServiceStatus.OK) {
  //     for (var i = 0; i < results.length; i++) {
  //       createMarker(results[i]);
  //     }
  //     map.setCenter(results[0].geometry.location);
  // }})

  // function createMarker(place) {
  //   var marker = new google.maps.Marker({
  //     map: map,
  //     position: place.geometry.location
  //   });

  //   google.maps.event.addListener(marker, 'click', function() {
  //     infowindow.setContent(place.name);
  //     infowindow.open(map, this);
  //   });
  // }

}

initMap()