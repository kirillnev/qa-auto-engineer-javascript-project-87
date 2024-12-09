#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';
import parseFile from '../src/utils/fileParser.js';
import getFormatter from "../src/formatters/index.js";

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0');

program
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, options) => {
    const data1 = parseFile(filepath1);
    const data2 = parseFile(filepath2);
    const formatFunction = getFormatter(options.format);
    const diff = genDiff(data1, data2, formatFunction);
    console.log(diff);
  });

program.parse();
