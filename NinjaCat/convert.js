const fs = require('fs');
let c = fs.readFileSync('client/css/app.scss', 'utf8');
const vars = [
    ['$designWidth', '1920'],
    ['$designHeight', '1080'],
    ['$dragElementZIndex', '3'],
    ['$underDragElementZIndex', '2'],
    ['$aboveDragElementZIndex', '4'],
    ['$pink', '#e1238a'],
    ['$darkblue', '#131548']
];

let css = ':root {\n';
vars.forEach(v => {
    css += '    --' + v[0].substring(1) + ': ' + v[1] + ';\n';
});
css += '}\n\n';

c = c.replace(/\$[a-zA-Z0-9_]+:\s*[^;]+;\n?/g, '');
vars.forEach(v => {
    c = c.split(v[0]).join('var(--' + v[0].substring(1) + ')');
});

c = c.replace(/\(\s*([0-9.]+)\s*\/\s*(-?[0-9.]+)\s*\)\s*\*\s*1rem/g, 'calc($1 / $2 * 1rem)');
c = c.replace(/\(\s*var\(--([a-zA-Z0-9_]+)\)\s*\*\s*([0-9.]+)rem\s*\)/g, 'calc(var(--$1) * $2rem)');

c = c.replace(/fade_out\(#26235f,\s*0\.4\)/g, 'rgba(38, 35, 95, 0.6)')
     .replace(/fade_out\(#141249,\s*0\.4\)/g, 'rgba(20, 18, 73, 0.6)')
     .replace(/fade_out\(#26235f,\s*0\)/g, '#26235f')
     .replace(/fade_out\(#141249,\s*0\)/g, '#141249')
     .replace(/lighten\(#038272,\s*5%\)/g, '#039885')
     .replace(/lighten\(#00a9d0,\s*5%\)/g, '#00c5f3')
     .replace(/lighten\(#eb7224,\s*5%\)/g, '#f08641')
     .replace(/lighten\(#ec3292,\s*5%\)/g, '#ee4e9f');

fs.writeFileSync('client/css/app.css', css + c);
