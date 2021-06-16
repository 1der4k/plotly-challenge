var json = "samples.json"

function init() {
    d3.json(json).then(function(data) {
        var json_data = data
        console.log(json_data)
        
        var names = json_data.names
        // console.log(names)

        let dropdown = d3.select("#selDataset")

        names.forEach(function(name) {
            dropdown.append("option").attr("value",name).text(name)
        })     
        
        buildCharts(json_data)
        
        eventHandler()
    })    
}

function buildCharts(data) {
    var dropdown = d3.select("#selDataset");
    var sample_number = dropdown.property("value");
    // console.log(sample_number)
    
    // console.log(data)
    var metadata = data.metadata;
    // console.log(metadata)
    var samples = data.samples;
    // console.log(samples)
    
    // Build charts
    samples.forEach(function(sample) {
        if (sample.id === sample_number) {
            var otu_ids = sample.otu_ids;
            var sample_values = sample.sample_values;
            var otu_labels = sample.otu_labels;

            console.log(otu_ids);
            console.log(sample_values);
            console.log(otu_labels);

            // Build horizontal bar graph
            var trace1 = {
            type: "bar",
            x: sample_values.slice(0,10),
            y: otu_ids.slice(0,10),
            text: otu_labels.slice(0,10),
            orientation: "h"
            };

            var data1 = [trace1];

            var layout1 = {
                title: "Top 10 Bacteria Cultures Observed",
                width: 1000
            };

            Plotly.newPlot("bar",data1,layout1);

            // Build bubble chart
            var trace2 = {
                x: otu_ids,
                y: sample_values,
                mode: "markers",
                marker: {
                    color: otu_ids,
                    size: sample_values
                }
            };

            var data2 = [trace2];

            var layout2 = {
                title: "Bacteria Cultures Per Sample",
                height: 1000
            };

            Plotly.newPlot("bubble",data2,layout2);

            
        } 
    });

    // Build metadata chart
    var panel = d3.select("#sample-metadata");

    metadata.forEach(function(sample) {
        if (sample.id === +sample_number) {
            console.log(sample.id);
            
            for ([key,value] of Object.entries(sample)) {
            panel.append("p").text(`${key} : ${value}`);
            }
        }
    })
};    

function eventHandler() {
    var dropdown = d3.select("#selDataset");
    var sample_number = dropdown.property("value");
    
    dropdown.on("change",updateCharts(sample_number))
}

function resetData() {
    var Panel = d3.select("#sample-metadata");
    var bar = d3.select("#bar");
    var bubble = d3.select("#bubble");

    Panel.html("");
    bar.html("");
    bubble.html("");
}

function updateCharts(sample_number) {
    d3.json(json).then(function(data) {
        var json_data = data
    

    resetData()

    buildCharts(json_data)
    
    })
}

init()