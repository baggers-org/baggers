#!/bin/bash
WHITE=$(echo -en '\033[01;37m')
YELLOW=$(echo -en '\033[00;33m')
RESTORE=$(echo -en '\033[0m')
echo "${YELLOW}========================================"
echo "${WHITE} $1"
echo "${YELLOW}========================================${RESTORE}"