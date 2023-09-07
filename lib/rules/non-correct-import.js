module.exports = {
  meta: {
    type: 'problem',
    hasSuggestions: true,
    docs: {
      description: "All style components files must be imported via a single variable",
    },
    fixable: false,
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        const pathArray = node.source.raw.substr(1, node.source.raw.length - 2).split('.');

        if (
          pathArray.includes('styled') &&
          node.specifiers[0].type !== 'ImportNamespaceSpecifier'
        ) {

          return context.report({
            node: node,
            message: 'Incorrect import for the styled file. Replace with import in one variable * as',
          })
        }
      }
    };
  },
};
