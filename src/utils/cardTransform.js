function cardTransformToObject(flatObject) {
  return {
    title: flatObject.title || "",
    subtitle: flatObject.subtitle || "",
    description: flatObject.description || "",
    phone: flatObject.phone || "",
    email: flatObject.email || "",
    web: flatObject.web || "",
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
  };
}
export default cardTransformToObject;
