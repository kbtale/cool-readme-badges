import { fetchUserData, parseGithubData } from '../fetcher/index.js';
import { calculateTemporalBadges } from '../calculators/index.js';
import { renderSvg } from '../renderer/index.js';

async function run() {
  try {
    console.log('Running Action...');
  } catch (error) {
    console.error('Error running action:', error);
  }
}

run();
