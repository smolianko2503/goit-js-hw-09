import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onCreatePromises);

function onCreatePromises(evt) {
  evt.preventDefault()

   const dataInput = {
    delay: Number(form.elements.delay.value),
    step: Number(form.elements.step.value),
    amount: Number(form.elements.amount.value),
  }

  cyclePromises(dataInput)
  form.reset();
};

function cyclePromises({ delay, step, amount }) {
  for (let i = 0; i < amount; i += 1) {
     createPromise(i + 1, delay + step * i)
      .then(onSuccess)
      .catch(onReject);
  } 
};
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

function onSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};

function onReject({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};
