import {SimpleSchema} from 'meteor/aldeed:simple-schema'

export default CoordinateSchema = new SimpleSchema({
    longitude: {
        type: Number,
        decimal: true,
        min: -180,
        max: 180,
        srf: {
            type: Text
        }
    },
    latitude: {
        type: Number,
        decimal: true,
        min: -90,
        max: 90,
        srf: {
            type: Text
        }
    }
})
