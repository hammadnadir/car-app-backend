import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    model: String,
    price: String,
    phone: String,
    city: {
        type: String,
        enum: ["lahore", "karachi"],
    },
    copies: Number,
    images: {
        type: [String],
        default: [],
        validate: [
            {
              validator: function (array) {
                const maxAllowedLength = this.copies ? this.copies : 0;
                return array.length <= maxAllowedLength;
              },
              message: 'Images array must have at most elements based on the number of copies.',
            },
        ],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const PostAdd = mongoose.model('PostAdd', postSchema);

export default PostAdd;