import { NodePlopAPI } from 'plop';

export default function (plop: NodePlopAPI) {
  // create your generators here
  plop.setGenerator('basics', {
    description: 'generate react component',
    prompts: [
      {
        type: 'input',
        name: 'path',
        message:
          '以下のコンポーネントのディレクトリパスを入力してください\nsrc/components/以下で入力してください',
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
      const path = `../src/components/{{path}}/{{name}}`;

      const component =
        data?.type === 'Server Component'
          ? {
              type: 'add',
              path: path + `index.tsx`,
              templateFile: 'component/ServerComponent.tsx.hbs',
            }
          : {
              type: 'add',
              path: path + `index.tsx`,
              templateFile: 'component/ClientComponent.tsx.hbs',
            };

      const actions = [
        component,
        {
          type: 'add',
          path: path + `index.ts`,
          templateFile: 'component/index.ts.hbs',
        },
        {
          type: 'add',
          path: path + `index.module.scss`,
          templateFile: 'component/style.ts.hbs',
        },
        {
          type: 'add',
          path: path + `{{name}}.test.ts`,
          templateFile: 'BaseComponent/test.ts.hbs',
        },
      ];
      return actions;
    },
  });
}
