import { Directive } from 'vue'

/**
 * todo:
 * 1) in mounted hook: make a clickOutsideHandler who 
 *  a) takes the click or right click event
 *  b) check if the target inlcudes the el the directive binded
 *  c) call `binding.value`
 * 2) save it somewhere and add it to `document`
 * 3) in unmounted hook: remove saved handler
 */

export const vClickOutside: Directive<HTMLElement> = {
  mounted(el, binding, vnode) {
    function clickOutsideHandler(e: MouseEvent) {

    }
    document.addEventListener('click', binding.value)
    document.addEventListener('contextmenu', binding.value)
  },
  unmounted(el, binding, vnode) {
    document.removeEventListener('click', binding.value)
    document.removeEventListener('contextmenu', binding.value)

  }
}