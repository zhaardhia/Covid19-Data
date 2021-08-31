const animateNumber = (counters, target) => {
  counters.forEach((counter) => {
    const updateCount = () => {
      const count = +counter.innerText;
      const inc = target / 200;
      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 1);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
};

export default animateNumber;
