//créer la fonction pour l'interpolation
function lerp(a, b, x) {
    return a + x * (b - a);
}

//créer la fonction pour obtenir les valeur de rouge vert et bleu en partant du code hex
function get_rgb_from_hexstr(hexcode) {
    hexcode = hexcode.substring(1, hexcode.length);

    //Obtenir les valeurs de rgb sous string hexa
    red = hexcode.substring(0, 2);
    green = hexcode.substring(2, 4);
    blue = hexcode.substring(4, 6);

    //convertir l'hexa en entier
    red = parseInt(red, 16);
    green = parseInt(green, 16);
    blue = parseInt(blue, 16);

    //renvoyer les valeurs
    return [red, green, blue];
}

//obtenir la valeur d'une variable de css root
function get_css_var(name) {
    return root_styles.getPropertyValue(name).trim();
}


//accéder aux styles css
const root = document.documentElement;
const root_styles = getComputedStyle(root);


//Obtenir les couleurs de fond ainsi que leur valeurs rgb
const background_color = {
    'first': {
        'color_1': get_rgb_from_hexstr(get_css_var('--background-color-1')),
        'color_2': get_rgb_from_hexstr(get_css_var('--background-color-2')),
    },
    'last': {
        'color_1': get_rgb_from_hexstr(get_css_var('--background-color-3')),
        'color_2': get_rgb_from_hexstr(get_css_var('--background-color-4')),
    }
}


console.log(background_color);

//modifier l'arrière plan avec le scroll (issu de Extension_Anybody150 sur reddit puis remanié à ma sauce)
/* l'original
window.addEventListener("scroll", () => {
  let scrollPosition = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  document.documentElement.style.setProperty("--accent-color", `rgb(${255 - scrollPosition * 255}, ${100 + scrollPosition * 100}, ${scrollPosition * 255})`);
});
*/
window.addEventListener("scroll", () => {
    let scroll_position = window.scrollY / (document.body.scrollHeight - window.innerHeight);

    //Couleur 1 du dégradé
    let bg_col1_red = lerp(background_color['first']['color_1'][0], background_color['last']['color_1'][0], scroll_position);
    let bg_col1_green = lerp(background_color['first']['color_1'][1], background_color['last']['color_1'][1], scroll_position);
    let bg_col1_blue = lerp(background_color['first']['color_1'][2], background_color['last']['color_1'][2], scroll_position);

    //couleur 2 du dégradé
    let bg_col2_red = lerp(background_color['first']['color_2'][0], background_color['last']['color_2'][0], scroll_position);
    let bg_col2_green = lerp(background_color['first']['color_2'][1], background_color['last']['color_2'][1], scroll_position);
    let bg_col2_blue = lerp(background_color['first']['color_2'][2], background_color['last']['color_2'][2], scroll_position);

    root.style.setProperty('--background-gradient-color-1', `rgb(${bg_col1_red}, ${bg_col1_green}, ${bg_col1_blue})`);
    root.style.setProperty('--background-gradient-color-2', `rgb(${bg_col2_red}, ${bg_col2_green}, ${bg_col2_blue})`);
});