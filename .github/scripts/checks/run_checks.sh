#!/bin/bash

root="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
scripts=(
  "$root/checks/ban_ts_nocheck.sh"
  "$root/checks/validate_no_relative_imports.sh"
)

failure_count=0

for script in "${scripts[@]}"; do
  $script
  exit_code=$?
  if [ $exit_code -ne 0 ]; then
    failure_count=$((failure_count + 1))
  fi
done

if [ $failure_count -ne 0 ]; then
  echo "$failure_count checks failed."
  exit 1
else
  echo "All checks passed."
  exit 0
fi
