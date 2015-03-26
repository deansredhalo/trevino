var TrittImporter = TrittImporter || {}
var elementName
var link

TrittImporter.init = function () {
  window.addEventListener('HTMLImportsLoaded', function () {
    link = document.querySelector('link[rel="import"]')
    TrittImporter.removeTrittBase(link)
    TrittImporter.parseImports(link)
    TrittImporter.applyScripts(link)
  })
}

TrittImporter.removeTrittBase = function (link) {
  var content = link.import
  var script = content.querySelector('script[src="../bower_components/tritt/tritt.js"]')
  script.remove()
}

TrittImporter.parseImports = function (link) {
  elementName = link.attributes.href.value.split('.')[0]
  var content = link.import
  var el = content.querySelector(elementName)
  var hostElement = document.querySelector(elementName)
  document.body.insertBefore(el.cloneNode(true), hostElement)
  document.body.removeChild(hostElement)
}

TrittImporter.applyScripts = function (link) {
  var content = link.import
  var scripts = content.querySelectorAll('script')
  var head = document.querySelector('head')
  var scriptName
  var scriptContents
  var scriptNode

  scriptNode = document.createElement('script')
  scriptNode.setAttribute('type', 'text/javascript')

  for (var i = 0; i < scripts.length; i++) {
    scriptName = elementName + '.js'
    if (scripts[i].attributes.src && scripts[i].attributes.src.value === scriptName) {
      scriptContents = scripts[i].attributes.src.value
      TrittImporter.fetchScript(scriptContents).then(function (response) {
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

TrittImporter.fetchScript = function (script) {
  var xmlhttp

  // create a new Promise object
  return new Promise(function (resolve, reject) {
      // new XMLHttpRequest object
      xmlhttp = new XMLHttpRequest() //eslint-disable-line
      // do a get
      xmlhttp.open('GET', script, true)
      // if everything goes smoothly, resolve with the contents of the file
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.status === 200 && xmlhttp.readyState === 4) {
          resolve(this.responseText)
        }
      }
      // send our request
      xmlhttp.send()
    })
}

TrittImporter.init()
