module.exports = {
  meta: {
    type: 'problem',
    hasSuggestions: true,
    fixable: true,
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const pathArray = node.source.raw.substr(1, node.source.raw.length - 2);
        console.log(node, node.specifiers[0].type)

        if (
          pathArray.includes('styled') &&
          node.specifiers[0].type !== 'ImportNamespaceSpecifier'
        ) {
          console.log('error')

          return context.report({
            node: node,
            message: 'Неправильный импорт. Измените на * as S',
            fix(fixer){
              return [fixer.replaceTextRange([node.start, node.end], `import * as S from ${node.source.raw}`)]
            }
          })
        }
      }
    };
  },
};
