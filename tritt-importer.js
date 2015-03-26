var TrittImporter = TrittImporter || {}
var bodyFOUC
var head
var elementName
var link
var content
var el

TrittImporter.init = function () {
  TrittImporter.preventFOUC('hide')
  window.addEventListener('HTMLImportsLoaded', function () {
    link = document.querySelector('link[rel="import"]')
    content = link.import
    TrittImporter.removeTrittBase()
    TrittImporter.parseImports()
    TrittImporter.applyScripts()
    TrittImporter.preventFOUC('show')
  })
}

TrittImporter.preventFOUC = function (status) {
  if (status === 'hide') {
    bodyFOUC = document.createElement('style')
    bodyFOUC.textContent = 'body { opacity: 0; }'
    head = document.querySelector('head')
    head.insertBefore(bodyFOUC, head.firstChild)
  } else {
    head.firstChild.remove()
  }
}

TrittImporter.removeTrittBase = function () {
  var script = content.querySelector('script[src="../bower_components/tritt/tritt.js"]')
  script.remove()
}

TrittImporter.parseImports = function () {
  elementName = link.attributes.href.value.split('.')[0]
  el = content.querySelector(elementName)
  var hostElement = document.querySelector(elementName)
  TrittImporter.distributeContent(hostElement)
  document.body.insertBefore(el.cloneNode(true), hostElement)
  document.body.removeChild(hostElement)
}

TrittImporter.applyScripts = function () {
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

TrittImporter.distributeContent = function (host) {
  var distributedContent = host.innerHTML
  var contentNode = content.querySelector('distributed-content')
  contentNode.innerHTML = distributedContent
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
