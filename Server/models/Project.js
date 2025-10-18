const mongoose = require('mongoose');
const slugify = require('slugify');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [2000, 'Description cannot be more than 2000 characters']
    },
    shortDescription: {
        type: String,
        required: [true, 'Please add a short description'],
        maxlength: [300, 'Short description cannot be more than 300 characters']
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: [
            'Neuromorphic Computing',
            'Machine Learning',
            'Artificial Intelligence',
            'Hardware Development',
            'Software Development',
            'Research',
            'Collaboration',
            'Other'
        ]
    },
    status: {
        type: String,
        required: [true, 'Please add a status'],
        enum: ['planning', 'active', 'completed', 'on-hold', 'cancelled'],
        default: 'planning'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },
    startDate: {
        type: Date,
        required: [true, 'Please add a start date']
    },
    endDate: {
        type: Date
    },
    estimatedDuration: {
        type: String, // e.g., "6 months", "1 year"
        maxlength: [50, 'Estimated duration cannot be more than 50 characters']
    },
    budget: {
        amount: {
            type: Number,
            min: [0, 'Budget cannot be negative']
        },
        currency: {
            type: String,
            default: 'USD'
        }
    },
    fundingSource: {
        type: String,
        maxlength: [200, 'Funding source cannot be more than 200 characters']
    },
    teamLead: {
        type: mongoose.Schema.ObjectId,
        ref: 'Contributor'
    },
    teamMembers: [{
        member: {
            type: mongoose.Schema.ObjectId,
            ref: 'Contributor'
        },
        role: {
            type: String,
            maxlength: [100, 'Role cannot be more than 100 characters']
        },
        joinDate: {
            type: Date,
            default: Date.now
        }
    }],
    technologies: [{
        type: String,
        trim: true
    }],
    objectives: [{
        type: String,
        trim: true
    }],
    deliverables: [{
        title: {
            type: String,
            required: true,
            maxlength: [200, 'Deliverable title cannot be more than 200 characters']
        },
        description: {
            type: String,
            maxlength: [500, 'Deliverable description cannot be more than 500 characters']
        },
        dueDate: {
            type: Date
        },
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'completed', 'delayed'],
            default: 'pending'
        }
    }],
    milestones: [{
        title: {
            type: String,
            required: true,
            maxlength: [200, 'Milestone title cannot be more than 200 characters']
        },
        description: {
            type: String,
            maxlength: [500, 'Milestone description cannot be more than 500 characters']
        },
        targetDate: {
            type: Date,
            required: true
        },
        completedDate: {
            type: Date
        },
        status: {
            type: String,
            enum: ['upcoming', 'current', 'completed', 'delayed'],
            default: 'upcoming'
        }
    }],
    repository: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
        ]
    },
    documentation: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
        ]
    },
    publications: [{
        title: {
            type: String,
            maxlength: [300, 'Publication title cannot be more than 300 characters']
        },
        journal: {
            type: String,
            maxlength: [200, 'Journal name cannot be more than 200 characters']
        },
        url: {
            type: String,
            match: [
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                'Please use a valid URL with HTTP or HTTPS'
            ]
        },
        publishedDate: {
            type: Date
        }
    }],
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
    isPublic: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    progress: {
        type: Number,
        min: [0, 'Progress cannot be less than 0'],
        max: [100, 'Progress cannot be more than 100'],
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

// Create project slug from the title
ProjectSchema.pre('save', function(next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

// Update the updatedAt field before saving
ProjectSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Project', ProjectSchema);