#!/bin/bash
# Simple build script for Vercel deployment

# Install dependencies
npm install

# Build the project
CI=false npm run build

echo "Build completed successfully!"