 // Theme Toggle
 const themeToggle = document.getElementById('themeToggle');
 const moonIcon = document.getElementById('moonIcon');
 const sunIcon = document.getElementById('sunIcon');
 
 function updateThemeIcons() {
     if (document.body.classList.contains('dark')) {
         moonIcon.classList.add('hidden');
         sunIcon.classList.remove('hidden');
     } else {
         sunIcon.classList.add('hidden');
         moonIcon.classList.remove('hidden');
     }
 }

 // Initialize theme
 if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
     document.body.classList.add('dark');
 }
 updateThemeIcons();

 themeToggle.addEventListener('click', () => {
     document.body.classList.toggle('dark');
     updateThemeIcons();
 });

 // Search functionality
 const searchInput = document.getElementById('searchTemplates');
 const templateCards = document.querySelectorAll('.template-card');

 searchInput.addEventListener('input', (e) => {
     const searchTerm = e.target.value.toLowerCase();
     
     templateCards.forEach(card => {
         const title = card.querySelector('h3').textContent.toLowerCase();
         const description = card.querySelector('p').textContent.toLowerCase();
         
         if (title.includes(searchTerm) || description.includes(searchTerm)) {
             card.style.display = 'block';
         } else {
             card.style.display = 'none';
         }
     });
 });

 // Difficulty filter
 const difficultyFilter = document.getElementById('difficultyFilter');

 difficultyFilter.addEventListener('change', (e) => {
     const selectedDifficulty = e.target.value;
     
     templateCards.forEach(card => {
         if (selectedDifficulty === 'all' || card.dataset.difficulty === selectedDifficulty) {
             card.style.display = 'block';
         } else {
             card.style.display = 'none';
         }
     });
 });

 // Category Filter
 const categoryPills = document.querySelectorAll('.category-pill');

 categoryPills.forEach(pill => {
     pill.addEventListener('click', () => {
         categoryPills.forEach(p => p.classList.remove('active'));
         pill.classList.add('active');
         
         const category = pill.dataset.category;
         
         templateCards.forEach(card => {
             if (category === 'all' || card.dataset.category === category) {
                 card.style.display = 'block';
             } else {
                 card.style.display = 'none';
             }
         });
     });
 });

 // Timer functionality
 let timerInterval;
 let timeLeft = 0;
 const timerContainer = document.getElementById('timerContainer');
 const timerDisplay = document.getElementById('timerDisplay');
 const startTimerBtn = document.getElementById('startTimer');
 const pauseTimerBtn = document.getElementById('pauseTimer');

 function formatTime(seconds) {
     const minutes = Math.floor(seconds / 60);
     const remainingSeconds = seconds % 60;
     return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
 }

 function startTimer(duration = 300) { // 5 minutes default
     timeLeft = duration;
     timerContainer.style.display = 'block';
     
     clearInterval(timerInterval);
     timerInterval = setInterval(() => {
         timeLeft--;
         timerDisplay.textContent = formatTime(timeLeft);
         
         if (timeLeft <= 0) {
             clearInterval(timerInterval);
             alert('Time\'s up! Consider wrapping up your entry.');
         }
     }, 1000);
 }

 startTimerBtn.addEventListener('click', () => startTimer());
 
 pauseTimerBtn.addEventListener('click', () => {
     if (timerInterval) {
         clearInterval(timerInterval);
         timerInterval = null;
         pauseTimerBtn.querySelector('svg').innerHTML = `
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
         `;
     } else {
         startTimer(timeLeft);
         pauseTimerBtn.querySelector('svg').innerHTML = `
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 9v6m4-6v6m-9-3a9 9 0 1118 0 9 9 0 01-18 0z"/>
         `;
     }
 });

 // Progress tracking
 const textareas = document.querySelectorAll('textarea');
 textareas.forEach(textarea => {
     textarea.addEventListener('input', () => {
         const container = textarea.closest('.template-content');
         const progressBar = container.querySelector('.completion-bar');
         const textLength = textarea.value.length;
         const progress = Math.min(Math.max(textLength / 100, 0), 1) * 100;
         progressBar.style.width = `${progress}%`;
     });
 });

 // Mood selection
 const moodOptions = document.querySelectorAll('.mood-option');
 moodOptions.forEach(option => {
     option.addEventListener('click', () => {
         moodOptions.forEach(opt => opt.classList.remove('ring-2', 'ring-indigo-500'));
         option.classList.add('ring-2', 'ring-indigo-500');
     });
 });

 // Save functionality
 document.getElementById('saveEntry').addEventListener('click', () => {
     // Here you would typically save the entry to your backend
     const selectedMood = document.querySelector('.mood-option.ring-2')?.textContent || 'Not specified';
     const activeTemplate = document.querySelector('.template-content.active');
     const entries = Array.from(activeTemplate.querySelectorAll('textarea')).map(ta => ta.value);
     
     console.log('Saving entry:', {
         mood: selectedMood,
         entries: entries,
         timestamp: new Date().toISOString()
     });

     // Show success message
     const successMessage = document.createElement('div');
     successMessage.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg slide-in';
     successMessage.textContent = 'Journal entry saved successfully!';
     document.body.appendChild(successMessage);

     setTimeout(() => {
         successMessage.remove();
         closeTemplate();
     }, 2000);
 });

 // Modal functionality
 const templateModal = document.getElementById('templateModal');
 const templateTitle = document.getElementById('templateTitle');
 
 function openTemplate(templateType) {
     templateModal.classList.remove('hidden');
     
     // Set title based on template type
     const titles = {
         gratitude: 'Daily Gratitude Journal',
         reflection: 'Evening Reflection',
         mindfulness: 'Present Moment Awareness',
         creativity: 'Creative Writing Exercise'
     };
     templateTitle.textContent = titles[templateType];
     
     // Hide all template contents
     document.querySelectorAll('.template-content').forEach(content => {
         content.classList.remove('active');
     });
     
     // Show selected template content
     const templateContent = document.getElementById(`${templateType}Template`);
     if (templateContent) {
         templateContent.classList.add('active');
     }
 }

 function closeTemplate() {
     templateModal.classList.add('hidden');
     clearInterval(timerInterval);
     timerContainer.style.display = 'none';
     
     // Reset all textareas and progress bars
     document.querySelectorAll('textarea').forEach(ta => ta.value = '');
     document.querySelectorAll('.completion-bar').forEach(bar => bar.style.width = '0%');
     
     // Reset mood selection
     // moodOptions.forEach(opt => opt.classList.remove('ring-2', 'ring-indigo-500'));
     //    }
     //    [Previous code remains the same until the end of closeTemplate function]
}
// Close modal when clicking outside
templateModal.addEventListener('click', (e) => {
if (e.target === templateModal) {
 closeTemplate();
}
});

// Favorites functionality
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

function toggleFavorite(templateId) {
const index = favorites.indexOf(templateId);
if (index === -1) {
 favorites.push(templateId);
} else {
 favorites.splice(index, 1);
}
localStorage.setItem('favorites', JSON.stringify(favorites));
updateFavoriteButtons();
}

function updateFavoriteButtons() {
document.querySelectorAll('.favorite-btn').forEach(btn => {
 const templateId = btn.dataset.templateId;
 if (favorites.includes(templateId)) {
     btn.classList.add('active');
 } else {
     btn.classList.remove('active');
 }
});
}

// Add favorite buttons to template cards
document.querySelectorAll('.template-card').forEach(card => {
const templateId = card.dataset.category;
const favoriteBtn = document.createElement('button');
favoriteBtn.className = 'favorite-btn absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700';
favoriteBtn.dataset.templateId = templateId;
favoriteBtn.innerHTML = `
 <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
 </svg>
`;
favoriteBtn.addEventListener('click', (e) => {
 e.stopPropagation();
 toggleFavorite(templateId);
});
card.appendChild(favoriteBtn);
});

// Initialize favorites
updateFavoriteButtons();

// Show only favorites when clicking Favorites button
document.getElementById('favoriteTemplates').addEventListener('click', function() {
const showingFavorites = this.classList.toggle('active');

templateCards.forEach(card => {
 const templateId = card.dataset.category;
 if (showingFavorites) {
     card.style.display = favorites.includes(templateId) ? 'block' : 'none';
 } else {
     card.style.display = 'block';
 }
});

// Update button appearance
this.classList.toggle('bg-indigo-100', showingFavorites);
this.classList.toggle('dark:bg-indigo-900', showingFavorites);
});

// Auto-save functionality
let autoSaveInterval;

function startAutoSave() {
autoSaveInterval = setInterval(() => {
 const activeTemplate = document.querySelector('.template-content.active');
 if (activeTemplate) {
     const entries = Array.from(activeTemplate.querySelectorAll('textarea')).map(ta => ta.value);
     if (entries.some(entry => entry.trim() !== '')) {
         localStorage.setItem('autosave', JSON.stringify({
             templateType: activeTemplate.id,
             entries: entries,
             timestamp: new Date().toISOString()
         }));
     }
 }
}, 30000); // Auto-save every 30 seconds
}

function stopAutoSave() {
clearInterval(autoSaveInterval);
}

// Restore auto-saved content if available
function restoreAutoSave() {
const savedContent = localStorage.getItem('autosave');
if (savedContent) {
 const { templateType, entries } = JSON.parse(savedContent);
 const template = document.getElementById(templateType);
 if (template) {
     const textareas = template.querySelectorAll('textarea');
     entries.forEach((entry, index) => {
         if (textareas[index]) {
             textareas[index].value = entry;
         }
     });
 }
}
}

// Handle template content changes
document.querySelectorAll('textarea').forEach(textarea => {
textarea.addEventListener('input', () => {
 const container = textarea.closest('.template-content');
 const progressBar = container.querySelector('.completion-bar');
 const textLength = textarea.value.length;
 const progress = Math.min(Math.max(textLength / 100, 0), 1) * 100;
 progressBar.style.width = `${progress}%`;
 
 // Show auto-save indicator
 const autoSaveIndicator = document.createElement('div');
 autoSaveIndicator.className = 'fixed bottom-4 left-4 text-sm text-gray-500 dark:text-gray-400';
 autoSaveIndicator.textContent = 'Saving...';
 document.body.appendChild(autoSaveIndicator);
 
 setTimeout(() => {
     autoSaveIndicator.remove();
 }, 1000);
});
});

// Export functionality
function exportEntry() {
const activeTemplate = document.querySelector('.template-content.active');
if (activeTemplate) {
 const entries = Array.from(activeTemplate.querySelectorAll('textarea')).map(ta => ta.value);
 const mood = document.querySelector('.mood-option.ring-2')?.textContent || 'Not specified';
 
 const exportData = {
     title: templateTitle.textContent,
     mood: mood,
     entries: entries,
     timestamp: new Date().toISOString()
 };

 const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
 const url = URL.createObjectURL(blob);
 const a = document.createElement('a');
 a.href = url;
 a.download = `journal-entry-${new Date().toISOString().slice(0, 10)}.json`;
 a.click();
 URL.revokeObjectURL(url);
}
}

// Add export button
const exportButton = document.createElement('button');
exportButton.className = 'px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg flex items-center gap-2';
exportButton.innerHTML = `
<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
</svg>
Export Entry
`;
exportButton.addEventListener('click', exportEntry);
document.querySelector('.mt-6').appendChild(exportButton);

// Initialize the page
updateThemeIcons();
updateFavoriteButtons();
startAutoSave();

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
stopAutoSave();
});