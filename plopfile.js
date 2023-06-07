
module.exports = (plop) => {
    plop.setGenerator('feature', {
        description: 'Create a feature',
        // User input prompts provided as arguments to the template
        prompts: [
            {
                // Raw text input
                type: 'input',
                // Variable name for this input
                name: 'name',
                // Prompt to display on command line
                message: 'What is your feature name?'
            }
        ],
        actions: [

            {
                path: './apps/server/src/app/app.module.ts',
                pattern: /(\/\/ DO NOT DELETE THIS COMMENT PLOP HELPER IMPORT)/g,
                template: 'import { {{ pascalCase name }}Module } from \'./{{ kebabCase name }}/{{ kebabCase name }}.module\';',
                type: 'append',
            },

            {
                path: './apps/server/src/app/app.module.ts',
                pattern: /(\/\/ DO NOT DELETE THIS COMMENT PLOP HELPER MODULE)/g,
                template: '  {{ pascalCase name }}Module,',
                type: 'append',
            },
            {
                path: './libs/types/src/index.ts',
                template: 'export * from \'./lib/{{ kebabCase name }}/{{ kebabCase name }}.types\';',
                type: 'append',
            },
            {
                // Add a new file
                type: 'add',
                // Path for the new file
                path: './libs/types/src/lib/{{kebabCase name}}/{{kebabCase name}}.types.ts',
                // Handlebars template used to generate content of new file
                templateFile: 'templates/type.interface.ts.hbs'
            },
            {
                // Add a new file
                type: 'add',
                // Path for the new file
                path: './apps/server/src/app/{{kebabCase name}}/{{kebabCase name}}.service.ts',
                // Handlebars template used to generate content of new file
                templateFile: 'templates/service.ts.hbs'
            },
            {
                // Add a new file
                type: 'add',
                // Path for the new file
                path: './apps/server/src/app/{{kebabCase name}}/{{kebabCase name}}.controller.ts',
                // Handlebars template used to generate content of new file
                templateFile: 'templates/controller.ts.hbs'
            },
            {
                // Add a new file
                type: 'add',
                // Path for the new file
                path: './apps/server/src/app/{{kebabCase name}}/{{kebabCase name}}.module.ts',
                // Handlebars template used to generate content of new file
                templateFile: 'templates/module.ts.hbs'
            },

            {
                // Add a new file
                type: 'add',
                // Path for the new file
                path: './apps/server/src/app/{{kebabCase name}}/{{kebabCase name}}.schema.ts',
                // Handlebars template used to generate content of new file
                templateFile: 'templates/schema.ts.hbs'
            },
            {
                // Add a new file
                type: 'add',
                // Path for the new file
                path: './apps/server/src/app/{{kebabCase name}}/dto/create-{{kebabCase name}}.dto.ts',
                // Handlebars template used to generate content of new file
                templateFile: 'templates/create-dto.ts.hbs'
            },
            {
                // Add a new file
                type: 'add',
                // Path for the new file
                path: './apps/server/src/app/{{kebabCase name}}/dto/update-{{kebabCase name}}.dto.ts',
                // Handlebars template used to generate content of new file
                templateFile: 'templates/update-dto.ts.hbs'
            },
            {
                // Add a new file
                type: 'add',
                // Path for the new file
                path: './apps/server/src/app/{{kebabCase name}}/dto/search-{{kebabCase name}}.dto.ts',
                // Handlebars template used to generate content of new file
                templateFile: 'templates/search-dto.ts.hbs'
            },
            {
                // Add a new file
                type: 'add',
                // Path for the new file
                path: './apps/server/src/app/{{kebabCase name}}/entities/{{kebabCase name}}.entity.ts',
                // Handlebars template used to generate content of new file
                templateFile: 'templates/entity.ts.hbs'
            },
            {
                // Add a new file
                type: 'add',
                // Path for the new file
                path: './apps/server/src/app/{{kebabCase name}}/tests/{{kebabCase name}}.controller.spec.ts',
                // Handlebars template used to generate content of new file
                templateFile: 'templates/controller.spec.ts.hbs'
            },
            {
                // Add a new file
                type: 'add',
                // Path for the new file
                path: './apps/server/src/app/{{kebabCase name}}/tests/{{kebabCase name}}.service.spec.ts',
                // Handlebars template used to generate content of new file
                templateFile: 'templates/service.spec.ts.hbs'
            },
            {
                // Add a new file
                type: 'add',
                // Path for the new file
                path: './apps/server/src/app/{{kebabCase name}}/tests/{{kebabCase name}}.integration.spec.ts',
                // Handlebars template used to generate content of new file
                templateFile: 'templates/integration.spec.ts.hbs'
            },
            {
                // Add a new file
                type: 'add',
                // Path for the new file
                path: './apps/server/src/app/{{kebabCase name}}/tests/{{kebabCase name}}.factory.ts',
                // Handlebars template used to generate content of new file
                templateFile: 'templates/factory.ts.hbs'
            }
        ]
    });
};
