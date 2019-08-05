#! /bin/bash

cd docs-src
mkdocs build --clean
cp -r site/* ../docs/.
cd ..
git add /docs/*
git add /docs-src/*
git commit -m "update /docs"
git push
