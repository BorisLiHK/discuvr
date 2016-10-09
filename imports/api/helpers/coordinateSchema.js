import {Match} from 'meteor/check'
import {SimpleSchema} from 'meteor/aldeed:simple-schema'
import Text from 'simple-react-form-material-ui/lib/text'
import ObjectComponent from 'simple-react-form-material-ui/lib/object';

SimpleSchema.extendOptions({
    srf: Match.Optional(Object)
});

const CoordinateSchema = new SimpleSchema({
    latitude: {
        type: Number,
        decimal: true,
        min: -90,
        max: 90,
        srf: {
            type: Text
        }
    },
    longitude: {
        type: Number,
        decimal: true,
        min: -180,
        max: 180,
        srf: {
            type: Text
        }
    }
})

export default CoordinateSchema