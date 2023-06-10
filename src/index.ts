import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

import { generateInterstateTransitions } from './fakers/interstate_transitions_optimization';

const argsParse =
  yargs(hideBin(process.argv))
    .option('service', {
      alias: 'ss',
      type: 'string',
      description: 'service for rendering fake data',
      default: '',
    })
    .option('size', {
      alias: 'sz',
      type: 'number',
      description: 'how render rows',
      default: 10
    })
    .parseSync();

if (!argsParse.service) {
  console.error('Service name is required!');
  process.exit(-1);
}

switch(argsParse.service) {
  case 'interstateTransitions': {
    generateInterstateTransitions(argsParse.size);
    break;
  }
}
