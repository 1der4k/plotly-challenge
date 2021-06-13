var json = "samples.json"

function init() {
    d3.json(json).then(function(data){
        let json_data = data
        // console.log(json_data)
        var names = json_data.names
        console.log(names)
    })
}

function buildPlots() {
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
        
        var trace = {
            type: "bar",
            x: label.slice(0,10),
            y: value,
            text: hovertext,
            orientation: "h"
        }
    
        var data = [trace]
    
        var layout = {
            title: "Top 10 Bacteria Cultures Observed"
        }
    
        Plotly.newPlot("bar",data,layout)
    })
}           

init()
// buildPlots()