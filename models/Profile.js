const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Creating Profile Schema
const ProfileSchema = new Schema({
  users: {
    type: Schema.Types.ObjectId,
    ref: "Users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: String,
        required: true
      },
      to: {
        type: String
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String
      },
      from: {
        type: String,
        required: true
      },
      to: {
        type: String
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String,
      required: true
    },
    facebook: {
      type: String,
      required: true
    },
    twitter: {
      type: String,
      required: true
    },
    linkedin: {
      type: String,
      required: true
    },
    instagram: {
      type: String,
      required: true
    }
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Profile = mongoose.model("Profile", ProfileSchema);
