import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import * as d3 from 'd3'
import { Component as RD3Component } from 'react-d3-library'

import createNode from './radar-chart-d3'

/**
 * Helper functions
 */

/**
 * Transform key-value pair to required format for plotting
 * @param {Record<string, number>}
 */
const transformRawData = (data) =>
    Object.keys(data).reduce(
        (prev, key) => [
            ...prev,
            {
                axis: key,
                value: data[key],
            },
        ],
        []
    )

/**
 * D3.js radar chart component wrapped with React
 * @param {{ data: Record<string, number>[]}} props Data for radar chart
 */
const RadarChart = ({
    data,
    level,
    max,
    round,
    colors,
    margin,
    height,
    width,
    labelFactor,
    className,
}) => {
    const [node, setNode] = useState(null)

    useEffect(() => {
        const transformedData = data.map(transformRawData)
        const plotNode = createNode(transformedData, {
            labelFactor,
            h: height,
            w: width,
            margin: {
                top: margin,
                right: margin,
                left: margin,
                bottom: margin,
            },
            color: d3.scaleOrdinal(colors),
            levels: level,
            maxValue: max,
            roundStrokes: round,
            svgClassName: className,
        })
        setNode(plotNode)
    }, [data, labelFactor, margin])

    return <RD3Component data={node} />
}

RadarChart.propTypes = {
    /**
     * Input data for radar chart
     */
    data: PropTypes.arrayOf(PropTypes.object),
    /**
     * Class name to be assigned to SVG element
     */
    className: PropTypes.string.isRequired,
    /**
     * Plot related specs
     */
    level: PropTypes.number,
    max: PropTypes.number,
    round: PropTypes.bool,
    colors: PropTypes.arrayOf(PropTypes.string),
    margin: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number,
    labelFactor: PropTypes.number,
}

RadarChart.defaultProps = {
    level: 3,
    max: 0,
    round: false,
    colors: ['#EDC951', '#CC333F', '#00A0B0'],
    margin: 40,
    height: 500,
    width: 500,
}

export default RadarChart
