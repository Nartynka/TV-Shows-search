const form = document.querySelector(".searchForm");
const grid = document.querySelector(".grid");

form.addEventListener("submit", async function(e) {
  e.preventDefault();
  grid.innerHTML = "";
  const searchQuery = form.elements.input.value;
  const res = await axios.get(`http://api.tvmaze.com/search/shows?q=${searchQuery}`);
  displayResults(res.data);
  console.log(res.data);
  form.elements.input.value="";
});

const displayResults = (shows) => {
  if(!shows.length){      let p = document.createElement("p");
  p.innerHTML = "<i>Didn't find anything</i>";
  grid.append(p);}
  for (let show of shows) {
    let container = document.createElement("div");
    let p = document.createElement("p");
    p.innerText = show.show.name;
    container.append(p);
    if (show.show.image) {
      let img = document.createElement("img");
      img.src = show.show.image.medium;
      container.append(img);
    } else {
      let p = document.createElement("p");
      p.innerHTML = "<i>Image not available</i>";
      container.append(p);
    }
    grid.append(container);
  }
};