import React from 'react'
import {Line} from "react-chartjs-2"
import {Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend} from "chart.js"


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const Chart = ({arr=[],currency,days}) => {

    const prices = [];
    const date = [];


    for (let i = 0; i < arr.length; i++) {
        if(days === "24h") date.push(new Date(arr[1][0]).toLocaleTimeString());
        else date.push(new Date(arr[1][0]).toLocaleDateString());

        prices.push(arr[i][1]);

        

    }


        
    const data = {
        
            labels: date,
            /**in dataset if we send multiple objects it will print multiple charts. */
            datasets: [{
                label:`Price in ${currency}`,
                data: prices, borderColor: "rgb(255,99,132)",
                backgroundColor:"rgba(255,99,132,0.5)"
            }]
        
    };


  return (
<>

{/**First we will make option of what we have to show in the chart */};

<Line options={{
    responsive: true,
}} 


data={data}

/>

</>
    
  )
}

export default Chart