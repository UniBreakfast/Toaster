import lorem from "./lorem.js";

import Toaster from './Toaster/Toaster.js'


const toaster1 = new Toaster({
  side: 'bottom-left',
  from: 'bottom',
  to: 'up',
  life: 5,
  limit: 5,
  width: 50,
  gap: 4,
  push: true
})

const timer1 = setInterval(() => toaster1.log(lorem.paragraph(1, 100)), 700)

setTimeout(() => clearInterval(timer1), 5000)



window.Toaster = Toaster