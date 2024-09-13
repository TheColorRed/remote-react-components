import compress from 'compression';
import cors from 'cors';
import express from 'express';
import fs from 'fs/promises';
import path from 'path';

const app = express();

app.use(cors(), compress());

const getSources = async () => (await import('./sources.json', { assert: { type: 'json' } })).default;

async function sortSources(name) {
  const sources = await getSources();
  const tempSources = Object.assign([], sources).filter(source => source.name === name);
  tempSources.sort((a, b) => {
    const aVersion = a.version.split('.').map(v => parseInt(v));
    const bVersion = b.version.split('.').map(v => parseInt(v));
    for (let i = 0; i < aVersion.length; i++) {
      if (aVersion[i] < bVersion[i]) {
        return -1;
      } else if (aVersion[i] > bVersion[i]) {
        return 1;
      }
    }
    return 0;
  });
  return tempSources;
}

app.get('/find', async (req, res) => {
  const sources = await getSources();
  const { name, version } = req.query;

  let source = sources.find(source => source.name === name && source.version === version);
  // Find the newest version if no version is specified
  source ??= (await sortSources(name)).pop();

  if (!source) {
    res.status(404).send('Not found');
  } else {
    res.json(source);
  }
});

app.get('/react', async (req, res) => {
  fs.readFile('./node_modules/react/cjs/react.production.min.js', 'utf-8').then(contents => {
    res.header({ 'Content-Type': 'application/javascript' }).send(contents);
  });
});

app.get('*', async (req, res) => {
  const __dirname = path.dirname(new URL(import.meta.url).pathname);
  const filePath = path.join(__dirname, './dist', req.path);
  // check if file exists
  try {
    await fs.access(filePath, fs.constants.F_OK);
    const contents = await fs.readFile(filePath, 'utf-8');
    res
      .header({
        'Content-Type': 'application/javascript',
      })
      .send(contents);
  } catch (err) {
    res.status(404).send('Not found');
  }
  if (!res.headersSent) {
    console.log('404');
    res.status(404).send('Not found');
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
