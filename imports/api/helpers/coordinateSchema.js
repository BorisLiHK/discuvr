import {Match} from 'meteor/check'
import {SimpleSchema} from 'meteor/aldeed:simple-schema'
import Text from 'simple-react-form-material-ui/lib/text'
import ObjectComponent from 'simple-react-form-material-ui/lib/object';

SimpleSchema.extendOptions({
    srf: Match.Optional(Object)
});

const CoordinateSchema = new SimpleSchema({
    longitude: {
        type: Number,
        decimal: true,
        min: -180,
        max: 180,
        autoValue: function() {
            return 151.199
        },
        srf: {
            type: Text
        }
    },
    latitude: {
        type: Number,
        decimal: true,
        min: -90,
        max: 90,
        autoValue: function() {
            return -33.884
        },
        srf: {
            type: Text
        }
    }
})

export default CoordinateSchema