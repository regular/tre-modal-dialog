const h = require('mutant/html-element')
const styles = require('module-styles')('tre-modal-dialog')

module.exports = function(msg, opts, cb) {
  if (typeof opts == 'function') {cb = opts; opts = {}}
  const buttons = opts.buttons || {ok: 'Okay'}
  const tweak = opts.tweak || (()=>{})

  const el = h('.tre-modal-dialog-dimmer', [
    h('section.box', [
      h('section.text', msg),
      h('section.actions', Object.entries(buttons).map( ([key, name])=>{
        return h('button', {
          'data-key': key,
          'ev-click': ev=>{
            quit(null, key)
          }
        }, name)
      }))
    ])
  ])
  tweak(el)
  document.body.appendChild(el)

  function quit(err, key) {
    document.body.removeChild(el)
    cb(err, key)
  }

}

styles(`
.tre-modal-dialog-dimmer {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.5);
  display: grid;
  grid-template-columns: 1fr minmax(20%,auto) 1fr;
  grid-template-rows: 1fr minmax(25%,auto) 1fr;
}

.tre-modal-dialog-dimmer section.box {
  font-size: 140%;
  border: 1px solid black;
  grid-row: 2/3;
  grid-column: 2/3;
  padding: 1em;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.7);
  border-radius: 8px;
  background-color: beige;
  display: grid;
  grid-template-rows: 1fr auto;
}

.tre-modal-dialog-dimmer section.actions {
  display: grid;
  grid-auto-flow: column;
  place-content: end end;
  place-items: end end;
}

.tre-modal-dialog-dimmer button {
}
`)
