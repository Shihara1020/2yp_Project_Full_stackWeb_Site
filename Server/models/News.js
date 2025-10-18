const mongoose = require('mongoose');
const slugify = require('slugify');

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters']
    },
    slug: String,
    summary: {
        type: String,
        required: [true, 'Please add a summary'],
        maxlength: [300, 'Summary cannot be more than 300 characters']
    },
    content: {
        type: String,
        required: [true, 'Please add content']
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'Contributor',
        required: [true, 'Please add an author']
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: [
            'Research Breakthrough',
            'Publication',
            'Awards',
            'Collaboration',
            'Technology',
            'Conference',
            'General'
        ]
    },
    tags: [{
        type: String,
        trim: true
    }],
    featuredImage: {
        type: String,
        default: 'no-photo.jpg'
    },
    images: [{
        type: String
    }],
    isPublished: {
        type: Boolean,
        default: false
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    publishDate: {
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Create news slug from the title
NewsSchema.pre('save', function(next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

// Update the updatedAt field before saving
NewsSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('News', NewsSchema);