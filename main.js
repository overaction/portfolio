'use strict';

// Make Navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll',() => {
    if(window.scrollY > navbarHeight) {
        navbar.classList.add('navbar--dark');
    } else {
        navbar.classList.remove('navbar--dark');
    }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (e) => {
    const target = e.target;
    const link = target.dataset.link;
    if(link == null) return;
    navbarMenu.classList.remove('clicked');
    scrolling(link);

    // change color when tapping on the navbar menu
    const navbarActive = document.querySelector('.navbar__menu__item.active');
    navbarActive.classList.remove('active');
    const navbarTarget = e.target;
    navbarTarget.classList.add('active');
});

function scrolling(selector) {
    const scrollTo = document.getElementById(selector);
    scrollTo.scrollIntoView({behavior: 'smooth'});
};

// IntersectionObserver
const navbarMenuItems = document.querySelectorAll('.navbar__menu__item');
const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const id = entry.target.id;
        console.log(entry);
        if(entry.intersectionRatio > 0) {
            console.log(id);
            navbarMenuItems.forEach(item => {
                if(id === item.dataset.link) {
                    item.classList.add('active');
                }
            })
        }
        else {
            navbarMenuItems.forEach(item => {
                if(id === item.dataset.link) {
                    item.classList.remove('active');
                }
            })
        }
    })
},{rootMargin: '-400px'})

const sectionList = document.querySelectorAll('.section');
sectionList.forEach((section) => {
    io.observe(section);
})



const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click',() => {
    navbarMenu.classList.toggle('clicked');  
})

// Handle click on "contact me" button on home
const contactMeBtn = document.querySelector('.home__contact');
contactMeBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
});

// Make home transparent
const home = document.querySelector('#home');
const homeContainer = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll',() => {
    homeContainer.style.opacity = 1 - window.scrollY / homeHeight;
});

// Make Arrow Up Button
const arrow = document.querySelector('#arrow');
document.addEventListener('scroll', () => {
    if(window.scrollY > 350) {
        arrow.classList.add('arrow__visible');
    }
    else {
        arrow.classList.remove('arrow__visible');
    }
});

arrow.addEventListener('click', () => {
    scrollIntoView('#home');
});

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: 'smooth'});
}


// Projects //
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null) return;

    // Remove selection from the previous item and select the new one
    const btnActive = document.querySelector('.category__btn.selected');
    btnActive.classList.remove('selected');
    const btnTarget = 
        e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    btnTarget.classList.add('selected');

    // category Count
    const countVisible = document.querySelector('.category__count.visible');
    countVisible.classList.remove('visible');
    const countTarget = 
        e.target.nodeName === 'SPAN' ? e.target : e.target.firstElementChild;
    countTarget.classList.add('visible');


    projectContainer.classList.add('anime-out');
    setTimeout(() => {
        projectContainer.classList.remove('anime-out');
        projects.forEach((pro) => {
        if(filter === '*' || filter === pro.dataset.type) {
            pro.classList.remove('invisible');
        }
        else {
            pro.classList.add('invisible');
        }
    })
    },300);
})
