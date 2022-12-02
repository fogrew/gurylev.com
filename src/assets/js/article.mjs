const content = document.querySelector('.page');
const progressBar = document.querySelector('.progress-bar');
const toc = document.querySelector('.toc');

let ticking = false;
let windowHeight = window.innerHeight;
let contentHeight = content.offsetHeight;
let contentScrollingPosition = contentHeight - windowHeight;

window.addEventListener('load', () => {
  updateBar();
  document.addEventListener ('scroll', onScroll, { passive: true });
})
window.addEventListener('resize', redefine, { passive: true })

function redefine() {
  windowHeight = window.innerHeight;
  contentHeight = content.offsetHeight;
  contentScrollingPosition = contentHeight - windowHeight;

  updateBar();
}

function onScroll() {
  ticking = ticking || requestAnimationFrame(updateBar);
}

function updateBar() {
  const barWidth = Math.floor(window.scrollY * 100 / contentScrollingPosition);

  ticking = false;
  progressBar.style.width = `${barWidth}%`;
}

const tocLinkNodes = toc.querySelectorAll('a')
const tocLinks = [...tocLinkNodes].map(el => el.attributes.href.value)
const headers = tocLinks.map(el => document.querySelector(el))

console.log(headers)
// function getModulesZone() {
//   tocLinks.forEach(node)
// }
