const patchType = {
  attr: 'ATTR',
  text: 'TEXT',
  remove: 'REMOVE',
  replace: 'REPLACE'
}

function diff(oldTree, newTree) {
  let patches = {}
  // 递归遍历
  walk(oldTree, newTree, 0, patches)
  return patches
}

function isTextNode(node) {
  return typeof node === 'string'
}

function diffAttr(oldAttr, newAttr) {
  let patch = {}
  // 遍历oldAttr，检查是否有删除(undefined)或修改的属性
  Object.keys(oldAttr).forEach(oldKey => {
    if (oldAttr[oldKey] !== newAttr[oldKey]) {
      patch[oldKey] = newAttr[oldKey]
    }
  })

  // 遍历newAttr，检查是否有新增的属性
  Object.keys(newAttr).forEach(newKey => {
    if (!oldAttr[newKey]) {
      patch[newKey] = newAttr[newKey]
    }
  })
  return patch
}

// 统一用序号记录当前
let num = 0

function diffChildren(oldChildren, newChildren, index, patches) {
  oldChildren.forEach((child, childIndex) => {
    walk(oldChildren[childIndex], newChildren[childIndex], ++num, patches)
  })
}

function walk(oldNode, newNode, index, patches) {
  let currentPatch = []
  if (!newNode) {
    // 该位置上的元素被移除
    currentPatch.push({ type: patchType.remove, index })
  } else if (isTextNode(oldNode) && isTextNode(newNode)) {
    if (oldNode !== newNode) {
      // 文本变化
      currentPatch.push({ type: patchType.text, text: newNode })
    }
  } else if (oldNode.type === newNode.type) {
    // 属性变化
    let attrPatch = diffAttr(oldNode.props, newNode.props)
    if (Object.keys(attrPatch).length) {
      currentPatch.push({ type: patchType.attr, attr: attrPatch })
    }
    // 递归遍历子节点
    diffChildren(oldNode.children, newNode.children, index, patches)
  } else {
    // 节点替换
    currentPatch.push({ type: patchType.replace, newNode })
  }

  if (currentPatch.length) {
    patches[index] = currentPatch
  }
}

export { patchType }
export default diff