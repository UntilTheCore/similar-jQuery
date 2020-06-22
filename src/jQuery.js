window.jQuery = (selectorOrArrayOrTemplate) => {
	let elements
	if (typeof selectorOrArrayOrTemplate === 'string') {
		if (selectorOrArrayOrTemplate[0] === '<') {
			elements = [createElement(selectorOrArrayOrTemplate)]
		} else {
			elements = document.querySelectorAll(selectorOrArrayOrTemplate)
		}
	} else if (selectorOrArrayOrTemplate instanceof Array) {
		elements = selectorOrArrayOrTemplate
	}

	function createElement(string) {
		const node = document.createElement('template')
		node.innerHTML = string.trim()
		node.insert
		return node.content.firstChild
	}
	// 重点1
	const api = Object.create(jQuery.prototype)
	Object.assign(api, {
		elements: elements,
		oldApi: selectorOrArrayOrTemplate.oldThis,
	})
	return api
}
jQuery.prototype = {
	construct: jQuery,
	jquery: true,
	delegate: {
		userFn: null,
		dgFn: null,
		selector: '',
	},
	// 事件绑定方法
	// 2 个参数，元素本身的事件绑定
	// 3 个参数，事件委托
	on(eventType, selector, fn) {
		if (arguments.length === 3) {
			Object.assign(this.delegate, {
				userFn: fn,
				dgFn: null,
				selector: selector,
			})
			this.delegate.dgFn = (e) => {
				let el = e.target
				this.each((node) => {
					let temp = el
					while (!temp.matches(selector)) {
						console.dir(temp)
						console.log(node.innerText)
						debugger
						if (temp === node) {
							temp = null
							break
						}
						if (!('matches' in temp.parentNode)) {
							break
						}
						temp = temp.parentNode
					}
					temp && fn.call(el, e, el)
				})
			}
			this.each((node) => {
				node.addEventListener(eventType, this.delegate.dgFn)
			})
		} else if (arguments.length === 2 && arguments[1] instanceof Function) {
			this.each((node) => {
				node.addEventListener(eventType, arguments[1])
			})
		}
		return this
	},
	// 取消事件绑定
	off(eventType, selector, fn) {
		if (arguments.length === 3) {
			this.each((node) => {
				if (
					selector === this.delegate.selector &&
					fn === this.delegate.userFn
				) {
					node.removeEventListener(eventType, this.delegate.dgFn)
				}
			})
		} else if (arguments.length === 2 && arguments[1] instanceof Function) {
			this.each((node) => {
				node.removeEventListener(eventType, arguments[1])
			})
		}
		return this
	},
	// 添加为节点的子元素
	// 默认给第一个元素添加子元素
	append(newNode) {
		if (newNode instanceof Element) {
			this.get(0).appendChild(newNode)
		} else if (newNode instanceof HTMLElement) {
			for (let i = 0; i < newNode.length; i++) {
				this.get(0).appendChild(newNode[i])
			}
		} else if (newNode.jquery === true) {
			newNode.each((node) => {
				this.get(0).appendChild(node)
			})
		}
		return this
	},
	// 给元素添加新的类
	addClass(className) {
		this.each((node) => {
			node.classList.add(className)
		})
		return this
	},
	// 查找元素
	find(selector) {
		let array = []
		// const elements = this.elements
		// for (let i = 0; i < elements.length; i++) {
		// 	array = array.concat(Array.from(elements[i].querySelectorAll(selector)))
		// }
		this.each((node) => {
			array.push(...node.querySelectorAll(selector))
		})
		array.oldThis = this
		return jQuery(array)
	},
	// 返回到上一个this对象
	end() {
		return this.oldApi
	},
	// 遍历元素
	each(fn) {
		const elements = this.elements
		for (let i = 0; i < elements.length; i++) {
			fn.call(null, elements[i], i)
		}
	},
	// 获取父元素
	parent() {
		let arr = []
		this.each((node) => {
			if (!arr.includes(node.parentNode)) {
				arr.push(node.parentNode)
			}
		})
		return jQuery(arr)
	},
	// 获取子元素
	children() {
		let arr = []
		this.each((node) => {
			// 使用展开运算符更方便
			arr.push(...node.children)
			// arr = arr.concat(Array.from(node.children))
		})
		return jQuery(arr)
	},
	// 获取兄弟节点
	siblings() {
		let arr = []
		this.each((node) => {
			for (let i = 0; i < node.parentNode.children.length; i++) {
				Array.from(node.parentNode.children).filter((item) => {
					if (item !== node && !arr.includes(item)) {
						arr.push(item)
					}
				})
			}
		})
		return jQuery(arr)
	},
	// 获取下一个元素
	next() {
		let arr = []
		for (let i = 0; i < elements.length; i++) {
			let sbl = elements[i].nextSibling
			while (3 === sbl.nodeType) {
				sbl = sbl.nextSibling
			}
			arr.push(sbl)
		}
		return jQuery(arr)
	},
	// 获取上一个元素
	previous() {
		let arr = []
		for (let i = 0; i < elements.length; i++) {
			let pre = elements[i].previousSibling
			while (3 === pre.nodeType) {
				pre = pre.previousSibling
			}
			arr.push(pre)
		}
		return jQuery(arr)
	},
	// 获取元素所在位置的下标。
	index() {
		let indexArr = []
		for (let i = 0; i < elements.length; i++) {
			let pc = elements[i].parentNode.children
			let j
			for (j = 0; j < pc; j++) {
				if (elements[i] === pc[j]) {
					break
				}
			}
			indexArr.push(j)
		}
		return indexArr
	},
	// 获取在elements中第index个元素
	get(index) {
		return this.elements[index]
	},
}
