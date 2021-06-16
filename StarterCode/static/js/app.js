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
        
        // eventHandler()
    })    
}

function buildCharts(data) {
    var dropdown = d3.select("#selDataset");
    var sample_number = dropdown.property("value")
    // console.log(sample_number)
    
    // console.log(data)
    var metadata = data.metadata
    // console.log(metadata)
    var samples = data.samples
    // console.log(samples)
    
    samples.forEach(function(sample) {
        if (sample.id === sample_number) {
            var otu_ids = sample.otu_ids;
            var sample_values = sample.sample_values;
            var otu_labels = sample.otu_labels;

            console.log(otu_ids)
            console.log(sample_values)
            console.log(otu_labels)
        }
        
        // Build horizontal bar graph
    var trace1 = {
        type: "bar",
        x: sample_values.slice(0,10),
        y: otu_ids.slice(0,10),
        text: otu_labels,
        orientation: "h"
    }

    var data1 = [trace1]

    var layout1 = {
        title: "Top 10 Bacteria Cultures Observed"
    }

    Plotly.newPlot("bar",data1,layout1)

    // Build bubble chart
    var trace2 = {
        x: otu_ids,
        y: sample_values,
        mode: "markers",
        marker: {
            size: sample_values
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

    // console.log(default_sample)
    
    for ([key,value] of Object.entries(default_sample)) {
        panel.append("p").text(`${key} : ${value}`)
    }
    })

    // var values = samples.map(sample => sample.sample_values)
    // // console.log(values)
    // var value = values[0]
    // // console.log(value)

    // var labels = samples.map(sample => sample.otu_ids)
    // // console.log(labels)
    // var label = labels[0]

    // var hovertexts = samples.map(sample => sample.otu_labels)
    // // console.log(hovertexts)
    // var hovertext = hovertexts[0]
    
    
}
           

// function eventHandler() {
//     d3.event.preventDefault();

//     var dropdown = d3.select("#selDataset");
//     var subject = dropdown("value")
//     dropdown.on("change",updateCharts)
// }

// function resetData() {
//     var demographicsPanel = d3.select("#sample-metadata");
//     var barChart = d3.select("#bar");
//     var bubbleChart = d3.select("#bubble");

//     demographicsPanel.html("");
//     barChart.html("");
//     bubbleChart.html("");
// }

// function updateCharts() {

//     resetData()

//     var dropdown = d3.select("#selDataset");
//     var dp_value = dropdown.property("value");
//     // console.log(dp_value);

//     d3.json(json).then(function(data) {
//         var json_data = data
        
//         var metadata = data.metadata
//         // console.log(metadata)
        
//         var samples = data.samples
//         // console.log(samples)
        
//         var values = samples.map(sample => sample.sample_values)
//         // console.log(values)
//         // var value = values[0]
//         // console.log(value)

//         var labels = samples.map(sample => sample.otu_ids)
//         // console.log(labels)
//         // var label = labels[0]

//         var hovertexts = samples.map(sample => sample.otu_labels)
//         // console.log(hovertexts)
//         // var hovertext = hovertexts[0]

//         var names = json_data.names
//         var names_indices = names.map((item,index) => [index,item])
//         // console.log(names_indices)
        
//         names_indices.forEach(function(item){
//             // console.log(item)
//             if (dp_value === item[1]) {
//                 var subject = item[0]
//                 console.log(subject)


//             }   
//         })
//     })
// }

// // d3.json(json).then(function(data){
// //     var json_data = data
// //     var names = json_data.names
// //     var names_indices = []
// //     names.forEach(function(item,index) {
// //         console.log(index,item)
// //         // names_indices.push(index)
// //         // console.log(names_indices)
// //     })
// // })

init()