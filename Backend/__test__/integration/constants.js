exports.exampleProduct = {
    title: "Laptop XYZ",
    category: "Electronics",
    subCategory: "Laptops",
    brandName: "ABC Electronics",
    model: "XYZ123",
    availableColours: "Silver, Black, Blue",
    processor: "Intel Core i7",
    ram: "16GB DDR4",
    storage: "512GB SSD",
    display: "15.6-inch FHD",
    graphics: "NVIDIA GeForce RTX 3080",
    weight: "2.5 kg",
    battery: "Lithium-ion, 6-cell",
    keyboardBacklight: "keyboard backlights",
    yearsOfWarranty: "2",
    windows: "Windows 10 Home",
    quantity: "50",
    price: "999.99",
    discount: "10",
    status: "processing",
    description:
      "Introducing the TechMaster XYZ, a cutting-edge gaming laptop designed for unmatched performance. With an Intel Core i9-10th Gen processor and 32GB DDR4 RAM, this laptop ensures seamless multitasking and powerful computing. The 17.3-inch 240Hz Full HD IPS display, coupled with the NVIDIA GeForce RTX 3080 graphics, delivers an immersive gaming experience. Store games on the 1TB NVMe SSD for quick access. Featuring a backlit keyboard, sleek design options, and a long-lasting battery, the XYZ is perfect for extended gaming sessions. Pre-installed with Windows 11 Home and backed by a 3-year warranty, the TechMaster XYZ is your gateway to high-performance gaming.",
  };
  
  exports.exampleOrder = {
    userId: "2390239",
    subTotal: "23",
    products: [
      {
        itemid: "65890e98e5acf76b89364c10",
        itemprice: 1200,
        itemtitle: "test update with images",
        itemimages: "product-6588ebdb294cda52249904ac-1703483014198-1.jpeg",
        count: 2,
        _id: "658adfb37461d8afdb5d6639",
      },
      {
        itemid: "6585c532f568a9e2fbefab9c",
        itemprice: 2090,
        itemtitle: "1M Quick Charge & Data Cable for Micro A100 Aspor",
        itemimages: "product-6585a42e3dccfce8aed1e71d-1703266144902-1.jpeg",
        count: 2,
        _id: "658adfb37461d8afdb5d663a",
      },
    ],
  };
  
  exports.exampleOrderUnit = {
    userId: "2390239",
    subTotal: "23",
    products: [
      // {
      //   itemid: "65890e98e5acf76b89364c10",
      //   itemprice: 1200,
      //   itemtitle: "test update with images",
      //   itemimages: "product-6588ebdb294cda52249904ac-1703483014198-1.jpeg",
      //   count: 2,
      //   _id: "658adfb37461d8afdb5d6639",
      // },
      // {
      //   itemid: "6585c532f568a9e2fbefab9c",
      //   itemprice: 2090,
      //   itemtitle: "1M Quick Charge & Data Cable for Micro A100 Aspor",
      //   itemimages: "product-6585a42e3dccfce8aed1e71d-1703266144902-1.jpeg",
      //   count: 2,
      //   _id: "658adfb37461d8afdb5d663a",
      // },
    ],
  };
  
  exports.exampleReview = {
    comment: "Great product...",
    ratings: "5 star",
    user: "658adfb37461d8afdb5d6638",
    product: "658adfb37461d8afdb5d6638",
  };
  