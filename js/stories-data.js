// This file contains metadata for all stories
// Format:
// id: unique identifier for the story
// title: title of the story in Japanese
// level: difficulty level (1-4)
// author: author name
// authorEn: English version of author name (if applicable)
// folderPath: path to the story folder
// coverImage: path to the cover image
// description: short description of the story
// pageCount: number of pages/sections in the story

const STORIES = [
    {
        id: "001",
        title: "蛙",
        level: 3,
        author: "芥川龍之介",
        authorEn: "Ryunosuke Akutagawa",
        folderPath: "stories/3/001",
        coverImage: "stories/3/001/00.png",
        description: "芥川龍之介による短編小説。蛙たちが自分たちの世界観について議論する寓話。",
        descriptionEn: "A short story by Ryunosuke Akutagawa. A fable about frogs discussing their worldview.",
        pageCount: 14,
        publishDate: "1927",
        licenseLink: "https://creativecommons.org/licenses/by-nc-nd/4.0/",
        sourceLink: "https://tadoku.org/japanese/book/43312"
    }
    // Add more stories here as they are added to the collection
];

// Object to easily access stories by ID
const STORIES_BY_ID = STORIES.reduce((acc, story) => {
    acc[story.id] = story;
    return acc;
}, {});

// Function to get stories filtered by level
function getStoriesByLevel(level) {
    if (level === 'all') {
        return STORIES;
    }
    return STORIES.filter(story => story.level === parseInt(level));
}
