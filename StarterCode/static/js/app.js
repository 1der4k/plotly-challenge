var sample_data = "samples.json"

function unpack(rows,index) {
    return rows.map(function(row) {
        return row[index];
    });
}

d3.json(sample_data)
        .then(function(data) {
            console.log(data)
            var metadata = data.metadata
            console.log(metadata)
            var names = data.names
            console.log(names)
            var samples = data.samples
            console.log(samples)

            var values = samples.map(sample => sample.sample_values)
            console.log(values)
            var labels = samples.map(sample => sample.otu_ids)
            console.log(labels)
            var hovertext = samples.map(sample => sample.otu_labels)
            console.log(hovertext)
})

