import paths from './paths'
import * as components from './components'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Brain Agriculture API',
    description: 'Api para gerenciar produtores rurais juntamente com dashboards',
    version: '1.0.0'
  },
  contact: {
    name: 'Italo Leandro',
    email: 'italo_leandro@outlook.com',
    url: 'https://github.com/ItaloLeandro02/brain-agriculture/issues'
  },
  licenses: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Produtor Rural'
  }, {
    name: 'Dashboard'
  }],
  paths,
  schemas,
  components
}
