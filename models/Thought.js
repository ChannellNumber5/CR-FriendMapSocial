const {Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: new Schema.Types.ObjectId,
        },
        reactionBody: {
            type:String,
            required: true,
        },
        username: {
            type:String,
            required:true,
            maxLength: 280,
        },
        createdAt: {
            type:Date,
            default:Date.now(),
            // get:formatDate,
        }
    }
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type:String,
            required: true,
            minLength: 1,
            maxLength:280,
        },
        createdAt: {
            type:Date,
            default:Date.now(),
            // get: formatDate,
        },
        username: {
            type:String,
            required:true,
        },
        reactions : [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

function formatDate (date) {
    const splitDate = date.split('-');
    return `Created on ${splitDate[1]}/${splitDate[2].slice(0,1)}/${splitDate[0]} at ${splitDate[2].slice(3,7)}`;
};


const User = model('Thought', thoughtSchema);

module.exports = User;