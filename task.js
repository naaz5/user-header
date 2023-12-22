const axios = require('axios');
const linkPreview = require('link-preview-js');
const { exec } = require('child_process'); 

async function fetchWithUserAgent(link) {
  try {
    const response = await axios.get(link, {
      headers:'Twitterbot'
    });

    const preview = await linkPreview.getLinkPreview(link);

    if (preview.url) {
      exec(`start ${preview.url}`, (err) => {
        if (err) {
          console.error('Error opening the URL:', err);
        }
      });
    } else {
      console.error('No URL found in the link preview data.');
    }

    return preview;
  } catch (error) {
    console.error('Error fetching link preview:', error.message);
    return null;
  }
}

const linkToPreview = 'https://medium.com/@dr-bartosz-jaworski';

fetchWithUserAgent(linkToPreview);
