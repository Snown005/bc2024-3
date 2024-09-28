const { program } = require('commander');
const fs = require('fs');
const path = require('path');

program
    .requiredOption('-i, --input <path>', 'шлях до файлу для читання')
    .option('-o, --output <path>', 'шлях до файлу для запису результату')
    .option('-d, --display', 'вивести результат у консоль');

program.parse();
const options = program.opts();

if (!options.input) {
    console.error("Please, specify input file");
    process.exit(1);
}
if (!fs.existsSync(options.input)) {
    console.error("Cannot find input file");
    process.exit(1);
}
if (!options.output && !options.display) {
    process.exit(1);
}

fs.readFile(options.input, 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }

    if (options.output && options.display) {
        fs.writeFile(options.output, data, (err) => {
            if (err) {
                console.error(`Помилка при запису у файл: ${err.message}`);
                process.exit(1);
            }
            console.log(`Результат збережено у файл: ${options.output}`);
            console.log(data); 
        });
    } else {
        if (options.output) {
            fs.writeFile(options.output, data, (err) => {
                if (err) {
                    console.error(`Помилка при запису у файл: ${err.message}`);
                    process.exit(1);
                }
                console.log(`Результат збережено у файл: ${options.output}`);
            });
        }
        if (options.display) {
            console.log(data);
        }
    }
});

