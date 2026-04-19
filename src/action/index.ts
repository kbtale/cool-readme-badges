import * as core from '@actions/core';
import * as github from '@actions/github';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fetchUserData, parseGithubData } from '../fetcher/index.js';
import { calculateAllBadges } from '../calculators/index.js';
import { generateSVG } from '../renderer/index.js';
import { commitAndPush } from './git.js';

export async function run() {
  try {
    // get inputs
    const token = core.getInput('github_token', { required: true });
    const username = core.getInput('username') || github.context.repo.owner;
    const outputPath = core.getInput('output_path') || 'badges.svg';
    const theme = core.getInput('theme') || 'basic';
    const themeConfigJson = core.getInput('theme_config');

    let customTheme = undefined;
    if (themeConfigJson) {
      try {
        customTheme = JSON.parse(themeConfigJson);
      } catch (e) {
        core.warning(`Invalid theme_config JSON: ${themeConfigJson}. Using defaults.`);
      }
    }

    core.info(`Fetching data for ${username || 'repository owner'}...`);

    const rawData = await fetchUserData(token, username);
    const profile = parseGithubData(username, rawData);

    core.info('Calculating badges...');
    const earnedBadgeIds = calculateAllBadges(profile);

    core.info(`Rendering SVG with theme: ${theme}...`);
    const svg = generateSVG(earnedBadgeIds, theme, 'dark', customTheme);

    const absolutePath = path.resolve(outputPath);
    const dir = path.dirname(absolutePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(absolutePath, svg, 'utf-8');

    core.info(`Successfully saved badges to ${absolutePath}`);

    if (process.env.DRY_RUN === 'true') {
      core.info('DRY_RUN detected. Skipping git commit and push.');
    } else {
      await commitAndPush(outputPath, 'feat(badges): update badges.svg');
    }

    core.setOutput('svg_path', absolutePath);

  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed('An unknown error occurred while running the action.');
    }
  }
}

// Only run if this file is executed directly (not imported)
if (process.argv[1]?.endsWith('index.ts') || process.argv[1]?.endsWith('index.js')) {
  run();
}
