module.exports = {
  allContent: (collection) => {
    return collection.getAll();
  },
  tagList: (collection) => {
    let tagSet = new Set();

    collection.getAll().forEach(function(item) {
      if( "tags" in item.data ) {
        let tags = item.data.tags;

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    })

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet].sort();
  }
}
