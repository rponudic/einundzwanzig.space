const pug = require('pug')
const { mkdirSync, writeFileSync } = require('fs')
const { dirname, resolve } = require('path')

const config = require('../pug.config')
const site = require('../generated/site-data.json')
const episodes = require('../generated/episodes.json')
const spenden = require('../generated/spenden.json')
const participants = require('../generated/participants.json')
const team = require('../content/team.json')
const crew = require('../content/crew.json')
const meetups = require('../content/meetups.json')
const soundboard = require('../content/soundboard.json')

const renderPage = (template, out, data = {}) => {
  const file = resolve(__dirname, '..', `src/${template}.pug`)
  const options = Object.assign({}, config, { site }, data)
  const rendered = pug.renderFile(file, options)
  const dest = out === 'index' ? 'index.html' : `${out}/index.html`
  const dst = resolve(__dirname, '..', 'dist', dest)
  const dir = dirname(dst)

  mkdirSync(dir, { recursive: true })
  writeFileSync(dst, rendered)
}

renderPage('index', 'index', { navCurrent: 'index', currentEpisode: episodes[0] })
renderPage('podcast', 'podcast', { navCurrent: 'podcast', episodes: [...episodes] })
renderPage('team', 'team', { navCurrent: 'team', team, crew })
renderPage('meetups', 'meetups', { navCurrent: 'meetups', meetups })
renderPage('spenden', 'spenden', { navCurrent: 'spenden', spenden })
renderPage('media', 'media', { navCurrent: 'media' })
renderPage('soundboard', 'soundboard', { navCurrent: 'soundboard', soundboard })
renderPage('events', 'events', { navCurrent: 'events' })
renderPage('events/satoshis-bleibe-2022', 'events/satoshis-bleibe-2022', { navCurrent: 'events' })
renderPage('verein', 'verein', { navCurrent: 'verein' })

renderPage('category', 'podcast/news', { navCurrent: 'podcast', category: 'news', categoryName: 'News', episodes: episodes.filter(e => e.category === 'news') })
renderPage('category', 'podcast/interviews', { navCurrent: 'podcast', category: 'interview', categoryName: 'Interviews', episodes: episodes.filter(e => e.category === 'interview') })
renderPage('category', 'podcast/lesestunde', { navCurrent: 'podcast', category: 'lesestunde', categoryName: 'Lesestunde', episodes: episodes.filter(e => e.category === 'lesestunde') })
renderPage('category', 'podcast/der-weg', { navCurrent: 'podcast', category: 'der-weg', categoryName: 'Der Weg', episodes: episodes.filter(e => e.category === 'der-weg') })
renderPage('category', 'podcast/verschiedenes', { navCurrent: 'podcast', category: 'verschiedenes', categoryName: 'Verschiedenes', episodes: episodes.filter(e => e.category === 'verschiedenes') })
episodes.forEach(episode => renderPage('episode', `podcast/${episode.slug}`, { navCurrent: 'podcast', episode, participants }))
