"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nx_docker_1 = require("@nx-tools/nx-docker");
const path_1 = require("path");
async function tscExecutor(options, context) {
    const { projectName, cwd } = context;
    const { GITHUB_REF_NAME, GITHUB_SHA } = process.env;
    if (!projectName)
        throw new Error('project name not found');
    const dockerfilePath = (0, path_1.join)(cwd, 'apps', projectName, 'Dockerfile');
    return (0, nx_docker_1.run)({
        ...options,
        tags: [`danbaggers/${projectName}:${GITHUB_REF_NAME}-${GITHUB_SHA}`],
        context: '.',
        'build-args': [`COMMIT_SHA=${GITHUB_SHA}`],
        'cache-from': ['type=local,src=/tmp/.buildx-cache'],
        'cache-to': ['type=local,mode=max,dest=/tmp/.buildx-cache-new'],
        file: dockerfilePath,
    });
}
exports.default = tscExecutor;
