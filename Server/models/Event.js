const mongoose = require('mongoose');
const slugify = require('slugify');

const EventSchema = new mongoose.Schema({
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
        maxlength: [1000, 'Description cannot be more than 1000 characters']
    },
    eventType: {
        type: String,
        required: [true, 'Please add an event type'],
        enum: [
            'Conference',
            'Workshop',
            'Seminar',
            'Webinar',
            'Research Presentation',
            'Networking',
            'Training',
            'Other'
        ]
    },
    startDate: {
        type: Date,
        required: [true, 'Please add a start date']
    },
    endDate: {
        type: Date,
        required: [true, 'Please add an end date']
    },
    startTime: {
        type: String,
        required: [true, 'Please add a start time']
    },
    endTime: {
        type: String,
        required: [true, 'Please add an end time']
    },
    location: {
        venue: {
            type: String,
            required: [true, 'Please add a venue']
        },
        address: {
            type: String,
            required: [true, 'Please add an address']
        },
        city: {
            type: String,
            required: [true, 'Please add a city']
        },
        country: {
            type: String,
            required: [true, 'Please add a country']
        },
        isOnline: {
            type: Boolean,
            default: false
        },
        onlineLink: {
            type: String,
            match: [
                /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
                'Please use a valid URL with HTTP or HTTPS'
            ]
        }
    },
    organizer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Contributor',
        required: [true, 'Please add an organizer']
    },
    speakers: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Contributor'
    }],
    maxAttendees: {
        type: Number,
        min: [1, 'Maximum attendees must be at least 1']
    },
    registeredAttendees: {
        type: Number,
        default: 0
    },
    registrationRequired: {
        type: Boolean,
        default: true
    },
    registrationDeadline: {
        type: Date
    },
    registrationLink: {
        type: String,
        match: [
            /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please use a valid URL with HTTP or HTTPS'
        ]
    },
    cost: {
        type: Number,
        min: [0, 'Cost cannot be negative'],
        default: 0
    },
    currency: {
        type: String,
        default: 'USD'
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
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
        default: 'upcoming'
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

// Create event slug from the title
EventSchema.pre('save', function(next) {
    this.slug = slugify(this.title, { lower: true });
    next();
});

// Update the updatedAt field before saving
EventSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Update event status based on dates
EventSchema.pre('save', function(next) {
    const now = new Date();
    const startDate = new Date(this.startDate);
    const endDate = new Date(this.endDate);
    
    if (this.status !== 'cancelled') {
        if (now < startDate) {
            this.status = 'upcoming';
        } else if (now >= startDate && now <= endDate) {
            this.status = 'ongoing';
        } else if (now > endDate) {
            this.status = 'completed';
        }
    }
    next();
});

module.exports = mongoose.model('Event', EventSchema);