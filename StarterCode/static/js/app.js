var json = "samples.json"

// function init() {
//     d3.json(json).then(function(data){
//         let json_data = data
//         // console.log(json_data)
//         var names = json_data.names
//         console.log(names)
//     })

//     d3.select("#selDataset")
// }

function buildPlots() {
    // Capture data from json
    d3.json(json).then(function(data) {
        console.log(data)
        var metadata = data.metadata
        // console.log(metadata)
        var samples = data.samples
        // console.log(samples)
        
        var values = samples.map(sample => sample.sample_values)
        // console.log(values)
        var value = values[0]
        // console.log(value)

        var labels = samples.map(sample => sample.otu_ids)
        // console.log(labels)
        var label = labels[0]

        var hovertexts = samples.map(sample => sample.otu_labels)
        // console.log(hovertexts)
        var hovertext = hovertexts[0]
        
        // Build horizontal bar graph
        var trace1 = {
            type: "bar",
            x: value.slice(0,10),
            y: label.slice(0,10),
            text: hovertext,
            orientation: "h"
        }
    
        var data1 = [trace1]
    
        var layout1 = {
            title: "Top 10 Bacteria Cultures Observed"
        }
    
        Plotly.newPlot("bar",data1,layout1)

        // Build bubble chart
        var trace2 = {
            x: label,
            y: value,
            mode: "markers",
            marker: {
                size: values[0]
            }
        }

        var data2 = [trace2]

        var layout2 = {
            title: "Bacteria Cultures Per Sample"
        }

        Plotly.newPlot("bubble",data2,layout2)

        // Build metadata chart
        var panel = d3.select("#sample-metadata")

        var default_sample = metadata[0]

        console.log(default_sample)
        
        for ([key,value] of Object.entries(default_sample)) {
            panel.append("p").text(`${key} : ${value}`)
        }
    })
}           




buildPlots()