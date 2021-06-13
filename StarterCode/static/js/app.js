var sample_data = "samples.json"

function buildPlots() {d3.json(sample_data).then(function(data){
    console.log(data);
    var values = data.samples.sample_values(0,10)
    var otu_ids = data.samples.otu_ids(0,10)
    var otu_labels = data. sample_data.otu_labels(0,10)

    var data = [{
        type: "bar",
        x: otu_ids,
        y: values,
        orientation: "h"
    }]

    var layout = [{
        
    }]
    })
}
