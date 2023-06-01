//Icons
const darkIcon = document.getElementById('theme-toggle-dark-icon');
const lightIcon = document.getElementById('theme-toggle-light-icon');

//Theme vars
const userTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches

// Change the icons inside the button
const iconToggle = () => {
    lightIcon.classList.toggle('hidden');
    darkIcon.classList.toggle('hidden');
};

//Theme check
const themeCheck = () =>{

    if((userTheme === 'dark')||(!userTheme && systemTheme)){
        document.documentElement.classList.add('dark')
        darkIcon.classList.add('hidden');
        return;
    }
    lightIcon.classList.add('hidden');
}

//Manually changing theme
const themeSwitch = () =>{

    if(document.documentElement.classList.contains('dark')){
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        iconToggle();
        return;
    };
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    iconToggle();

};

//Switching theme by clicking the button
const button = document.getElementById('theme-toggle');

button.addEventListener('click', () => {
    themeSwitch();
});

//Checking theme on load
themeCheck();