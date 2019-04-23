/**
 *Created by 夜雪暮歌 on 2019/4/15
 **/
import { VNode, setAttr } from "./vnode";
import { patchType } from "./diff";

let allPatches
let index = 0

function patch(node, patches) {
  allPatches = patches;
  walk(node)
}

function walk(node) {
  let current = allPatches[index++]
  let childNodes = node.childNodes
  childNodes.forEach(child => walk(child))
  if (current) {
    doPatch(node, current)
  }
}

function doPatch(node, patches) {
  patches.forEach(patch => {
    console.log(patch, "patch")
    switch (patch.type) {
      case patchType.attr:
        setAttr(node, patch.attr)
        break
      case patchType.text:
        node.textContent = patch.text
        break
      case patchType.remove:
        node.parentNode.removeChild(node)
        break
      case patchType.replace:
        let newNode = node.newNode
        newNode = (node instanceof VNode) ? newNode.render() : document.createTextNode(newNode)
        node.parentNode.replaceChild(node, newNode)
        break
      default:
        break
    }
  })
}

export default patch