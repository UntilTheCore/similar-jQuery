//jQuery('.test').addClass('xx').addClass('green')
// jQuery('.test').find('.red').addClass('yellow').end().addClass('blue').parent()

// jQuery('.test').children()

// let index = jQuery('.s1')
// 	.next()
// 	.addClass('purple')
// 	.previous()
// 	.addClass('green')
// 	.index()
// console.log(index)

jQuery('.test').find('.s1').addClass('red').end().addClass('yellow')

let newNode = jQuery('<span>sp1</span>')
jQuery('.s1').append(newNode)
