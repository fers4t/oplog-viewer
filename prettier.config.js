/** @type {import('prettier').Config} */
module.exports = {
   semi: false,
   singleQuote: true,
   tabWidth: 3,
   printWidth: 120,
   tailwindConfig: './tailwind.config.js',
   trailingComma: 'all',
   importOrder: [
      // React and Next.js imports
      '^(react/(.*)$)|^(react$)',
      '^(next/(.*)$)|^(next$)',

      // Third-party modules
      '<THIRD_PARTY_MODULES>',

      // Specific imports
      'next-seo.config',
      '^[./]',
      '^types$',
      '^utils/(.*)$',
      '^components/(.*)$',
   ],
   importOrderSeparation: true,
   importOrderSortSpecifiers: true,
   importOrderBuiltinModulesToTop: true,
   importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
   importOrderMergeDuplicateImports: true,
   importOrderCombineTypeAndValueImports: true,
   plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
}
