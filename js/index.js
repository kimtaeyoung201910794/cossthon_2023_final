

window.addEventListener("wheel", (e) => {
    e.preventDefault();
}, {passive : false});

const $html = $("html");
const lastPage = $("section").length;
let page = 1;

$html.animate({scrollTop:0}, 10);

$(window).on("wheel", (e) => {
	if ($html.is(":animated")) return;
 
	if (e.originalEvent.deltaY > 0){
		if(page == lastPage) return;
		page++;
	}

    if (e.originalEvent.deltaY < 0) {
		if(page == 1) return;
		page--;
	}

	const posTop = (page-1) * $(window).height();
	$html.animate({scrollTop : posTop});
});


$(() => {
    $(document).on('scroll', function(){
        if ($(window).scrollTop() > 100){
            $(".menu").addClass("menuStrong");
        }
        else {
            $(".menu").removeClass("menuStrong");
        }
    })
});

const burgAnimation = () =>{
    const burger = document.querySelector('.svgburg');
    const path1 = document.querySelector('.path1');
    const path2 = document.querySelector('.path2');
    const mline = document.querySelector('.mline');

    burger.addEventListener('click',() =>{     
        path1.classList.toggle('cross');
        path2.classList.toggle('cross');
        mline.classList.toggle('hide');

        const tl = gsap.timeline();
        tl.from('.sitemap', {duration: 0.6, x: -2000});
    });
}
burgAnimation();





// MENU CLICK EVENT
const menuIcon = document.querySelector(".menu");
const sitemap = document.querySelector(".sitemap");

function menuOpen() {
    sitemap.classList.remove("hidden");
    if ($(window).scrollTop() < 100){
        $(".menu").addClass("menuStrong");
    }
}

function menuClose() {
    sitemap.classList.add("hidden");    
}

menuIcon.addEventListener('click', () => {
    if (sitemap.classList.contains('hidden')) {
        menuOpen();
    }
    else {
       menuClose();
    }
});





//SECTION2 MOUSE HOVER HANDLER
const mouseOverHandler = (event) => {
    const child = document.getElementById(event.target.children[1].id);
    if (child.classList.contains("hidden")) {
        child.classList.remove("hidden");
    }
}
const mouseLeaveHandler = (event) => {
    const child = document.getElementById(event.target.children[1].id);
    if (!child.classList.contains("hidden")) {
        child.classList.add("hidden");
    }
}
const items = document.querySelectorAll('.i');
[].forEach.call(items ,(item) => { 
    item.addEventListener("mouseover", mouseOverHandler, false); 
    item.addEventListener("mouseleave", mouseLeaveHandler, false);
});

// SECTION 더 알아보기 HANDLER
const more_mouseClickHandler = () => {

}

const moreItems = document.querySelectorAll('.more');
[].forEach.call(moreItems ,(item) => { 
    item.addEventListener("click", more_mouseClickHandler, false); 
});