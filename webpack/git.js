const chalk = require('chalk');
const inquirer = require('inquirer');
const path = require('path');
const config = require('./webpack.config.js');


inquirer.prompt([{
  type: 'list',
  name: 'git',
  message: `提交到远程仓库`,
  choices: [
    { name: 'exam', value: 'exam' },
    { name: 'dist', value: 'dist' },
  ],
  default: true
}]).then(e => {
  if (e['git'] == 'exam') {
    require('simple-git')()
      .pull((err, update) => {
        require('simple-git')().add('./*').commit("updata!").push(['-u', 'origin', 'master'], () => {
          process.stderr.write(chalk.blueBright.bold(`\n  git push success \n`));
        });
      });
  }
  else if (e['git'] == 'dist') {
    require('simple-git')(path.join(config.root, 'dist')).add('./*').commit("updata!").push(['-u', 'origin', 'master'], () => {
      process.stderr.write(chalk.blueBright.bold(`\n  git push success \n`));
    });
  }
  else if (e['git'] == 'product') {

  }

})