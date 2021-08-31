/* eslint-disable no-unused-vars */
/* eslint-disable eol-last */
const delimiter = (value) => {
  const formatter = new Intl.NumberFormat('id-ID');
  return formatter.format(value).replace(/,00/, '');
};

export default delimiter;