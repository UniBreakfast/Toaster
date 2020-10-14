import Toaster from './Toaster/Toaster.js'

const toaster = new Toaster({
  side: 'bottom-left',
  from: 'bottom',
  to: 'up',
  life: 9,
  limit: 5,
  width: 50,
  gap: 4,
  push: true
})

window.Toaster = Toaster