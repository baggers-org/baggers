module.exports = function (plop) {
  plop.setGenerator('library', {
    prompts: [
      {
        type: 'list',
        name: 'type',
        message: 'What type of library?',
        choices: ['node', 'remix'],
      },
      {
        type: 'input',
        message: 'What do you want to call it?',
        name: 'name',
      },
    ],

    actions: [
      {
        type: 'addMany',
        destination: '../../packages/{{name}}',
        templateFiles: './templates/library/{{type}}/**/*.hbs',
        base: './templates/library/{{type}}',
      },
    ],
  });
};
