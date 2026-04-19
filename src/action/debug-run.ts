import { run } from './index.js';
import * as core from '@actions/core';

/**
 * LOCAL DEBUG SCRPT
 * 
 * This script allows you to run the Action locally to verify the data fetching
 * and SVG rendering without performing any Git commits or pushes.
 * 
 * USAGE:
 * GITHUB_TOKEN=your_token_here npx tsx src/action/debug-run.ts
 */

async function debug() {
  core.info('Starting local debug run...');

  // Set mandatory environment variables that @actions/core expects
  // Prefix is 'INPUT_' followed by the name in uppercase in action.yml
  if (!process.env.GITHUB_TOKEN) {
    core.error('Missing GITHUB_TOKEN environment variable.');
    process.exit(1);
  }

  process.env.INPUT_GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  process.env.DRY_RUN = 'true'; // Do not push to git
  
  // Optional: Set a specific username for testing
  // process.env.INPUT_USERNAME = 'octocat';

  try {
    await run();
    core.info('Debug run completed successfully.');
  } catch (error) {
    core.error('Debug run failed.');
  }
}

debug();
