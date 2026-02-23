/** @type {import('jest').Config} */

module.exports = {
    moduleFileExtensions: ['js', 'json', 'ts'],
    roots: ['<rootDir>/src'],
    testRegex: '.*\\.spec\\.ts$',
    transformIgnorePatterns: [
        // Match both / and \ for cross-platform compatibility
        'node_modules[/\\\\](?!(@nestjs|class-validator|class-transformer)[/\\\\])',
    ],
    transform: {
        '\\.ts$': [
            '@swc/jest',
            {
                jsc: {
                    parser: {
                        syntax: 'typescript',
                        decorators: true,
                    },
                    transform: {
                        legacyDecorator: true,
                        decoratorMetadata: true,
                    },
                    target: 'es2019',
                },
            },
        ],
        '\\.js$': [
            '@swc/jest',
            {
                jsc: {
                    parser: {
                        syntax: 'ecmascript',
                    },
                    target: 'es2019',
                },
            },
        ],
    },
    collectCoverageFrom: ['src/**/*.(t|j)s'],
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
};
