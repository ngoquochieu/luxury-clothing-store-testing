function find(cssQuery) {
    return document.querySelector(cssQuery);
}
const 
    loginText = find('.title-text .login'),
    loginForm = find('form.login'),
    loginBtn = find('label.login'),
    signupBtn = find('label.signup'),
    signupLink = find('form .signup-link a');

const styles = [ loginForm.style, loginText.style]
signupBtn.onclick = () => {
    for(const style of styles)
        style.marginLeft = `-50%`;
};
loginBtn.onclick = () => {
    for(const style of styles)
        style.marginLeft = `0%`;
};
signupLink.onclick = () => {
    signupBtn.click();
    return false;
};
