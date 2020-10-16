export default class Toast {
  constructor (msgContent='', additionalClass='', life=null) {
    assign(this, {msgContent, additionalClass, life})
  }

  render() {
    this.el = document.createElement('div')

    assign(this.el, {
      ...typeof this.msgContent=='string'? {innerHTML: this.msgContent} : {},
      className: `Toaster-toast ${this.additionalClass}`,
      toast: this,
    })
    if (typeof this.msgContent != 'string') this.el.append(this.msgContent)

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
      zIndex: zIndex++
    })

    const closer = closeBtn.cloneNode(true)
    closer.onclick = e => e.shiftKey ? this.toaster.clear() : this.remove()
    this.el.append(closer)

    this.toaster.el.append(this.el)

    this.timer = setTimeout(() => this.remove(), this.life*1000)
  }

  remove() {
    clearTimeout(this.timer)
    this.el.classList.add('fleeing')
    this.el.onanimationend = () => this.el.remove()
    const {toasts} = this.toaster
    toasts.splice(toasts.indexOf(this), 1)
    this.toaster.updateShifts()
  }

  updateClosePos() {}
}


let zIndex = 1


const {assign} = Object


const closeBtn = document.createElement('button')
assign(closeBtn, {innerText: '×', className: 'toast-close'})
assign(closeBtn.style, {top: 'var(--offset)', right: 'var(--offset)'})
