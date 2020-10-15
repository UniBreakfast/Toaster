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
    let leftOffset = 'var(--offset)'
    let transform = {}
    if (sides[1] == 'center') {
      sides[1] = 'left'
      leftOffset = '50%'
      transform = {transform: 'translateX(-50%)'}
    }

    assign(this.el.style, {
      [sides[0]]: 'calc(var(--offset) + var(--shift))',
      [sides[1]]: leftOffset, ...transform,
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
