//jQuery('.test').addClass('xx').addClass('green')
jQuery('.test').find('.red').addClass('yellow').end().addClass('blue').parent()

jQuery('.test').children()

let index = jQuery('.s1')
	.next()
	.addClass('purple')
	.previous()
	.addClass('green')
	.index()
console.log(index)
