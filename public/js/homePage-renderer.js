    /**
     * @class Responsible for rendering users page and user details in the HTML
     */
    class HomePageRender{
        constructor() {
            this.$donutchart = document.getElementById('donutchart');
        }

        drawChart(dataChart) {
            console.log(dataChart);
            
            var data = google.visualization.arrayToDataTable(dataChart);
    
            var options = {
              title: 'Current Month - Members Traffic',
              pieHole: 0.4,
            };
    
            var chart = new google.visualization.PieChart(this.$donutchart);
            chart.draw(data, options);
          }
    }

    export default HomePageRender;

    // <script id="chart-template" type="text/javascript">
    //                 google.charts.load("current", {packages:["corechart"]});
    //                 google.charts.setOnLoadCallback(drawChart);
    //                 function 
    //               </script>