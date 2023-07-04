import { NodePlopAPI } from 'plop';

export default function (plop: NodePlopAPI) {
  // create your generators here
  plop.setGenerator('basics', {
    description: 'generate react component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "What is this component's name?",
      },
      {
        type: 'list',
        name: 'element',
        message: 'HTML element (div is default)',
        choices: ['Server Component', 'Client Component'],
      },
    ],
    actions: [], // array of actions
  });
}
