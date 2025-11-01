

const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Function to convert snake_case to Title Case
const toTitleCase = (snakeCaseStr) => {
  return snakeCaseStr.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// Read the readme.md file to get the list of APIs
const readmeContent = fs.readFileSync('docs/api/v2/readme.md', 'utf-8');

// Extract the JSON part from the readme
const jsonStr = readmeContent.split('```json')[1].split('```')[0];
const apiEndpoints = JSON.parse(jsonStr);

// Create the docs directory if it doesn't exist
const docsDir = 'docs/api/v2';
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

// Iterate over the API endpoints and generate markdown files
const generateDocs = async () => {
  for (const [name, url] of Object.entries(apiEndpoints)) {
    try {
      // Fetch data from the base URL
      const baseResponse = await axios.get(url);
      const baseData = baseResponse.data;

      // Fetch data for the first item
      const firstItemUrl = baseData.results[0].url;
      const itemResponse = await axios.get(firstItemUrl);
      const itemData = itemResponse.data;

      // Create the markdown content
      const title = toTitleCase(name);
      const mdContent = `
# ${title}

[Description]
Endpoint: [${url}](${url})

\`\`\`json
${JSON.stringify(baseData, null, 2)}
\`\`\`

Endpoint: [${firstItemUrl}](${firstItemUrl})

\`\`\`json
${JSON.stringify(itemData, null, 2)}
\`\`\`
`;

      // Write the markdown file
      const filePath = path.join(docsDir, `${name}.md`);
      fs.writeFileSync(filePath, mdContent);

      console.log(`Successfully generated documentation for ${name}`);
    } catch (error) {
      console.error(`Failed to generate documentation for ${name}: ${error.message}`);
    }
  }

  console.log("Documentation generation complete.");
};

generateDocs();
