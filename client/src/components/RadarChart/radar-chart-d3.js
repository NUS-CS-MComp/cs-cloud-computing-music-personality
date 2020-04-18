import * as d3 from 'd3'

/**
 * Return a radar chart document node incorporated with D3.js plotting functionalities
 * @param {{ axis: string, value: number }[][]} entries Data entries
 * @param {{ w: number, h: number } | Record<string, string>} options Custom options for plotting
 * @param {string} tag HTML tag name, default as div
 * @param {string} className HTML class name default as radar-chart
 */
export default function RadarChart(
    entries,
    options,
    tag = 'div',
    className = 'radar-chart'
) {
    /**
     * Initialize configuration for plotting frame
     * Source code from http://bl.ocks.org/nbremer/21746a9668ffdf6d8242 by Nadieh Bremer
     * Modified according to D3.js API Version 5 by Terry Lu
     */

    // Default configuration parameters
    const defaultConfig = {
        w: 600, // Width of the circle
        h: 600, // Height of the circle
        margin: { top: 20, right: 20, bottom: 20, left: 20 }, // The margins of the svg
        levels: 3, // How many levels or inner circles should there be drawn
        maxValue: 0, // What is the value that the biggest circle will represent
        labelFactor: 1.25, // How much farther than the radius of the outer circle should the labels be placed
        wrapWidth: 60, // The number of pixels after which a label needs to be given a new line
        opacityArea: 0.35, // The opacity of the area of the blob
        dotRadius: 4, // The size of the colored circles of each blog
        opacityCircles: 0.1, // The opacity of the circles of each blob
        strokeWidth: 2, // The width of the stroke around each blob
        roundStrokes: false, // If true the area and stroke will follow a round path (cardinal-closed)
        color: d3.schemeCategory10, // Color function

        /**
         * Tailwind CSS related specs
         */
        legendClassName: 'font-bold uppercase inline-block text-base',
        tooltipClassName: 'font-bold text-base',
        svgClassName: '',
    }

    // Update default configuration with custom plotting options
    if (typeof options !== 'undefined') {
        Object.entries(options).forEach(([key, value]) => {
            if (typeof options[key] !== 'undefined') {
                defaultConfig[key] = value
            }
        })
    }

    // If the supplied maxValue is smaller than the actual one, replace by the max in the data
    const maxValue = Math.max(
        defaultConfig.maxValue,
        d3.max(entries, (records) =>
            d3.max(records.map((record) => record.value))
        )
    )

    // Compute basic plot information
    // Axis is obtained from the first set of data entries
    const axisNames = entries[0].map((i) => i.axis)
    const axisCounts = axisNames.length
    const circleRadius = Math.min(defaultConfig.w / 2, defaultConfig.h / 2)
    const numberFormatter = d3.format('.2%')

    // The width in radians of each "slice"
    const angleSlice = (Math.PI * 2) / axisCounts

    // Scale for the radius
    const radiusScale = d3
        .scaleLinear()
        .range([0, circleRadius])
        .domain([0, maxValue])

    /**
     * Create the container SVG and g element
     * Document node is created as input for mounting as React component
     */

    // Create a document node
    const node = document.createElement(tag)
    node.setAttribute('class', className)

    // Remove whatever chart with the same id/class was present before
    d3.select(node)
        .select('svg')
        .remove()

    // Initiate the radar chart SVG
    const svg = d3
        .select(node)
        .append('svg')
        .attr(
            'viewBox',
            `0 0 ${defaultConfig.w +
                defaultConfig.margin.left +
                defaultConfig.margin.right} ${defaultConfig.h +
                defaultConfig.margin.top +
                defaultConfig.margin.bottom}`
        )
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('class', `${className} ${defaultConfig.svgClassName}`)

    // Append a g document element
    const g = svg
        .append('g')
        .attr(
            'transform',
            `translate(${defaultConfig.w / 2 +
                defaultConfig.margin.left},${defaultConfig.h / 2 +
                defaultConfig.margin.top})`
        )

    /**
     * Create glow filter for some extra aesthetics
     */

    // Filter for the outside glow
    const filter = g
        .append('defs')
        .append('filter')
        .attr('id', 'glow')

    filter
        .append('feGaussianBlur')
        .attr('stdDeviation', '2.5')
        .attr('result', 'coloredBlur')

    const feMerge = filter.append('feMerge')

    feMerge.append('feMergeNode').attr('in', 'coloredBlur')
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

    /**
     * Plot the circular grid components
     */

    // Wrapper for the grid & axes
    const axisGrid = g.append('g').attr('class', 'axisWrapper')

    // Draw the background circles
    axisGrid
        .selectAll('.levels')
        .data(d3.range(1, defaultConfig.levels + 1).reverse())
        .enter()
        .append('circle')
        .attr('class', 'grid-circle')
        .attr('r', (data) => (circleRadius / defaultConfig.levels) * data)
        .style('fill', 'var(--radar-plot-circle)')
        .style('stroke', 'var(--radar-plot-circle-stroke)')
        .style('fill-opacity', defaultConfig.opacityCircles)
        .style('filter', 'url(#glow)')

    /**
     * Plot all the axis
     */

    // Create the straight lines radiating outward from the center
    const axis = axisGrid
        .selectAll('.axis')
        .data(axisNames)
        .enter()
        .append('g')
        .attr('class', 'axis')

    // Append the labels at each axis
    axis.append('text')
        .attr('class', `legend ${defaultConfig.legendClassName}`)
        .attr('text-anchor', 'middle')
        .attr('dy', '0.15rem')
        .attr(
            'x',
            (data, index) =>
                radiusScale(maxValue * defaultConfig.labelFactor) *
                Math.cos(angleSlice * index - Math.PI / 2)
        )
        .attr(
            'y',
            (data, index) =>
                radiusScale(maxValue * defaultConfig.labelFactor) *
                Math.sin(angleSlice * index - Math.PI / 2)
        )
        .style('font-family', 'inherit')
        .style('fill', 'var(--default-black)')
        .text((value) => value)
        .call(wrap, defaultConfig.wrapWidth)

    /**
     * Draw the radar char blobs
     */

    // The radial line function
    const radarLine = d3
        .lineRadial()
        .curve(d3.curveLinearClosed)
        .radius((data) => radiusScale(data.value))
        .angle((data, index) => index * angleSlice)

    if (defaultConfig.roundStrokes) {
        radarLine.curve(d3.curveCardinalClosed)
    }

    // Create a wrapper for the blobs
    const blobWrapper = g
        .selectAll('.radar-wrapper')
        .data(entries)
        .enter()
        .append('g')
        .attr('class', 'radar-wrapper')

    // Append the backgrounds
    blobWrapper
        .append('path')
        .attr('class', 'radar-area')
        .attr('d', (data) => radarLine(data))
        .style(
            'fill',
            (data, index) => `var(--radar-color-palette-${index + 1})`
        )
        .style('fill-opacity', defaultConfig.opacityArea)
        .on('mouseover', function onMouseOver() {
            d3.selectAll('.radar-area')
                .transition()
                .duration(200)
                .style('fill-opacity', 0.1)
            d3.select(this)
                .transition()
                .duration(200)
                .style('fill-opacity', 0.7)
        })
        .on('mouseout', function onMouseOut() {
            d3.selectAll('.radar-area')
                .transition()
                .duration(200)
                .style('fill-opacity', defaultConfig.opacityArea)
        })

    // Create the outlines
    blobWrapper
        .append('path')
        .attr('class', 'radar-stroke')
        .attr('d', (data) => radarLine(data))
        .style('stroke-width', `${defaultConfig.strokeWidth}px`)
        .style(
            'stroke',
            (data, index) => `var(--radar-color-palette-${index + 1})`
        )
        .style('fill', 'none')
        .style('filter', 'url(#glow)')

    // Append the circles
    blobWrapper
        .selectAll('.radar-circle')
        .data((value) => value)
        .enter()
        .data((value, index) =>
            value.map((data) => ({ ...data, group: index }))
        )
        .append('circle')
        .attr('class', 'radar-circle')
        .attr('r', defaultConfig.dotRadius)
        .attr(
            'cx',
            (data, index) =>
                radiusScale(data.value) *
                Math.cos(angleSlice * index - Math.PI / 2)
        )
        .attr(
            'cy',
            (data, index) =>
                radiusScale(data.value) *
                Math.sin(angleSlice * index - Math.PI / 2)
        )
        .style('fill', (data) => `var(--radar-color-palette-${data.group + 1})`)
        .style('fill-opacity', 0.8)

    /**
     * Append invisible circles for tooltip
     */

    // Set up the small tooltip for when you hover over a circle
    g.append('text')
        .attr('class', `tooltip ${defaultConfig.tooltipClassName}`)
        .style('fill', 'var(--default-black)')
        .style('opacity', 0)

    // Wrapper for the invisible circles on top
    const blobCircleWrapper = g
        .selectAll('.radar-circle-wrapper')
        .data(entries)
        .enter()
        .append('g')
        .attr('class', 'radar-circle-wrapper')

    // Append a set of invisible circles on top for the mouseover pop-up
    blobCircleWrapper
        .selectAll('.radar-invisible-circle')
        .data((d) => d)
        .enter()
        .append('circle')
        .attr('class', 'radar-invisible-circle')
        .attr('r', defaultConfig.dotRadius * 1.5)
        .attr(
            'cx',
            (data, index) =>
                radiusScale(data.value) *
                Math.cos(angleSlice * index - Math.PI / 2)
        )
        .attr(
            'cy',
            (data, index) =>
                radiusScale(data.value) *
                Math.sin(angleSlice * index - Math.PI / 2)
        )
        .style('fill', 'none')
        .style('pointer-events', 'all')
        .on('mouseover', function onMouseOver(data) {
            const newX = parseFloat(d3.select(this).attr('cx')) - 10
            const newY = parseFloat(d3.select(this).attr('cy')) - 10
            d3.select('.tooltip')
                .attr('x', newX)
                .attr('y', newY)
                .text(numberFormatter(data.value))
                .transition()
                .duration(200)
                .style('opacity', 1)
        })
        .on('mouseout', function onMouseOut() {
            d3.select('.tooltip')
                .transition()
                .duration(200)
                .style('opacity', 0)
        })

    // Taken from http://bl.ocks.org/mbostock/7555321
    // Wraps SVG text
    function wrap(text, width) {
        text.each(function selectText() {
            // eslint-disable-next-line no-param-reassign
            text = d3.select(this)
            const words = text
                .text()
                .split(/\s+/)
                .reverse()
            let word
            let line = []
            let lineNumber = 0
            const lineHeight = 1.4 // ems
            const y = text.attr('y')
            const x = text.attr('x')
            const dy = parseFloat(text.attr('dy'))
            let tspan = text
                .text(null)
                .attr('x', x)
                .attr('y', y)
                .attr('dy', `${dy}em`)

            while (words.length > 0) {
                word = words.pop()
                line.push(word)
                tspan.text(line.join(' '))
                if (tspan.node().getComputedTextLength() > width) {
                    line.pop()
                    tspan.text(line.join(' '))
                    line = [word]
                    tspan = text
                        .append('tspan')
                        .attr('x', x)
                        .attr('y', y)
                        // eslint-disable-next-line no-plusplus
                        .attr('dy', `${++lineNumber * lineHeight + dy}em`)
                        .text(word)
                }
            }
        })
    }

    return node
}
