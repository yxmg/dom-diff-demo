// 创建虚拟DOM
class VNode {
  constructor(type, props, children) {
    this.type = type
    this.props = props
    this.children = children
  }

  static mount(query, dom) {
    document.querySelector(query).appendChild(dom)
  }

  render() {
    let dom = document.createElement(this.type)
    this.applyAttr(dom)
    this.renderChildren(dom)
    return dom
  }

  // 应用属性到元素
  applyAttr(dom) {
    setAttr(dom, this.props)
  }

  // 渲染子元素
  renderChildren(dom) {
    console.log('渲染子元素')
    this.children.forEach(child => {
      let childDom = (child instanceof VNode)
        ? child.render()
        : document.createTextNode(child)
      dom.appendChild(childDom)
    })
  }
}

function setAttr(dom, attr) {
  Object.keys(attr).forEach(declaration => {
    let value = attr[declaration]
    switch (declaration) {
      case 'value':
        if (this.type === 'input' || this.type === 'textarea') {
          dom.value = value
        } else {
          dom.setAttribute(declaration, value)
        }
        break
      case 'style':
        dom.style.cssText = value
        break
      default:
        dom.setAttribute(declaration, value)
        break
    }
  })
}

function createVNode(type, props, children) {
  return new VNode(type, props, children)
}


export { VNode, createVNode, setAttr }