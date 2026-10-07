{
    const REFRESH_PER_SECONDS = 7;
    const Background = Array.from(document.querySelectorAll('body, html'));

    let index = 0;

    setInterval(_ => {
        index++;
        index %= programedImages.length;

        Background.forEach(element => element.style.backgroundImage = `url(${programedImages[index].image})`);

    }, REFRESH_PER_SECONDS * 1e3);
}
