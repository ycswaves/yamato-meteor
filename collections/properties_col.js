Properties = new Meteor.Collection("properties");

var Schemas = {};

Schemas.Property = new SimpleSchema({
  title: {
    type: String,
    label: "Title"
    //max: 200
  },
  author: {
    type: String,
    label: "Author"
  },
  price: {
    type: Number,
    label: "Rental price",
    min: 0
  },
  description: {
    type: String,
    label: "Brief summary",
    optional: true,
    max: 1000
  },
  district: {
    type: String,
    label: "District this property belong to"
  },
  propertyType: {
    type: String,
    label: "Property types",
    allowedValues: ['HDB', 'Condominium', 'Landed'],
  },
  bedroom: {
    type: Number,
    label: "Number of bedrooms",
    min: 1
  },
  bathroom: {
    type: Number,
    label: "Number of bathrooms",
    min: 1
  },
  moveInDate: {
    type: Date,
    label: "Earliest date to move in",
    optional: true
  },
  area: {
    type: Number,
    label: "Size of the rooms or apartment in terms of meter squares",
  },
  mrt: {
    type: String,
    label: "Nearest MRTs"
  },
  contact: {
    type: Object,
    label: "Contact information for unregisterd users"
  },
  photos: {
    type: [String],
    label: "urls of uploaded photos" // to be revised later
  },
  facilities: {
    type: [String],
    label: "Property facilities"
  },
  createdAt: {
    type: Date
  },
  updatedAt: {
    type: Date
  }
});