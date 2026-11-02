// Shares the existing works collection and filters with the grid and detail dialog.
const exhibition=document.querySelector('#exhibition');
const exhibitionImage=document.querySelector('#exhibition-image');
const thumbnails=document.querySelector('.exhibition-thumbnails');
let exhibitionIndex=0;
function renderExhibition(){
  if(!visible.length)return;
  exhibitionIndex=Math.min(exhibitionIndex,visible.length-1);
  const work=visible[exhibitionIndex];
  exhibitionImage.src=`assets/${work.file}.svg`;
  exhibitionImage.alt=`示例插画：${work.title}，非宫建宇作品`;
  document.querySelector('#exhibition-title').textContent=work.title;
  document.querySelector('#exhibition-description').textContent=work.description;
  document.querySelector('#exhibition-counter').textContent=`${String(exhibitionIndex+1).padStart(2,'0')} / ${String(visible.length).padStart(2,'0')}`;
  thumbnails.replaceChildren(...visible.map((item,index)=>{
    const button=document.createElement('button');
    button.type='button';button.setAttribute('aria-label',`选择作品：${item.title}`);
    button.setAttribute('aria-pressed',String(index===exhibitionIndex));
    const image=document.createElement('img');image.src=`assets/${item.file}.svg`;image.alt='';
    const number=document.createElement('span');number.textContent=String(index+1).padStart(2,'0');
    button.append(image,number);button.addEventListener('click',()=>{exhibitionIndex=index;renderExhibition()});return button;
  }));
}
function moveExhibition(step){exhibitionIndex=(exhibitionIndex+step+visible.length)%visible.length;renderExhibition()}
document.querySelector('#exhibition-prev').addEventListener('click',()=>moveExhibition(-1));
document.querySelector('#exhibition-next').addEventListener('click',()=>moveExhibition(1));
document.querySelector('.exhibition-art').addEventListener('click',event=>{lastFocus=event.currentTarget;current=exhibitionIndex;showWork();dialog.showModal();document.body.classList.add('modal-open')});
exhibition.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();moveExhibition(1)}if(event.key==='ArrowLeft'){event.preventDefault();moveExhibition(-1)}});
let touchStart;
exhibition.addEventListener('touchstart',event=>{const t=event.changedTouches[0];touchStart={x:t.clientX,y:t.clientY}},{passive:true});
exhibition.addEventListener('touchend',event=>{if(!touchStart)return;const t=event.changedTouches[0],dx=t.clientX-touchStart.x,dy=t.clientY-touchStart.y;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.4)moveExhibition(dx<0?1:-1);touchStart=null},{passive:true});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{exhibitionIndex=0;renderExhibition()}));
document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{const isExhibition=button.dataset.mode==='exhibition';exhibition.hidden=!isExhibition;gallery.hidden=isExhibition;document.querySelectorAll('[data-mode]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)))}));
const progress=document.querySelector('.reading-progress');
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.transform=`scaleX(${max>0?scrollY/max:0})`}
addEventListener('scroll',updateProgress,{passive:true});addEventListener('resize',updateProgress);addEventListener('load',updateProgress);updateProgress();renderExhibition();
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.06});document.querySelectorAll('.artist,.career,.publications,.criticism').forEach(section=>{section.classList.add('reveal-section');observer.observe(section)})}

const entry=document.createElement('button');entry.type='button';entry.className='exhibition-entry';entry.textContent='进入互动展厅 ↗';entry.addEventListener('click',()=>{document.querySelector('[data-mode="exhibition"]').click();document.querySelector('#works').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});document.body.append(entry);
