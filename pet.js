// WordPet - Pet Growth and Management System

// Pet management functions
const PetManager = {
    // Get current pet data
    getPet: function() {
        return data.petData; // Using data from data.js
    },
    
    // Update pet level and related stats
    updatePetLevel: function(newLevel) {
        data.petData.level = newLevel;
        // Update exp needed for next level
        data.petData.expToNextLevel = 100 + (newLevel * 50);
        
        // Save updated data
        data.DataUtil.saveData();
        
        // Trigger level up animation/feedback
        this.triggerLevelUpAnimation();
        
        return data.petData;
    },
    
    // Add experience to pet
    addExperience: function(expAmount) {
        data.petData.exp += expAmount;
        
        // Check if pet leveled up
        if (data.petData.exp >= data.petData.expToNextLevel) {
            // Calculate excess exp
            const excessExp = data.petData.exp - data.petData.expToNextLevel;
            
            // Level up
            data.petData.level += 1;
            data.petData.exp = excessExp;
            
            // Update exp requirement for next level
            data.petData.expToNextLevel = 100 + (data.petData.level * 50);
            
            // Trigger level up animation/feedback
            this.triggerLevelUpAnimation();
            
            // Update UI to reflect level up
            this.updatePetDisplay();
        }
        
        // Save updated data
        data.DataUtil.saveData();
        
        return data.petData;
    },
    
    // Handle offline pet growth calculations
    calculateOfflineGrowth: function() {
        // Calculate time since last update
        const lastUpdate = new Date(data.petData.lastGrowthUpdate);
        const now = new Date();
        const timeDiff = now.getTime() - lastUpdate.getTime(); // in milliseconds
        
        // Calculate hours passed
        const hoursPassed = timeDiff / (1000 * 60 * 60);
        
        // Calculate offline exp gain (per hour)
        const offlineExp = Math.floor(hoursPassed * data.petData.offlineExpGain);
        
        // Update pet with offline exp gain
        if (offlineExp > 0) {
            data.petData.exp += offlineExp;
            
            // Process potential level ups
            while (data.petData.exp >= data.petData.expToNextLevel) {
                data.petData.exp -= data.petData.expToNextLevel;
                data.petData.level += 1;
                data.petData.expToNextLevel = 100 + (data.petData.level * 50);
                
                // Trigger level up animation/feedback
                this.triggerLevelUpAnimation();
            }
            
            // Update the last growth update time
            data.petData.lastGrowthUpdate = now;
            
            // Save updated data
            data.DataUtil.saveData();
        }
        
        return {
            hoursPassed: hoursPassed,
            expGained: offlineExp,
            currentPet: data.petData
        };
    },
    
    // Unlock decoration for pet
    unlockDecoration: function(decorationId, name, unlockLevel) {
        // Check if decoration already exists
        const existingDec = data.petData.decorations.find(d => d.id === decorationId);
        if (existingDec) {
            return existingDec;
        }
        
        // Check if player has reached unlock level
        if (data.petData.level >= unlockLevel) {
            const newDecoration = {
                id: decorationId,
                name: name,
                unlockedAtLevel: unlockLevel
            };
            
            data.petData.decorations.push(newDecoration);
            
            // Save updated data
            data.DataUtil.saveData();
            
            // Update UI to show new decoration
            this.updatePetDisplay();
            
            return newDecoration;
        }
        
        return null; // Not unlocked yet
    },
    
    // Trigger visual animation for pet level up
    triggerLevelUpAnimation: function() {
        // Create a visual effect in the UI for level up
        const feedbackContainer = document.getElementById('feedback-container');
        if (feedbackContainer) {
            const levelUpMsg = document.createElement('div');
            levelUpMsg.className = 'feedback-message feedback-success';
            levelUpMsg.textContent = `🎉 Pet Leveled Up! Now level ${data.petData.level}! 🎉`;
            feedbackContainer.appendChild(levelUpMsg);
            
            // Auto-remove after 3 seconds
            setTimeout(() => {
                if (levelUpMsg.parentNode) {
                    levelUpMsg.parentNode.removeChild(levelUpMsg);
                }
            }, 3000);
        }
        
        // If animations are enabled in settings
        if (utils.appState.settings.enableAnimations) {
            // Add visual effects to pet avatar
            const petAvatar = document.querySelector('.pet-avatar');
            if (petAvatar) {
                // Add the level-up animation class
                petAvatar.classList.add('level-up');
                
                // Remove the class after animation completes to allow retriggering
                setTimeout(() => {
                    petAvatar.classList.remove('level-up');
                }, 600);
            }
        }
    },
    
    // Update pet display in UI
    updatePetDisplay: function() {
        const petDisplay = document.getElementById('pet-display');
        if (petDisplay) {
            // Determine pet emoji based on level
            let petEmoji = '🐶';
            if (data.petData.level >= 10) {
                petEmoji = '🐕‍🦺'; // Working dog for higher levels
            } else if (data.petData.level >= 5) {
                petEmoji = '🐩'; // Poodle for mid levels
            }
            
            // Update the pet display content
            petDisplay.innerHTML = `
                <div class="pet-avatar">${petEmoji}</div>
                <div class="pet-info">
                    <h3>Pet Level: ${data.petData.level}</h3>
                    <p>Experience: ${data.petData.exp}/${data.petData.expToNextLevel}</p>
                    <div class="pet-stats">
                        <div class="pet-stat"> decorations: ${data.petData.decorations.length}</div>
                        <div class="pet-stat"> exp: ${data.petData.exp}</div>
                        <div class="pet-stat"> next: ${data.petData.expToNextLevel}</div>
                    </div>
                </div>
            `;
        }
    },
    
    // Initialize pet system
    init: function() {
        // Calculate any offline growth since last session
        this.calculateOfflineGrowth();
        
        // Update the pet display
        this.updatePetDisplay();
    }
};

// If running in browser environment, attach to window
if (typeof window !== 'undefined') {
    window.PetManager = PetManager;
}

// Export for use in other modules (if using module system)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PetManager
    };
}