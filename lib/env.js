'use strict'
const checkPoints = [
    'sql', 'dir', 'request',
    'readFile', 'writeFile', 'fileUpload',
    'command', 'xxe', 'ognl', 'deserialization']

const Attack = class extends Error {
    constructor (...args) {
        super(...args)
        Object.defineProperty(this, 'name', {
            value: 'Attack'
        })
        Error.captureStackTrace(this, Attack)
    }
}

const PluginError = class extends Error {
    constructor (...args) {
        super(...args)
        Object.defineProperty(this, 'name', {
            value: 'PluginError'
        })
        Error.captureStackTrace(this, Attack)
    }
}

const RASP = class {
    constructor (name) {
        if (typeof(name) !== 'string' || name.length == 0) {
            throw new TypeError('Plugin name must be a string')
        }
        this.name = name
        RASP.plugins[name] = this
    }

    static check (checkPoint, checkParams, checkContext) {
        if (typeof(checkPoint) !== 'string' || checkPoint.length == 0) {
            throw new TypeError('Check point name must be a string')
        }
        if (checkPoints.indexOf(checkPoint) == -1) {
            throw new Error('Unknown check point name \'' + checkPoint + '\'')
        }
        let results = RASP.checkProcesses[checkPoint].map(checkProcess => {
            let result = {}
            try {
                result = checkProcess.func(checkParams, checkContext)
            } catch (e) {
                result.message = e.message
                result.action = e instanceof Attack ? 'block' : 'log'
            }
            result.action = result.action || 'log'
            result.message = result.message || ''
            result.name = result.name || checkProcess.plugin.name
            return result
        })
        return results
    }

    register (checkPoint, checkProcess) {
        if (typeof(checkPoint) !== 'string' || checkPoint.length == 0) {
            throw new TypeError('Check point name must be a string')
        }
        if (checkPoints.indexOf(checkPoint) == -1) {
            throw new Error('Unknown check point name \'' + checkPoint + '\'')
        }
        if (typeof(checkProcess) !== 'function') {
            throw new TypeError('Check process must be a function')
        }
        RASP.checkProcesses[checkPoint].push({
            func: checkProcess,
            plugin: this
        })
    }

    log (...args) {
        console.log('[' + this.name + ']', ...args)
    }

    request () {}

    getCache () {}

    setCache () {}
}
RASP.plugins = {}
RASP.checkProcesses = {}
checkPoints.forEach(checkPoint => RASP.checkProcesses[checkPoint] = [])
Object.freeze(RASP)

let g
if (typeof(global) === 'object') {
    g = global
} else if (typeof(window) === 'object') {
    g = window
} else {
    g = this
}
Object.defineProperty(g, 'Attack', {
    value: Attack,
    enumerable: true
})
Object.defineProperty(g, 'PluginError', {
    value: PluginError,
    enumerable: true
})
Object.defineProperty(g, 'RASP', {
    value: RASP,
    enumerable: true
})
