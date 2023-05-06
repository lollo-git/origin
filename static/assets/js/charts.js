// Data retrieved from https://www.yr.no/


var ctx = document.getElementById('mChart').getContext('2d');
const data = [{x: 'Jan', net: 100, cogs: 50, gm: 50}, {x: 'Feb', net: 120, cogs: 55, gm: 75}];
const cfg = new Chart( ctx, {
  type: 'bar',
  data: {
    labels: [{{label|safe}}],
    datasets: [{
      label: 'Net sales',
      data: data,
      parsing: {
        yAxisKey: 'net'
      }
    }, {
      label: 'Cost of buys',
      data: data,
      parsing: {
        yAxisKey: 'cogs'
      }
    }, {
      label: 'Gross margin',
      data: [],
      parsing: {
        yAxisKey: 'gm'
      }
    }]
  },
});


