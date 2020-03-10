/*

  Navigation cards - used to scroll through multiple articles

*/

let navCards = (function()
{
  // Handles background logic
  let model = (function()
  {
    let data =
    {
      pages:
      {
        count: 0
      }
    };

    let setElement = function(arg)
    {
      data.element = arg;
    };

    return {
      init: function(arg)
      {
        setElement(arg);
      },

      setPageCount: function(parent, item)
      {
        let items = $("#" + parent).find("." + item).toArray();
        data.pages.count = items.length;
      },

      getPageCount: function()
      {
        return data.pages.count;
      }
    }
  })();


  // Handles DOM elements
  let view = (function()
  {
    let element = "";

    let strings =
    {
      base: [],
      navcards: []
    }

    // Set the element that we're going to work with
    let setElement = function(arg)
    {
      element = arg;
    };

    let setStrings = function(args)
    {
      strings.base = args[1][0]
      strings.navcards = args[1][1];
    }

    // Add pagination controls to the page
    let addPagination = function(count)
    {
      let paginationStart =
      `
      <div class="${strings.navcards.navcards}${strings.navcards.pagination}">
        <ul class="${strings.navcards.navcards}${strings.navcards.pages}">
      `;

      let paginationEnd =
      `
        </ul>
      </div>
      `;

      let paginationItem =
      `
      <li class="${strings.navcards.navcards}${strings.navcards.page}">
        <a href="#" class="${strings.base.linkfill}"></a>
      </li>
      `;

      let paginationItemActive =
      `
      <li class="${strings.navcards.navcards}${strings.navcards.page} ${strings.navcards.navcards}${strings.navcards.pageActive}">
        <a href="#" class="${strings.base.linkfill}"></a>
      </li>
      `;

      let paginationPages = "";

      // Create as many pages as we have items
      for (var i = 1; i <= count; i++)
      {
        if (i == 1)
        {
          paginationPages += paginationItemActive;
        }
        else
        {
          paginationPages += paginationItem;
        }
      }

      let pagination = paginationStart + paginationPages + paginationEnd;

      $("#" + element).append(pagination);
    }

    return {
      init: function(args)
      {
        let element = args[0];
        let strings = args[1];
        setElement(element);
        setStrings(args);
      },

      getElement: function()
      {
        return element;
      },

      getItemClass: function()
      {
        return (strings.navcards.navcards + strings.navcards.item);
      },

      paginationInit: function(count)
      {
        addPagination(count);
      }
    }
  })();



  let controller = (function(m, v)
  {
    return {
      init: function(args)
      {
        v.init(args);
        m.init(args[1]);
        m.setPageCount(v.getElement(), v.getItemClass());
        v.paginationInit(m.getPageCount());
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

export { navCards };
