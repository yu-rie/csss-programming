let header = document.getElementById('header');
const button = document.querySelector( 'button' );
let degree = 0;
function rotateHeader() {
  degree = degree + 6;
  degree = degree % 360;
  if (degree === 90) {
    header.setAttribute('class', 'back');
  } else if (degree === 270) {
    header.setAttribute('class', 'face');
  }
  header.style.transform = 'rotateX(' + degree + 'deg)';
}

const distanceBetween = ( p1x, p1y, p2x, p2y ) => {
  const dx = p1x-p2x;
  const dy = p1y-p2y;
  return Math.sqrt( dx*dx + dy*dy );
};

document.addEventListener( 'mousemove', event => {
    const radius = Math.max( button.offsetWidth*0.75, button.offsetHeight*0.75, 100 );

    const bx = button.parentNode.offsetLeft + button.offsetLeft + button.offsetWidth/2;
    const by = button.parentNode.offsetTop + button.offsetTop + button.offsetHeight/2;

    const dist = distanceBetween( event.clientX, event.clientY, bx, by );
    const angle = Math.atan2( event.clientY - by, event.clientX - bx );

    const ox = -1 * Math.cos( angle ) * Math.max( ( radius - dist ), 0 );
    const oy = -1 * Math.sin( angle ) * Math.max( ( radius - dist ), 0 );

    const rx = oy / 2;
    const ry = -ox / 2;

    button.style.transition = `all 0.1s ease`;
    button.style.transform = `translate(${ox}px, ${oy}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    button.style.boxShadow = `0px ${Math.abs(oy)}px ${Math.abs(oy)/radius*40}px rgba(0,0,0,0.15)`;
    } );

const nocheat = () => button.textContent = 'チート禁止！！';
const notouch = () => button.textContent = 'タッチは使わないでね';

button.addEventListener( 'click', event => {
    if (button.textContent != 'タッチは使わないでね'){
      button.textContent = 'おめでとう！🎉' ;
      setInterval(rotateHeader, 20);
      }
    button.textContent = '回転';
    })
button.addEventListener( 'keydown', event => { event.preventDefault(); nocheat(); } );
button.click = nocheat;

if( navigator.userAgent.match( /Android|iPhone|iPad|iPod/i ) ) notouch();
window.addEventListener( 'touchstart', notouch );
