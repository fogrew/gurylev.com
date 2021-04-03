const content = document.querySelector('.page');
const progressBar = document.querySelector('.progress-bar');

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
