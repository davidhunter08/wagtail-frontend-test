
(function($) {

  // If there is no guides-nav element, don't activate any of this code
  if ( $('.guides-nav').length == 0 ) {
    return;
  }

  var $items = $('.guides-nav__item')
  var $spacer = $('.guides-nav__spacer')

  /*
    Calculate the initial state based on classes already set
  */
  var state = (function() {
    var initialOpenIndex = null
    $items.each(function(index, element) {
      if( $(element).hasClass('guides-nav__item--selected') ) {
        initialOpenIndex = index
      }
    })

    return {
      openIndex: initialOpenIndex,
      openSubTabs: new Array($items.length).fill(null).map(function() {
        return []
      })
    }
  })()

  /*
    Render function just adds classes to the right elements based on state.
    The render function _must_ be idempotent.
  */
  var render = function() {
    $items.each(function(i, item) {
      var $item = $(item)
      if (state.openIndex === i ) {
        $item.addClass('guides-nav__item--selected')
      } else {
        $item.removeClass('guides-nav__item--selected')
      }

      $item.find('.guides-nav-subnav__item').each(function(j) {
        if (state.openSubTabs[i][j]) {
          $(this).addClass('guides-nav-subnav__item--open')
        } else {
          $(this).removeClass('guides-nav-subnav__item--open')
        }
      })
    })

    // The main tab that is currently open, according to the state object
    var $openItem = state.openIndex !== null ? $($items.get(state.openIndex)) : null

    /*
      After rendering, we need to adjust the height that the main content starts
    */
    var height = 0;
    if( $openItem ) {
      //measure the navigation height, if open.
      var $openSubnav = $openItem.find('.guides-nav__contents')
      height = $openSubnav.height() + 30
    }
    $spacer.css('height', height)

    /*
      After rendering, we need to update the URL (without forcing a page refresh)
      Only do this if history.pushState is supported by the browser
    */


  }

  // initial render on load
  render()

  /*
    Attach click handlers.
    Mutate the state on click and trigger a render
  */
  //TODO use a proper class selector not just > `a`
  $items.each(function(i, item) {
    $(item).find('> a').on('click', function(e) {
      e.preventDefault()
      state.openIndex = state.openIndex === i ? null : i;
      render()
    })

    $(item).find('.guides-nav-subnav__item').each(function(j) {
      var $subitem = $(this)
      $subitem.find('> a').on('click', function(e) {
        e.preventDefault()
        state.openSubTabs[i][j] = !(state.openSubTabs[i][j])
        render()
      })
    })

    /*
      When a tab is opened, it might contain a loading image.
      When the image loads, it will change the tab height so we need to re-render
    */
    $(item).find('img').on('load', function() {
      render()
    })
  })

})(jQuery)
