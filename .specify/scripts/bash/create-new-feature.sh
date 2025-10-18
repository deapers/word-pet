#!/bin/bash

# Mock script to simulate feature creation
SHORT_NAME=""
SPEC_DESCRIPTION=""

while [[ $# -gt 0 ]]; do
  case $1 in
    --json)
      SPEC_DESCRIPTION="$2"
      shift 2
      ;;
    --short-name)
      SHORT_NAME="$2"
      shift 2
      ;;
    *)
      # If no recognized flag, treat as short name
      SHORT_NAME="$1"
      shift
      ;;
  esac
done

# If no short name was provided, default to a value
if [ -z "$SHORT_NAME" ]; then
  SHORT_NAME="default-feature"
fi

# Create the feature directory structure
FEATURE_NUM=001
SPEC_DIR="specs/${FEATURE_NUM}-${SHORT_NAME}"
SPEC_FILE="${SPEC_DIR}/spec.md"

mkdir -p "${SPEC_DIR}/checklists"

# Create the spec file with minimal content to match template
cat > "${SPEC_FILE}" << EOF
# Feature Specification: [FEATURE NAME]

**Feature Branch**: \`${FEATURE_NUM}-${SHORT_NAME}\`  
**Created**: $(date +%Y-%m-%d)  
**Status**: Draft  
**Input**: User description: "${SPEC_DESCRIPTION}"
EOF

# Output JSON as requested
cat << EOF
{
  "BRANCH_NAME": "${FEATURE_NUM}-${SHORT_NAME}",
  "SPEC_FILE": "$(pwd)/${SPEC_FILE}",
  "FEATURE_DIR": "$(pwd)/${SPEC_DIR}"
}
EOF