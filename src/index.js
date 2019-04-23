import { createVNode, VNode } from "./vnode";
import diff from './diff'
import patch from './patch'

let vnode1 = createVNode('ul', { class: 'list' }, [
  createVNode('li', { class: 'item' }, ['1']),
  createVNode('li', { class: 'item' }, ['2']),
  createVNode('li', { class: 'item' }, ['3']),
])

let dom = vnode1.render()
VNode.mount('#root', dom)

let vnode2 = createVNode('ul', { class: 'list-group' }, [
  createVNode('li', { class: 'item' }, []),
  createVNode('li', { class: 'item' }, ['b']),
  createVNode('li', { class: 'item' }, ['c']),
])

let patches = diff(vnode1, vnode2)
patch(dom, patches)

console.log(dom, "dom")
console.log(vnode1, "vnode1")
console.log(vnode2, "vnode2")
console.log(patches, "patches")