import getRandomColourClass, {random300} from '@/helpers/getRandomColourClass';

function Test() {
  
  const x = random300;

return (
<>
  <div className="bg-white h-screen">
    <section className={`${getRandomColourClass(random300)} p-8`}></section>
    <section className={`${getRandomColourClass(random300)} p-8`}></section>
    <section className={`${getRandomColourClass(random300)} p-8`}></section>
    <section className={`${getRandomColourClass(random300)} p-8`}></section>
    <section className={`${getRandomColourClass(random300)} p-8`}></section>
    <section className={`${getRandomColourClass(random300)} p-8`}></section>
    <section className={`${getRandomColourClass(random300)} p-8`}></section>
    <section className={`${getRandomColourClass(random300)} p-8`}></section>
    <section className={`${getRandomColourClass(random300)} p-8`}></section>
    <section className={`${getRandomColourClass(random300)} p-8`}></section>
  </div>
</>
);
}

export default Test;
