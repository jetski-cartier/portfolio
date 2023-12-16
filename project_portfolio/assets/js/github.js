// Function to fetch GitHub activity
async function fetchGitHubActivity(username) {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/events`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching GitHub activity:", error);
        return null;
    }
}

// Function to display GitHub activity
function displayGitHubActivity(activity) {
    const githubActivityElement = document.getElementById('github-activity');

    if (!activity || activity.length === 0) {
        githubActivityElement.innerHTML = "<p>No recent activity found.</p>";
        return;
    }

    const activityList = activity.map(event => {
        const eventType = event.type;
        const eventDate = new Date(event.created_at).toLocaleDateString();
        let eventContent = "";

        if (eventType === "PushEvent") {
            // Display commits in case of PushEvent
            const commits = event.payload.commits.map(commit => {
                return `<li>${commit.message}</li>`;
            }).join('');

            eventContent = `<strong>${eventDate} - Push Event:</strong><ul>${commits}</ul>`;
        } else if (eventType === "PullRequestEvent") {
            // Display pull request info in case of PullRequestEvent
            const pullRequest = event.payload.pull_request;
            eventContent = `<strong>${eventDate} - Pull Request:</strong><p>${pullRequest.title}</p>`;
        }

        return `<div>${eventContent}</div>`;
    }).join('');

    githubActivityElement.innerHTML = activityList;
}

// Fetch and display GitHub activity for a specific username
const username = 'jetski-cartier'; // 
fetchGitHubActivity(username)
    .then(activity => {
        displayGitHubActivity(activity);
    });
