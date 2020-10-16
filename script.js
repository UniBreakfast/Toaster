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
  push: true,
})

const timer1 = setInterval(() => toaster1.log(lorem.paragraph(1, 100)), 700)

setTimeout(clearInterval, 5000, timer1)


const toaster2 = new Toaster({
  side: 'right top',
  from: 'top',
  to: 'up',
  life: 10,
  limit: 3,
  width: 20,
  gap: 1,
  push: true,
})

const timer2 = setInterval(() => toaster2.log(lorem.paragraph(1, 20)), 1000)

setTimeout(clearInterval, 10000, timer2)


const toaster3 = new Toaster({
  side: 'center top',
  from: 'top',
  to: 'bottom',
  life: 10,
  limit: 9,
  width: 15,
  gap: 1,
  push: true,
})

const timer3 = setInterval(() => toaster3.log(lorem.paragraph(1, 10)), 600)

setTimeout(clearInterval, 10000, timer3)


window.Toaster = Toaster