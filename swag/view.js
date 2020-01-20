var chart = Highcharts.chart('chart-container', { // Build the chart.
    //colors: ['#660000', '#DDAABB', '#D02129'],
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'column'
    },
    xAxis: {
        categories: ['Swag 1', 'Swag 2', 'Swag 3', 'Swag 4', 'Swag 5', 'Swag 6', 'Swag 7', 'Swag 8', 'Swag 9', 'Swag 10', 'Swag 11', 'Swag 12']
    },
    yAxis: {
        title: {
            text: 'Votes For Swag'
        },
    },
    title: {
        text: 'What\'s your favorite swag?'
    },
    tooltip: {
        pointFormat: '<b>{point.percentage:.1f}% - {point.y} Vote(s)</b>'
    },
    plotOptions: {
        column: {
            pointPadding: 0,
            borderWidth: 1,
            groupPadding: 0,
            shadow: false,
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    subtitle: {
        text: '*** Refreshing page will reset voting.',
        floating: true,
        align: 'left',
        x: 80,
        verticalAlign: 'bottom',
        y: 27
    },
    legend: {
        enabled: false
    },
    series: [{
        name: 'Swag',
        colorByPoint: true,
        dataLabels: {
                enabled: true
        },
        data: [{
            name: 'Swag 1',
            y: 0
        }, {
            name: 'Swag 2',
            y: 0
        }, {
            name: 'Swag 3',
            y: 0
        }, {
            name: 'Swag 4',
            y: 0
        }, {
            name: 'Swag 5',
            y: 0
        }, {
            name: 'Swag 6',
            y: 0
        }, {
            name: 'Swag 7',
            y: 0
        }, {
            name: 'Swag 8',
            y: 0
        }, {
            name: 'Swag 9',
            y: 0
        }, {
            name: 'Swag 10',
            y: 0
        }, {
            name: 'Swag 11',
            y: 0
        }, {
            name: 'Swag 12',
            y: 0
        }]
    }]
});

var voteChannel = "swag_votes"; // Channel for counting votes.

pubnub = new PubNub({ // Your PubNub keys here. Get them from https://dashboard.pubnub.com.
  publishKey : 'pub-c-5674176f-9af4-4ce4-b047-e2b0e1b5e8f2',
  subscribeKey : 'sub-c-5c77313a-3b30-11ea-9443-9e82b35d3d47'
});

pubnub.addListener({
    message: function(vote) {
        var chartData = chart.series[0].data[vote.message];
        chartData.update(chartData.y + 1); // Add vote.
    },
});

pubnub.subscribe({
    channels: [voteChannel] // Listen for votes.
});