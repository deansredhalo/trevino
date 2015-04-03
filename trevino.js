'use strict'

/****************************************************
*
* Trevino.js
* Simple, HTML imports for
* modular Tritt elements.
*
* Author: T-Jay Tipps
* https://github.com/deansredhalo/tritt-importer
*
****************************************************/

// namespace
var Trevino = Trevino || {}

/**
 * Global variables for all items that we create.
 *
 * @global
 */
var bodyFOUC
var head
var elementName
var link
var content
var el

/*
 * Main initialization function
 *
 * @function init
 */
Trevino.init = function () {
  Trevino.preventFOUC('hide')
  window.addEventListener('HTMLImportsLoaded', function () {
    link = document.querySelector('link[rel="import"]')
    content = link.import
    Trevino.removeTrittBase()
    Trevino.parseImports()
    Trevino.applyScripts()
    Trevino.preventFOUC('show')
  })
}

/*
 * Hide body to prevent FOUC
 *
 * @function preventFOUC
 * @param {string} status Either 'show' or 'hide'.
 */
Trevino.preventFOUC = function (status) {
  if (status === 'hide') {
    bodyFOUC = document.createElement('style')
    bodyFOUC.textContent = 'body { opacity: 0; }'
    head = document.querySelector('head')
    head.insertBefore(bodyFOUC, head.firstChild)
  } else {
    head.firstChild.remove()
  }
}

/*
 * Removes the main Tritt script from the imported page.
 *
 * @function removeTrittBase
 */
Trevino.removeTrittBase = function () {
  var script = content.querySelector('script[src="../bower_components/tritt/tritt.js"]')
  script.remove()
}

/*
 * This is the main chunk of work.  Finds the imports
 * and does the dirty work of parsing them and placing
 * them in the document in their proper place.
 *
 * @function parseImports
 */
Trevino.parseImports = function () {
  elementName = link.attributes.href.value.split('.')[0]
  el = content.querySelector(elementName)
  var hostElement = document.querySelector(elementName)
  Trevino.distributeContent(hostElement)
  document.body.insertBefore(el.cloneNode(true), hostElement)
  document.body.removeChild(hostElement)
}

/*
 * Grabs the scripts on the import and
 * parses them into the main document.
 *
 * @function applyScripts
 */
Trevino.applyScripts = function () {
  var scripts = content.querySelectorAll('script')
  var scriptName
  var scriptContents
  var scriptNode

  scriptNode = document.createElement('script')
  scriptNode.setAttribute('type', 'text/javascript')

  for (var i = 0; i < scripts.length; i++) {
    scriptName = elementName + '.js'
    if (scripts[i].attributes.src && scripts[i].attributes.src.value === scriptName) {
      scriptContents = scripts[i].attributes.src.value
      Trevino.fetchScript(scriptContents).then(function (response) {
        scriptNode.textContent = response
        head.appendChild(scriptNode)
      })
    } else {
      scriptContents = scripts[i].textContent
      scriptNode.textContent = scriptContents
      head.appendChild(scriptNode)
      scripts[i].remove()
    }
  }
}

/*
 * Copies the content found inside the element on the main doc
 * and places it inside the <content> tag in the custom element.
 *
 * @function distributeContent
 * @param {object} host The element that is going to receive the content.
 */
Trevino.distributeContent = function (host) {
  var distributedContent = host.innerHTML
  var contentNode = content.querySelector('content')
  contentNode.innerHTML = distributedContent
}

/*
 * Helper function to go get our script file.
 *
 * @function fetchScript
 * @param {string} script Filename to go and get
 * @returns {string} response The responseText of the file
 */
Trevino.fetchScript = function (script) {
  var xmlhttp

  return new Promise(function (resolve, reject) {
      xmlhttp = new XMLHttpRequest() //eslint-disable-line
      xmlhttp.open('GET', script, true)
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.status === 200 && xmlhttp.readyState === 4) {
          resolve(this.responseText)
        }
      }
      xmlhttp.send()
    })
}

Trevino.init()
