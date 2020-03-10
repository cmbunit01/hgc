/*

  Passing string args
  0 - base strings
  1 - fullscreenMenu strings
  2 - hamburger strings

*/

let fullscreenMenu = (function()
{
  // Handles background logic
  let model = (function()
  {

  })();


  // Handles DOM elements
  let view = (function()
  {
    // Store any data or handlers for the UI
    let data =
    {
      // Stores the currently active link
      activeLink: ""
    };

    // Stores strings passed by arguments so we can operate with them
    let strings =
    {
      base: [],
      fullscreenMenu: [],
      hamburger: []
    };

    // Disable page scrolling when the menu is active
    let pageNoScroll = function()
    {
      let checkbox = $("." + strings.hamburger.menu + strings.hamburger.checkbox);

      if (checkbox.has(":checked"))
      {
        $("." + strings.fullscreenMenu.menu).on("scroll touchmove mousewheel", function(e)
        {
          e.preventDefault();
          e.stopPropagation();
          return false;
        });
      }
    };

    // Adds the menu toggle event to each main menu item
    let addMenuToggle = function(element)
    {
      $(element).on("click", function(e)
      {
        // Store the currently used link
        data.activeLink = this;

        e.preventDefault();

        // Get the parent so we can use it to toggle the child menu
        let parent = $(this).parent();

        hideOtherMenus(parent);

        // Grey out the inactive menu items
        toggleItemsInactive();

        let current = parent
        .children("." + strings.fullscreenMenu.menu + strings.fullscreenMenu.children).first().toArray()[0];

        if ($(current).hasClass(strings.fullscreenMenu.menu + strings.fullscreenMenu.childrenActive))
        {
          $(current).removeClass(strings.fullscreenMenu.menu + strings.fullscreenMenu.childrenActive);
        }
        else
        {
          $(current).addClass(strings.fullscreenMenu.menu + strings.fullscreenMenu.childrenActive);
        }
      });
    };

    // Change colour of inactive elements to bring focus to active menu item
    let toggleItemsInactive = function()
    {
      let allLinks = $("." + strings.fullscreenMenu.menu + strings.fullscreenMenu.link).toArray();

      allLinks.forEach(function()
      {
        if ($(this) != $(data.activeLink))
        {
          $(this).toggleClass(strings.fullscreenMenu.linkInactive);
        }
      });
    };

    // Hide other child menus when new one selected
    let hideOtherMenus = function(parent)
    {
      let allChildren = $("." + strings.fullscreenMenu.menu + strings.fullscreenMenu.children).toArray();

      allChildren.forEach(el =>
      {
        if ($(el).parent() != parent)
        {
          $(el).removeClass(strings.fullscreenMenu.menu + strings.fullscreenMenu.childrenActive);
        }
      });
    };

    // Adds all events from the app
    let addEvents = function()
    {
      // Get the main menu's items
      let children =
      $("." + strings.fullscreenMenu.menu + strings.fullscreenMenu.main)
      .children("." + strings.fullscreenMenu.menu + strings.fullscreenMenu.item)
      .children("." + strings.fullscreenMenu.menu + strings.fullscreenMenu.link);

      children.each(function()
      {
        addMenuToggle($(this));
      });

      // When user clicks on another menu item, or closes the menu, hide the child menu
      hideMenuOnClose();

      pageNoScroll();
    };

    // Sets the values for the strings object
    let setStrings = function(args)
    {
      strings.fullscreenMenu = args[1];
      strings.hamburger = args[2];
    };

    // When user closes the menu, hide the child menus
    let hideMenuOnClose = function()
    {
      let button = $("." + strings.hamburger.menu + strings.hamburger.button);
      let checkbox = $("." + strings.hamburger.menu + strings.hamburger.checkbox);

      button.on("click", function()
      {
        if (checkbox.is(":checked") == false)
        {
          $("." + strings.fullscreenMenu.menu + strings.fullscreenMenu.children)
          .removeClass(strings.fullscreenMenu.menu + strings.fullscreenMenu.childrenActive);
        }
      });
    };

    return {
      init: function(args)
      {
        setStrings(args);
        addEvents();
      }
    }
  })();


  let controller = (function(m, v)
  {
    return {
      init: function(args)
      {
        v.init(args);
      }
    }
  })(model, view);

  return {
    // Pass in external arguments
    init: function(args)
    {
      controller.init(args);
    }
  }
})();

export { fullscreenMenu };
