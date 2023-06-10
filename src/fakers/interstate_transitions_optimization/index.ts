import fs from 'fs';
import path from 'path';
import { stringify } from 'csv-stringify';

import { COUNTRIES } from './constants';

import { OUT_DIR_PATH } from '../constants';
import { checkOrCreateDir } from '../../utils';

const outDir = path.resolve(OUT_DIR_PATH, 'interstate_transitions');

function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateCapacity(countries: string[]): void {
  const outPath = path.resolve(outDir, 'capacity.csv');
  const columns = ['Capacity (kUnits/month)', 'Low', 'Hight'];

  const stringifier = stringify({ header: true, columns: columns });
  const writableStream = fs.createWriteStream(outPath);

  countries.forEach((country) => {
    stringifier.write([country, random(100, 1_000), random(1000, 2_000)]);
  });

  stringifier.pipe(writableStream);
}

function generateDemand(countries: string[]): void {
  const outPath = path.resolve(outDir, 'demand.csv');
  const columns = ['(Units/month)', 'Demand'];

  const stringifier = stringify({ header: true, columns: columns });
  const writableStream = fs.createWriteStream(outPath);

  countries.forEach((country) => {
    stringifier.write([country, random(100, 2_000_000)]);
  });

  stringifier.pipe(writableStream);
}

function generateFixedCost(countries: string[]): void {
  const outPath = path.resolve(outDir, 'fixed_cost.csv');
  const columns = ['Coutry', 'Low', 'Hight'];

  const stringifier = stringify({ header: true, columns: columns });
  const writableStream = fs.createWriteStream(outPath);

  countries.forEach((country) => {
    stringifier.write([country, random(100, 1_000), random(1000, 2_000)]);
  });

  stringifier.pipe(writableStream);
}

function generateFreightCosts(countries: string[]): void {
  const outPath = path.resolve(outDir, 'freight_costs.csv');
  const columns = ['Country', ...countries];

  const stringifier = stringify({ header: true, columns: columns });
  const writableStream = fs.createWriteStream(outPath);

  countries.forEach((country) => {
    stringifier.write([country, ...countries.map(() => random(0, 10_000))]);
  });

  stringifier.pipe(writableStream);
}

function generateTotalCosts(countries: string[]): void {
  const outPath = path.resolve(outDir, 'total_costs.csv');
  const columns = ['Country', ...countries];

  const stringifier = stringify({ header: true, columns: columns });
  const writableStream = fs.createWriteStream(outPath);

  countries.forEach((country) => {
    stringifier.write([country, ...countries.map(() => random(0, 100))]);
  });

  stringifier.pipe(writableStream);
}

function generateVariableCosts(countries: string[]): void {
  const outPath = path.resolve(outDir, 'variable_costs.csv');
  const columns = ['Variable Costs ($/Unit)', ...countries];

  const stringifier = stringify({ header: true, columns: columns });
  const writableStream = fs.createWriteStream(outPath);

  countries.forEach((country) => {
    stringifier.write([country, ...countries.map(() => random(0, 100))]);
  });

  stringifier.pipe(writableStream);
}

function saveCountriesToFile(countries: string[]): void {
  const outPath = path.resolve(outDir, 'countries.txt');
  fs.writeFileSync(outPath, countries.join(','));
}

/**
 * generate list scv files (sync) for interstate transitions
 * @param rows count contries for generate
 */
export function generateInterstateTransitions(rows: number): void {
  const readRows = rows < COUNTRIES.length ? rows : COUNTRIES.length - 1;
  const writeCoutries = COUNTRIES.slice(0, readRows);

  checkOrCreateDir(outDir);

  saveCountriesToFile(writeCoutries);

  generateCapacity(writeCoutries);
  generateDemand(writeCoutries);
  generateFixedCost(writeCoutries);
  generateFreightCosts(writeCoutries);
  generateTotalCosts(writeCoutries);
  generateVariableCosts(writeCoutries);
}
