import React, { useEffect, useState, useMemo } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { CATEGORY_URL } from '../config';

const ContractCategory = () => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const res = await fetch(CATEGORY_URL);
            const data = await res.json();
            setCategory(data.category.map(({ cntrct_catgy_cd, categoryCount }) => ({ name: cntrct_catgy_cd, y: parseInt(categoryCount) })));
        }
        getData();
    }, [])

    const options = useMemo(() => ({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Contract Category'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            data: category
        }]
    }), [category])

    if (!category.length) {
        return <div>No Data</div>
    }

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    );
}

export default ContractCategory;