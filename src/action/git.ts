import * as exec from '@actions/exec';
import * as core from '@actions/core';

/**
 * Automates the git commit and push process for a specific file.
 * Includes a check to make sure to only commit if the file has changed.
 */
export async function commitAndPush(filePath: string, message: string) {
  try {
    core.info('Configuring git bot identity...');
    await exec.exec('git', ['config', 'user.name', 'github-actions[bot]']);
    await exec.exec('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com']);

    core.info(`Staging ${filePath}...`);
    await exec.exec('git', ['add', filePath]);

    // Check if there are any staged changes
    let statusOutput = '';
    const options = {
      listeners: {
        stdout: (data: Buffer) => {
          statusOutput += data.toString();
        },
      },
      silent: true,
    };

    await exec.exec('git', ['status', '--porcelain'], options);

    if (statusOutput.trim() === '') {
      core.info('No changes detected in the badge SVG. Skipping commit/push.');
      return;
    }

    core.info('Changes detected. Committing and pushing...');
    await exec.exec('git', ['commit', '-m', message]);
    await exec.exec('git', ['push']);
    
    core.info('Successfully updated badges in repository.');
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(`Git automation failed: ${error.message}`);
    }
    throw error;
  }
}
