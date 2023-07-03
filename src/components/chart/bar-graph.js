import ApexCharts from 'react-apexcharts';

export default function BarGraph(props){
    const optionsGraph =  {
        series: [{
        data: Object.values(props.value)
      }],
        chart: {
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
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
