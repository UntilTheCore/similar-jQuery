window.jQuery = (selectorOrArray) => {
	let elements
	if (typeof selectorOrArray === 'string') {
		elements = document.querySelectorAll(selectorOrArray)
	} else if (selectorOrArray instanceof Array) {
		elements = selectorOrArray
	}
	return {
		// 给元素添加新的类
		addClass(className) {
			for (let i = 0; i < elements.length; i++) {
				elements[i].classList.add(className)
			}
			return this
		},
		// 查找元素
		find(selector) {
			let array = []
			for (let i = 0; i < elements.length; i++) {
				array = array.concat(Array.from(elements[i].querySelectorAll(selector)))
			}
			array.oldThis = this
			return jQuery(array)
		},
		oldThis: selectorOrArray.oldThis,
		// 返回到上一个this对象
		end() {
			return this.oldThis
		},
		// 遍历元素
		each(fn) {
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
	}
}
