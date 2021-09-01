const img = document.querySelector('.js-img');
const imgWrapper = document.querySelector('.ollivon-wp');
const shadow = document.querySelector('.raid-shadow-legend');

let boxOffsetX = 0;
let boxOffsetY = 0;
let xRatioEased = 0;
let yRatioEased = 0;

document.addEventListener('mousemove', (e) => {
	const xRatio = e.clientX / window.innerWidth * 2 - 1;
	xRatio >= 0 ? (xRatioEased = easeOutExpo(xRatio)) : (xRatioEased = -easeOutExpo(-xRatio));

	const yRatio = e.clientY / window.innerHeight * 2 - 1;
	yRatio >= 0 ? (yRatioEased = easeOutExpo(yRatio)) : (yRatioEased = -easeOutExpo(-yRatio));
});
window.addEventListener('resize', initShadow);
function easeOutExpo(x) {
	return x * 1;
}

function initShadow() {
	shadow.style.height = imgWrapper.getBoundingClientRect().height + 'px';
	shadow.style.width = imgWrapper.getBoundingClientRect().width + 'px';
}

let shadowOffsetX = 0;
let shadowOffsetY = 0;

function raf() {
	moveBox();
	moveShadow();
	requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
function lerp(start, end, amt) {
	return (1 - amt) * start + amt * end;
}

function moveBox() {
	const speedFactor = 10;

	const speedReducer = 30;
	boxOffsetY = lerp(boxOffsetY, yRatioEased * speedFactor, 1 / speedReducer);
	boxOffsetX = lerp(boxOffsetX, xRatioEased * speedFactor, 1 / speedReducer);

	img.style.transform = `translate3D(${boxOffsetX}px, -${boxOffsetY}px, ${0})`;
	imgWrapper.style.transform = `translate3D(calc(-50% + ${boxOffsetX}px), calc(-50% + ${boxOffsetY}px), ${0})`;
}
function moveShadow() {
	const speedReducer = 30;
	shadowOffsetY = lerp(shadowOffsetY, boxOffsetY, 1 / speedReducer);
	shadowOffsetX = lerp(shadowOffsetX, boxOffsetX, 1 / speedReducer);
	shadow.style.transform = `translate3D(calc(-50% + ${shadowOffsetX}px), calc(-50% + ${shadowOffsetY}px), ${0})`;
}
