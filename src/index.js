import { helloworld } from './helloworld';
let a = 1;
(() => {
    console.log(123)
    a=2;
    console.log(a)
})()
document.write(helloworld(), a);