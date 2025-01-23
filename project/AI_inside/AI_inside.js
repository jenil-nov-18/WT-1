// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.dataset.theme;
    body.dataset.theme = currentTheme === 'dark' ? 'light' : 'dark';
    updateChartTheme();
}

// Mood Data Processing
const moodData = {
    dates: Array.from({length: 30}, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    values: Array.from({length: 30}, () => Math.floor(Math.random() * 4) + 6),
    emotions: Array.from({length: 30}, () => 
        ['Happy', 'Calm', 'Energetic', 'Focused', 'Relaxed'][Math.floor(Math.random() * 5)]
    )
};

// Mood Chart
let moodChart;
function createMoodChart() {
    const ctx = document.getElementById('moodChart').getContext('2d');
    moodChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: moodData.dates,
            datasets: [{
                label: 'Mood Score',
                data: moodData.values,
                borderColor: '#60a5fa',
                backgroundColor: 'rgba(96, 165, 250, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        afterLabel: function(context) {
                            return `Emotion: ${moodData.emotions[context.dataIndex]}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 10,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function updateChartTheme() {
    if (!moodChart) return;
    const isDark = document.body.dataset.theme === 'dark';
    moodChart.options.scales.y.grid.color = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
    moodChart.update();
}

// Word Cloud
const words = [
    { text: 'Gratitude', weight: 28, sentiment: 'positive' },
    { text: 'Family', weight: 24, sentiment: 'positive' },
    { text: 'Work', weight: 22, sentiment: 'neutral' },
    { text: 'Exercise', weight: 20, sentiment: 'positive' },
    { text: 'Sleep', weight: 18, sentiment: 'neutral' },
    { text: 'Meditation', weight: 16, sentiment: 'positive' },
    { text: 'Goals', weight: 15, sentiment: 'positive' },
    { text: 'Stress', weight: 14, sentiment: 'negative' },
    { text: 'Reading', weight: 13, sentiment: 'positive' },
    { text: 'Nature', weight: 12, sentiment: 'positive' }
];

function createWordCloud() {
    const wordCloud = document.getElementById('wordCloud');
    wordCloud.innerHTML = '';
    
    words.forEach(word => {
        const span = document.createElement('span');
        span.textContent = word.text;
        
        // Set color based on sentiment
        let color;
        switch(word.sentiment) {
            case 'positive':
                color = '#22c55e';
                break;
            case 'negative':
                color = '#ef4444';
                break;
            default:
                color = '#3b82f6';
        }
        
        span.style.backgroundColor = color;
        span.style.fontSize = `${Math.max(0.8, word.weight / 10)}rem`;
        span.title = `Frequency: ${word.weight} entries`;
        
        wordCloud.appendChild(span);
    });
}

// Recommendations
const recommendations = [
    {
        title: 'Morning Routine Enhancement',
        text: 'Your mood scores are highest when you journal in the morning. Consider making this a daily habit.',
        icon: '🌅'
    },
    {
        

        title: 'Exercise Impact',
        text: 'There\'s a strong correlation between exercise and positive mood entries. Aim for 3-4 workout sessions per week.',
        icon: '💪'
    },
    {
        title: 'Sleep Quality Focus',
        text: 'Your mood tends to improve with better sleep. Try maintaining a consistent sleep schedule.',
        icon: '😴'
    },
    {
        title: 'Social Connections',
        text: 'Journal entries mentioning social activities show higher mood scores. Consider increasing social interactions.',
        icon: '🤝'
    }
];

function createRecommendations() {
    const recommendationsList = document.getElementById('recommendationsList');
    recommendationsList.innerHTML = '';
    
    recommendations.forEach(rec => {
        const div = document.createElement('div');
        div.className = 'recommendation-item';
        
        div.innerHTML = `
            <div class="recommendation-icon">${rec.icon}</div>
            <div class="recommendation-content">
                <div class="recommendation-title">${rec.title}</div>
                <div class="recommendation-text">${rec.text}</div>
            </div>
        `;
        
        recommendationsList.appendChild(div);
    });
}

// Data Analysis Functions
function analyzeMoodPatterns() {
    const moodValues = moodData.values;
    const average = moodValues.reduce((a, b) => a + b) / moodValues.length;
    const stability = calculateMoodStability(moodValues);
    const bestDay = findBestDay(moodValues);

    // Update stats card
    document.querySelector('.stat-value').textContent = average.toFixed(1);
    document.querySelectorAll('.stat-value')[1].textContent = bestDay;
    document.querySelectorAll('.stat-value')[2].textContent = `${(stability * 100).toFixed(0)}%`;
}

function calculateMoodStability(moodValues) {
    let variations = 0;
    for (let i = 1; i < moodValues.length; i++) {
        variations += Math.abs(moodValues[i] - moodValues[i-1]);
    }
    return 1 - (variations / (moodValues.length * 10));
}

function findBestDay(moodValues) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayAverages = Array(7).fill(0);
    const dayCounts = Array(7).fill(0);
    
    moodData.dates.forEach((date, index) => {
        const dayIndex = new Date(date).getDay();
        dayAverages[dayIndex] += moodValues[index];
        dayCounts[dayIndex]++;
    });
    
    const averages = dayAverages.map((sum, index) => 
        dayCounts[index] ? sum / dayCounts[index] : 0
    );
    
    const bestDayIndex = averages.indexOf(Math.max(...averages));
    return days[bestDayIndex];
}

// Initialization
function initializeDashboard() {
    createMoodChart();
    createWordCloud();
    createRecommendations();
    analyzeMoodPatterns();
    
    // Add event listeners for interactivity
    window.addEventListener('resize', () => {
        if (moodChart) {
            moodChart.resize();
        }
    });
    
    // Update theme-based styling
    updateChartTheme();
}

// Start the dashboard
document.addEventListener('DOMContentLoaded', initializeDashboard);
