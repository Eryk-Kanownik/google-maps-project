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
      map.panTo(cords)
      map.setZoom(9)
    })
    marker.addListener('dblclick',() => {
      marker.setMap(null)
    })
  }
/////////////////////////////////
  var service = new google.maps.places.PlacesService(map)

  var searchBtn = document.getElementById('searchBtn')
  
  function templateString({name,formatted_address,rating,geometry}){
    var list = document.querySelector('.list')
    return list.innerHTML +=`<div class="list-elem">
    <div class="header">
        <h2>${name}</h2>
    </div>
    <div class="content">
        <p>Address: ${formatted_address}</p>
        <p>Rating: ${rating}</p>
        <p>Latitude: ${geometry.location.lat()}</p>
        <p>Longtitude: ${geometry.location.lng()}</p>
    </div>
</div>`
  }

  function addMarkerForTextSearch(elem){
    let marker = new google.maps.Marker({position:{
      lng:elem.geometry.location.lng(),
      lat:elem.geometry.location.lat()
    },map});
    let info = new google.maps.InfoWindow({content:elem.formatted_address})
    marker.addListener('click',() => {
      info.open(map,marker)
      map.panTo({
        lng:elem.geometry.location.lng(),
        lat:elem.geometry.location.lat()
      })
      map.setZoom(9)
    })
    marker.addListener('dblclick',() => {
      marker.setMap(null)
    })
  }
  
  searchBtn.addEventListener('click',() => {
    
    var list = document.querySelector('.list')
    list.innerHTML = ""
    var searchBoxVal = document.getElementById('searchBox').value;
    var request = {
         query:searchBoxVal,
      }
    service.textSearch(request, function(results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        results.map(elem => templateString(elem))
        results.map(elem => addMarkerForTextSearch(elem))
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