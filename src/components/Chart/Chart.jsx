import React, { useState, useEffect } from 'react'
import {fetchDailyData} from '../../api/index'
import {Line, Bar} from 'react-chartjs-2'
import styles from './Chart.module.css'

const Charts = ({ data, country }) => {
    const [dailyData, setDailyData] = useState(() => [])
    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData())
        }

        fetchAPI()
    })
    
    const lineChart =(
        dailyData !== 'undefined'
            ? (
                <Line data={{
                    labels: dailyData.map(({ date })=>date),
                    datasets: [{
                        data: dailyData.map(({ confirmed }) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    }, {
                        data: dailyData.map(({ deaths }) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(10,0,0,0.5)',
                        fill: true,
                    }],
                }} />
            ): null
    )
    
    const barChart = (
        data.confirmed
            ? (
                <Bar
                    data={{
                        labels: [`Infected : ${(data.confirmed.value * 100 / (data.confirmed.value + data.recovered.value + data.deaths.value)).toFixed(2)}%`,
                            `Recovered : ${(data.recovered.value * 100 / (data.confirmed.value + data.recovered.value + data.deaths.value)).toFixed(2)}%`,
                            `Deaths : ${(data.deaths.value * 100 / (data.confirmed.value + data.recovered.value + data.deaths.value)).toFixed(2)}%`],
                        datasets: [{
                            backgroundColor: ['rgba(255,0,0,0.5)', 'rgba(0,255,0,0.5)', 'rgba(10,0,0,0.5)'],
                            data:[data.confirmed.value, data.recovered.value, data.deaths.value],
                        }]
                    }}
                    options={{
                        legend: { display: false},
                        title: {display: true, text: `Current state : ${country}`},
                    }}
                />
        ): null
    
    )
    
    return (
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}


export default Charts