// Editorial navigation and searchable exhibition archive.
const archiveQuery=document.querySelector('#archive-query');
const archiveRecords=[...document.querySelectorAll('.career-groups .timeline li')];
const groups=[...document.querySelectorAll('.career-groups .archive-group')];
let previousOpen;
archiveQuery.addEventListener('input',()=>{
 const query=archiveQuery.value.trim().toLocaleLowerCase();
 if(query&&!previousOpen)previousOpen=groups.map(group=>group.open);
 let matches=0;
 archiveRecords.forEach(record=>{const year=record.closest('.timeline-row').querySelector('h3').textContent;record.hidden=!!query&&!`${year} ${record.textContent}`.toLocaleLowerCase().includes(query);if(!record.hidden)matches++});
 document.querySelectorAll('.career-groups .timeline-row').forEach(row=>{row.hidden=![...row.querySelectorAll('li')].some(li=>!li.hidden)});
 groups.forEach((group,index)=>{group.hidden=!!query&&![...group.querySelectorAll('li')].some(li=>!li.hidden);if(query&&!group.hidden)group.open=true;else if(!query&&previousOpen)group.open=previousOpen[index]});
 if(!query)previousOpen=null;
 document.querySelector('#archive-search-count').textContent=`${matches} 项记录`;
 document.querySelector('#archive-empty').hidden=matches!==0;
});
const sections=[...document.querySelectorAll('main section[id]')];
const navLinks=[...document.querySelectorAll('nav a')];
const header=document.querySelector('.header');
let navigationTick=false;
function updateNavigation(){header.classList.toggle('scrolled',scrollY>30);let active=sections[0]?.id;for(const section of sections){if(section.getBoundingClientRect().top<innerHeight*.36)active=section.id}navLinks.forEach(link=>{if(link.hash===`#${active}`)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current')});navigationTick=false}
addEventListener('scroll',()=>{if(!navigationTick){navigationTick=true;requestAnimationFrame(updateNavigation)}},{passive:true});updateNavigation();
// Preserve original artwork colors throughout the monochrome interface.
// Open on the editorial contact sheet; the immersive gallery remains one click away.
document.querySelector('[data-mode="grid"]').click();

// Derive the collection count from uploaded works as the archive grows.
const collectionCount=document.querySelector('[data-filter="all"] sup');if(collectionCount)collectionCount.textContent=String(works.length).padStart(2,'0');
