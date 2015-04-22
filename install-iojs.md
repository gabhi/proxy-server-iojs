## Overview

This document is a quick guide to preparing for node.js Development.

## Documentation

See the [node.js API](https://nodejs.org/api/all.html) and [npm](https://docs.npmjs.com) documentation.

## Download Node.js or IO.js

Officially, it's pronounced "node dot js", but you may get some skew glances when saying that in real life.

### Which Version?

Typically you'll use latest node.js stable. However, at this moment in time, io.js is recommended since it is cross-compatible with node.js and comes with a much newer version of V8.

**A Note on Semver:**

[Semver](http://semver.org) versioning uses a 3 number hierarchy, major.minor.patch (e.g., 2.1.4), where majors are backwards breaking, minors signify new functionality, and patches are for bug fixes. Occasionally, new major versions require lead time before 3rd-party packages are updated. In those instances, you'll be better off with the latest release of the previous major version. (e.g., If 4.0.0 were just released, you would be better off with the latest 3.\*.\* to avoid dependency compatibility issues)

**Io.js Versioning:**

Io.js follows a strict semver versioning scheme.


**Node.js Versioning:**

Since semver explicitly defines no rules for 0.\*.\* releases, node.js versioning is technically semver compatible. It's unclear whether node.js will switch to strict semver after the 1.0.0 release. For 0.\*.\* releases, node.js follows an even/odd versioning scheme; Odd minor numbers (e.g., 0.9, 0.11) are used for unstable branch development, while even minor numbers (e.g., 0.10, 0.12) are used for stable branch development. Stable branch patch versions are backwards compatible, while unstable patch versions are often breaking. Stable branch versions are always recommended for production use.

### Recommended Installation Path:

[NVM](https://github.com/creationix/nvm) supports nearly every version of node.js and io.js, and enables both quick transitions between versions and switching on a session basis.

```bash
# Install nvm
curl https://raw.githubusercontent.com/creationix/nvm/v0.24.1/install.sh | bash
nvm install iojs          # Install latest io.js
nvm alias default iojs    # Set io.js to load on every session
```

### Alternative Installation Paths:

[Latest node.js](https://nodejs.org)

[Latest io.js](https://iojs.org/en/index.html)

## Verify npm Install

*Note:* Throughout this setup we'll be using `-g` to install packages. For an explanation, see [global vs installed packages](http://blog.nodejs.org/2011/03/23/npm-1-0-global-vs-local-installation). (*Summary:* `-g` packages can be used in your shell, local packages can be `require`d)

```bash
# npm is updated more frequently than node
# So, let's install the latest npm
npm install -g npm@latest    

# If the above fails for permission reasons,
# Let's move the npm install path to a custom directory
mkdir ~/.npmprefix && npm config set prefix ~/.npmprefix

# Now persist that custom npm install directory
npmpath='export PATH=`npm config get prefix`/bin:$PATH'
# OSX
echo $npmpath >> ~/.bash_profile && source ~/.bash_profile
# Linux
echo $npmpath >> ~/.bashrc && source ~/.bashrc
```

## Install the Babel ESNext Transpiler

The new JavaScript language features in [ESNext](https://babeljs.io/docs/learn-es6/) will eventually make it into V8, on which node.js and io.js run. Rather than wait for V8 to support ESNext, we'll use [Babel](https://babeljs.io/docs/using-babel/) to [transpile](http://en.wikipedia.org/wiki/Source-to-source_compiler) ESNext code into a JavaScript version currently supported by node.js and io.js.

```bash
npm install -g babel                                 # Install Babel
# Alias babel-node to bode with strict and experimental turned on
bodealias="alias bode='babel-node --optional strict --stage 1 -- '"
echo $bodealias >> ~/.bash_profile                   # Persist alias
bode -e 'console.log(`hello`)'                       # Use ESNext today
```

## Install ESLint

To avoid common mistakes, we'll use [eslint](http://eslint.org/docs/rules/) to lint our code throughout development.

```bash
npm install -g eslint
```

Typically, we won't run eslint directly. Instead, we will will depend on IDE or text editor integration. 

For ESLint configuration, we'll expect a .eslintrc file to exist at the root of our project (`SublimeLinter-contrib-eslint` will also pick it up from `~/.eslintrc`). We recommended the following [.eslintrc](https://github.com/codepath/nodejs_guides/blob/master/.eslintrc): 

```json
{
  "env": {
    "node": true,
    "es6": true
  },
  "parser": "babel-eslint",
  "rules": {
    "curly": [2, "multi-line"],
    "no-throw-literal": 1,
    "strict": "never",
    "semi": [2, "never"],
    "quotes": "single",
    "no-var": 1,
    "eol-last": 1,
    "no-new-require": 1,
    "no-sync": 1,
    "no-mixed-requires": [1, false],
    "comma-dangle": 0,
    "new-cap": [2, {
      "capIsNewExceptions": ["Schema"]
    }]
  }
}
```

## Install the nodemon daemon

We'll frequently use  `nodemon` to create a server daemon to watch our project files and auto-restart on changes and crashes.

1. Install nodemon:

  ```bash
  npm install -g nodemon
  ```
1. Use nodemon to start your server:

  ```bash
  nodemon --exec babel-node -- index.js --foo=bar`
  ```

## Install an Editor

### Recommended: Sublime Text

Sublime Text setup steps:

1. [Sublime Text 3](http://www.sublimetext.com/3)
1. [Sublime Package Control](https://packagecontrol.io/installation)
1. [SublimeLinter](https://github.com/SublimeLinter/SublimeLinter3)
1. [SublimeLinter-contrib-eslint](https://github.com/roadhump/SublimeLinter-eslint)
1. [babel-eslint](https://github.com/babel/babel-eslint)

    ```bash
    # You likely have eslint & babel installed from before
    npm install -g eslint babel babel-eslint
    ```
1. [Sublime Babel](https://github.com/babel/babel-sublime)

### IDE Alternatives (in order)

* [Jetbrains WebStorm](https://www.jetbrains.com/webstorm/) ($50 after trial) ([Features](https://www.jetbrains.com/webstorm/features/#nodejs), [Configuration](https://www.jetbrains.com/idea/help/running-and-debugging-node-js.html))
* [Jetbrains IntelliJ](https://www.jetbrains.com/idea) ($199 after trial) ([Features](https://www.jetbrains.com/idea/features/nodejs.html), [Configuration](https://www.jetbrains.com/idea/help/running-and-debugging-node-js.html))
* [Nodeclipse](http://www.nodeclipse.org) (Free)

### Text Editor Alternatives

* [Atom](https://atom.io) (Free) - Github's Hackable Editor
