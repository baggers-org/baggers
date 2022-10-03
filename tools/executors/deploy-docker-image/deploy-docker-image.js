"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const devkit_1 = require("@nrwl/devkit");
async function tscExecutor(_, context) {
    const { projectName } = context;
    const { GITHUB_REF_NAME, GITHUB_SHA, GITHUB_BASE_REF } = process.env;
    const isProduction = GITHUB_BASE_REF === 'main';
    const suffix = !isProduction ? '-staging' : '';
    if (!projectName)
        throw new Error('project name not found');
    const image = `danbaggers/${projectName + suffix}:${GITHUB_REF_NAME}-${GITHUB_SHA}`;
    (0, devkit_1.runExecutor)({
        project: projectName,
        target: 'deploy',
        configuration: isProduction ? 'production' : undefined,
    }, { image }, context);
}
exports.default = tscExecutor;
