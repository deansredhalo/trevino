Tritt('custom-greeting', { //eslint-disable-line
  events: {
    changeGreeting: function (rootElement, rootShadow, bindings) {
      rootElement.addEventListener('mouseover', function () {
        bindings.userName = 'Travis Tritt!'
      })
      rootElement.addEventListener('mouseout', function () {
        bindings.userName = 'Reveal user name...'
      })
    }
  },
  bindings: {
    userName: 'Reveal user name...'
  }
})
