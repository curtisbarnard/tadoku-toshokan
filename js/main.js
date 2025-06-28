// Main JavaScript file for Tadoku Toshokan website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the home page or load specific story based on URL
    const urlParams = new URLSearchParams(window.location.search);
    const storyId = urlParams.get('id');
    
    if (storyId) {
        // Story page - load the specific story
        loadStory(storyId);
    } else {
        // Home page - load the story list
        displayStoryList('all');
        setupLevelFilters();
    }
});

// Function to display the list of stories filtered by level
function displayStoryList(level) {
    const stories = getStoriesByLevel(level);
    const storyListElement = document.getElementById('story-list');
    
    storyListElement.innerHTML = '';
    
    if (stories.length === 0) {
        storyListElement.innerHTML = '<p class="no-stories">No stories found for this level.</p>';
        return;
    }
    
    stories.forEach(story => {
        const storyCard = createStoryCard(story);
        storyListElement.appendChild(storyCard);
    });
}

// Function to create a story card element
function createStoryCard(story) {
    const card = document.createElement('div');
    card.className = 'story-card';
    
    const descriptionText = story.descriptionEn || story.description;
    
    card.innerHTML = `
        <a href="story.html?id=${story.id}">
            <img src="${story.coverImage}" alt="${story.title}">
            <div class="story-card-content">
                <span class="story-level">Level ${story.level}</span>
                <h2>${story.title}</h2>
                <p class="story-author">${story.author}</p>
                <p>${descriptionText}</p>
            </div>
        </a>
    `;
    
    return card;
}

// Function to setup level filter buttons
function setupLevelFilters() {
    const levelButtons = document.querySelectorAll('.level-btn');
    
    levelButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active button state
            levelButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Display stories for the selected level
            const level = this.getAttribute('data-level');
            displayStoryList(level);
        });
    });
}

// Function to load a specific story
function loadStory(storyId) {
    // Get the story data
    const story = STORIES_BY_ID[storyId];
    
    if (!story) {
        document.body.innerHTML = '<div class="error-message"><h1>Story not found</h1><p>The requested story could not be found.</p><a href="index.html">Back to Home</a></div>';
        return;
    }
    
    // Load the story content from template.html
    fetch('template/story-template.html')
        .then(response => response.text())
        .then(template => {
            // Replace placeholders with actual story data
            template = template.replace('{{TITLE}}', story.title);
            template = template.replace('{{TITLE_EN}}', story.titleEn ? ` (${story.titleEn})` : '');
            template = template.replace('{{AUTHOR}}', story.author);
            template = template.replace('{{AUTHOR_EN}}', story.authorEn ? ` (${story.authorEn})` : '');
            
            document.body.innerHTML = template;
            
            // Now load the story content
            loadStoryContent(story);
        })
        .catch(error => {
            console.error('Error loading story template:', error);
            document.body.innerHTML = '<div class="error-message"><h1>Error</h1><p>Could not load the story template.</p><a href="index.html">Back to Home</a></div>';
        });
}

// Function to load story content
function loadStoryContent(story) {
    const storyContentElement = document.getElementById('story-content');
    
    if (!storyContentElement) {
        console.error('Story content element not found');
        return;
    }
    
    // Clear previous content
    storyContentElement.innerHTML = '';
    
    // Load story markdown and convert to HTML
    fetch(`${story.folderPath}/${story.id}.md`)
        .then(response => {
            if (!response.ok) {
                // If the file doesn't exist with the ID name, try the folder name
                const folderName = story.folderPath.split('/').pop();
                return fetch(`${story.folderPath}/${folderName}.md`);
            }
            return response;
        })
        .then(response => response.text())
        .then(markdownContent => {
            // Simple parsing of markdown to HTML
            const contentHtml = parseStoryMarkdown(markdownContent, story);
            storyContentElement.innerHTML = contentHtml;
        })
        .catch(error => {
            console.error('Error loading story content:', error);
            storyContentElement.innerHTML = '<p class="error">Failed to load story content.</p>';
        });
}

// Function to parse markdown to HTML with image handling
function parseStoryMarkdown(markdown, story) {
    // Split the content into sections based on numerical markers (01, 02, etc.)
    const sections = markdown.split(/\n\d{2}\n/).slice(1); // Skip first part (title)
    
    let html = '';
    
    // Process each section
    sections.forEach((section, index) => {
        const sectionNumber = (index + 1).toString().padStart(2, '0');
        
        // Add section header
        html += `<div class="story-section" id="section-${sectionNumber}">`;
        
        // Add the image for this section
        // Determine image filename format (could be 01.png, 01A.png, etc.)
        const imagePath = `${story.folderPath}/${sectionNumber}.png`;
        const imageAPath = `${story.folderPath}/${sectionNumber}A.png`;
        const imageBPath = `${story.folderPath}/${sectionNumber}B.png`;
        
        // Check if specific image exists, otherwise use regular format
        if (fileExists(imageAPath)) {
            html += `<div class="story-image">
                <img src="${imageAPath}" alt="Page ${sectionNumber}A">
            </div>`;
            
            if (fileExists(imageBPath)) {
                html += `<div class="story-image">
                    <img src="${imageBPath}" alt="Page ${sectionNumber}B">
                </div>`;
            }
        } else {
            html += `<div class="story-image">
                <img src="${imagePath}" alt="Page ${sectionNumber}">
            </div>`;
        }
        
        // Add the text content
        html += `<div class="story-paragraph">${section.trim().replace(/\n/g, '<br>')}</div>`;
        
        html += `</div>`;
    });
    
    return html;
}

// Helper function to check if a file exists (simplified version for client-side)
// Note: This is a simplified version that doesn't actually check if the file exists
// In a real implementation, you might want to use a server-side check or pre-build a manifest
function fileExists(filePath) {
    // This is a simplification. In reality, we can't reliably check if a file exists client-side
    // We're assuming the file structure follows the expected pattern
    return true;
}
