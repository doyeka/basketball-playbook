#!/bin/bash

# Validate all imports are absolute imports.
#
# Allowed:
# - import { useFoo, Foo } from "@/path/to/file";
#
# Not allowed:
# - import { useFoo, Foo } from "./../file";

rg_command=(
  "rg"                      # ripgrep
  "from \"\.+"              # search for 'from ".'
  "."                       # search in current directory
  --glob '*.ts*'            # only search in .ts(x) files
)
output=$("${rg_command[@]}")
root="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
file_name=$(basename "$0")
"$root"/check_output.sh "$file_name" "$output"
exit $?
