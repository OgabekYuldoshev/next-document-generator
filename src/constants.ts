// biome-ignore lint/style/useImportType: <explanation>
import { Metadata } from "./types";

export const DEFAULT_CONTENT = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{key}}</title>
  </head>
  <body>
    <h1>Hello world</h1>
  </body>
</html>
`;

export const METADATA_DIR = ".metacontent";
export const METADATA_FILENAME = "metadata.json";

export const DEFAULT_METADATA = {
	contents: [],
} as Metadata;

export const TEST = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="An introduction to TypeScript and its advantages in modern web development.">
  <title>Why TypeScript is a Game-Changer for Web Development</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      margin: 20px;
    }
    header {
      text-align: center;
      margin-bottom: 30px;
    }
    h1 {
      color: #333;
    }
    article {
      max-width: 800px;
      margin: 0 auto;
    }
    h2 {
      color: #444;
    }
    p {
      color: #555;
    }
    a {
      color: #007acc;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    footer {
      text-align: center;
      margin-top: 50px;
      font-size: 0.9em;
      color: #777;
    }
  </style>
</head>
<body>

<header>
  <h1>{{name}}</h1>
</header>

<article>
  <h2>Introduction</h2>
  <p>TypeScript has been gaining popularity among developers, and for good reason. It’s a superset of JavaScript that adds static types, making it easier to write reliable and maintainable code. In this post, we'll explore why TypeScript is essential for modern web development.</p>

  <h2>What is TypeScript?</h2>
  <p>TypeScript is an open-source language developed by Microsoft that builds on JavaScript by adding static typing. Unlike JavaScript, TypeScript allows developers to specify types for variables, function parameters, and return values. This helps catch errors early, making development more efficient.</p>

  <h2>Why Use TypeScript?</h2>
  <p>There are several advantages to using TypeScript:</p>
  <ul>
    <li><strong>Static Typing:</strong> Catch potential bugs early during development, saving time and reducing issues in production.</li>
    <li><strong>Better Tooling:</strong> TypeScript provides better editor support, autocompletion, and refactoring tools.</li>
    <li><strong>Improved Maintainability:</strong> Type definitions make large codebases easier to manage, understand, and refactor.</li>
  </ul>

  <h2>TypeScript vs JavaScript</h2>
  <p>While JavaScript is flexible, it can lead to runtime errors that are hard to trace. TypeScript's type system mitigates these risks by enforcing type checks at compile time. Here's a simple example:</p>
  
  <pre>
    <code>
// JavaScript
function add(a, b) {
  return a + b;
}

// TypeScript
function add(a: number, b: number): number {
  return a + b;
}
    </code>
  </pre>

  <p>In the TypeScript version, the function ensures both parameters are numbers, reducing the chance of runtime errors.</p>

  <h2>Getting Started with TypeScript</h2>
  <p>To start using TypeScript, you can install it globally using npm:</p>
  <pre>
    <code>npm install -g typescript</code>
  </pre>
  <p>Once installed, you can compile your TypeScript files to JavaScript by running:</p>
  <pre>
    <code>tsc yourfile.ts</code>
  </pre>

  <h2>Conclusion</h2>
  <p>TypeScript is a powerful tool that can help you write better, more reliable code. Its static typing, great tooling, and growing community make it a must-learn for any JavaScript developer. If you haven’t tried TypeScript yet, now is the time to start!</p>
</article>

<footer>
  <p>Written by <a href="https://medium.com/">Your Name</a> - © 2024</p>
</footer>

</body>
</html>

`;
