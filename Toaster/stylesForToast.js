const style = document.createElement('style')

style.innerHTML = /* css */ `

  .Toaster-glass {
    z-index: 999;
    pointer-events: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .Toaster-toast {
    pointer-events: all;
    background: #ddd;
    position: absolute;
    padding: 7px 18px;
    transition: .4s;
    --offset: 5px;
  }

  .toast-close {
    position: absolute;
    background: none;
    border: none;
    font-size: 20px;
    height: 10px;
    padding: 0;
    cursor: pointer;
    outline: none;
    line-height: 0;
    overflow: hidden;
    --offset: 3px;
  }

  .toast-close:hover, .toast-close:focus {
    color: red;
  }
`

document.head.append(style)
