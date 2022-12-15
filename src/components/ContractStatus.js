import React, { useEffect, useMemo, useState } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { STATUS_URL } from '../config';

const ContractStatus = () => {
    const [contractStatus, setContractStatus] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(STATUS_URL);
            const data = await res.json();
            setContractStatus(data.contractStatus.map(({ cntrct_stat_cd, statusCount }) => ([cntrct_stat_cd, parseInt(statusCount)])));
        }
        getData();
    }, [])

    const options = useMemo(() => ({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Contract Status'
        },
        xAxis: {
            type: 'Status',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Count'
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Contract Status',
            data: contractStatus,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    }), [contractStatus]);

    if (!contractStatus.length) {
        return <div>No Data</div>
    }

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
}

export default ContractStatus;