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
    console.clear();
    console.log('\nCreated a new', '\x1b[36m', frontendChoice, '\x1b[0m', 
        'Dapp in', '\x1b[32m', `${__dirname}/${projectName}`, '\x1b[0m', "\n");
    console.log('\x1b[36m', `cd ${projectName}\n\n npm install\n npm start\n`, '\x1b[0m');
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
