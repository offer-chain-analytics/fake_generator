import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

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

