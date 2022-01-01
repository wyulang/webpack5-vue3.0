const msgType = ['success', 'warning', 'info', 'error', 'confirm', 'pop', 'phone']
import { createVNode, render } from '@vue/runtime-dom';

import MessageMsg from './msg.vue';

let seed = 0;
let instances: any = [];
let zindex = 8888;

const Message = (opts, callback = null) => {
  if (typeof opts === 'string') {
    opts = {
      message: opts,
    }
  }
  if (callback) {
    opts.close = callback;
  }

  let verticalOffset = opts.offset || 0
  instances.forEach(({ vm }) => {
    verticalOffset += (vm.el.offsetHeight || 0) + 10
  })
  verticalOffset += 10
  const id = 'message_' + seed++;

  zindex++;

  const container = document.createElement('div')

  let options = {
    ...opts,
    onClose: () => {
      close(id);
    },
    destroy: () => {
      render(null, container);
      document.body.removeChild(container);
    },
    offset: verticalOffset,
    id,
    zindex: zindex,
  }

  container.className = `_message`;
  const vm = createVNode(MessageMsg, options);
  instances.push({ vm });

  render(vm, container);
  document.body.appendChild(container);
}

export function close(id) {
  const idx = instances.findIndex(({ vm }) => {
    const { id: _id } = vm.component.props
    return id === _id
  })
  if (idx === -1) {
    return
  }

  const { vm } = instances[idx]
  if (!vm) return

  const removedHeight = vm.el.offsetHeight
  instances.splice(idx, 1)

  // adjust other instances vertical offset
  const len = instances.length
  if (len < 1) return
  for (let i = idx; i < len; i++) {
    const pos = parseInt(instances[i].vm.el.style['top'], 10) - removedHeight - 10
    instances[i].vm.component.props.offset = pos
  }
}

export function closeAll(): void {
  for (let i = instances.length - 1; i >= 0; i--) {
    const instance = instances[i].vm.component as any
    instance.ctx.close()
  }
}

msgType.forEach(type => {
  Message[type] = (options, callback) => {
    if (typeof options === 'string') {
      options = {
        message: options,
        type,
      }
    } else {
      options.type = type
    }
    return Message(options, callback)
  }
})

Message.closeAll = closeAll

export const msg = Message;

export default (app) => {
  app.config.globalProperties.$msg = Message
}