const ctx = document.getElementById('chart');

const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Sat','Sun','Mon','Tue','Wed','Thu','Fri'],
    datasets: [{
      label: 'Sales',
      data: [12, 19, 14, 25, 22, 31, 38],
    }]
  }
});

const g = ctx.getContext('2d')
  .createLinearGradient(0, 0, 0, 300);
g.addColorStop(0, 'rgba(255,184,0,.5)');
g.addColorStop(1, 'rgba(255,184,0,0)');

Object.assign(chart.data.datasets[0], {
  borderColor: '#ffb800',
  backgroundColor: g,
  fill: true,
  tension: .4,
});
chart.options.plugins.legend.display = false;
chart.options.scales.x.grid.display = false;
chart.update();

document.querySelectorAll('[data-to]').forEach(el => {
  const to = +el.dataset.to;
  let n = 0;
  const step = () => {
    n += Math.ceil(to / 60);
    el.textContent = Math.min(n, to).toLocaleString();
    if (n < to) requestAnimationFrame(step);
  };
  step();
});
