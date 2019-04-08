

document.getElementById('file').onchange = function(){
    var file = this.files[0];
    var reader = new FileReader();
     reader.onload = function(progressEvent){
         console.log(progressEvent.currentTarget.result);
         var geoJSON = JSON.parse(progressEvent.currentTarget.result);
         map.data.addGeoJson(geoJSON);
         document.getElementById('message').style.display = "flex";
         setTimeout(() => {
             document.getElementById('message').style.display = "none";
         }, 2000);
     };
    reader.readAsText(file);
};
var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 49.742, lng: 57.954 },
        zoom: 3,
        disableDefaultUI: false,
        mapTypeControl: false});
}

this.initMap();

map.data.addListener('click', (event)=>{
    console.log(event.feature.l);
    var html='<b>start station id:</b> '+event.feature.l['start station id']+'<br>';
    html+='<b>borrow_freqency:</b> '+event.feature.l['borrow_frequency']+'</b>';
    var infowindow = new google.maps.InfoWindow({
        content: html
    });
    infowindow.setPosition(event.feature.getGeometry().get());
    infowindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
    infowindow.open(map);
});
