const darkMode = () =>{
    const elem = document.body;
    const font_select = document.getElementById("font-select");
    const font_variant = document.getElementById("font-variant");
    const dxf_units = document.getElementById("dxf-units");
    const input_fill_rule = document.getElementById("input-fill-rule");
    const output_svg = document.getElementById("output-svg");
    const heading = document.getElementById("heading")
    elem.classList.toggle("--dark--mode");
    font_select.classList.toggle("--select--dark");
    font_variant.classList.toggle("--select--dark");
    dxf_units.classList.toggle("--select--dark");
    input_fill_rule.classList.toggle("--select--dark");
    output_svg.classList.toggle("--output--svg--dark");
    heading.classList.toggle("--dark--text");
}
const dm = document.getElementById("dm");
dm.addEventListener("click",()=>{
    darkMode();
});
