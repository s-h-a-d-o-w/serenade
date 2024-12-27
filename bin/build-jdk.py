#!/usr/bin/env python3

import os
import shutil
import subprocess
import sys
import tarfile
from pathlib import Path

os.chdir(os.path.dirname(os.path.realpath(__file__)) + "/../")
shutil.rmtree("build/distributions/jdk", ignore_errors=True)

# to get this list, run:
# jdeps --multi-release 14 -cp 'core/build/install/core/lib/*' --ignore-missing-deps --print-module-deps core/build/install/core/lib/core.jar
subprocess.check_call(
    [
        "jlink",
        "--no-header-files",
        "--no-man-pages",
        "--compress=2",
        "--strip-debug",
        "--add-modules",
        "java.base,java.compiler,java.desktop,java.management,java.naming,java.net.http,java.security.jgss,java.sql,jdk.unsupported",
        "--output",
        "build/distributions/jdk",
    ]
)

# replace symlinks with original files
dist_path = Path("build/distributions/jdk")
legal_path = dist_path / "legal"
legal_temp = dist_path / "legal2"

# Copy with resolved links, remove old dir, rename temp
shutil.copytree(legal_path, legal_temp, copy_function=shutil.copy2, symlinks=False)
shutil.rmtree(legal_path)
legal_temp.rename(legal_path)

# Set permissions (755 in octal = 493 in decimal)
for root, dirs, files in os.walk(legal_path):
    for d in dirs:
        os.chmod(os.path.join(root, d), 0o755)
    for f in files:
        os.chmod(os.path.join(root, f), 0o755)

# Create tar.gz archive
with tarfile.open("build/distributions/jdk.tar.gz", "w:gz") as tar:
    tar.add("build/distributions/jdk", arcname="jdk")

shutil.rmtree("build/distributions/jdk", ignore_errors=True)
