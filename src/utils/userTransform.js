function userTransformToObject(flatObject) {
  return {
    name: {
      first: flatObject.name_first || "",
      middle: flatObject.name_middle || "",
      last: flatObject.name_last || "",
    },
    phone: flatObject.phone || "",
    email: flatObject.email || "",
    password: flatObject.password || "",
    image: {
      url: flatObject.image_url || "",
      alt: flatObject.image_alt || "",
    },
    address: {
      state: flatObject.address_state || "",
      country: flatObject.address_country || "",
      city: flatObject.address_city || "",
      street: flatObject.address_street || "",
      houseNumber: flatObject.address_houseNumber || 0,
      zip: flatObject.address_zip || 0,
    },
    isBusiness: flatObject.isBusiness || false,
  };
}
export default userTransformToObject;
