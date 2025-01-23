// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function setTheme(isDark) {
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Initialize theme from localStorage or system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    setTheme(savedTheme === 'dark');
} else {
    setTheme(prefersDarkScheme.matches);
}

themeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    setTheme(!isDark);
});

// Tags Functionality
const tagsInput = document.getElementById('entry-tags');
const tagsContainer = document.getElementById('tags-container');
let tags = [];

tagsInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        const tag = tagsInput.value.trim();
        if (tag && !tags.includes(tag)) {
            tags.push(tag);
            updateTags();
        }
        tagsInput.value = '';
    }
});

function updateTags() {
    tagsContainer.innerHTML = tags.map(tag => `
        <span class="tag">
            ${tag}
            <i class="fas fa-times" onclick="removeTag('${tag}')"></i>
        </span>
    `).join('');
}

function removeTag(tag) {
    tags = tags.filter(t => t !== tag);
    updateTags();
}

// Mood Selection Functionality
const moodOptions = document.querySelectorAll('.mood-option');
let selectedMood = '';

moodOptions.forEach(option => {
    option.addEventListener('click', () => {
        moodOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        selectedMood = option.dataset.mood;
    });
});

// Toast Notification
const toast = document.getElementById('toast');

function showToast(message, duration = 3000) {
    toast.querySelector('span').textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// AI Insights Preview
const editor = document.getElementById('entry-content');
const aiInsights = document.querySelector('.ai-insights p');
let typingTimer;

editor.addEventListener('input', () => {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
        const content = editor.value.trim();
        if (content.length > 50) {
            aiInsights.innerHTML = `
                <div style="color: var(--primary-color)">
                    <i class="fas fa-sparkles"></i> Analysis in progress...
                    <br>
                    <small>Detecting patterns and providing personalized insights based on your entry.</small>
                </div>
            `;
        }
    }, 1000);
});

// Form Handling and Local Storage
const journalForm = document.getElementById('journalForm');
const titleInput = document.getElementById('entry-title');
const saveDraftBtn = document.getElementById('saveDraft');

// Load draft from localStorage
function loadDraft() {
    const draft = localStorage.getItem('journalDraft');
    if (draft) {
        const draftData = JSON.parse(draft);
        titleInput.value = draftData.title || '';
        editor.value = draftData.content || '';
        tags = draftData.tags || [];
        updateTags();
        if (draftData.mood) {
            const moodOption = document.querySelector(`[data-mood="${draftData.mood}"]`);
            if (moodOption) {
                moodOption.click();
            }
        }
    }
}

// Save draft to localStorage
function saveDraft() {
    const draftData = {
        title: titleInput.value,
        content: editor.value,
        mood: selectedMood,
        tags: tags,
        lastSaved: new Date().toISOString()
    };
    localStorage.setItem('journalDraft', JSON.stringify(draftData));
    showToast('Draft saved successfully!');
}

// Save completed entry
function saveEntry(isDraft = false) {
    const entry = {
        id: Date.now(),
        title: titleInput.value,
        content: editor.value,
        mood: selectedMood,
        tags: tags,
        timestamp: new Date().toISOString(),
        isDraft
    };

    // Get existing entries or initialize empty array
    const entries = JSON.parse(localStorage.getItem('journalEntries') || '[]');
    entries.push(entry);
    localStorage.setItem('journalEntries', JSON.stringify(entries));

    if (!isDraft) {
        localStorage.removeItem('journalDraft');
        showToast('Journal entry published successfully!');
        resetForm();
    }
}

function resetForm() {
    journalForm.reset();
    tags = [];
    updateTags();
    selectedMood = '';
    moodOptions.forEach(opt => opt.classList.remove('selected'));
    aiInsights.innerHTML = 'Start writing to receive personalized insights and patterns analysis...';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', loadDraft);

saveDraftBtn.addEventListener('click', () => {
    saveDraft();
});

journalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!selectedMood) {
        showToast('Please select a mood for your entry');
        return;
    }
    saveEntry(false);
});

// Auto-save draft every 30 seconds if there are changes
let lastSavedContent = '';
setInterval(() => {
    const currentContent = titleInput.value + editor.value + tags.join() + selectedMood;
    if (currentContent !== lastSavedContent) {
        saveDraft();
        lastSavedContent = currentContent;
        
    }
}, 30000);