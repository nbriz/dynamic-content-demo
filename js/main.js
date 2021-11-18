// start of "asynchronous" logic
(async () => {
  // load the data from a .csv or .json file
  const data = await window.loadData('data/cats.csv')
  // the following code will run as many times as there
  // are items in the data set
  data.forEach(async (item) => {
    // dynamically create html from a template file
    const html = await window.htmlFromTemplate('templates/social.html', item)
    // const html = await htmlFromTemplate('templates/folky.html', item)

    // create a new <div></div> element
    const div = document.createElement('div')
    // add the dynamically created html to our div's content
    div.innerHTML = html
    // create a variable for the parent element
    // that we want to place these new divs inside of
    const main = document.querySelector('#main')
    // add our <div> elements to their parent
    main.appendChild(div)
  })
// end of "asynchronous" logic
})()
