 // Theme Toggle
 function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('light-mode')) {
        body.classList.remove('light-mode');
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
        body.classList.add('light-mode');
    }
    updateChartColors();
}

// Mood Chart
const ctx = document.getElementById('moodChart').getContext('2d');
let moodChart;

function createMoodChart() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const gridColor = isDarkMode ? '#374151' : '#E5E7EB';
    const textColor = isDarkMode ? '#F9FAFB' : '#1F2937';

    moodChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Mood Level',
                data: [8, 6, 7, 9, 8, 9, 8],
                borderColor: '#7C3AED',
                backgroundColor: 'rgba(124, 58, 237, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 10,
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor
                    }
                },
                x: {
                    grid: {
                        color: gridColor
                    },
                    ticks: {
                        color: textColor
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

function updateChartColors() {
    if (moodChart) {
        moodChart.destroy();
    }
    createMoodChart();
}

// Initialize chart
createMoodChart();

// Handle window resize
window.addEventListener('resize', () => {
    if (moodChart) {
        moodChart.resize();
    }
});