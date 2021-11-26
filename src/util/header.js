function find(cssQuery) {
    return document.querySelector(cssQuery);
}
//  Preferred
const 
    profile = find('.action .profile'),
    toggleMenu = find('.menu'),
    js_login = find('#js-login'),
    login_form = find('#login-form'),
    js_logout = find('#js-logout'),
    logout_form = find('#logout-form'),
    menu = find('.menu'),
    icon_selection = find('.icon-selection'),
    user_img = find('#user-img'),
    user_name = find('#user-name'),
    profile_form = find('#profile-form'),
    js_my_profile = find('#js-my-profile');
    
    if(js_login) {
        icon_selection.addEventListener('click', (event) => {
            if (event.target.nodeName != 'A') return;
            return false; // prevent browser action (don't go to the URL)
        });
        //Login form
        js_login.addEventListener('click', () => {
        login_form.submit();
        })
    }else {
        menu.addEventListener('click', (event) => {
            if (event.target.nodeName != 'A') return;
            return false; // prevent browser action (don't go to the URL)
        });
        profile.addEventListener('click', ()=> {
            toggleMenu.classList.toggle('active');
        });      
        //Logout form
        js_logout.addEventListener('click', () => {
            logout_form.submit();
        });
        //profile-form
        js_my_profile.addEventListener('click',() => {
            profile_form.submit();
        });
        //Get cookie user
        if(document.cookie) {
            const cookieUser = decodeURIComponent(document.cookie);
            if(cookieUser) {
                const userInfo = JSON.parse(cookieUser.slice(cookieUser.indexOf('{')));
                user_img.src = userInfo.img;
                user_name.innerHTML = userInfo.fullname;
            }
        }
    }
    
   
 
