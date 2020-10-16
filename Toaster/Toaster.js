import './stylesForToast.js'
import Toast from './Toast.js'

export default class Toaster {
  constructor ({side='bottom-right', from, to, life=9, limit=99, width=50,
    gap=2, push}={}) {
    side = validate(side)

    if (!side) throw 'invalid side to show the toast on'
    if (!from && !to) [from, to] = suggestFromToBy(side)
    else if (!from) from = suggestFromToBy(side, to)
    else if (!to) to = suggestFromToBy(side, from)
    if (push === undefined) push = suggestPushBy(side, from, to)

    assign(this, {side, from, to, life, limit, width, gap, push}, {toasts: []})

    this.render()

    this.updateOnResize = this.updateShifts.bind(this)
    addEventListener('resize', this.updateOnResize)
  }

  log(msg, additionalClass, life) {
    while (this.toasts.filter(toast => !toast.placed).length >= this.limit)
      this.toasts[0].remove()

    if (life === undefined) life = this.life

    const toast = new Toast(msg, additionalClass, life)

    this.toasts.push(toast)
    toast.toaster = this

    toast.render()
    this.updateShifts()

    this.el.style.zIndex = zIndex++
  }

  clear(fast) {
    if (fast) {
      this.toasts.length = 0
      this.el.innerHTML = ''
    } else {
      const mortalToasts = this.toasts.filter(toast => !toast.placed)

      !(mortalToasts.length ? mortalToasts : this.toasts)
        .forEach(toast => toast.remove())
    }
  }

  render() {
    this.el = document.createElement('div')
    assign(this.el, {className: 'Toaster-glass', toaster: this})

    const {side, from, push} = this
    const translateX = from=='left'? side.includes('left')? '-150%' : '-100vw' :
                  from=='right'? side.includes('right')? '150%' : '100vw' :
                    side.includes('center')? '-50%' : '0'
    const translateY = from=='top'? side.includes('top') && push? '-150%' :
        '-100vh' : from=='bottom'? side.includes('bottom') && push? '150%' :
          '100vh' : '0'
    this.el.style = `
      zIndex: ${zIndex++};
      --width: ${this.width}%;
      --translate: translate(${translateX}, ${translateY});
    `
    document.body.append(this.el)
  }

  updateShifts() {
    const toasts = this.toasts.filter(toast => !toast.placed)

    if (this.push) {
      toasts[toasts.length-1].shift = 0

      for (let i = toasts.length-1; i; --i) {
        toasts[i-1].shift =
          toasts[i].shift + toasts[i].el.offsetHeight + this.gap
      }
    } else {
      toasts[0].shift = 0

      for (let i = 0; i < toasts.length-1; ++i) {
        toasts[i+1].shift =
          toasts[i].shift + toasts[i].el.offsetHeight + this.gap
      }
    }

    toasts.forEach(toast =>
      toast.el.style.setProperty('--shift', toast.shift+'px'))
  }
}


let zIndex = 999


function validate(side) {
  const words = side.split(/ |-/)

  if (words.length == 2 && (words.includes('top') || words.includes('bottom'))
    && (words.includes('left') || words.includes('center')
      || words.includes('right'))) {

    return `${words.includes('top') ? 'top' : 'bottom'}-${words.includes('left')
      ? 'left' : words.includes('right') ? 'right' : 'center'}`
  }

  return false
}


function suggestFromToBy(side, direction) {
  const words = side.split(/ |-/)

  if (words.includes('center')) {
    const notCenter = words.find(word => word != 'center')
    return direction ? notCenter : [notCenter, notCenter]
  }

  if (Math.round(Math.random())) words.reverse()

  return direction ? words.find(word => word != direction) : words
}


function suggestPushBy(side, from, to) {
  if (side.includes('center')) return

  const farSide = side.includes('left') ? 'right' : 'left'
  const level = side.includes('top')? 'top' : 'bottom'

  if (to != farSide && [level, farSide].includes(from)) return true
}

const {assign} = Object

/*

Конструктор создаёт объект тостер с заданными настройками

Объект тостер принимает сообщения для вывода и показывает их тостами

Кроме сообщения можно передать особый класс и особую продолжительность жизни

Каждый тост появляется в указанном месте,
  смещая прошлые в противоположный по вертикали угол

Каждый тост живёт указанное время,
  после чего отбывает в указанном направлении

Наведение курсора на тост отключает его таймер жизни

Вывод курсора за тост включает его таймер жизни с начала

Тосты можно перетаскивать по экрану

Перетащенный тост сам не исчезнет и не учитывается в лимите

Тосты можно закрывать крестиком в видимом углу (предпочтительно верхнем, правом)

*/


/*

*/