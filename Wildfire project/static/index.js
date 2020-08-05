console.log("test123")
google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
      google.charts.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {

        d3.json("/api/fires").then((d)=> {
          var filBySize = d.sort(function (a, b) {
            return b.FIRE_SIZE - a.FIRE_SIZE;
          })
          
          var bigFires = filBySize.slice(0,10)
          console.log(bigFires)
          var data = new google.visualization.DataTable();
          data.addColumn('string', 'Topping');
          data.addColumn('number', 'Slices');
          data.addRows([
            [bigFires[0].FIRE_NAME, bigFires[0].FIRE_SIZE],
            [bigFires[1].FIRE_NAME, bigFires[1].FIRE_SIZE],
            [bigFires[2].FIRE_NAME, bigFires[2].FIRE_SIZE],
            [bigFires[3].FIRE_NAME, bigFires[3].FIRE_SIZE],
            [bigFires[4].FIRE_NAME, bigFires[4].FIRE_SIZE],
            [bigFires[5].FIRE_NAME, bigFires[5].FIRE_SIZE],
            [bigFires[6].FIRE_NAME, bigFires[6].FIRE_SIZE],
            [bigFires[7].FIRE_NAME, bigFires[7].FIRE_SIZE],
            [bigFires[8].FIRE_NAME, bigFires[8].FIRE_SIZE],
            [bigFires[9].FIRE_NAME, bigFires[9].FIRE_SIZE]
          ]);

          // Set chart options
          var options = {'title':'Ten Largest Fires',
                        'width':600,
                        'height':600,
                        'colors':["rgb(0, 31, 51)","rgb(25, 56, 76)", "rgb(51, 82, 102)", "rgb(76, 107, 127)", "rgb(102, 133, 153)","rgb(127, 158, 178)","rgb(153, 184, 204)","rgb(178, 209, 229)", "rgb(204, 235, 255)","rgb(229, 245, 255)"]
                      };

          // Instantiate and draw our chart, passing in some options.
          var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
          chart.draw(data, options);
        }
        )}


////
d3.json("/api/fires").then((d)=> {
  
    var fireName = d.map(x => x.FIRE_NAME);
    var fireYear = d.map(x => x.FIRE_YEAR);
    var fireCause = d.map(x => x.STAT_CAUSE_DESCR)
    var fireSize= d.map(x => x.FIRE_SIZE)
    var fireLat = d.map(x => x.LATITUDE)
    var fireLng = d.map(x => x.LONGITUDE)
    //console.log(fireSize)
    
  
    var data = [
        {
        x: fireYear,
        y: fireSize,
        type: 'bar',
        marker: {
          color: 'rgb(25, 56, 76)'
        }
        }
    ];
    var layout = {
        autosize: true,
        width: 1200,
        height: 700,
        title:{
          text: "Acres Burned By Year",
          font: {
            
            size: 24
          },

        },
        xaxis: {
          tickangle: -45
        },
        
      };
        


    Plotly.newPlot('bar', data, layout);

});

d3.json("/api/fires").then((year)=>{
    var fireYears = year.map(x=> x.FIRE_YEAR)
    const unique = (x, i, a) => a.indexOf(x) == i;
    var uniqueYears = fireYears.filter(unique).sort();
    
    d3.select('#selDataset')
      .selectAll('myOptions')
      .data(uniqueYears)
      .enter()
      .append("option")
      .text(function(d) {return d})
      .property("value", function (d) {return d})
      
  });

  largestGraphBuilder();
  function largestGraphBuilder(){
    d3.json("/api/fires").then((data)=>{
        var filteredYear = data.filter(function(year){
            return year.FIRE_YEAR;
        });
        
        
        sortedArray = filteredYear.sort(function (a, b) {
            return b.FIRE_SIZE - a.FIRE_SIZE;
          })
        
        tenLargestFires = sortedArray.slice(0,10).reverse()
        fireNames = tenLargestFires.map(x=>x.FIRE_NAME)
        fireSize = tenLargestFires.map(x=>x.FIRE_SIZE)
        
        var data = [{
            type: 'bar',
            x: fireSize,
            y: fireNames,
            marker: {
              color: 'rgb(34,139,34)'
            },
            orientation: 'h',
            
          }];

          var layout = {
            title: "10 Largest Fires",
            autosize: true,
            width: 550,
            height: 500,
            
            yaxis: {
              automargin: true,
              titlefont: { size:15},
            },
            
          };
          
          Plotly.newPlot('largestFires', data,layout );
        
    })

}

yearGraphBuilder('1992')
function yearGraphBuilder(y){
    d3.json("/api/fires").then((data)=>{
        var filteredYear = data.filter(function(year){
            return year.FIRE_YEAR == y;
        });
        sortedArray = filteredYear.sort(function (a, b) {
            return b.FIRE_SIZE - a.FIRE_SIZE;
          })
        tenLargestFires = sortedArray.slice(0,10).reverse()
        fireNames = tenLargestFires.map(x=>x.FIRE_NAME)
        fireSize = tenLargestFires.map(x=>x.FIRE_SIZE)
        
        var data = [{
            type: 'bar',
            x: fireSize,
            y: fireNames,
            orientation: 'h',
            marker: {
              color: 'rgb(25, 56, 76)'
            },
          }];

          var layout = {
            title: `10 Largest Fires of ${y}`,
            autosize: true,
            width: 550,
            height: 500,
            yaxis: {
              
              
              automargin: true,
              titlefont: { size:14},
            },
            
          };
          
          Plotly.newPlot('hbar', data,layout );
        
    })

}





 

d3.json("/api/fires").then((year)=>{
  var fireYears = year.map(x=> x.FIRE_YEAR)
  
  //referance = https://levelup.gitconnected.com/filter-unique-in-javascript-226007247354
  const unique = (x, i, a) => a.indexOf(x) == i;
  var uniqueYears = fireYears.filter(unique).sort();
  
  d3.select('#categoryFilter')
    .selectAll('option')
    .data(uniqueYears)
    .enter()
    .append("option")
    .text(function(d) {return d})
    .property("value", function (d) {return d})
    
});


// the selectors on home page and index page
$("#selDataset").change(function() {
  const selection = $(this).val();
  yearGraphBuilder(selection)
});



$("#categoryFilter").change(function() {
  const selectedYear = $(this).val();
  tableBuild(selectedYear)
});

tableBuildDefault()
//Table builder
function tableBuild(y){
  d3.json("/api/fires").then((d)=> {
      var filteredYear = d.filter(function(year){
          return year.FIRE_YEAR == y;
      });
      values = Object.values(filteredYear)
      
      const tbody = $("tbody")
      tbody.empty();
      for (item of filteredYear){
          
              tbody.append(`<tr><td>${item.FIRE_NAME}</td><td>${item.FIRE_YEAR}</td><td>${item.FIRE_SIZE}</td><td>${item.LATITUDE}</td><td>${item.LONGITUDE}</td></tr>`)
              
      }
      
  });
}

function tableBuildDefault(){
  d3.json("/api/fires").then((d)=> {
      
      values = Object.values(d)
      
      const tbody = $("tbody")
      tbody.empty();
      for (item of d){
          
              tbody.append(`<tr><td>${item.FIRE_NAME}</td><td>${item.FIRE_YEAR}</td><td>${item.FIRE_SIZE}</td><td>${item.LATITUDE}</td><td>${item.LONGITUDE}</td></tr>`)
              
      }
      
  });
}



var myMap = L.map('mapid').setView([36.80, 	-104.9333333], 7.48);

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZHVyYW5nb2pha2UiLCJhIjoiY2tjaHViaHpxMTNjYjJ5bWt2ZDdyYW1mcCJ9.jrXwho9OElBmiiSlGL5C0w'
}).addTo(myMap);




d3.json("/api/fires").then((d)=> {
  var markers = L.markerClusterGroup();
  
  for (var i = 0; i < d.length; i++) {
    var location = d[i];
    console.log(location);
    if (location) {  
      markers.addLayer(L.marker([location.LATITUDE, location.LONGITUDE])
          .bindPopup(`<b><h6>${location.FIRE_NAME}<br>Year: ${location.FIRE_YEAR}<br>Acres: ${location.FIRE_SIZE}</h6></b>`));
    }
  }
  myMap.addLayer(markers);

})


