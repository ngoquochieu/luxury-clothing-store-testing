function find(cssQuery) {
    return document.querySelector(cssQuery);
}
//  Preferred
const
    container_details_js = find('.container-details-js'),
    fade_js = find('.fade-js'),
    show_more = find('.show-more'),
    show_less = find('.show-less');

// Listener
show_more.addEventListener('click', () => {
    container_details_js.classList.add('show');
    show_more.classList.toggle('open');
    show_less.classList.toggle('open');
});
show_less.addEventListener('click', () => {
    container_details_js.classList.remove('show');
    show_more.classList.toggle('open');
    show_less.classList.toggle('open');
});
