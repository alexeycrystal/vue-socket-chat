const paginator = {
    transformPageLinks(links) {

      let page = links.page;

      if (!page && links.page) {
        let urlParams = new URLSearchParams(links.page);
        page = urlParams.get('page');
      }

      let previous_page = null;
      if (links.prev_page) {
        let urlParams = new URLSearchParams(links.prev_page);
        previous_page = urlParams.get('page');
      }

      let next_page = null;
      if (links.next_page) {
        let urlParams = new URLSearchParams(links.next_page);
        next_page = urlParams.get('page');
      }

      let total_pages = links.total_pages;

      previous_page = previous_page
        ? parseInt(previous_page)
        : null;
      page = page
        ? parseInt(page)
        : null;
      next_page = next_page
        ? parseInt(next_page)
        : null;
      total_pages = total_pages
        ? parseInt(total_pages)
        : null;

      return {
        previous_page,
        page,
        next_page,
        total_pages
      };
    }
}

export default paginator;
