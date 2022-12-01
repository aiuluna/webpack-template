import { helloworld } from '../../components/helloworld';
let a = 1;
(() => {
    console.log(123)
    a=2;
    console.log(a)
})()
console.log(helloworld())
document.write(helloworld(), a);