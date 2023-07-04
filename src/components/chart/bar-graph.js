import ApexCharts from 'react-apexcharts';

export default function BarGraph(props){
    const optionsGraph =  {

        series: [{
        data: Object.values(props.value)
      }],
        chart: {
          toolbar:{show:false},
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      colors: [function({ value, seriesIndex, w }) {
        if (value < 50) {
          return "#DD1E47"
        } else if(value >= 50 && value < 65){
          return '#FFC40C'
        }
        else if (value >= 65 && value <100 ){
          return '#00A084'
        }
        else if (value === 100){
          return '#00AEEF'
        }
        else{
          return '#000'
        }
      }],
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: Object.keys(props.value),
      }
      };  
      
    return(
        <div id="chart">
            <ApexCharts options={optionsGraph} series={optionsGraph.series} type={'bar'} height={"80%"} />
        </div>
    );
}
