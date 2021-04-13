const h = require('mutant/html-element')
const modal = require('.')

modal('hello', {
  buttons: {
    ok: 'Okay',
    cancel: 'Cancel'
  }
}, (err, key)=>{
  document.body.append(h('div', key))
})
