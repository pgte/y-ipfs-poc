global.setImmediate = require('timers').setImmediate;
const Y = require('yjs')
require('y-memory')(Y)
// require('y-indexeddb')(Y)
require('y-ipfs-connector')(Y)
require('y-array')(Y)
require('y-text')(Y)

const IPFS = require('ipfs')
const ipfs = new IPFS({
  repo: 'tmp/ipfs-' + Math.random(),
  config: {
    Addresses: {
      Swarm: [
        '/libp2p-webrtc-star/dns4/star-signal.cloud.ipfs.team/wss'
      ]
    },
    Discovery: {
      webRTCStar: {
        Enabled: true
      }
    }
  },
  EXPERIMENTAL: {
    pubsub: true
  }
})

Y({
  db: {
    name: 'memory'
  },
  connector: {
    name: 'ipfs', // use the IPFS connector
    room: 'Textarea-example-dev',
    ipfs: ipfs
  },
  share: {
    textarea: 'Text' // y.share.textarea is of type Y.Text
  }
}).then(function (y) {
  // bind the textarea to a shared text element
  y.share.textarea.bind(document.getElementById('textfield'))
})
