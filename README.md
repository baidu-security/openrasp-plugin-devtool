# OpenRASP

A CLI tool for [OpenRASP](https://rasp.baidu.com) JavaScript plugins development.

### Installation

Prerequisites: [Node.js](https://nodejs.org) (>=4.x) with npm version 3+

```bash
$ npm install -g openrasp
```

### Usage

Check the ability and syntax of the plugin:

```bash
$ Usage: rasp-check

Options:
  -d, --case-dir <dir>        specify a testcases directory
  -p, --plugin-file <plugin>  specify a javascript plugin file
  -h, --help                  output usage information
```
Example:

```bash
$ rasp check -d ~/openrasp/agent/java/engine/src/test/resources/pluginUnitTest/unitCases/ -p ~/openrasp/plugins/official/plugin.js
[offical] OpenRASP official plugin: Initialized, version 2018-1010-1600

  ✓ sql.json Simple userinput match test: 9ms
  ✓ sql.json SQL injection with hex values: 1ms
  ✓ sql.json SQL injection with datetime methods: 2ms
  ✓ ssrf.json SSRF userinput match test: 2ms
  ✓ ssrf.json SSRF false positive test: 1ms

  5 passing (26ms)
```
