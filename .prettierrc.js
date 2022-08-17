module.exports = {
	proseWrap: 'preserve',
	tabWidth: 4, // tab缩进大小,默认为2
	useTabs: true, // 使用tab缩进，默认false
	semi: false, // 使用分号, 默认true
	singleQuote: true, // 使用单引号, 默认false(在jsx中配置无效, 默认都是双引号)
	TrailingCooma: 'all', // 行尾逗号,默认none,可选 none|es5|all
	bracketSpacing: true, // 对象中的空格 默认true true: { foo: bar }
	jsxBracketSameLine: false, // JSX标签闭合位置 默认false 另起一行
	jsxSingleQuote: true,
	arrowParens: 'avoid', // avoid 箭头函数参数括号能省略括号的时候就省略 例如x => x
	printWidth: 100, // 一行的字符数，如果超过会进行换行，默认为80，官方建议设100-120其中一个数
	quoteProps: 'as-needed', // 给对象里的属性名是否要加上引号，默认为as-needed，即根据需要决定
	trailingComma: 'es5', // 每个键值对后面是否一定有尾随逗号，默认es5，保持默认即可
}

