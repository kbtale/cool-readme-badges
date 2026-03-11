import { fetchUserData } from '../fetcher/index.js';
import { calculateBadges } from '../calculators/index.js';
import { renderSvg } from '../renderer/index.js';

async function run() {
  try {
    console.log('Running Action...');
  } catch (error) {
    console.error('Error running action:', error);
  }
}

run();
