module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'generate react component',
    prompts: [
      {
        type: 'input',
        name: 'path',
        message:
          'ディレクトリを入力してください（指定しない場合はEnterでスキップ）\nsrc/components/',
      },
      {
        type: 'input',
        name: 'name',
        message: 'コンポーネント名を入力してください',
      },
      {
        type: 'list',
        name: 'type',
        message: 'コンポーネントの種別を選択してください',
        choices: ['Server Component', 'Client Component'],
      },
    ],
    actions: (data) => {
      const path = `./src/components/{{path}}/{{name}}/`;

      const component =
        data?.type === 'Server Component'
          ? {
              type: 'add',
              path: path + `{{name}}.tsx`,
              templateFile: 'plop-templates/component/ServerComponent.tsx.hbs',
            }
          : {
              type: 'add',
              path: path + `{{name}}.tsx`,
              templateFile: 'plop-templates/component/ClientComponent.tsx.hbs',
            };

      const actions = [
        component,
        {
          type: 'add',
          path: path + `index.ts`,
          templateFile: 'plop-templates/component/index.tsx.hbs',
        },
        {
          type: 'add',
          path: path + `index.module.scss`,
          templateFile: 'plop-templates/component/style.module.scss.hbs',
        },
        {
          type: 'add',
          path: path + `{{name}}.test.tsx`,
          templateFile: 'plop-templates/component/test.tsx.hbs',
        },
      ];
      return actions;
    },
  });
};
