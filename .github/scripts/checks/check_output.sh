#!/bin/bash

CHECK_NAME=$1
CHECK_OUTPUT=$2

# Check if output is not empty, fail if it is
if [[ -n "$CHECK_OUTPUT" ]]; then
  echo "❌ $CHECK_NAME check failed. The following files did not match:"
  echo "$CHECK_OUTPUT"
  echo "---"
  echo ""
  exit 1
else
  echo "✅ $CHECK_NAME check passed."
  exit 0
fi
