var mongoose = require('mongoose');
var crypto = require('crypto');
var uniqueValidator = require('mongoose-unique-validator');
var mongoConfig = require('../config/credentials');

mongoose.set('useCreateIndex', true);
var  { Schema } = mongoose;
var objectId = Schema.Types.ObjectId;


var UserSchema = new Schema({
    _id: objectId,
    firstName: {type: String, default: null, required: [true, "Can't be blank"]},
    lastName: {type: String, default: null, required: [true, "Can't be blank"]} ,
    email: {type: String, default: null, unique: true, required: [true, "can't be blank"]},
    phone: {type: String, default: null, unique: true },
    passwordHash: {type: String, default: null },
    salt: {type: String, default: null },
    socialLinks: {type: [ String ], default: null },
    biography: {type: String, default: null},
    roleId: {type: String, unique: true},
    watchHistory: { type: String, default: null},
    wishlist: { type: String, default: null},
    title: { type: String, default: null},
    paypalKeys: { type: String, default: null, unique: true },
    stripeKeys: { type: String, default: null, unique: true },
    verificationCode: { type: String, default: null },
    status: { type: String, default: null },
    isInstructor: { type: Boolean, default: false }
}, {timestamps: true})  //createdAt and updatedAt field will be created on user model
UserSchema.plugin(uniqueValidator, {message: 'is already taken'});


//hash the password
UserSchema.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex');
};


//validate password
UserSchema.methods.validPassword = function(password){
    var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 512, 'sha512').toString('hex');
    return this.hash === hash;
}


var TagSchema = new Schema({
    _id: objectId,
    tag: { type: String, default: null},
    tagableId: { type: Number, default: null },
    tagableType: { type: String, default: null },
},{timestamps: true});  //createdAt and updatedAt field will be created on Tag model
TagSchema.plugin(uniqueValidator, {message: 'is already taken'});


var SettingSchema = new Schema({
    _id: objectId,
    key: { type: String, default: null }, 
    value: { type: String, default: null },
})
SettingSchema.plugin(uniqueValidator, {message: 'is already taken'});


var SectionSchema = new Schema({
    _id: objectId,
    title: { type: String, default: true },
    courseId: { type: Number, ref: 'Course' },
    order: {type: Number, default: 0}
}); 
SectionSchema.plugin(uniqueValidator, {message: 'is already taken'});


var RoleSchema = new Schema({
    _id: objectId,
    name: { type: String, default: null}
}, {timestamps: true})  //createdAt and updatedAt field will be created on Role model
RoleSchema.plugin(uniqueValidator, {message: 'is already taken'});


var ReportSchema = new Schema({
    _id: objectId,
    user: { type: Number, ref: 'User'},
    report: { type: String, default:''},
    subject: { type: String, default:''},
    reportCase: {type: Number, default:''}
});
ReportSchema.plugin(uniqueValidator, {message: 'is already taken'});


var RatingSchema = new Schema({
    _id: objectId,
    rating: { type: Number, default: null },
    userId: { type: Number, ref: 'User' },
    ratableType: { type: String, default: null },
    review: { type: String, default: null } 
}, { timestamps: true }); // createdAt and updateAt field will be added to Rating model automatically
RatingSchema.plugin(uniqueValidator, {message: 'is already taken'});


var QuestionSchema = new Schema({
    _id: objectId,
    quizId: { type: Number },
    title: {type: String, default: null},
    numberOfOptions: { type: Number, default: 0},
    options: {type:[ String ], default: []},
    correctAnswers: {type: String, default: null },
    order: { type: Number, default: 0 }
});
QuestionSchema.plugin(uniqueValidator, {message: 'is already taken'});


var ProgramUsersSchema = new Schema({
    _id: objectId,
    user: { type: Number, ref: 'User'},
    program: { type: Number, ref: 'Program' },
    center: { type: Number, required: true },
    parent: { type: Number, required: true},
    role: { type: Number, ref: 'Role'}, 
    details: { type: String, required:true}
}); 
ProgramUsersSchema.plugin(uniqueValidator, {message: 'is already taken'});


var ProgramSchema = new Schema({
    _id: objectId,
    code: { type: String, required: true },
    name: { type: String, required: true },
    parent: { type: Number, required: true },
    slug: { type: String, required: true },
    thumbnail: { type: String, required: true },
    startDate: { type: Date, default: null },
    endDate: { type: Date, default: null },
    organizer: { type: String, default: true }
}, {timestamps: true}); //createdAt and updatedAt field will be created on program model
ProgramSchema.plugin(uniqueValidator, {message: 'is already taken'});


var PortfolioSchema = new Schema({
    _id: objectId,
    programUser: { type: Number, ref: 'User'},
    title: { type: String, required: true },
    attachement: { type: String, required: true },
    assessmentStatus: { type: String, required: true }, 
    description: { type: String, required: true },
    uploadedTime: { type: Date, default: Date.now }
});
PortfolioSchema.plugin(uniqueValidator, {message: 'is already taken'});


var PayoutSchema = new Schema({
    _id: objectId,
    userId: { type: Number, ref: 'User' },
    paymentType: { type: String, default: null },
    amount: { type: Number, default: null },
    status: { type: Number, default: 0}
}, { timestamps: true });
PayoutSchema.plugin(uniqueValidator, {message: 'is already taken '});


var PaymentSchema = new Schema({
    _id: objectId,
    userId: { type: Number, ref: 'User' },
    paymentType: { type: String, default: null },
    courseId: { type: Number, default: null },
    amount: { type: Number, default: null },
    adminRevenue: { type: String, default: null },
    instructorRevenue: { type: String, default: null },
    instructorPaymentStatus: { type: String, default: null },
}, { timestamps: true });
PaymentSchema.plugin(uniqueValidator, { message: 'is already taken '});


var MessageThreadSchema = new Schema({
    _id: objectId,
    messageThreadCode: { type: String, default: null },
    sender: { type: String, default: null },
    receiver: { type: String, default: null },
    lastMessageTimestamp: { type: Date, defalult: null }
});
MessageThreadSchema.plugin(uniqueValidator, { message: 'is already taken '});


var MessageSchema = new Schema({
    _id: objectId,
    messageThreadCode: {type: String, default: null },
    message: { type: String, default: null },
    sender: { type: String, default: null },
    timesstamp: {type: Date, default: null },
    readStatus: { type: Number, default: null }
});
MessageSchema.plugin(uniqueValidator, { message: 'is already taken '});


var LogSchema = new Schema({
    _id: objectId,
    from: { type: String, required: true }
});
LogSchema.plugin(uniqueValidator, {message: 'is already taken '});


var LessonSchema = new Schema({
    _id: objectId,
    title: { type: String, default: true},
    duration: { type: String, default: null },
    courseId: { type: Number, default: null },
    sectionId: { type: Number, default: null },
    videoType: { type: String, default: null },
    lessonType: { type: String, default: null },
    attachement: { type: String, default: null },
    attachementType: { type: String, default: null },
    summary: { type: String, default: null },
    order: { type: Number, default: 0},
    videoTypeForMobileApplication: { type: String, default: null },
    videoUrlForMobileApplication: { type: String, defaulot: null },
    durationForMobileApplication: { type: String, default: null }
});
LessonSchema.plugin(uniqueValidator, {message: 'is already taken '});


var LanguageSchema = new Schema({
    _id: objectId,
    phrase: { type: String, default: true },
    english: { type: String, default: null },
    hausa: { type: String, default: null },
});
LanguageSchema.plugin(uniqueValidator, {message: 'is already taken '});


var FrontEndSchema = new Schema({
    _id: objectId,
    key: { type: String, default: null },
    value: { type: String, default: null  }
});
FrontEndSchema.plugin(uniqueValidator, { message: 'is already taken '});


var EnrolSchema = new Schema({
    _id: objectId,
    userId: { type: Number, ref: 'User'},
    courseId: { type: Number, ref: 'Course' },
}, { timestamps: true });
EnrolSchema.plugin(uniqueValidator, { message: 'is already taken '});


var CurrencySchema = new Schema({
    _id: objectId,
    name: { type: String, default: null },
    code: { type: String, default: null },
    symbol: { type: String, enum: ['$', '₦', '£'], default: '₦'},
    paypalSupport: { type: Boolean, default: true },
    stripeSupport: { type: Boolean, default: true },
    paystackSupport: { type: Boolean, default: true }
});
CurrencySchema.plugin(uniqueValidator, { message: 'is already taken '});


var CourseSchema = new Schema({
    _id: objectId,
    title: { type: String, default: null },
    shortDescription: { type: String, default: null },
    description: { type: String, default: null },
    outcomes: { type: String, default: null },
    language: { type: String, default: null },
    categoryId: { type: Number, default: null },
    subCategoryId: { type: Number, default: null },
    section: { type: String, default: null }, 
    requirements: { type: String, default: null },
    price: { type: Number, default: null },
    discountFlag: { type: Number, default: 0 },
    discountedPrice: { type: Number, default: null },
    level: { type: String, default: null },
    userId: { type: Number, ref: 'User'}, 
    thumbnail: { type: String, default: null },
    videoUrl: { type: String, default: null },
    visibility: { type: Boolean, default: null },
    isTopCourse: { type: Boolean, default: null },
    isAdmin: { type: Boolean, default: null },
    status: { type: String, default: null },
    courseOverviewProvider: { type: String, default: null },
    metaKeywords: { type: String, default: null },
    metaDescription: { type: String, default: null },
    isFreeCourse: { type: Boolean, default: null }
}, { timestamps: true });
CourseSchema.plugin(uniqueValidator, { message: 'is already taken '});


var CommentSchema = new Schema({
    _id: objectId,
    body: { type: String, default: null },
    userId: { type: Number, ref: 'User' },
    commentableId: { type: Number, unique: true, default: null },
    commentableType: { type: String, default: null },
}, {timestamps: true });
CommentSchema.plugin(uniqueValidator, { message: 'is already taken '});


var CISessionSchema = new Schema({
    _id: objectId,
    ipAddress: { type: String, required: true },
    timesstamp: { type: Date, default: Date.now },
    data: { type: Buffer, required: true }
});
CISessionSchema.plugin(uniqueValidator, { message: 'is already taken '});


var CentresSchema = new Schema({
    _id: objectId,
    centerHead: { type: Number, ref: 'User' },
    centerName: { type: String, required: true },
    program: { type: Number, ref: 'Program' },
    centresAddress: { type: String, required: true }
}); 
CentresSchema.plugin(uniqueValidator, { message: 'is already taken '});


var CategorySchema = new Schema({
    _id:objectId,
    code: { type: String, default: null },
    name: { type: String, default: null },
    parent: { type: Number, default: 0 },
    slug: { type: String, default: null },
    fontAwesomeClass: { type: String, default: null },
    thumbnail: { type: String, default:null }
},{timestamps: true });
CategorySchema.plugin(uniqueValidator, { message: 'is already taken '});


var ApplicationSchema = new Schema({
    _id: objectId,
    userId: { type: Number, ref: 'User' },
    address: { type: String, default: null },
    phone: { type: String, default: null },
    message: { type: String, default: null },
    document: { type: String, default: null },
    status: { type: Number, default: 0 }
});
ApplicationSchema.plugin(uniqueValidator, { message: 'is already taken '});


var AddonsSchema = new Schema({
    _id: objectId,
    name: { type: String, required: true },
    uniqueIdentifier: { type: String, required: true },
    version: { type: String, default: null },
    status: { type: Number, required: true },
    about: { type: String, default: null }
}, {timestamps: true })
AddonsSchema.plugin(uniqueValidator, { message: 'is already taken '});


module.exports.User = mongoConfig.model('User', UserSchema);
module.exports.Tag = mongoConfig.model('Tag', TagSchema);
module.exports.Setting = mongoConfig.model('Setting', SettingSchema);
module.exports.Section = mongoConfig.model('Section', SectionSchema);
module.exports.Role = mongoConfig.model('Role', RoleSchema);
module.exports.Report = mongoConfig.model('Report', ReportSchema);
module.exports.Rating = mongoConfig.model('Rating', RatingSchema);
module.exports.Question = mongoConfig.model('Question', QuestionSchema);
module.exports.Program = mongoConfig.model('Program', ProgramSchema);
module.exports.ProgramUsers = mongoConfig.model('ProgramUsers', ProgramUsersSchema);
module.exports.Portfolio = mongoConfig.model('Porfolio', PortfolioSchema );
module.exports.Payout = mongoConfig.model('Payout', PayoutSchema);
module.exports.Payment = mongoConfig.model('Payment', PaymentSchema);
module.exports.MessageThread = mongoConfig.model('MessageThread', MessageThreadSchema);
module.exports.Message = mongoConfig.model('Message', MessageSchema);
module.exports.Lesson = mongoConfig.model('Lesson', LessonSchema);
module.exports.Language = mongoConfig.model('Language', LanguageSchema);
module.exports.FrontEnd = mongoConfig.model('FrontEnd', FrontEndSchema);
module.exports.Enrol = mongoConfig.model('Enrol', EnrolSchema);
module.exports.Currency = mongoConfig.model('Currency', CurrencySchema);
module.exports.Course = mongoConfig.model('Course', CourseSchema);
module.exports.Comment = mongoConfig.model('Comment', CommentSchema);
module.exports.CISession = mongoConfig.model('CISession', CISessionSchema);
module.exports.Centres = mongoConfig.model('Centres', CentresSchema);
module.exports.Category = mongoConfig.model('Category', CategorySchema);
module.exports.Application = mongoConfig.model('Application', ApplicationSchema);
module.exports.Addons = mongoConfig.model('Addons', AddonsSchema);

