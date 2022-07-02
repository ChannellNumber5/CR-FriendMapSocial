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
            required: true,
            trim: true,
            match: /^([a-z0-9A-Z_])*@([a-zA-Z])*\.([a-zA-z])*$/,   
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
        },
        id: false,
    }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length
});

const User = model('User', userSchema);

module.exports = User;