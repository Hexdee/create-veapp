#! /usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs");
const { exec } = require("child_process");

const CHOICES = fs.readdirSync(`${__dirname}/templates`);
const CURR_DIR = process.cwd();

const QUESTIONS = [
    {
        name: "Frontend-choice",
        type: "list",
        message: "Which framework would you like to use?",
        choices: CHOICES
    },
    {
        name: "project-name",
        type: "input",
        message: "Project name:",
        validate: function(input) {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
            else
                return "Project name may only include letters, numbers, underscores and hashes.";
        }
    }
];

inquirer.prompt(QUESTIONS).then(answers => {
    console.log(answers);
    const frontendChoice = answers["Frontend-choice"];
    const projectName = answers["project-name"];
    const templatePath = `${__dirname}/templates/${frontendChoice}`;

    fs.mkdirSync(`${CURR_DIR}/${projectName}`);

    createDirectoryContents(templatePath, projectName);
    /*console.log("Installing dependencies...");
    console.log("This might take a few minutes");
    console.log("Installing Frontend dependencies...");
    exec(`cd ${projectName} && npm install`, (err, stdout, stderr) => {
      if (err) {
        console.log(`error: ${err.message}`);
        return;
      }
      if (stderr) {
        //console.log(`stderr: ${stderr}`);
	return;
      }
      //console.log(`stdout: ${stdout}`);
      console.log("Installing hardhat dependecies...")
    })
      exec(`cd ${projectName} && cd contract && npm install`, (err, stdout, stderr) => {
        if (err) {
          console.log(`error: ${err.message}`);
          return;
        }
        if (stderr) {
          //console.log(`stderr: ${stderr}`);
          return;
        }
        //console.log(`stdout: ${stdout}`);
        console.log(`New project successfully created at ${projectName}!`);
      });*/
});

function createDirectoryContents(templatePath, newProjectPath) {
    const filesToCreate = fs.readdirSync(templatePath);

    filesToCreate.forEach(file => {
        const origFilePath = `${templatePath}/${file}`;

        // get stats about the current file
        const stats = fs.statSync(origFilePath);

        if (stats.isFile()) {
			const contents = fs.readFileSync(origFilePath, "utf8");
			// rename fallback for npm ignore.

			if (file === '.npmignore') file = '.gitignore'; 

            const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
            fs.writeFileSync(writePath, contents, "utf8");
        } else if (stats.isDirectory()) {
            fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

            // recursive call
            createDirectoryContents(
                `${templatePath}/${file}`,
                `${newProjectPath}/${file}`
            );
        }
    });
}
