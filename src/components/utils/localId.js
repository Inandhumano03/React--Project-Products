export const localId = () => {
  let lastId = localStorage.getItem("lastProductId");

  if (!lastId) {
    lastId = 194; // DummyJSON products end at 194
  }

  const newId = Number(lastId) + 1;

  localStorage.setItem("lastProductId", newId);

  return newId;
};