export const formatAddress = (address) => {
  const { streetAddress, postcode, suburb, state } = address;
  return !streetAddress ? 'N/A' : `${streetAddress}, ${suburb}, ${state} ${postcode}`;
};
