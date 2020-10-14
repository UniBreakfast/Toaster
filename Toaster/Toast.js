export default class Toast {
  constructor (msg='', additionalClass='', life=null) {
    assign(this, {msg, additionalClass, life})
  }

  render() {
    this.el = document.createElement('div')

    assign(this.el, {
      innerHTML: this.msg,
      className: `Toaster-toast ${this.additionalClass}`,
    })

    const sides = this.toaster.side.split('-')

    assign(this.el.style, {
      [sides[0]]: 'var(--offset)',
      [sides[1]]: 'var(--offset)',
      transform: `translateY(calc(${
        sides.includes('top') ? '' : '-'}1 * var(--shift)))`
    })

    this.el.append(closeBtn.cloneNode(true))

    this.toaster.el.append(this.el)
  }

  remove() {
  }

  updateClosePos() {}
}


const {assign} = Object


const closeBtn = document.createElement('button')
assign(closeBtn, {innerText: '×', className: 'toast-close'})
assign(closeBtn.style, {top: 'var(--offset)', right: 'var(--offset)'})
