export const formatAddress = (address) => {
  const { streetAddress, postcode, suburb, state } = address;
  return `${streetAddress}, ${suburb}, ${state} ${postcode}`;
};
