Properties = new Meteor.Collection("properties");

var Schemas = {};

Schemas.Property = new SimpleSchema({
  address: {
    type: String,
    label: "地址"
    //max: 200
  },
  author: {
    type: String,
    label: "帖主"
  },
  price: {
    type: Number,
    label: "价格",
    min: 0
  },
  description: {
    type: String,
    label: "描述",
    optional: true,
    max: 1000
  },
  district: {
    type: String,
    label: "所在区域"
  },
  propertyType: {
    type: String,
    label: "房屋类型",
    allowedValues: ['HDB', 'Condominium', 'Landed'],
  },
  hasAgentFee: {
    type: Number,
    label: "有无中介费",
    allowedValues: [0, 1]
  },
  moveInDate: {
    type: Date,
    label: "入住时间",
    optional: true
  },
  bedroom: {
    type: Number,
    label: "房间数",
    min: 1
  },
  bathroom: {
    type: Number,
    label: "卫生间数",
    min: 1
  },
  area: {
    type: Number,
    label: "面积",
  },
  mrt: {
    type: String,
    label: "最近地铁站"
  },
  contact: {
    type: Object,
    label: "联系方式"
  },
  photos: {
    type: [String],
    label: "urls of uploaded photos", // to be revised later
    optional: true
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

Properties.attachSchema(Schemas.Property);