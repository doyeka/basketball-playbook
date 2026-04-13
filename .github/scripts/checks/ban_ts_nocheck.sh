#!/bin/bash

# Ban @ts-nocheck at the top of TypeScript files.
exceptions=()

rg_command=(
  "rg"                      # ripgrep
  "@ts-nocheck"             # search for 'ts-nocheck'
  "."                       # search in current directory
  --glob '*.ts*'            # only search in .ts(x) files
)
output=$("${rg_command[@]}")
for exception in "${exceptions[@]}"; do
  output=$(echo "$output" | grep -v "$exception")
done
root="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
file_name=$(basename "$0")
"$root"/check_output.sh "$file_name" "$output"
exit $?
