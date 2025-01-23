// const imageUpload = document.getElementById('imageUpload');
//         const profileImage = document.getElementById('profileImage');

//         imageUpload.addEventListener('change', function(e) {
//             const file = e.target.files[0];
//             if (file) {
//                 if (file.size > 5000000) { // 5MB limit
//                     alert('Please choose an image under 5MB');
//                     return;
//                 }

//                 const reader = new FileReader();
//                 reader.onload = function(e) {
//                     profileImage.src = e.target.result;
//                     localStorage.setItem('profileImage', e.target.result);
//                 }
//                 reader.readAsDataURL(file);
//             }
//         });

//         // Live preview updates
//         const previewName = document.getElementById('previewName');


//         const storage = {
//   save(key, value) {
//     try {
//       sessionStorage.setItem(key, JSON.stringify(value));
//       return true;
//     } catch (e) {
//       console.warn('Storage failed:', e);
//       return false;
//     }
//   },
  
//   get(key, defaultValue = null) {
//     try {
//       const item = sessionStorage.getItem(key);
//       return item ? JSON.parse(item) : defaultValue;
//     } catch (e) {
//       console.warn('Storage retrieval failed:', e);
//       return defaultValue;
//     }
//   }
// };

// // Save settings
// document.getElementById('saveSettings').addEventListener('click', () => {
//     const settings = {
//         name: document.getElementById('name').value,
//         email: document.getElementById('email').value,
//         bio: document.getElementById('bio').value,
//         journalReminder: document.getElementById('journalReminder').checked,
//         progressReports: document.getElementById('progressReports').checked,
//         moodReminder: document.getElementById('moodReminder').checked,
//         publicProfile: document.getElementById('publicProfile').checked,
//         shareStats: document.getElementById('shareStats').checked,
//         allowFeedback: document.getElementById('allowFeedback').checked
//     };

//     if (storage.save('userSettings', settings)) {
//         showSuccessMessage();
//     }
// });

// // Load settings
// function loadSettings() {
//     const savedSettings = storage.get('userSettings', {});
    
//     // Update form fields
//     document.getElementById('name').value = savedSettings.name || '';
//     document.getElementById('email').value = savedSettings.email || '';
//     document.getElementById('bio').value = savedSettings.bio || '';
    
//     // Update preview
//     updatePreview({
//         name: savedSettings.name,
//         email: savedSettings.email,
//         bio: savedSettings.bio
//     });
    
//     // Update checkboxes
//     const checkboxes = ['journalReminder', 'progressReports', 'moodReminder', 
//                        'publicProfile', 'shareStats', 'allowFeedback'];
    
//     checkboxes.forEach(id => {
//         document.getElementById(id).checked = savedSettings[id] || false;
//     });
// }

// const handleImageUpload = (file) => {
//     if (!file) return;
    
//     if (file.size > 5000000) { // 5MB limit
//         alert('Please choose an image under 5MB');
//         return;
//     }

//     const reader = new FileReader();
//     reader.onload = function(e) {
//         try {
//             document.getElementById('profileImage').src = e.target.result;
//             storage.save('profileImage', e.target.result);
//         } catch (error) {
//             console.warn('Image storage failed:', error);
//             // Still show the image even if storage fails
//             document.getElementById('profileImage').src = e.target.result;
//         }
//     };
//     reader.readAsDataURL(file);
// };

// // Add this to your existing image upload listener
// document.getElementById('imageUpload').addEventListener('change', (e) => {
//     handleImageUpload(e.target.files[0]);
// });

// const handleTheme = {
//     current: 'light',
    
//     toggle() {
//         this.current = this.current === 'light' ? 'dark' : 'light';
//         document.documentElement.setAttribute('data-theme', this.current);
//         try {
//             storage.save('theme', this.current);
//         } catch (e) {
//             console.warn('Theme storage failed:', e);
//         }
//     },
    
//     init() {
//         this.current = storage.get('theme', 'light');
//         document.documentElement.setAttribute('data-theme', this.current);
//     }
// };

// // Use it in your theme toggle
// document.getElementById('themeToggle').addEventListener('click', () => {
//     handleTheme.toggle();
// });

// function showSuccessMessage() {
//     const message = document.getElementById('successMessage');
//     message.classList.add('show');
//     setTimeout(() => {
//         message.classList.remove('show');
//     }, 3000);
// }

//------------------------------------

// // Sample users array stored in localStorage
// if (!localStorage.getItem('users')) {
//     const users = [
//         { name: 'John Doe', email: 'john@example.com', profileImage: 'default-profile.png' },
//         { name: 'Jane Smith', email: 'jane@example.com', profileImage: 'default-profile.png' }
//     ];
//     localStorage.setItem('users', JSON.stringify(users));
// }

// // Fetch users from localStorage
// const users = JSON.parse(localStorage.getItem('users')) || [];

// // Display the first user profile by default
// const profileImage = document.getElementById('profileImage');
// const nameInput = document.getElementById('name');
// const emailInput = document.getElementById('email');
// const successMessage = document.getElementById('successMessage');

// function loadDefaultProfile() {
//     if (users.length > 0) {
//         const user = users[0];
//         profileImage.src = user.profileImage || 'default-profile.png';
//         nameInput.value = user.name || '';
//         emailInput.value = user.email || '';
//     }
// }

// loadDefaultProfile();

// // Handle image upload
// const imageUpload = document.getElementById('imageUpload');
// imageUpload.addEventListener('change', function (e) {
//     const file = e.target.files[0];
//     if (file) {
//         if (file.size > 5000000) { // 5MB limit
//             alert('Please choose an image under 5MB');
//             return;
//         }

//         const reader = new FileReader();
//         reader.onload = function (e) {
//             profileImage.src = e.target.result;
//         };
//         reader.readAsDataURL(file);
//     }
// });

// // Save updated profile
// const saveProfileButton = document.getElementById('saveProfile');
// saveProfileButton.addEventListener('click', function () {
//     const updatedProfile = {
//         name: nameInput.value,
//         email: emailInput.value,
//         profileImage: profileImage.src
//     };

//     // Add updated profile to users array
//     users.push(updatedProfile);

//     // Save updated users array to localStorage
//     localStorage.setItem('users', JSON.stringify(users));

//     // Show success message
//     successMessage.style.display = 'block';
//     setTimeout(() => {
//         successMessage.style.display = 'none';
//     }, 3000);
// });
  


const storage = {
    save(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.warn('Storage failed:', e);
      }
    },
    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      } catch (e) {
        console.warn('Storage retrieval failed:', e);
        return defaultValue;
      }
    },
  };
  
  function handleImageUpload(file) {
    if (!file || file.size > 5000000) {
      alert('Please choose an image under 5MB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target.result;
      document.getElementById('profileImage').src = result;
      storage.save('profileImage', result);
    };
    reader.readAsDataURL(file);
  }
  
  function saveSettings() {
    const settings = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      bio: document.getElementById('bio').value,
      journalReminder: document.getElementById('journalReminder').checked,
      progressReports: document.getElementById('progressReports').checked,
      moodReminder: document.getElementById('moodReminder').checked,
      publicProfile: document.getElementById('publicProfile').checked,
      shareStats: document.getElementById('shareStats').checked,
      allowFeedback: document.getElementById('allowFeedback').checked,
    };
    storage.save('userSettings', settings);
    showSuccessMessage();
  }
  
  function loadSettings() {
    const settings = storage.get('userSettings', {});
    document.getElementById('name').value = settings.name || '';
    document.getElementById('email').value = settings.email || '';
    document.getElementById('bio').value = settings.bio || '';
    ['journalReminder', 'progressReports', 'moodReminder', 'publicProfile', 'shareStats', 'allowFeedback']
      .forEach((id) => {
        document.getElementById(id).checked = settings[id] || false;
      });
  }
  
  function initTheme() {
    const theme = storage.get('theme', 'light');
    document.documentElement.setAttribute('data-theme', theme);
  }
  
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', current);
    storage.save('theme', current);
  }
  
  function showSuccessMessage() {
    const message = document.getElementById('successMessage');
    message.classList.add('show');
    setTimeout(() => message.classList.remove('show'), 3000);
  }
  
  document.getElementById('imageUpload').addEventListener('change', (e) => handleImageUpload(e.target.files[0]));
  document.getElementById('saveSettings').addEventListener('click', saveSettings);
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  
  // Initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    initTheme();
    const savedImage = storage.get('profileImage');
    if (savedImage) document.getElementById('profileImage').src = savedImage;
  });
  